import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

const STREAMS = [
  { id:1, name:'CryptoKing', handle:'@cryptoking', category:'Gaming', viewers:14200, emoji:'🎮', color:'#FF6B35', verified:true, tip:'$2.4K earned' },
  { id:2, name:'SoulBeats', handle:'@soulbeats', category:'Music', viewers:8900, emoji:'🎵', color:'#A855F7', verified:true, tip:'$1.1K earned' },
  { id:3, name:'NovaTalk', handle:'@novatalk', category:'Chat', viewers:22100, emoji:'💬', color:'#EC4899', verified:false, tip:'$5.6K earned' },
  { id:4, name:'PixelDrift', handle:'@pixeldrift', category:'Gaming', viewers:6700, emoji:'🕹', color:'#10B981', verified:true, tip:'$800 earned' },
  { id:5, name:'ZenVibes', handle:'@zenvibes', category:'Lifestyle', viewers:3100, emoji:'✨', color:'#F59E0B', verified:false, tip:'$320 earned' },
  { id:6, name:'BeatDropper', handle:'@beatdropper', category:'DJ', viewers:11500, emoji:'🎧', color:'#3B82F6', verified:true, tip:'$3.2K earned' },
]

const CHAT_POOL = [
  { user:'0xAlpha', msg:'LFG 🚀🚀🚀', color:'#00F5A0' },
  { user:'CryptoFan99', msg:'first tip of the night 💎', color:'#A855F7' },
  { user:'WaveRider', msg:'this is insane bro', color:'#FF6B35' },
  { user:'0xBeta', msg:'sent 10 USDC lets gooo', color:'#EC4899' },
  { user:'StreamMax', msg:'way better than twitch fr', color:'#F59E0B' },
  { user:'NightOwl', msg:'no fees = GOAT platform', color:'#10B981' },
  { user:'HodlKing', msg:'ETH tip incoming 👀', color:'#3B82F6' },
  { user:'PixelBro', msg:'0% fees is unreal', color:'#00C2FF' },
  { user:'Anon777', msg:'🔥🔥🔥🔥', color:'#FF3CAC' },
]

const TIPS = [
  { label:'$1', crypto:'0.0004 ETH', icon:'⚡' },
  { label:'$5', crypto:'0.002 ETH', icon:'🔥' },
  { label:'$10', crypto:'0.004 ETH', icon:'💎' },
  { label:'$25', crypto:'0.01 ETH', icon:'🚀' },
  { label:'$50', crypto:'0.02 ETH', icon:'👑' },
  { label:'$100', crypto:'0.04 ETH', icon:'🌟' },
]

const COMPARE = [
  { platform:'LiveOnChain', fee:'0%', crypto:'Yes', pay:'Under 2s', own:'100%', color:'#00F5A0' },
  { platform:'Twitch', fee:'50%', crypto:'No', pay:'14 days', own:'No', color:'#9146FF' },
  { platform:'YouTube', fee:'30%', crypto:'No', pay:'Monthly', own:'No', color:'#FF0000' },
  { platform:'TikTok', fee:'70%', crypto:'No', pay:'Delayed', own:'No', color:'#FF004F' },
  { platform:'Kick', fee:'5%', crypto:'No', pay:'Weekly', own:'No', color:'#53FC18' },
  { platform:'Bigo', fee:'65%', crypto:'No', pay:'Delayed', own:'No', color:'#FF8C00' },
]

