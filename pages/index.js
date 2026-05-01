import Head from 'next/head'
import { useState, useEffect, useRef } = from 'react'

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
  { user:'0xBeta', msg:'sent 10 USDC let\'s gooo', color:'#EC4899' },
  { user:'StreamMax', msg:'way better than twitch fr', color:'#F59E0B' },
  { user:'NightOwl', msg:'no fees = GOAT platform 🐐', color:'#10B981' },
  { user:'HodlKing', msg:'ETH tip incoming 👀', color:'#3B82F6' },
  { user:'PixelBro', msg:'0% fees is unreal', color:'#00C2FF' },
  { user:'Anon777', msg:'🔥🔥🔥🔥', color:'#FF3CAC' },
]

const TIP_TOKENS = [
  { label:'$1', crypto:'0.0004 ETH', icon:'⚡' },
  { label:'$5', crypto:'0.002 ETH', icon:'🔥' },
  { label:'$10', crypto:'0.004 ETH', icon:'💎' },
  { label:'$25', crypto:'0.01 ETH', icon:'🚀' },
  { label:'$50', crypto:'0.02 ETH', icon:'👑' },
  { label:'$100', crypto:'0.04 ETH', icon:'🌟' },
]

const COMPARE = [
  { platform:'LiveOnChain', fee:'0%', crypto:'✅', instant:'✅ <2s', own:'✅ 100%', color:'#00F5A0' },
  { platform:'Twitch', fee:'50%', crypto:'❌', instant:'❌ 14 days', own:'❌', color:'#9146FF' },
  { platform:'YouTube', fee:'30%', crypto:'❌', instant:'❌ Monthly', own:'❌', color:'#FF0000' },
  { platform:'TikTok', fee:'70%', crypto:'❌', instant:'❌ Delayed', own:'❌', color:'#FF004F' },
  { platform:'Kick', fee:'5%', crypto:'❌', instant:'❌ Weekly', own:'❌', color:'#53FC18' },
  { platform:'Bigo Live', fee:'65%', crypto:'❌', instant:'❌ Delayed', own:'❌', color:'#FF8C00' },
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
        ? { type:'tip', from:pool.user, amount:`$${[5,10,25,50][Math.floor(Math.random()*4)]} ETH`, icon:['💎','🚀','🔥','👑'][Math.floor(Math.random()*4)] }
        : { type:'msg', user:pool.user, msg:pool.msg, color:pool.color }
      setMsgs(m => [...m.slice(-18), newMsg])
    }, 2200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [msgs])

  function sendTip() {
    const t = TIP_TOKENS[tipIdx]
    setMsgs(m => [...m, { type:'tip', from:'You', amount:`${t.label} ETH`, icon:t.icon }])
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  const cats = ['All','Gaming','Music','Chat','DJ','Lifestyle']
  const filtered = cat === 'All' ? STREAMS : STREAMS.filter(s => s.category === cat)

  const S = {
    app:{ fontFamily:"'Inter',sans-serif", background:'#070810', color:'#F0F2FF', height:'100dvh', display:'flex', flexDirection:'column', maxWidth:480, margin:'0 auto', overflow:'hidden' },
    topnav:{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'rgba(7,8,16,0.95)', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0 },
    logo:{ fontSize:17, fontWeight:900, background:'linear-gradient(90deg,#00F5A0,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },
    walletBtn:{ display:'flex', alignItems:'center', gap:6, background:'rgba(0,245,160,0.1)', border:'1px solid rgba(0,245,160,0.25)', borderRadius:20, padding:'6px 12px', fontSize:11, fontFamily:'monospace', color:'#00F5A0', cursor:'pointer' },
    liveCount:{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#FF3B3B', fontFamily:'monospace' },
    tabs:{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0, background:'#0C0E1A' },
    tab:{ flex:1, padding:'10px 4px', fontSize:11, fontWeight:700, textAlign:'center', cursor:'pointer', borderBottom:'2px solid transparent', color:'#4A5070', letterSpacing:'0.3px' },
    tabActive:{ flex:1, padding:'10px 4px', fontSize:11, fontWeight:700, textAlign:'center', cursor:'pointer', borderBottom:'2px solid #00F5A0', color:'#00F5A0', letterSpacing:'0.3px' },
    scroll:{ flex:1, overflowY:'auto', overflowX:'hidden' },
    heroPlayer:{ background:'#000', display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, position:'relative', height:210, flexShrink:0 },
    heroOverlay:{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.2),transparent 30%,rgba(0,0,0,0.7))' },
    heroTop:{ position:'absolute', top:10, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:2 },
    livePill:{ display:'flex', alignItems:'center', gap:5, background:'#FF3B3B', borderRadius:6, padding:'3px 8px', fontSize:10, fontWeight:800 },
    viewersPill:{ background:'rgba(0,0,0,0.75)', borderRadius:6, padding:'3px 8px', fontSize:10, fontFamily:'monospace' },
    heroBottom:{ position:'absolute', bottom:10, left:12, right:12, zIndex:2 },
    creatorRow:{ display:'flex', alignItems:'center', gap:10 },
    followBtn:{ marginLeft:'auto', background:'#00F5A0', color:'#000', border:'none', borderRadius:8, padding:'7px 16px', fontWeight:800, fontSize:12, cursor:'pointer', flexShrink:0 },
    sectionLabel:{ padding:'12px 16px 8px', fontSize:11, fontWeight:700, color:'#4A5070', letterSpacing:'1px', textTransform:'uppercase', display:'flex', justifyContent:'space-between' },
    streamScroll:{ display:'flex', gap:10, padding:'0 16px 12px', overflowX:'auto' },
    streamCard:{ flexShrink:0, width:130, background:'#111320', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden', cursor:'pointer' },
    chatWrap:{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' },
    chatMsgs:{ flex:1, overflowY:'auto', padding:'10px 14px', display:'flex', flexDirection:'column', gap:7 },
    tipEvent:{ background:'linear-gradient(90deg,rgba(0,245,160,0.08),rgba(0,194,255,0.08))', border:'1px solid rgba(0,245,160,0.15)', borderRadius:10, padding:'8px 12px', display:'flex', alignItems:'center', gap:10 },
    tipBar:{ padding:'10px 14px 12px', borderTop:'1px solid rgba(255,255,255,0.06)', background:'#0C0E1A', flexShrink:0 },
    tipGrid:{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:5, marginBottom:8 },
    sendBtn:{ width:'100%', background:'linear-gradient(135deg,#FF3CAC,#7C3AED,#00F5A0)', border:'none', borderRadius:12, padding:13, color:'#fff', fontWeight:900, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 },
    grid2:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, padding:'0 14px' },
    compareTable:{ borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)' },
    compareHead:{ display:'grid', gridTemplateColumns:'1fr 0.6fr 0.6fr 1fr 0.8fr', background:'#111320', padding:'10px 12px', gap:4 },
    compareRow:{ display:'grid', gridTemplateColumns:'1fr 0.6fr 0.6fr 1fr 0.8fr', padding:'12px', gap:4, borderTop:'1px solid rgba(255,255,255,0.06)', alignItems:'center' },
    bottomNav:{ display:'flex', background:'rgba(7,8,16,0.96)', borderTop:'1px solid rgba(255,255,255,0.06)', flexShrink:0 },
    navBtn:{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'10px 4px', cursor:'pointer', background:'none', border:'none', color:'#F0F2FF' },
    goLiveNav:{ background:'linear-gradient(135deg,#FF3CAC,#7C3AED,#00F5A0)', borderRadius:'50%', width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginTop:-12, border:'none', cursor:'pointer' },
  }

  return (
    <>
      <Head>
        <title>LiveOnChain — Web3 Live Streaming</title>
        <meta name="description" content="Stream live. Keep 100%. Wallet-to-wallet tips, 0% platform fee." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;} body{background:#070810;} ::-webkit-scrollbar{display:none;} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>

      <div style={S.app}>
        {/* TOP NAV */}
        <div style={S.topnav}>
          <div style={S.liveCount}><span style={{width:6,height:6,background:'#FF3B3B',borderRadius:'50%',display:'inline-block',animation:'pulse 1s infinite'}}/>66,500 watching</div>
          <div style={S.logo}>LiveOnChain</div>
          <div style={S.walletBtn}>🔗 0x7f3...a1b</div>
        </div>

        {/* TABS */}
        <div style={S.tabs}>
          {[['watch','📺 WATCH'],['discover','🔍 DISCOVER'],['compare','⚡ WHY US']].map(([id,lb])=>(
            <div key={id} style={tab===id?S.tabActive:S.tab} onClick={()=>setTab(id)}>{lb}</div>
          ))}
        </div>

        {/* ===== WATCH ===== */}
        {tab==='watch' && <>
          <div style={{...S.heroPlayer, background:`linear-gradient(135deg,${selected.color}44,#000)`}}>
            <span style={{fontSize:80}}>{selected.emoji}</span>
            <div style={S.heroOverlay}/>
            <div style={S.heroTop}>
              <div style={S.livePill}><span style={{width:6,height:6,background:'#fff',borderRadius:'50%',animation:'pulse 1s infinite'}}/>LIVE</div>
              <div style={S.viewersPill}>👁 {selected.viewers.toLocaleString()}</div>
            </div>
            <div style={S.heroBottom}>
              <div style={S.creatorRow}>
                <div style={{width:40,height:40,borderRadius:'50%',background:`${selected.color}33`,border:'2px solid #00F5A0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{selected.emoji}</div>
                <div>
                  <div style={{fontSize:15,fontWeight:800}}>{selected.name} {selected.verified?'✓':''}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.6)',fontFamily:'monospace'}}>{selected.category} · {selected.tip}</div>
                </div>
                <button style={S.followBtn}>+ Follow</button>
              </div>
            </div>
          </div>

          <div style={S.sectionLabel}><span>🔴 LIVE NOW</span><span style={{color:'#FF3B3B'}}>{STREAMS.length} streams</span></div>
          <div style={S.streamScroll}>
            {STREAMS.map(s=>(
              <div key={s.id} style={{...S.streamCard,borderColor:selected.id===s.id?s.color:'rgba(255,255,255,0.06)'}} onClick={()=>setSelected(s)}>
                <div style={{height:80,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,position:'relative',background:`linear-gradient(135deg,${s.color}22,#000)`}}>
                  {s.emoji}
                  <div style={{position:'absolute',top:5,left:5,background:'#FF3B3B',borderRadius:4,padding:'1px 5px',fontSize:8,fontWeight:800}}>LIVE</div>
                  <div style={{position:'absolute',bottom:5,right:5,background:'rgba(0,0,0,0.7)',borderRadius:4,padding:'1px 5px',fontSize:8,fontFamily:'monospace'}}>👁{(s.viewers/1000).toFixed(1)}K</div>
                </div>
                <div style={{padding:'7px 8px 8px'}}>
                  <div style={{fontSize:12,fontWeight:700}}>{s.name}</div>
                  <div style={{fontSize:9,color:'#4A5070',fontFamily:'monospace'}}>{s.category}</div>
                  <div style={{fontSize:9,color:'#00F5A0',marginTop:3,fontFamily:'monospace'}}>{s.tip}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={S.chatWrap}>
            <div style={S.chatMsgs} ref={chatRef}>
              {msgs.map((m,i)=> m.type==='tip' ? (
                <div key={i} style={S.tipEvent}>
                  <span style={{fontSize:20}}>{m.icon}</span>
                  <div>
                    <div style={{fontFamily:'monospace',fontSize:14,fontWeight:700,color:'#00F5A0'}}>{m.amount}</div>
                    <div style={{fontSize:10,color:'#4A5070'}}>from {m.from} · 0% fee · wallet-to-wallet</div>
                  </div>
                </div>
              ):(
                <div key={i} style={{display:'flex',gap:6,alignItems:'flex-start'}}>
                  <span style={{fontSize:11,fontWeight:700,color:m.color,whiteSpace:'nowrap'}}>{m.user}</span>
                  <span style={{fontSize:12,color:'rgba(240,242,255,0.85)'}}>{m.msg}</span>
                </div>
              ))}
            </div>
            <div style={S.tipBar}>
              <div style={S.tipGrid}>
                {TIP_TOKENS.map((t,i)=>(
                  <div key={i} onClick={()=>setTipIdx(i)} style={{background:tipIdx===i?'rgba(0,245,160,0.12)':'#111320',border:tipIdx===i?'1px solid #00F5A0':'1px solid rgba(255,255,255,0.06)',color:tipIdx===i?'#00F5A0':'#F0F2FF',borderRadius:8,padding:'5px 2px',fontSize:10,fontWeight:700,cursor:'pointer',textAlign:'center'}}>
                    <div>{t.icon} {t.label}</div>
                    <div style={{fontSize:8,color:'#4A5070',fontFamily:'monospace'}}>{t.crypto}</div>
                  </div>
                ))}
              </div>
              <button style={S.sendBtn} onClick={sendTip}>
                {sent ? '✅ Sent Instantly!' : <>💸 Send {TIP_TOKENS[tipIdx].label} <span style={{fontSize:9,opacity:0.65,fontWeight:400,fontFamily:'monospace'}}>· 0% fee · &lt;2s</span></>}
              </button>
            </div>
          </div>
        </>}

        {/* ===== DISCOVER ===== */}
        {tab==='discover' && <div style={S.scroll}>
          <div style={{display:'flex',gap:7,padding:'12px 16px',overflowX:'auto'}}>
            {cats.map(c=>(
              <div key={c} onClick={()=>setCat(c)} style={{flexShrink:0,background:cat===c?'rgba(0,245,160,0.12)':'#111320',border:cat===c?'1px solid #00F5A0':'1px solid rgba(255,255,255,0.06)',color:cat===c?'#00F5A0':'#F0F2FF',borderRadius:20,padding:'6px 14px',fontSize:11,fontWeight:600,cursor:'pointer'}}>{c}</div>
            ))}
          </div>
          <div style={S.sectionLabel}><span>🔴 {filtered.length} LIVE</span></div>
          <div style={S.grid2}>
            {filtered.map(s=>(
              <div key={s.id} onClick={()=>{setSelected(s);setTab('watch')}} style={{background:'#111320',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,overflow:'hidden',cursor:'pointer'}}>
                <div style={{height:100,display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,position:'relative',background:`linear-gradient(135deg,${s.color}33,#000)`}}>
                  {s.emoji}
                  <div style={{position:'absolute',top:5,left:5,background:'#FF3B3B',borderRadius:4,padding:'1px 5px',fontSize:8,fontWeight:800}}>LIVE</div>
                  <div style={{position:'absolute',bottom:5,right:5,background:'rgba(0,0,0,0.7)',borderRadius:4,padding:'1px 5px',fontSize:8,fontFamily:'monospace'}}>👁{(s.viewers/1000).toFixed(1)}K</div>
                </div>
                <div style={{padding:'8px 10px 10px'}}>
                  <div style={{fontSize:13,fontWeight:700}}>{s.name}</div>
                  <div style={{fontSize:9,color:'#4A5070',fontFamily:'monospace',marginTop:2}}>{s.handle} · {s.category}</div>
                  <div style={{fontSize:9,color:'#00F5A0',background:'rgba(0,245,160,0.08)',borderRadius:5,padding:'2px 6px',display:'inline-block',marginTop:5,fontFamily:'monospace'}}>{s.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* ===== COMPARE ===== */}
        {tab==='compare' && <div style={S.scroll}>
          <div style={{padding:16}}>
            <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>Why LiveOnChain?</div>
            <div style={{fontSize:11,color:'#4A5070',fontFamily:'monospace',marginBottom:16}}>The only platform where creators keep 100%.</div>
            <div style={S.compareTable}>
              <div style={S.compareHead}>
                {['Platform','Fee','Crypto','Payment','Yours'].map(h=>(
                  <span key={h} style={{fontSize:9,fontWeight:700,color:'#4A5070',textTransform:'uppercase',letterSpacing:'0.5px'}}>{h}</span>
                ))}
              </div>
              {COMPARE.map((c,i)=>(
                <div key={i} style={{...S.compareRow,background:i===0?'rgba(0,245,160,0.05)':'transparent'}}>
                  <div style={{fontSize:12,fontWeight:700,color:i===0?c.color:''}}>{c.platform}{i===0?' ⛓':''}</div>
                  <div style={{fontSize:12,fontWeight:800,color:i===0?'#00F5A0':'#FF6B6B'}}>{c.fee}</div>
                  <div style={{fontSize:11,color:c.crypto.includes('✅')?'#00F5A0':'#FF6B6B'}}>{c.crypto}</div>
                  <div style={{fontSize:9,fontFamily:'monospace',color:c.instant.includes('✅')?'#00F5A0':'#FF6B6B'}}>{c.instant}</div>
                  <div style={{fontSize:11,color:c.own.includes('✅')?'#00F5A0':'#FF6B6B'}}>{c.own}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:10}}>
              {[
                ['💸','0% Platform Fee','Every dollar goes straight to your crypto wallet. No cuts, no delays.'],
                ['⚡','Sub-2 Second Tips','Tips hit your wallet instantly via smart contracts.'],
                ['🔐','You Own Everything','Your content, your wallet, your earnings.'],
                ['🌍','Any Crypto','Accept ETH, USDC, SOL and more from viewers worldwide.'],
              ].map(([icon,title,desc],i)=>(
                <div key={i} style={{background:'#111320',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:16,display:'flex',gap:14}}>
                  <span style={{fontSize:28,flexShrink:0}}>{icon}</span>
                  <div>
                    <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>{title}</div>
                    <div style={{fontSize:11,color:'#4A5070',lineHeight:1.5,fontFamily:'monospace'}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}

        {/* BOTTOM NAV */}
        <div style={S.bottomNav}>
          {[['watch','📺','WATCH'],['discover','🔍','DISCOVER'],null,['compare','⚡','WHY US'],['profile','👤','PROFILE']].map((item,i)=>
            item===null ? (
              <div key={i} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <button style={S.goLiveNav}>🔴</button>
              </div>
            ) : (
              <button key={i} style={{...S.navBtn,opacity:tab===item[0]?1:0.4}} onClick={()=>setTab(item[0])}>
                <span style={{fontSize:20}}>{item[1]}</span>
                <span style={{fontSize:9,fontWeight:700,color:tab===item[0]?'#00F5A0':'inherit'}}>{item[2]}</span>
              </button>
            )
          )}
        </div>
      </div>
    </>
  )
}