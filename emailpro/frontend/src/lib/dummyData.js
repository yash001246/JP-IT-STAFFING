// Centralized realistic dummy data for EmailPro

export const currentUser = {
  name: 'Ariana Cole',
  email: 'ariana@nimbusgrowth.io',
  role: 'Owner',
  avatar: 'AC',
  company: 'Nimbus Growth',
  plan: 'Pro',
}

export const statCards = [
  { label: 'Total Leads', value: '18,432', delta: '+12.4%', trend: 'up' },
  { label: 'Emails Sent', value: '92,187', delta: '+8.1%', trend: 'up' },
  { label: 'Open Rate', value: '41.6%', delta: '+3.2%', trend: 'up' },
  { label: 'Conversion Rate', value: '6.8%', delta: '-0.4%', trend: 'down' },
]

export const deliveryPerformance = [
  { day: 'Mon', sent: 3200, delivered: 3100, opened: 1350, clicked: 420 },
  { day: 'Tue', sent: 4100, delivered: 4000, opened: 1720, clicked: 510 },
  { day: 'Wed', sent: 3800, delivered: 3720, opened: 1600, clicked: 470 },
  { day: 'Thu', sent: 5200, delivered: 5090, opened: 2210, clicked: 690 },
  { day: 'Fri', sent: 4700, delivered: 4600, opened: 1980, clicked: 600 },
  { day: 'Sat', sent: 2100, delivered: 2050, opened: 810, clicked: 210 },
  { day: 'Sun', sent: 1800, delivered: 1770, opened: 690, clicked: 180 },
]

export const recentActivity = [
  { id: 1, campaign: 'Q3 SaaS Founders Outreach', action: 'Sent to 1,240 leads', time: '12 min ago', status: 'sent' },
  { id: 2, campaign: 'Agency Cold Outreach — Batch 4', action: 'Opened by 312 recipients', time: '48 min ago', status: 'opened' },
  { id: 3, campaign: 'E-commerce Store Owners', action: 'Scheduled for tomorrow, 9:00 AM', time: '1 hr ago', status: 'scheduled' },
  { id: 4, campaign: 'Local Restaurants — NYC', action: '18 replies received', time: '3 hr ago', status: 'replied' },
  { id: 5, campaign: 'Fitness Studios Follow-up', action: 'Bounced: 24 addresses', time: '5 hr ago', status: 'bounced' },
]

export const leads = [
  { id: 1, business: 'Northwind Analytics', email: 'contact@northwindanalytics.com', phone: '+1 415 555 0134', country: 'United States', source: 'LinkedIn', score: 92, contacted: true },
  { id: 2, business: 'Bluepeak Studio', email: 'hello@bluepeakstudio.co', phone: '+44 20 7946 0958', country: 'United Kingdom', source: 'Web Scrape', score: 78, contacted: false },
  { id: 3, business: 'Terra Roasters', email: 'orders@terraroasters.com', phone: '+1 312 555 0199', country: 'United States', source: 'Google Maps', score: 65, contacted: true },
  { id: 4, business: 'Kiraly Fitness', email: 'info@kiralyfitness.hu', phone: '+36 1 555 0177', country: 'Hungary', source: 'Instagram', score: 54, contacted: false },
  { id: 5, business: 'Solvora Legal', email: 'partners@solvoralegal.com', phone: '+1 646 555 0142', country: 'United States', source: 'LinkedIn', score: 88, contacted: true },
  { id: 6, business: 'Marée Bistro', email: 'contact@mareebistro.fr', phone: '+33 1 42 68 53 00', country: 'France', source: 'Google Maps', score: 61, contacted: false },
  { id: 7, business: 'Vantage Freight Co.', email: 'sales@vantagefreight.com', phone: '+1 713 555 0188', country: 'United States', source: 'Web Scrape', score: 73, contacted: true },
  { id: 8, business: 'Orbit Dental Group', email: 'admin@orbitdental.ca', phone: '+1 604 555 0161', country: 'Canada', source: 'Referral', score: 82, contacted: false },
  { id: 9, business: 'Alto Coworking', email: 'team@altocoworking.com', phone: '+61 2 5550 0123', country: 'Australia', source: 'LinkedIn', score: 69, contacted: true },
  { id: 10, business: 'Finch & Field Agency', email: 'hi@finchfield.co', phone: '+1 512 555 0176', country: 'United States', source: 'Web Scrape', score: 95, contacted: false },
  { id: 11, business: 'Rosemary Lane Bakery', email: 'orders@rosemarylane.co.uk', phone: '+44 161 555 0143', country: 'United Kingdom', source: 'Instagram', score: 48, contacted: false },
  { id: 12, business: 'Kestrel Robotics', email: 'contact@kestrelrobotics.io', phone: '+1 650 555 0121', country: 'United States', source: 'LinkedIn', score: 90, contacted: true },
]

