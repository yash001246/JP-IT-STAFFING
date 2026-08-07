import fs from 'fs'
import { Resend } from 'resend'

// NOTE: function names (verifySMTP, sendCampaignEmails, fillTemplate) are kept as-is
// even though sending now goes through Resend's HTTP API instead of raw SMTP.
// This is because Render's free web services block outbound SMTP ports (25/465/587),
// so we switched to an HTTPS-based email API which is not blocked. Keeping the same
// exported names means campaignController.js and settingsController.js need no changes.

let resendClient = null

function getResend() {
  if (resendClient) return resendClient

  const { RESEND_API_KEY } = process.env
  if (!RESEND_API_KEY) {
    const err = new Error('Resend is not configured. Set RESEND_API_KEY in your .env file.')
    err.statusCode = 400
    throw err
  }

  resendClient = new Resend(RESEND_API_KEY)
  return resendClient
}

function getFromAddress() {
  const fromName = process.env.FROM_NAME || 'EmailPro'
  const fromEmail = process.env.FROM_EMAIL
  if (!fromEmail) {
    const err = new Error('FROM_EMAIL is not set. Set it in your .env file (use onboarding@resend.dev until your domain is verified).')
    err.statusCode = 400
    throw err
  }
  return `${fromName} <${fromEmail}>`
}

// Replace {{business_name}}, {{first_name}}, {{country}}, {{email}} placeholders with lead data.
export function fillTemplate(template, lead) {
  return (template || '')
    .replace(/{{\s*business_name\s*}}/gi, lead.business || '')
    .replace(/{{\s*first_name\s*}}/gi, lead.business || 'there')
    .replace(/{{\s*country\s*}}/gi, lead.country || '')
    .replace(/{{\s*email\s*}}/gi, lead.email || '')
}

// "Verify" for Resend = confirm the API key actually works by hitting a lightweight endpoint.
export async function verifySMTP() {
  const resend = getResend()
  const { error } = await resend.domains.list()
  if (error) {
    const err = new Error(error.message || 'Resend API key is invalid or unauthorized')
    throw err
  }
  return true
}

// Sends one email per lead via Resend's HTTP API. Returns { sent, bounced, errors[] }.
export async function sendCampaignEmails({ subject, body, leads, attachmentPath, attachmentName }) {
  const resend = getResend()
  const from = getFromAddress()

  let attachments
  if (attachmentPath) {
    const content = fs.readFileSync(attachmentPath).toString('base64')
    attachments = [{ filename: attachmentName || 'attachment.pdf', content }]
  }

  const result = { sent: 0, bounced: 0, errors: [] }

  for (const lead of leads) {
    try {
      const { error } = await resend.emails.send({
        from,
        to: lead.email,
        subject: fillTemplate(subject, lead),
        text: fillTemplate(body, lead),
        html: fillTemplate(body, lead).replace(/\n/g, '<br/>'),
        ...(attachments && { attachments }),
      })
      if (error) throw new Error(error.message || 'Resend rejected this email')
      result.sent += 1
    } catch (err) {
      result.bounced += 1
      result.errors.push({ email: lead.email, message: err.message })
    }
  }

  return result
}