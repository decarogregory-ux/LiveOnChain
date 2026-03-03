import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const streamers = [
  {name:'Andrew',viewers:'1.2K',tip:'$10 ETH',badge:'FIREWORKS!',color:'#ff4560',avatar:'🎮'},
  {name:'Kirsten',viewers:'1.0K',tip:'$60 USDC',badge:'DIAMOND SUPPORTER',color:'#00c8ff',avatar:'🎤'},
  {name:'Khloe',viewers:'1.9K',tip:'$5 SOL',badge:'CAN\'T STOP!',color:'#ffd700',avatar:'☕'},
  {name:'Sedn',viewers:'1.3K',tip:'$10 USDC',badge:'FIREWORKS!',color:'#ff4560',avatar:'🎧'},
  {name:'Darcy',viewers:'1.9K',tip:'$50 ETH',badge:'DIAMOND',color:'#00c8ff',avatar:'👋'},
  {name:'Keeg',viewers:'1.0K',tip:'$12 ETH',badge:'FIREWORKS!',color:'#ff4560',avatar:'🎙'},
  {name:'Kevin',viewers:'1.0K',tip:'$10 BSC',badge:'FIREWORKS!',color:'#ff4560',avatar:'🕹'},
  {name:'Mary',viewers:'1.8K',tip:'$8 ETH',badge:'RISING STAR',color:'#00f5a0',avatar:'🎵'},
  {name:'Kaylal',viewers:'1.6K',tip:'$15 SOL',badge:'AWESOME!',color:'#9b59b6',avatar:'✨'},
]

const chats = [
  {user:'JakeGamer',text:'Great streams tonight!',color:'#00f5a0'},
  {user:'Kevin',text:'sent $110 to Kirsten!',color:'#ffd700'},
  {user:'MrGreen',text:'Thank you so much Greg, love it man!',color:'#00c8ff'},
]

