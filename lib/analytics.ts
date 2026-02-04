import { Donation as DonationType } from './donations'

export type ImportResult = { imported: number; errors: Array<{ index: number; reason: string }> }

export function importFromCRM(records: any[]): ImportResult {
  const errors: Array<{ index: number; reason: string }> = []
  let imported = 0

  records.forEach((r, i) => {
    if (!r || typeof r.amount !== 'number' || !r.id) {
      errors.push({ index: i, reason: 'Missing required fields (id, amount)' })
      return
    }
    // In production we'd map fields and persist via Prisma here.
    imported += 1
  })

  return { imported, errors }
}

export function startPaymentSetupWizard(userId: string) {
  // Return an ordered list of steps the UI should present.
  return [
    { step: 1, title: 'Connect Payment Provider', description: 'Connect Stripe or other gateway.' },
    { step: 2, title: 'Verify Account', description: 'Complete verification for payouts.' },
    { step: 3, title: 'Set Default Currency', description: 'Choose the currency for donations.' },
    { step: 4, title: 'Test Payment', description: 'Run a test transaction.' },
  ]
}

export function groupMetricsForDashboard(donations: DonationType[]) {
  const total = donations.reduce((s, d) => s + (Number(d.amount) || 0), 0)
  const count = donations.length
  const avg = count ? total / count : 0

  const byCampaign: Record<string, number> = {}
  const byDonor: Record<string, number> = {}

  donations.forEach((d) => {
    const campaign = (d as any).campaign || 'Unspecified'
    byCampaign[campaign] = (byCampaign[campaign] || 0) + (Number(d.amount) || 0)
    const donor = d.donorName || d.donorId || 'Anonymous'
    byDonor[donor] = (byDonor[donor] || 0) + (Number(d.amount) || 0)
  })

  const topDonors = Object.entries(byDonor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, amt]) => ({ name, amount: amt }))

  return { total, count, average: avg, byCampaign, topDonors }
}

export function notifyAdminOnLargeDonation(donation: DonationType, threshold = 1000) {
  const amount = Number(donation.amount || 0)
  if (amount >= threshold) {
    const payload = {
      level: 'critical',
      message: `Large donation received: ${amount} from ${donation.donorName || donation.donorId || 'Anonymous'}`,
      donationId: donation.id,
      amount,
    }
    // In production we'd send this to an alerts service or email/SMS webhook.
    return { alerted: true, payload }
  }
  return { alerted: false }
}

export default { importFromCRM, startPaymentSetupWizard, groupMetricsForDashboard, notifyAdminOnLargeDonation }
