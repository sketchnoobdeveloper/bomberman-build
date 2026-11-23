// One-time bootstrap: tools, packs, settings, a demo endpoint, admin promotion.
// Usage: GOOGLE_APPLICATION_CREDENTIALS=sa.json ADMIN_EMAIL=you@gmail.com node scripts/seed.mjs
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore'

initializeApp({ credential: applicationDefault(), projectId: 'bomberman-bb419' })
const db = getFirestore()

const BD = '^(01[3-9][0-9]{8}|8801[3-9][0-9]{8})$'
const EMAIL = '^[^@\\s]+@[^@\\s]+\\.[A-Za-z]{2,}$'

const tools = [
  { slug: 'sms', name: 'SMS Bomber', type: 'sms', inputKind: 'phone', inputRegex: BD, coinCost: 1, maxRepeat: 100, delayMs: 1000, cooldownSec: 60, dailyLimit: 800, active: true, sortOrder: 1, icon: 'sms' },
  { slug: 'call', name: 'Call Bomber', type: 'call', inputKind: 'phone', inputRegex: BD, coinCost: 2, maxRepeat: 60, delayMs: 2000, cooldownSec: 90, dailyLimit: 300, active: true, sortOrder: 2, icon: 'call' },
  { slug: 'mix', name: 'Mix Bomber', type: 'mix', inputKind: 'phone', inputRegex: BD, coinCost: 3, maxRepeat: 150, delayMs: 800, cooldownSec: 120, dailyLimit: 500, active: true, sortOrder: 3, icon: 'mix' },
  { slug: 'email', name: 'Email Bomber', type: 'email', inputKind: 'email', inputRegex: EMAIL, coinCost: 1, maxRepeat: 200, delayMs: 600, cooldownSec: 30, dailyLimit: 2000, active: true, sortOrder: 4, icon: 'email' },
  { slug: 'whatsapp', name: 'WhatsApp Bomber', type: 'whatsapp', inputKind: 'phone', inputRegex: BD, coinCost: 1, maxRepeat: 40, delayMs: 3000, cooldownSec: 120, dailyLimit: 200, active: true, sortOrder: 5, icon: 'whatsapp' },
]

const packs = [
  { code: 'trial', name: 'Trial Pack', price: 0, coins: 50, kind: 'coins', active: true, sortOrder: 0 },
  { code: 'silver', name: 'Silver', price: 50, coins: 500, kind: 'coins', active: true, sortOrder: 1 },
  { code: 'gold', name: 'Gold', price: 100, coins: 1200, kind: 'coins', active: true, sortOrder: 2 },
  { code: 'platinum', name: 'Platinum', price: 200, coins: 3000, kind: 'coins', active: true, sortOrder: 3 },
  { code: 'lic_month', name: 'Monthly License', price: 150, coins: 300, kind: 'license', active: true, sortOrder: 4 },
  { code: 'lic_year', name: 'Yearly License', price: 1200, coins: 5000, kind: 'license', active: true, sortOrder: 5 },
  { code: 'lic_life', name: 'Lifetime License', price: 3000, coins: 20000, kind: 'license', active: true, sortOrder: 6 },
]

const settings = [
  ['trial', { amount: 50 }],
  ['signupOpen', { enabled: true }],
  ['maintenance', { enabled: false, message: '' }],
  ['agreementVersion', { version: '1.1' }],
  ['minAppVersion', { version: 2 }],
]

async function main() {
  const batch = db.batch()
  for (const t of tools) batch.set(db.doc(`tools/${t.slug}`), { ...t, createdAt: Timestamp.now() })
  for (const p of packs) batch.set(db.doc(`packages/${p.code}`), { ...p, createdAt: Timestamp.now() })
  for (const [k, v] of settings) batch.set(db.doc(`settings/${k}`), v)
  batch.set(db.doc('announcements/welcome'), { title: 'BomberMan online', body: 'Trial coin claim koro, tarpor fire.', createdAt: Timestamp.now() })
  batch.set(db.doc('templates/techmster-fbuid'), {
    toolId: 'sms', name: 'techmster fbuid (demo GET)', method: 'GET',
    urlTemplate: 'https://techmster.shop/fbuid/index.php?url=#PLACEHOLDER',
    contentType: 'application/json',
    headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 13) Chrome/124 Mobile Safari/537.36' },
    timeoutMs: 15000, successRegex: '"success":\\s*true', failRegex: '"success":\\s*false',
    priority: 0, weight: 1, active: true, createdAt: Timestamp.now(),
  })
  await batch.commit()

  const email = process.env.ADMIN_EMAIL
  if (email) {
    const snap = await db.collection('users').where('email', '==', email).limit(1).get()
    if (snap.empty) console.log('no user with that email yet — sign in once, then rerun')
    else {
      await snap.docs[0].ref.update({ role: 'admin', coins: FieldValue.increment(1000), trialGranted: true })
      console.log('promoted', email)
    }
  }
  console.log('seed done')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
