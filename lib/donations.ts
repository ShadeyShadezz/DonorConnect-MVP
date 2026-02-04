export type DonationPayload = {
  amount: number
  currency?: string
  donorName?: string
  campaign?: string
  date?: string // ISO date
  notes?: string
}

export type Donation = DonationPayload & { id: string }

function formatCurrency(amount: number, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

export function generateImpactSummary(donation: DonationPayload) {
  const amountLabel = formatCurrency(donation.amount, donation.currency || 'USD')
  const donor = donation.donorName ? `${donation.donorName}, ` : ''
  const when = donation.date ? `on ${new Date(donation.date).toLocaleDateString()}` : 'recently'
  const campaign = donation.campaign ? ` toward ${donation.campaign}` : ''

  const summary = `${donor}thank you for your donation of ${amountLabel} ${when}${campaign}. Your gift helps fund our programs and makes an immediate impact. You'll receive an official receipt via email.`

  return {
    text: summary,
    short: `${amountLabel} donation${campaign ? ` — ${donation.campaign}` : ''}`,
    receipt: {
      amount: donation.amount,
      currency: donation.currency || 'USD',
      date: donation.date || new Date().toISOString(),
      notes: donation.notes || null,
    },
  }
}

export function createQuickDonation(payload: DonationPayload): Donation {
  if (typeof payload.amount !== 'number' || Number.isNaN(payload.amount) || payload.amount <= 0) {
    throw new Error('Invalid donation amount')
  }

  const id = `don_${Math.random().toString(36).slice(2, 10)}`
  const donation: Donation = {
    id,
    amount: payload.amount,
    currency: payload.currency || 'USD',
    donorName: payload.donorName || 'Anonymous',
    campaign: payload.campaign,
    date: payload.date || new Date().toISOString(),
    notes: payload.notes,
  }

  // In production this would persist via Prisma and trigger webhooks/notifications.
  return donation
}

export default {
  generateImpactSummary,
  createQuickDonation,
}
