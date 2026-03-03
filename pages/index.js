import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const streamers = [
  {name:'Andrew',viewers:'1.2K',tip:'$10 ETH',badge:'FIREWORKS!',color:'#ff4560',avatar:'🎮'},
  {name:'Kirsten',viewers:'1.0K',tip:'$60 USDC',badge:'DIAMOND',color:'#00c8ff',avatar:'🎤'},
  {name:'Khloe',viewers:'1.9K',tip:'$5 SOL',badge:'ON FIRE!',color:'#ffd700',avatar:'☕'},
  {name:'Sedn',viewers:'1.3K',tip:'$10 USDC',badge:'FIREWORKS!',color:'#ff4560',avatar:'🎧'},
  {name:'Darcy',viewers:'1.9K',tip:'$50 ETH',badge:'DIAMOND',color:'#00c8ff',avatar:'👋'},
  {name:'Keeg',viewers:'1.0K',tip:'$12 ETH',badge:'FIREWORKS!',color:'#ff4560',avatar:'🎙'},
  {name:'Kevin',viewers:'1.0K',tip:'$10 ETH',badge:'FIREWORKS!',color:'#ff4560',avatar:'🕹'},
  {name:'Mary',viewers:'1.8K',tip:'$8 ETH',badge:'RISING STAR',color:'#00f5a0',avatar:'🎵'},
  {name:'Kaylal',viewers:'1.6K',tip:'$15 SOL',badge:'AWESOME!',color:'#9b59b6',avatar:'✨'},
]

