import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    const err = new Error('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your .env file.')
    err.statusCode = 400
    throw err
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true', // true for port 465, false for 587/25 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  return transporter
}

// Replace {{business_name}}, {{first_name}}, {{country}}, {{email}} placeholders with lead data.
export function fillTemplate(template, lead) {
  return (template || '')
    .replace(/{{\s*business_name\s*}}/gi, lead.business || '')
    .replace(/{{\s*first_name\s*}}/gi, lead.business || 'there')
    .replace(/{{\s*country\s*}}/gi, lead.country || '')
    .replace(/{{\s*email\s*}}/gi, lead.email || '')
}

// Verify SMTP credentials are correct and the server is reachable.
export async function verifySMTP() {
  const t = getTransporter()
  return t.verify()
}

// Sends one email per lead. Returns { sent, bounced, errors[] }.
export async function sendCampaignEmails({ subject, body, leads, attachmentPath, attachmentName }) {
  const t = getTransporter()
  const fromName = process.env.FROM_NAME || 'EmailPro'
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER

  const result = { sent: 0, bounced: 0, errors: [] }

  for (const lead of leads) {
    try {
      await t.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: lead.email,
        subject: fillTemplate(subject, lead),
        text: fillTemplate(body, lead),
        html: fillTemplate(body, lead).replace(/\n/g, '<br/>'),
        attachments: attachmentPath ? [{ filename: attachmentName, path: attachmentPath }] : [],
      })
      result.sent += 1
    } catch (err) {
      result.bounced += 1
      result.errors.push({ email: lead.email, message: err.message })
    }
  }

  return result
}