export const campaigns = [
  { id: 1, name: 'Q3 SaaS Founders Outreach', sent: 4200, delivered: 4110, opened: 1890, clicked: 610, bounced: 90, status: 'Active' },
  { id: 2, name: 'Agency Cold Outreach — Batch 4', sent: 3100, delivered: 3040, opened: 1420, clicked: 480, bounced: 60, status: 'Active' },
  { id: 3, name: 'E-commerce Store Owners', sent: 2600, delivered: 2510, opened: 980, clicked: 260, bounced: 90, status: 'Scheduled' },
  { id: 4, name: 'Local Restaurants — NYC', sent: 1800, delivered: 1765, opened: 890, clicked: 310, bounced: 35, status: 'Completed' },
  { id: 5, name: 'Fitness Studios Follow-up', sent: 1450, delivered: 1390, opened: 520, clicked: 140, bounced: 60, status: 'Completed' },
]

export const campaignPerformanceTrend = [
  { week: 'W1', opened: 1200, clicked: 320 },
  { week: 'W2', opened: 1560, clicked: 410 },
  { week: 'W3', opened: 1890, clicked: 520 },
  { week: 'W4', opened: 1720, clicked: 470 },
  { week: 'W5', opened: 2210, clicked: 640 },
  { week: 'W6', opened: 2480, clicked: 710 },
]

export const countryPerformance = [
  { country: 'United States', opens: 12400, clicks: 3800, color: '#7C5CFF' },
  { country: 'United Kingdom', opens: 6200, clicks: 1700, color: '#4C7CFF' },
  { country: 'Canada', opens: 3800, clicks: 990, color: '#31D9E8' },
  { country: 'Australia', opens: 2600, clicks: 640, color: '#9D6BFF' },
  { country: 'France', opens: 1900, clicks: 410, color: '#5B7BFF' },
]

export const funnelStats = [
  { stage: 'Sent', value: 92187 },
  { stage: 'Delivered', value: 89210 },
  { stage: 'Opened', value: 38340 },
  { stage: 'Clicked', value: 11670 },
  { stage: 'Bounced', value: 2977 },
]

export const teamMembers = [
  { id: 1, name: 'Ariana Cole', email: 'ariana@nimbusgrowth.io', role: 'Owner', avatar: 'AC' },
  { id: 2, name: 'Marcus Webb', email: 'marcus@nimbusgrowth.io', role: 'Admin', avatar: 'MW' },
  { id: 3, name: 'Priya Nair', email: 'priya@nimbusgrowth.io', role: 'Editor', avatar: 'PN' },
  { id: 4, name: 'Diego Fuentes', email: 'diego@nimbusgrowth.io', role: 'Viewer', avatar: 'DF' },
]

export const notifications = [
  { id: 1, title: 'Campaign delivered', body: '"Q3 SaaS Founders Outreach" reached 4,110 inboxes', time: '10m' },
  { id: 2, title: '18 new replies', body: 'Local Restaurants — NYC is getting traction', time: '1h' },
  { id: 3, title: 'CSV import complete', body: '312 leads added from leads_east_coast.csv', time: '3h' },
]

export function generateAIEmail({ business, industry, product }) {
  const b = business || 'their business'
  const i = industry || 'their industry'
  const p = product || 'our solution'
  return {
    subject: `Quick idea for ${b}'s ${i.toLowerCase()} pipeline`,
    body: `Hi there,\n\nI came across ${b} while researching teams in ${i}, and wanted to reach out directly.\n\nWe built ${p} specifically to help teams like yours cut manual busywork and close more deals without adding headcount. A few similar companies in ${i} saw open rates climb past 40% within the first month.\n\nWould you be open to a quick 15-minute call this week to see if it's a fit for ${b}?\n\nBest,\nAriana`,
    followUp: `Hi again,\n\nJust floating this back to the top of your inbox — I know things get busy.\n\nIf ${p} isn't a priority right now, no worries at all. But if you're still exploring ways to improve outreach at ${b}, I'd love to share a 2-minute walkthrough.\n\nLet me know either way!\n\nBest,\nAriana`,
  }
}
