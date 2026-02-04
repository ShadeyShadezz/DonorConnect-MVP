import assert from 'assert'
import { createQuickDonation, generateImpactSummary } from '../lib/donations'

function testCreateQuickDonation() {
  const payload = { amount: 100, donorName: 'Jane Doe', campaign: 'General Fund' }
  const d = createQuickDonation(payload)
  assert.strictEqual(d.amount, 100)
  assert.strictEqual(d.donorName, 'Jane Doe')
  assert.ok(d.id.startsWith('don_'))
}

function testGenerateImpactSummary() {
  const payload = { amount: 50, donorName: 'Sam', campaign: 'Relief', date: '2023-01-01' }
  const s = generateImpactSummary(payload)
  assert.ok(typeof s.text === 'string' && s.text.length > 0)
  assert.ok(s.short.includes('$') || s.short.includes('USD'))
}

async function run() {
  try {
    testCreateQuickDonation()
    testGenerateImpactSummary()
    console.log('All tests passed')
    process.exit(0)
  } catch (err) {
    console.error('Tests failed')
    console.error(err)
    process.exit(1)
  }
}

run()