export default function Home() {
  const [count, setCount] = useState(14280)
  const [activeTip, setActiveTip] = useState(null)
  const [chatItems, setChatItems] = useState(chats)

  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => c + Math.floor(Math.random()*5))
    }, 2000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const tips = [
      {user:'CryptoWhale',text:'Just tipped 0.5 ETH to Andrew!',color:'#ffd700'},
      {user:'SatoshiFan',text:'Kirsten is incredible tonight',color:'#00f5a0'},
      {user:'DeFiDave',text:'DIAMOND SUPPORTER unlocked!',color:'#00c8ff'},
      {user:'NFTNancy',text:'This platform is the future',color:'#9b59b6'},
    ]
    let i = 0
    const t = setInterval(() => {
      setChatItems(c => [...c.slice(-6), tips[i % tips.length]])
      i++
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <Head><title>LiveOnChain — Web3 Livestreaming</title></Head>
      <nav style={nav}>
        <div style={logo}>LiveOnChain</div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div style={liveCount}>🔴 {count.toLocaleString()} watching</div>
          <Link href="/stream"><button style={btnOutline}>Watch Live</button></Link>
          <Link href="/dashboard"><button style={btnPrimary}>Go Live</button></Link>
        </div>
      </nav>

      <div style={hero}>
        <div style={heroLeft}>
          <div style={badge}>⚡ Web3-Native Livestreaming</div>
          <h1 style={h1}>Stream Live.<br/><span style={{color:'var(--accent)'}}>Keep 100%.</span></h1>
          <p style={sub}>Tips go wallet-to-wallet instantly. No platform cut. No delays. Just you and your audience on-chain.</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:8}}>
            <Link href="/dashboard"><button style={btnBig}>🎥 Go Live Now</button></Link>
            <Link href="/stream"><button style={btnBigOutline}>👁 Watch Demo</button></Link>
          </div>
          <div style={statsRow}>
            {[['$0','Platform Cut'],[count.toLocaleString(),'Watching Now'],['100%','Creator Keeps'],['<2s','Payment Speed']].map(([v,l])=>(
              <div key={l} style={statBox}>
                <div style={statVal}>{v}</div>
                <div style={statLbl}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={heroRight}>
          <div style={chatBox}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--accent)',letterSpacing:2,marginBottom:12}}>LIVE ACTIVITY</div>
            {chatItems.map((m,i)=>(
              <div key={i} style={chatRow}>
                <span style={{color:m.color,fontWeight:700,fontSize:12}}>{m.user}</span>
                <span style={{fontSize:12,color:'rgba(232,244,248,0.7)',marginLeft:6}}>{m.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={sectionWrap}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Live Now</h2>
          <div style={liveCount}>🔴 {streamers.length} streams</div>
        </div>
        <div style={grid}>
          {streamers.map((s,i)=>(
            <Link href="/stream" key={i}>
              <div style={card}>
                <div style={cardVideo}>
                  <div style={cardBg}>
                    <div style={avatarBig}>{s.avatar}</div>
                  </div>
                  <div style={livePill}>LIVE</div>
                  <div style={viewerPill}>👁 {s.viewers}</div>
                  <div style={{...tipPill,background:s.color+'22',border:`1px solid ${s.color}`,color:s.color}}>
                    {s.tip} · {s.badge}
                  </div>
                </div>
                <div style={cardInfo}>
                  <div style={{fontWeight:700,fontSize:14}}>{s.name}</div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--accent)'}}>100% to creator</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <section style={ctaSection}>
        <h2 style={{fontFamily:'var(--font-mono)',fontSize:28,fontWeight:700,marginBottom:16}}>Ready to own your stream?</h2>
        <p style={{color:'var(--muted)',marginBottom:32,fontSize:18}}>Join creators keeping 100% of what they earn.</p>
        <Link href="/dashboard"><button style={btnBig}>Launch Your Stream →</button></Link>
      </section>

      <footer style={footer}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:16,fontWeight:700,color:'var(--accent)'}}>LiveOnChain</div>
        <div style={{color:'var(--muted)',fontSize:12,fontFamily:'var(--font-mono)'}}>© 2025 LiveOnChain. Built on-chain.</div>
      </footer>
    </>
  )
}

const nav={display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'1px solid var(--border)',background:'rgba(8,12,20,0.95)',backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:100}
const logo={fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:'var(--accent)'}
const liveCount={fontFamily:'var(--font-mono)',fontSize:11,color:'var(--danger)',background:'rgba(255,69,96,0.1)',border:'1px solid rgba(255,69,96,0.3)',padding:'4px 10px',borderRadius:4}
const btnPrimary={background:'var(--accent)',color:'#000',border:'none',padding:'8px 20px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,fontWeight:700,letterSpacing:1,textTransform:'uppercase'}
const btnOutline={background:'transparent',color:'var(--text)',border:'1px solid var(--border)',padding:'8px 20px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:1,textTransform:'uppercase'}
const btnBig={background:'var(--accent)',color:'#000',border:'none',padding:'14px 32px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,letterSpacing:1,textTransform:'uppercase'}
const btnBigOutline={...btnBig,background:'transparent',color:'var(--text)',border:'1px solid var(--border)'}
const hero={display:'grid',gridTemplateColumns:'1fr 340px',gap:40,padding:'60px 32px',alignItems:'center',maxWidth:1200,margin:'0 auto'}
const heroLeft={display:'flex',flexDirection:'column',gap:24}
const heroRight={display:'flex',flexDirection:'column',gap:12}
const badge={display:'inline-flex',alignItems:'center',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--accent)',background:'rgba(0,245,160,0.08)',border:'1px solid rgba(0,245,160,0.2)',padding:'6px 14px',borderRadius:4,letterSpacing:2,width:'fit-content'}
const h1={fontSize:'clamp(40px,6vw,72px)',fontWeight:800,lineHeight:1.05,letterSpacing:-2}
const sub={fontSize:18,color:'var(--muted)',lineHeight:1.6,maxWidth:480}
const statsRow={display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,paddingTop:24,borderTop:'1px solid var(--border)'}
const statBox={textAlign:'center'}
const statVal={fontFamily:'var(--font-mono)',fontSize:22,fontWeight:700,color:'var(--accent)'}
const statLbl={fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:1,marginTop:4}
const chatBox={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:20,display:'flex',flexDirection:'column',gap:10}
const chatRow={display:'flex',flexWrap:'wrap',padding:'6px 0',borderBottom:'1px solid var(--border)'}
const sectionWrap={padding:'40px 32px',maxWidth:1200,margin:'0 auto'}
const sectionHeader={display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}
const sectionTitle={fontFamily:'var(--font-mono)',fontSize:22,fontWeight:700}
const grid={display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:16}
const card={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden',cursor:'pointer'}
const cardVideo={position:'relative',aspectRatio:'16/9',overflow:'hidden'}
const cardBg={width:'100%',height:'100%',background:'linear-gradient(135deg,#0a1628,#0d2040,#091525)',display:'flex',alignItems:'center',justifyContent:'center'}
const avatarBig={fontSize:48}
const livePill={position:'absolute',top:8,left:8,background:'var(--danger)',color:'#fff',fontFamily:'var(--font-mono)',fontSize:9,fontWeight:700,padding:'3px 8px',borderRadius:3,letterSpacing:2}
const viewerPill={position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.7)',fontFamily:'var(--font-mono)',fontSize:10,padding:'3px 8px',borderRadius:3}
const tipPill={position:'absolute',bottom:8,left:8,right:8,fontFamily:'var(--font-mono)',fontSize:9,fontWeight:700,padding:'4px 8px',borderRadius:3,letterSpacing:1}
const cardInfo={padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}
const ctaSection={padding:'80px 32px',textAlign:'center',borderTop:'1px solid var(--border)'}
const footer={padding:'32px',borderTop:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}
