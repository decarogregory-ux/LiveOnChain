import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Dashboard() {
  const [isLive, setIsLive] = useState(false)
  const stats = [
    {label:'Total Earned',value:'3.42 ETH',sub:'≈ $12,460'},
    {label:'Viewers',value:'2,847',sub:'peak today'},
    {label:'Tips Received',value:'84',sub:'this stream'},
    {label:'Keep Rate',value:'100%',sub:'vs 60-70% elsewhere'}
  ]

  return (
    <>
      <Head><title>Dashboard — LiveOnChain</title></Head>
      <nav style={nav}>
        <Link href="/"><div style={logo}>LiveOnChain</div></Link>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div style={walletBadge}>0x9a4f...b72c</div>
          <button style={isLive?btnDanger:btnPrimary} onClick={()=>setIsLive(l=>!l)}>
            {isLive?'⏹ End Stream':'🎥 Go Live'}
          </button>
        </div>
      </nav>
      <div style={layout}>
        <aside style={sidebar}>
          {['Overview','Stream Settings','Analytics','Earnings','Wallet','Support'].map(item=>(
            <div key={item} style={sideItem}>{item}</div>
          ))}
        </aside>
        <main style={content}>
          <div style={pageHeader}>
            <div>
              <h1 style={pageTitle}>Streamer Dashboard</h1>
              <p style={pageSub}>Manage your stream, track earnings, configure your setup.</p>
            </div>
            {isLive&&<div style={livePill}><span style={liveDot}/>LIVE NOW</div>}
          </div>
          <div style={statGrid}>
            {stats.map(s=>(
              <div key={s.label} style={statCard}>
                <div style={statVal}>{s.value}</div>
                <div style={statLabel}>{s.label}</div>
                <div style={statSub}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={twoCol}>
            <div style={card}>
              <div style={cardTitle}>Stream Settings</div>
              <div style={formGroup}>
                <label style={lbl}>Stream Title</label>
                <input style={inp} defaultValue="CryptoBeats Live — Web3 Music Session"/>
              </div>
              <div style={formGroup}>
                <label style={lbl}>Your Wallet Address</label>
                <input style={inp} defaultValue="0x9a4f...b72c"/>
              </div>
              <div style={formGroup}>
                <label style={lbl}>Accept Tokens</label>
                <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
                  {['ETH','SOL','USDC','MATIC'].map(t=>(
                    <div key={t} style={tokenChip}>{t}</div>
                  ))}
                </div>
              </div>
              <div style={formGroup}>
                <label style={lbl}>Minimum Tip</label>
                <input style={inp} defaultValue="0.001 ETH"/>
              </div>
              <button style={btnPrimary}>Save Settings</button>
            </div>
            <div style={card}>
              <div style={cardTitle}>Recent Tips</div>
              {[
                {from:'CryptoWhale',amount:'0.85 ETH',time:'2m ago',emoji:'🐋'},
                {from:'BlockchainBob',amount:'0.52 ETH',time:'5m ago',emoji:'🤖'},
                {from:'SatoshiFan',amount:'0.41 ETH',time:'8m ago',emoji:'🎯'},
                {from:'DeFiDave',amount:'0.28 ETH',time:'11m ago',emoji:'💎'},
                {from:'NFTNancy',amount:'0.19 ETH',time:'15m ago',emoji:'🎨'},
              ].map(tx=>(
                <div key={tx.from} style={txRow}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={txAvatar}>{tx.emoji}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:600}}>{tx.from}</div>
                      <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--muted)'}}>{tx.time}</div>
                    </div>
                  </div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:14,fontWeight:700,color:'var(--accent)'}}>{tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

const nav={display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'1px solid var(--border)',background:'rgba(8,12,20,0.95)',backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:100}
const logo={fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:'var(--accent)',cursor:'pointer'}
const walletBadge={fontFamily:'var(--font-mono)',fontSize:12,color:'var(--accent2)',background:'rgba(0,200,255,0.08)',border:'1px solid rgba(0,200,255,0.2)',padding:'6px 14px',borderRadius:4}
const btnPrimary={background:'var(--accent)',color:'#000',border:'none',padding:'8px 20px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,fontWeight:700,letterSpacing:1,textTransform:'uppercase'}
const btnDanger={...btnPrimary,background:'var(--danger)',color:'#fff'}
const layout={display:'grid',gridTemplateColumns:'220px 1fr',minHeight:'calc(100vh - 61px)'}
const sidebar={background:'var(--surface)',borderRight:'1px solid var(--border)',padding:'24px 0',position:'relative',zIndex:1}
const sideItem={padding:'12px 24px',fontSize:14,color:'var(--muted)',cursor:'pointer',fontWeight:500}
const content={padding:'32px',overflowY:'auto',position:'relative',zIndex:1}
const pageHeader={display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:32}
const pageTitle={fontSize:28,fontWeight:800,marginBottom:6}
const pageSub={color:'var(--muted)',fontSize:14}
const livePill={display:'flex',alignItems:'center',gap:6,background:'rgba(255,69,96,0.1)',border:'1px solid var(--danger)',color:'var(--danger)',fontFamily:'var(--font-mono)',fontSize:11,fontWeight:700,padding:'6px 14px',borderRadius:4,letterSpacing:2}
const liveDot={display:'inline-block',width:6,height:6,background:'var(--danger)',borderRadius:'50%'}
const statGrid={display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}
const statCard={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:20}
const statVal={fontFamily:'var(--font-mono)',fontSize:24,fontWeight:700,color:'var(--accent)',marginBottom:4}
const statLabel={fontSize:13,fontWeight:600,marginBottom:2}
const statSub={fontSize:11,color:'var(--muted)'}
const twoCol={display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}
const card={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:24}
const cardTitle={fontFamily:'var(--font-mono)',fontSize:14,fontWeight:700,marginBottom:20}
const formGroup={marginBottom:16}
const lbl={display:'block',fontFamily:'var(--font-mono)',fontSize:10,color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',marginBottom:6}
const inp={width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',color:'var(--text)',padding:'8px 12px',borderRadius:4,fontSize:13,outline:'none'}
const tokenChip={background:'var(--surface2)',border:'1px solid var(--border)',color:'var(--accent2)',fontFamily:'var(--font-mono)',fontSize:11,padding:'4px 10px',borderRadius:3}
const txRow={display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}
const txAvatar={width:32,height:32,borderRadius:'50%',background:'var(--surface2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}
