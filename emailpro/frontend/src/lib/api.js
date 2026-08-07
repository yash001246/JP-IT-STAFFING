const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, { method = 'GET', body, token, isFormData = false } = {}) {
  const headers = {}
  if (!isFormData) headers['Content-Type'] = 'application/json'
  if (token) headers['Authorization'] = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    })
  } catch (err) {
    throw new Error('Could not reach the server. Is the backend running?')
  }

  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : null

  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`)
  }
  return data
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  me: (token) => request('/auth/me', { token }),

  getLeads: (token, params = '') => request(`/leads${params}`, { token }),
  createLead: (token, payload) => request('/leads', { method: 'POST', body: payload, token }),
  updateLead: (token, id, payload) => request(`/leads/${id}`, { method: 'PATCH', body: payload, token }),
  deleteLead: (token, id) => request(`/leads/${id}`, { method: 'DELETE', token }),
  uploadLeadsCSV: (token, formData) => request('/leads/upload-csv', { method: 'POST', body: formData, token, isFormData: true }),

  getCampaigns: (token) => request('/campaigns', { token }),
  getCampaign: (token, id) => request(`/campaigns/${id}`, { token }),
  createCampaign: (token, formData) => request('/campaigns', { method: 'POST', body: formData, token, isFormData: true }),

  getAnalyticsOverview: (token) => request('/analytics/overview', { token }),
  getTopCampaigns: (token) => request('/analytics/campaigns/top', { token }),

  generateEmail: (token, payload) => request('/ai/generate-email', { method: 'POST', body: payload, token }),

  getApiKey: (token) => request('/settings/api-key', { token }),
  rotateApiKey: (token) => request('/settings/api-key/rotate', { method: 'POST', token }),
  testSMTP: (token) => request('/settings/test-smtp', { token }),
}
