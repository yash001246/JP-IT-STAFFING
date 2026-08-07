// AI email generation controller.
// This is a template ready to be wired to a real LLM provider (OpenAI, Anthropic, etc).
// Replace the body of `generateContent` with a real API call — see the commented example below.

const buildPrompt = ({ business, industry, product }) => `
Write a short, personalized cold outreach email and a follow-up email.
Business: ${business}
Industry: ${industry}
Product/service being pitched: ${product}
Return JSON with keys: subject, body, followUp.
`

// Deterministic mock generator used until a real API key is configured.
function mockGenerate({ business, industry, product }) {
  const b = business || 'their business'
  const i = industry || 'their industry'
  const p = product || 'our solution'
  return {
    subject: `Quick idea for ${b}'s ${i.toLowerCase()} pipeline`,
    body: `Hi there,\n\nI came across ${b} while researching teams in ${i}, and wanted to reach out directly.\n\nWe built ${p} specifically to help teams like yours cut manual busywork and close more deals without adding headcount.\n\nWould you be open to a quick 15-minute call this week to see if it's a fit for ${b}?\n\nBest,\n${''}`,
    followUp: `Hi again,\n\nJust floating this back to the top of your inbox — I know things get busy.\n\nIf ${p} isn't a priority right now, no worries. But if you're still exploring ways to improve outreach at ${b}, I'd love to share a 2-minute walkthrough.\n\nBest,\n${''}`,
  }
}

// POST /api/ai/generate-email
export const generateEmail = async (req, res, next) => {
  try {
    const { business, industry, product } = req.body
    if (!business) return res.status(400).json({ message: 'Business name is required' })

    // --- Real LLM integration example (uncomment and configure) ---
    // const response = await fetch('https://api.anthropic.com/v1/messages', {
    //   method: 'POST',
    //   headers: {
    //     'x-api-key': process.env.ANTHROPIC_API_KEY,
    //     'anthropic-version': '2023-06-01',
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'claude-sonnet-4-6',
    //     max_tokens: 600,
    //     messages: [{ role: 'user', content: buildPrompt({ business, industry, product }) }],
    //   }),
    // })
    // const data = await response.json()
    // const parsed = JSON.parse(data.content[0].text)

    const parsed = mockGenerate({ business, industry, product })

    res.json({ result: parsed })
  } catch (err) {
    next(err)
  }
}