export default function Home() {
  const [count, setCount] = useState(14280)
  const [chatItems, setChatItems] = useState([
    {user:'JakeGamer',text:'Great streams tonight!',color:'#00f5a0'},
    {user:'Kevin',text:'sent $110 to Kirsten!',color:'#ffd700'},
    {user:'MrGreen',text:'Love this platform!',color:'#00c8ff'},
  ])

  useEffect(() => {
    const t = setInterval(() => setCount(c => c + Math.floor(Math.random()*5)), 2000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const tips = [
      {user:'CryptoWhale',text:'Tipped 0.5 ETH to Andrew!',color:'#ffd700'},
      {user:'SatoshiFan',text:'Kirsten is incredible',color:'#00f5a0'},
      {user:'DeFiDave',text:'DIAMOND SUPPORTER!',color:'#00c8ff'},
    ]
    let i = 0
    const t = setInterval(() => {
      setChatItems(c => [...c.slice(-5), tips[i % tips.length]])
      i++
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <Head><title>LiveOnChain</title></Head>
      <nav style={nav}>
        <div style={logo}>LiveOnChain</div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div style={liveBadge}>🔴 {count.toLocaleString()} watching</div>
          <Link href="/stream"><button style={btnOutline}>Watch Live</button></Link>
          <Link href="/dashboard"><button style={btnPrimary}>Go Live</button></Link>
        </div>
      </nav>
      <div style={hero}>
        <div>
          <div style={badge}>Web3-Native Livestreaming</div>
          <h1 style={h1}>Stream Live.<br/><span style={{color:'var(--accent)'}}>Keep 100%.</span></h1>
          <p style={sub}>Tips go wallet-to-wallet instantly. No platform cut.</p>
          <div style={{display:'flex',gap:12,marginTop:8}}>
            <Link href="/dashboard"><button style={btnBig}>Go Live Now</button></Link>
            <Link href="/stream"><button style={btnBigOutline}>Watch Demo</button></Link>
          </div>
          <div style={statsRow}>
            {[['$0','Platform Cut'],[count.toLocaleString(),'Watching'],['100%','Creator Keeps'],['<2s','Payment']].map(([v,l])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div style={{fontFamily:'var(--font-mono)',fontSize:22,fontWeight:700,color:'var(--accent)'}}>{v}</div>
                <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:1,marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={chatBox}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--accent)',letterSpacing:2,marginBottom:8}}>LIVE ACTIVITY</div>
          {chatItems.map((m,i)=>(
            <div key={i} style={{padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
              <span style={{color:m.color,fontWeight:700,fontSize:12}}>{m.user} </span>
              <span style={{fontSize:12,color:'rgba(232,244,248,0.7)'}}>{m.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sectionWrap}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <h2 style={{fontFamily:'var(--font-mono)',fontSize:22,fontWeight:700}}>Live Now</h2>
          <div style={liveBadge}>🔴 {streamers.length} streams</div>
        </div>
        <div style={grid}>
          {streamers.map((s,i)=>(
            <Link href="/stream" key={i}>
              <div style={card}>
                <div style={{position:'relative',aspectRatio:'16/9',overflow:'hidden'}}>
                  <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#0a1628,#0d2040)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:48}}>{s.avatar}</div>
                  <div style={{position:'absolute',top:8,left:8,background:'var(--danger)',color:'#fff',fontFamily:'var(--font-mono)',fontSize:9,fontWeight:700,padding:'3px 8px',borderRadius:3}}>LIVE</div>
                  <div style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.7)',fontFamily:'var(--font-mono)',fontSize:10,padding:'3px 8px',borderRadius:3}}>{s.viewers}</div>
                  <div style={{position:'absolute',bottom:8,left:8,right:8,background:s.color+'22',border:`1px solid ${s.color}`,color:s.color,fontFamily:'var(--font-mono)',fontSize:9,fontWeight:700,padding:'4px 8px',borderRadius:3}}>{s.tip} · {s.badge}</div>
                </div>
                <div style={{padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontWeight:700,fontSize:14}}>{s.name}</div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--accent)'}}>100% to creator</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <section style={{padding:'80px 32px',textAlign:'center',borderTop:'1px solid var(--border)'}}>
        <h2 style={{fontFamily:'var(--font-mono)',fontSize:28,fontWeight:700,marginBottom:16}}>Ready to own your stream?</h2>
        <Link href="/dashboard"><button style={btnBig}>Launch Your Stream</button></Link>
      </section>
      <footer style={{padding:'32px',borderTop:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:16,fontWeight:700,color:'var(--accent)'}}>LiveOnChain</div>
        <div style={{color:'var(--muted)',fontSize:12}}>2025 LiveOnChain.</div>
      </footer>
    </>
  )
}

const nav={display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'1px solid var(--border)',background:'rgba(8,12,20,0.95)',position:'sticky',top:0,zIndex:100}
const logo={fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:'var(--accent)'}
const liveBadge={fontFamily:'var(--font-mono)',fontSize:11,color:'var(--danger)',background:'rgba(255,69,96,0.1)',border:'1px solid rgba(255,69,96,0.3)',padding:'4px 10px',borderRadius:4}
const btnPrimary={background:'var(--accent)',color:'#000',border:'none',padding:'8px 20px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,fontWeight:700,cursor:'pointer'}
const btnOutline={background:'transparent',color:'var(--text)',border:'1px solid var(--border)',padding:'8px 20px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,cursor:'pointer'}
const btnBig={background:'var(--accent)',color:'#000',border:'none',padding:'14px 32px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,cursor:'pointer'}
const btnBigOutline={...btnBig,background:'transparent',color:'var(--text)',border:'1px solid var(--border)'}
const hero={display:'grid',gridTemplateColumns:'1fr 300px',gap:40,padding:'60px 32px',maxWidth:1200,margin:'0 auto',alignItems:'start'}
const badge={display:'inline-flex',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--accent)',background:'rgba(0,245,160,0.08)',border:'1px solid rgba(0,245,160,0.2)',padding:'6px 14px',borderRadius:4,marginBottom:16}
const h1={fontSize:'clamp(40px,6vw,72px)',fontWeight:800,lineHeight:1.05,letterSpacing:-2,marginBottom:16}
const sub={fontSize:18,color:'var(--muted)',lineHeight:1.6}
const statsRow={display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,paddingTop:24,borderTop:'1px solid var(--border)',marginTop:24}
const chatBox={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:20}
const sectionWrap={padding:'40px 32px',maxWidth:1200,margin:'0 auto'}
const grid={display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16}
const card={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden',cursor:'pointer'}
