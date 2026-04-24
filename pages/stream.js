import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Stream() {
  const [tips, setTips] = useState(3.42)
  const [tipCount, setTipCount] = useState(84)
  const [viewers, setViewers] = useState(2847)
  const [coin, setCoin] = useState('ETH')
  const [amount, setAmount] = useState('0.01')
  const [message, setMessage] = useState('')
  const [showTip, setShowTip] = useState(false)
  const [toasts, setToasts] = useState([])
  const [chat, setChat] = useState([
    { user: 'CryptoWhale', text: 'Absolute banger stream!', color: '#00f5a0', emoji: '🐋' },
    { user: 'SatoshiFan', text: 'Love tipping directly to your wallet!', color: '#00c8ff', emoji: '🎯' },
    { user: 'BlockchainBob', text: 'No more 30% cut to platforms lol', color: '#ff6b35', emoji: '🤖' },
    { user: 'NFTNancy', text: 'This is the future of creator economy', color: '#9b59b6', emoji: '🎨' },
  ])

  const autoMessages = [
    { user: 'eth_maxi', text: 'LETS GOOOO', color: '#e74c3c', emoji: '🔴' },
    { user: 'defi_king', text: 'tipped and worth it!', color: '#2ecc71', emoji: '💚' },
    { user: 'moonboy99', text: 'W W W W', color: '#9b59b6', emoji: '💜' },
    { user: 'chain_surfer', text: 'never leaving this stream', color: '#e67e22', emoji: '🧡' },
  ]

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      const msg = autoMessages[i % autoMessages.length]
      setChat(c => [...c.slice(-20), msg])
      setViewers(v => Math.max(2500, v + Math.floor(Math.random() * 10) - 4))
      i++
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const addToast = (msg) => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }

  const sendTip = () => {
    const amt = parseFloat(amount) || 0.01

    setTips(t => parseFloat((t + amt).toFixed(3)))
    setTipCount(t => t + 1)
    setChat(c => [
      ...c.slice(-20),
      {
        user: 'You',
        text: message || 'Amazing stream!',
        color: '#00f5a0',
        emoji: '✨',
      },
    ])

    setMessage('')
    setShowTip(false)
    addToast(`Tip sent! ${amt} ${coin}`)
  }

  return (
    <>
      <Head>
        <title>CryptoBeats Live — LiveOnChain</title>
      </Head>

      <div style={page}>
        <nav style={nav}>
          <Link href="/">
            <div style={logo}>LiveOnChain</div>
          </Link>
          <div style={walletBadge}>0x7f3a...c91b</div>
        </nav>

        <main style={main}>
          <section style={videoBox}>
            <div style={videoBg}>
              <div style={waveWrap}>
                {[20, 40, 60, 80, 100, 80, 60, 40, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 4,
                      height: h,
                      background: 'var(--accent)',
                      borderRadius: 3,
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={liveBadge}>LIVE</div>
            <div style={viewerBadge}>{viewers.toLocaleString()} viewers</div>
          </section>

          <section style={streamInfo}>
            <div>
              <div style={title}>CryptoBeats Live</div>
              <div style={subText}>0x9a4f...b72c</div>
            </div>

            <div style={stats}>
              <div style={statItem}>
                <div style={statValue}>{tips.toFixed(2)}</div>
                <div style={statLabel}>ETH</div>
              </div>

              <div style={statItem}>
                <div style={statValue}>{tipCount}</div>
                <div style={statLabel}>Tips</div>
              </div>

              <div style={statItem}>
                <div style={statValue}>100%</div>
                <div style={statLabel}>Kept</div>
              </div>
            </div>
          </section>

          <section style={chatArea}>
            {chat.map((m, i) => (
              <div key={i} style={chatMsg}>
                <div style={avatar}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.color }}>
                    {m.user}
                  </div>
                  <div style={{ fontSize: 13 }}>{m.text}</div>
                </div>
              </div>
            ))}
          </section>

          <section style={chatInput}>
            <input
              style={input}
              placeholder="Say something..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </section>
        </main>

        <button style={floatingTipBtn} onClick={() => setShowTip(true)}>
          💸 Tip
        </button>

        {showTip && (
          <div style={overlay} onClick={() => setShowTip(false)}>
            <div style={tipSheet} onClick={e => e.stopPropagation()}>
              <div style={sheetHandle}></div>

              <div style={sheetHeader}>
                <div>
                  <div style={sheetTitle}>Send Tip</div>
                  <div style={subText}>100% goes to creator</div>
                </div>

                <button style={closeBtn} onClick={() => setShowTip(false)}>
                  ✕
                </button>
              </div>

              <div style={coinGrid}>
                {['ETH', 'SOL', 'USDC'].map(c => (
                  <button
                    key={c}
                    style={{
                      ...choiceBtn,
                      ...(coin === c ? activeChoice : {}),
                    }}
                    onClick={() => setCoin(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div style={amountGrid}>
                {['0.001', '0.01', '0.05', '0.1'].map(a => (
                  <button
                    key={a}
                    style={{
                      ...choiceBtn,
                      ...(amount === a ? activeAmount : {}),
                    }}
                    onClick={() => setAmount(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>

              <input
                style={input}
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Custom amount"
              />

              <textarea
                style={{ ...input, height: 70, resize: 'none' }}
                placeholder="Message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />

              <button style={sendButton} onClick={sendTip}>
                Send Tip
              </button>
            </div>
          </div>
        )}

        <div style={toastBox}>
          {toasts.map(t => (
            <div key={t.id} style={toast}>
              {t.msg}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const page = {
  minHeight: '100vh',
  background: 'var(--bg)',
  color: 'var(--text)',
  overflowX: 'hidden',
}

const nav = {
  height: 58,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 14px',
  borderBottom: '1px solid var(--border)',
  background: 'rgba(8,12,20,0.95)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}

const logo = {
  fontFamily: 'var(--font-mono)',
  fontSize: 16,
  fontWeight: 700,
  color: 'var(--accent)',
  cursor: 'pointer',
}

const walletBadge = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: 'var(--accent2)',
  background: 'rgba(0,200,255,0.08)',
  border: '1px solid rgba(0,200,255,0.2)',
  padding: '6px 8px',
  borderRadius: 6,
}

const main = {
  width: '100%',
  paddingBottom: 90,
}

const videoBox = {
  width: '100%',
  position: 'relative',
  background: '#000',
  aspectRatio: '9 / 12',
  overflow: 'hidden',
}

const videoBg = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg,#0a1628,#0d2040)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const waveWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}

const liveBadge = {
  position: 'absolute',
  top: 14,
  left: 14,
  background: 'var(--danger)',
  color: '#fff',
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  fontWeight: 700,
  padding: '5px 10px',
  borderRadius: 4,
}

const viewerBadge = {
  position: 'absolute',
  top: 14,
  right: 14,
  background: 'rgba(0,0,0,0.65)',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  padding: '5px 10px',
  borderRadius: 4,
}

const streamInfo = {
  padding: '14px',
  borderBottom: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  background: 'var(--surface)',
}

const title = {
  fontSize: 16,
  fontWeight: 700,
}

const subText = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: 'var(--muted)',
}

const stats = {
  display: 'flex',
  gap: 14,
}

const statItem = {
  textAlign: 'center',
}

const statValue = {
  fontFamily: 'var(--font-mono)',
  fontSize: 15,
  fontWeight: 700,
  color: 'var(--accent)',
}

const statLabel = {
  fontSize: 9,
  color: 'var(--muted)',
}

const chatArea = {
  maxHeight: 260,
  overflowY: 'auto',
  padding: 14,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const chatMsg = {
  display: 'flex',
  gap: 8,
  alignItems: 'flex-start',
}

const avatar = {
  width: 26,
  height: 26,
  borderRadius: '50%',
  background: '#ffffff22',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  flexShrink: 0,
}

const chatInput = {
  padding: '12px 14px',
  borderTop: '1px solid var(--border)',
  background: 'var(--surface)',
}

const input = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '12px',
  borderRadius: 10,
  fontSize: 14,
  outline: 'none',
}

const floatingTipBtn = {
  position: 'fixed',
  bottom: 22,
  right: 18,
  zIndex: 300,
  background: 'var(--accent)',
  color: '#000',
  border: 'none',
  padding: '14px 20px',
  borderRadius: 999,
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  fontWeight: 800,
  boxShadow: '0 8px 24px rgba(0,245,160,0.35)',
}

const overlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.65)',
  zIndex: 500,
  display: 'flex',
  alignItems: 'flex-end',
}

const tipSheet = {
  width: '100%',
  background: 'var(--surface)',
  borderTop: '1px solid var(--border)',
  borderTopLeftRadius: 22,
  borderTopRightRadius: 22,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const sheetHandle = {
  width: 42,
  height: 4,
  background: 'var(--muted)',
  borderRadius: 999,
  margin: '0 auto 6px',
  opacity: 0.55,
}

const sheetHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const sheetTitle = {
  fontSize: 18,
  fontWeight: 800,
}

const closeBtn = {
  background: 'var(--surface2)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  width: 34,
  height: 34,
  borderRadius: 999,
}

const coinGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 8,
}

const amountGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 8,
}

const choiceBtn = {
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '12px 8px',
  borderRadius: 10,
  cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
}

const activeChoice = {
  borderColor: 'var(--accent2)',
  color: 'var(--accent2)',
}

const activeAmount = {
  borderColor: 'var(--accent)',
  color: 'var(--accent)',
}

const sendButton = {
  width: '100%',
  background: 'var(--accent)',
  color: '#000',
  border: 'none',
  padding: 16,
  borderRadius: 12,
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  fontWeight: 800,
}

const toastBox = {
  position: 'fixed',
  top: 70,
  right: 14,
  zIndex: 900,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const toast = {
  background: 'var(--surface2)',
  border: '1px solid var(--accent)',
  borderRadius: 8,
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--accent)',
}