export default function Home() {
  const [tab, setTab] = useState('watch')
  const [selected, setSelected] = useState(STREAMS[0])
  const [tipIdx, setTipIdx] = useState(2)
  const [sent, setSent] = useState(false)
  const [cat, setCat] = useState('All')
  const [msgs, setMsgs] = useState([
    { type:'tip', from:'0xAlpha', amount:'$25 ETH', icon:'🚀' },
    { type:'msg', user:'CryptoFan99', msg:'insane stream bro', color:'#A855F7' },
    { type:'msg', user:'WaveRider', msg:'0% fees is unreal', color:'#00F5A0' },
    { type:'tip', from:'HodlKing', amount:'$10 USDC', icon:'💎' },
    { type:'msg', user:'NightOwl', msg:'way better than twitch', color:'#FF6B35' },
  ])
  const chatRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => {
      const pool = CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)]
      const newMsg = Math.random() > 0.7
        ? { type:'tip', from:pool.user, amount:'$' + [5,10,25,50][Math.floor(Math.random()*4)] + ' ETH', icon:['💎','🚀','🔥','👑'][Math.floor(Math.random()*4)] }
        : { type:'msg', user:pool.user, msg:pool.msg, color:pool.color }
      setMsgs(function(m) { return m.slice(-18).concat([newMsg]) })
    }, 2200)
    return function() { clearInterval(t) }
  }, [])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [msgs])

  function sendTip() {
    const t = TIPS[tipIdx]
    setMsgs(function(m) { return m.concat([{ type:'tip', from:'You', amount:t.label + ' ETH', icon:t.icon }]) })
    setSent(true)
    setTimeout(function() { setSent(false) }, 2000)
  }

  const cats = ['All','Gaming','Music','Chat','DJ','Lifestyle']
  const filtered = cat === 'All' ? STREAMS : STREAMS.filter(function(s) { return s.category === cat })

  const bg = '#070810'
  const card = '#111320'
  const surface = '#0C0E1A'
  const border = 'rgba(255,255,255,0.06)'
  const accent = '#00F5A0'
  const muted = '#4A5070'
  const text = '#F0F2FF'
  const live = '#FF3B3B'

  return (
    <>
      <Head>
        <title>LiveOnChain</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #070810; font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .dot { width:6px; height:6px; background:#FF3B3B; border-radius:50%; display:inline-block; animation:pulse 1s infinite; }
        .wdot { width:6px; height:6px; background:#fff; border-radius:50%; display:inline-block; animation:pulse 1s infinite; }
      `}</style>

      <div style={{ fontFamily:"'Inter',sans-serif", background:bg, color:text, height:'100dvh', display:'flex', flexDirection:'column', maxWidth:480, margin:'0 auto', overflow:'hidden' }}>

        {/* NAV */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', background:'rgba(7,8,16,0.97)', borderBottom:'1px solid ' + border, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:live, fontFamily:'monospace' }}>
            <span className="dot" /> 66.5K watching
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <img src="/Screenshot_20260501_180933_Gallery.jpg" alt="icon" style={{ height:28, width:28, objectFit:'contain' }} />
            <img src="/Screenshot_20260501_180946_Gallery.jpg" alt="logo" style={{ height:20, objectFit:'contain' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(0,245,160,0.1)', border:'1px solid rgba(0,245,160,0.25)', borderRadius:20, padding:'6px 10px', fontSize:11, fontFamily:'monospace', color:accent }}>
            🔗 0x7f3...a1b
          </div>
        </div>

        {/* TABS */}
        <div style={{ display:'flex', borderBottom:'1px solid ' + border, flexShrink:0, background:surface }}>
          {[['watch','📺 WATCH'],['discover','🔍 DISCOVER'],['compare','⚡ WHY US']].map(function(item) {
            return (
              <div key={item[0]} onClick={function() { setTab(item[0]) }} style={{ flex:1, padding:'10px 4px', fontSize:11, fontWeight:700, textAlign:'center', cursor:'pointer', borderBottom: tab===item[0] ? '2px solid ' + accent : '2px solid transparent', color: tab===item[0] ? accent : muted }}>
                {item[1]}
              </div>
            )
          })}
        </div>

        {/* WATCH TAB */}
        {tab === 'watch' && (
          <>
            <div style={{ background:'linear-gradient(135deg,' + selected.color + '44,#000)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, position:'relative', height:210, flexShrink:0 }}>
              <span>{selected.emoji}</span>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.2),transparent 30%,rgba(0,0,0,0.7))' }} />
              <div style={{ position:'absolute', top:10, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:2 }}>
                <div style={{ display:'flex', alignItems:'center', gap:5, background:live, borderRadius:6, padding:'3px 8px', fontSize:10, fontWeight:800 }}>
                  <span className="wdot" /> LIVE
                </div>
                <div style={{ background:'rgba(0,0,0,0.75)', borderRadius:6, padding:'3px 8px', fontSize:10, fontFamily:'monospace' }}>
                  👁 {selected.viewers.toLocaleString()}
                </div>
              </div>
              <div style={{ position:'absolute', bottom:10, left:12, right:12, zIndex:2 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:40, height:40, borderRadius:'50%', background:selected.color + '33', border:'2px solid ' + accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{selected.emoji}</div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:800 }}>{selected.name}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', fontFamily:'monospace' }}>{selected.category} · {selected.tip}</div>
                  </div>
                  <button onClick={function(){}} style={{ marginLeft:'auto', background:accent, color:'#000', border:'none', borderRadius:8, padding:'7px 16px', fontWeight:800, fontSize:12, cursor:'pointer' }}>+ Follow</button>
                </div>
              </div>
            </div>

            <div style={{ padding:'10px 16px 6px', fontSize:11, fontWeight:700, color:muted, letterSpacing:'1px', display:'flex', justifyContent:'space-between' }}>
              <span>🔴 LIVE NOW</span><span style={{ color:live }}>{STREAMS.length} streams</span>
            </div>
            <div style={{ display:'flex', gap:10, padding:'0 16px 10px', overflowX:'auto' }}>
              {STREAMS.map(function(s) {
                return (
                  <div key={s.id} onClick={function() { setSelected(s) }} style={{ flexShrink:0, width:130, background:card, border:'1px solid ' + (selected.id===s.id ? s.color : border), borderRadius:14, overflow:'hidden', cursor:'pointer' }}>
                    <div style={{ height:80, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, position:'relative', background:'linear-gradient(135deg,' + s.color + '22,#000)' }}>
                      {s.emoji}
                      <div style={{ position:'absolute', top:5, left:5, background:live, borderRadius:4, padding:'1px 5px', fontSize:8, fontWeight:800 }}>LIVE</div>
                      <div style={{ position:'absolute', bottom:5, right:5, background:'rgba(0,0,0,0.7)', borderRadius:4, padding:'1px 5px', fontSize:8, fontFamily:'monospace' }}>👁{(s.viewers/1000).toFixed(1)}K</div>
                    </div>
                    <div style={{ padding:'7px 8px 8px' }}>
                      <div style={{ fontSize:12, fontWeight:700 }}>{s.name}</div>
                      <div style={{ fontSize:9, color:muted, fontFamily:'monospace' }}>{s.category}</div>
                      <div style={{ fontSize:9, color:accent, marginTop:3, fontFamily:'monospace' }}>{s.tip}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' }}>
              <div ref={chatRef} style={{ flex:1, overflowY:'auto', padding:'10px 14px', display:'flex', flexDirection:'column', gap:7 }}>
                {msgs.map(function(m, i) {
                  if (m.type === 'tip') {
                    return (
                      <div key={i} style={{ background:'linear-gradient(90deg,rgba(0,245,160,0.08),rgba(0,194,255,0.08))', border:'1px solid rgba(0,245,160,0.15)', borderRadius:10, padding:'8px 12px', display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:20 }}>{m.icon}</span>
                        <div>
                          <div style={{ fontFamily:'monospace', fontSize:14, fontWeight:700, color:accent }}>{m.amount}</div>
                          <div style={{ fontSize:10, color:muted }}>from {m.from} · 0% fee · wallet-to-wallet</div>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div key={i} style={{ display:'flex', gap:6, alignItems:'flex-start' }}>
                      <span style={{ fontSize:11, fontWeight:700, color:m.color, whiteSpace:'nowrap' }}>{m.user}</span>
                      <span style={{ fontSize:12, color:'rgba(240,242,255,0.85)' }}>{m.msg}</span>
                    </div>
                  )
                })}
              </div>
              <div style={{ padding:'10px 14px 12px', borderTop:'1px solid ' + border, background:surface, flexShrink:0 }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:5, marginBottom:8 }}>
                  {TIPS.map(function(t, i) {
                    return (
                      <div key={i} onClick={function() { setTipIdx(i) }} style={{ background: tipIdx===i ? 'rgba(0,245,160,0.12)' : card, border: tipIdx===i ? '1px solid ' + accent : '1px solid ' + border, color: tipIdx===i ? accent : text, borderRadius:8, padding:'5px 2px', fontSize:10, fontWeight:700, cursor:'pointer', textAlign:'center' }}>
                        <div>{t.icon} {t.label}</div>
                        <div style={{ fontSize:8, color:muted, fontFamily:'monospace' }}>{t.crypto}</div>
                      </div>
                    )
                  })}
                </div>
                <button onClick={sendTip} style={{ width:'100%', background:'linear-gradient(135deg,#FF3CAC,#7C3AED,#00F5A0)', border:'none', borderRadius:12, padding:13, color:'#fff', fontWeight:900, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  {sent ? '✅ Sent Instantly!' : '💸 Send ' + TIPS[tipIdx].label + ' · 0% fee · wallet-to-wallet'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* DISCOVER TAB */}
        {tab === 'discover' && (
          <div style={{ flex:1, overflowY:'auto' }}>
            <div style={{ display:'flex', gap:7, padding:'12px 16px', overflowX:'auto' }}>
              {cats.map(function(c) {
                return (
                  <div key={c} onClick={function() { setCat(c) }} style={{ flexShrink:0, background: cat===c ? 'rgba(0,245,160,0.12)' : card, border: cat===c ? '1px solid ' + accent : '1px solid ' + border, color: cat===c ? accent : text, borderRadius:20, padding:'6px 14px', fontSize:11, fontWeight:600, cursor:'pointer' }}>{c}</div>
                )
              })}
            </div>
            <div style={{ padding:'0 14px 6px', fontSize:11, fontWeight:700, color:muted }}>🔴 {filtered.length} LIVE</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, padding:'0 14px 20px' }}>
              {filtered.map(function(s) {
                return (
                  <div key={s.id} onClick={function() { setSelected(s); setTab('watch') }} style={{ background:card, border:'1px solid ' + border, borderRadius:16, overflow:'hidden', cursor:'pointer' }}>
                    <div style={{ height:100, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, position:'relative', background:'linear-gradient(135deg,' + s.color + '33,#000)' }}>
                      {s.emoji}
                      <div style={{ position:'absolute', top:5, left:5, background:live, borderRadius:4, padding:'1px 5px', fontSize:8, fontWeight:800 }}>LIVE</div>
                      <div style={{ position:'absolute', bottom:5, right:5, background:'rgba(0,0,0,0.7)', borderRadius:4, padding:'1px 5px', fontSize:8, fontFamily:'monospace' }}>👁{(s.viewers/1000).toFixed(1)}K</div>
                    </div>
                    <div style={{ padding:'8px 10px 10px' }}>
                      <div style={{ fontSize:13, fontWeight:700 }}>{s.name}</div>
                      <div style={{ fontSize:9, color:muted, fontFamily:'monospace', marginTop:2 }}>{s.handle} · {s.category}</div>
                      <div style={{ fontSize:9, color:accent, background:'rgba(0,245,160,0.08)', borderRadius:5, padding:'2px 6px', display:'inline-block', marginTop:5, fontFamily:'monospace' }}>{s.tip}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* COMPARE TAB */}
        {tab === 'compare' && (
          <div style={{ flex:1, overflowY:'auto', padding:16 }}>
            <div style={{ fontSize:20, fontWeight:900, marginBottom:4 }}>Why LiveOnChain?</div>
            <div style={{ fontSize:11, color:muted, fontFamily:'monospace', marginBottom:16 }}>Only platform where creators keep 100%.</div>
            <div style={{ borderRadius:16, overflow:'hidden', border:'1px solid ' + border }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 0.6fr 0.6fr 0.8fr 0.7fr', background:card, padding:'10px 12px', gap:4 }}>
                {['Platform','Fee','Crypto','Payment','Yours'].map(function(h) {
                  return <span key={h} style={{ fontSize:9, fontWeight:700, color:muted, textTransform:'uppercase', letterSpacing:'0.5px' }}>{h}</span>
                })}
              </div>
              {COMPARE.map(function(c, i) {
                return (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 0.6fr 0.6fr 0.8fr 0.7fr', padding:'12px', gap:4, borderTop:'1px solid ' + border, background: i===0 ? 'rgba(0,245,160,0.05)' : 'transparent', alignItems:'center' }}>
                    <div style={{ fontSize:12, fontWeight:700, color: i===0 ? accent : text }}>{c.platform}{i===0 ? ' ⛓' : ''}</div>
                    <div style={{ fontSize:12, fontWeight:800, color: i===0 ? accent : '#FF6B6B' }}>{c.fee}</div>
                    <div style={{ fontSize:11, color: i===0 ? accent : '#FF6B6B' }}>{c.crypto}</div>
                    <div style={{ fontSize:9, fontFamily:'monospace', color: i===0 ? accent : '#FF6B6B' }}>{c.pay}</div>
                    <div style={{ fontSize:11, color: i===0 ? accent : '#FF6B6B' }}>{c.own}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:10 }}>
              {[
                ['💸','0% Platform Fee','Every dollar goes straight to your crypto wallet. No cuts ever.'],
                ['⚡','Under 2 Second Tips','Tips hit your wallet instantly via smart contracts.'],
                ['🔐','You Own Everything','Your content, your wallet, your earnings. Always.'],
                ['🌍','Any Crypto','Accept ETH, USDC, SOL and more from viewers worldwide.'],
              ].map(function(item, i) {
                return (
                  <div key={i} style={{ background:card, border:'1px solid ' + border, borderRadius:16, padding:16, display:'flex', gap:14 }}>
                    <span style={{ fontSize:28, flexShrink:0 }}>{item[0]}</span>
                    <div>
                      <div style={{ fontSize:14, fontWeight:800, marginBottom:4 }}>{item[1]}</div>
                      <div style={{ fontSize:11, color:muted, lineHeight:1.5, fontFamily:'monospace' }}>{item[2]}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* BOTTOM NAV */}
        <div style={{ display:'flex', background:'rgba(7,8,16,0.96)', borderTop:'1px solid ' + border, flexShrink:0 }}>
          {[['watch','📺','WATCH'],['discover','🔍','DISCOVER'],null,['compare','⚡','WHY US'],['profile','👤','PROFILE']].map(function(item, i) {
            if (item === null) {
              return (
                <div key={i} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <button style={{ background:'linear-gradient(135deg,#FF3CAC,#7C3AED,#00F5A0)', borderRadius:'50%', width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginTop:-12, border:'none', cursor:'pointer' }}>🔴</button>
                </div>
              )
            }
            return (
              <button key={i} onClick={function() { setTab(item[0]) }} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'10px 4px', background:'none', border:'none', color: tab===item[0] ? accent : text, opacity: tab===item[0] ? 1 : 0.4, cursor:'pointer' }}>
                <span style={{ fontSize:20 }}>{item[1]}</span>
                <span style={{ fontSize:9, fontWeight:700 }}>{item[2]}</span>
              </button>
            )
          })}
        </div>

      </div>
    </>
  )
  }
