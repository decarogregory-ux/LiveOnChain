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
  const [chat, setChat] = useState([
    {user:'CryptoWhale',text:'Absolute banger stream! 🔥',color:'#00f5a0',emoji:'🐋'},
    {user:'SatoshiFan',text:'Love tipping directly to your wallet!',color:'#00c8ff',emoji:'🎯'},
    {user:'BlockchainBob',text:'No more 30% cut to platforms lol',color:'#ff6b35',emoji:'🤖'},
    {user:'NFTNancy',text:'This is the future of creator economy 🚀',color:'#9b59b6',emoji:'🎨'},
  ])
  const [leaderboard, setLeaderboard] = useState([
    {name:'CryptoWhale',amount:0.85,emoji:'🐋'},
    {name:'BlockchainBob',amount:0.52,emoji:'🤖'},
    {name:'SatoshiFan',amount:0.41,emoji:'🎯'},
    {name:'DeFiDave',amount:0.28,emoji:'💎'},
    {name:'NFTNancy',amount:0.19,emoji:'🎨'},
  ])
  const [tab, setTab] = useState('tip')
  const [toasts, setToasts] = useState([])

  const autoMessages = [
    {user:'eth_maxi',text:'LETS GOOOO 🚀',color:'#e74c3c',emoji:'🔴'},
    {user:'defi_king',text:'tipped and worth it!',color:'#2ecc71',emoji:'💚'},
    {user:'moonboy99',text:'W W W W',color:'#9b59b6',emoji:'💜'},
    {user:'chain_surfer',text:'never leaving this stream',color:'#e67e22',emoji:'🧡'},
  ]

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      const msg = autoMessages[i % autoMessages.length]
      setChat(c => [...c.slice(-20), msg])
      setViewers(v => Math.max(2500, v + Math.floor(Math.random()*10)-4))
      i++
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const sendTip = () => {
    const amt = parseFloat(amount) || 0.01
    setTips(t => parseFloat((t+amt).toFixed(3)))
    setTipCount(t => t+1)
    setChat(c => [...c.slice(-20), {user:'You',text:message||'Amazing stream! 🔥',color:'#00f5a0',emoji:'✨',tip:amt,coin}])
    setMessage('')
    addToast(`⚡ ${amt} ${coin} sent!`)
  }

  const addToast = (msg) => {
    const id = Date.now()
    setToasts(t => [...t, {id, msg}])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }

  return (
    <>
      <Head><title>CryptoBeats Live — LiveOnChain</title></Head>
      <nav style={nav}>
        <Link href="/"><div style={logo}>LiveOnChain</div></Link>
        <div style={walletBadge}>0x7f3a...c91b</div>
      </nav>
      <div style={layout}>
        <div style={leftPanel}>
          <div style={videoBox}>
            <div style={videoBg}>
              <div style={waveWrap}>
                {[20,40,60,80,100,80,60,40,20].map((h,i)=>(
                  <div key={i} style={{width:3,height:h,background:'var(--accent)',borderRadius:2,animation:`wave 1.2s ease-in-out ${i*0.1}s infinite`}}/>
                ))}
              </div>
            </div>
            <div style={liveBadge}><span style={liveDot}/>LIVE</div>
            <div style={viewerBadge}>👁 {viewers.toLocaleString()}</div>
          </div>
          <div style={streamInfo}>
            <div>
              <div style={{fontSize:16,fontWeight:700}}>CryptoBeats Live</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--muted)'}}>0x9a4f...b72c · ETH Mainnet</div>
            </div>
            <div style={{display:'flex',gap:24}}>
              {[[tips.toFixed(2),'ETH Earned'],[tipCount,'Tips'],['100%','Kept']].map(([v,l])=>(
                <div key={l} style={{textAlign:'center'}}>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:16,fontWeight:700,color:'var(--accent)'}}>{v}</div>
                  <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:1}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={chatArea}>
            {chat.map((m,i)=>(
              <div key={i} style={{...chatMsg, ...(m.tip?tipMsg:{})}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:m.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0}}>{m.emoji}</div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:m.color}}>{m.user}</div>
                  {m.tip&&<div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--accent)'}}>⚡ {m.tip} {m.coin}</div>}
                  <div style={{fontSize:13,color:'rgba(232,244,248,0.85)'}}>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={chatInput}>
            <input style={inp} placeholder="Say something..." value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&setChat(c=>[...c,{user:'You',text:e.target.value,color:'#00c8ff',emoji:'👤'}])}/>
          </div>
        </div>
        <div style={rightPanel}>
          <div style={tabs}>
            {[['tip','⚡ Tip'],['board','🏆 Board'],['earn','💎 Earn']].map(([id,label])=>(
              <div key={id} style={{...tabItem,..( tab===id?activeTab:{})}} onClick={()=>setTab(id)}>{label}</div>
            ))}
          </div>
          {tab==='tip'&&(
            <div style={{padding:20,display:'flex',flexDirection:'column',gap:12}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--muted)',letterSpacing:2,textTransform:'uppercase'}}>Select Token</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
                {['ETH','SOL','USDC'].map(c=>(
                  <button key={c} style={{...coinBtn,...(coin===c?activeCoin:{})}} onClick={()=>setCoin(c)}>{c}</button>
                ))}
              </div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--muted)',letterSpacing:2,textTransform:'uppercase'}}>Quick Amount</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}}>
                {['0.001','0.01','0.05','0.1'].map(a=>(
                  <button key={a} style={{...amtBtn,...(amount===a?activeAmt:{})}} onClick={()=>setAmount(a)}>{a}</button>
                ))}
              </div>
              <input style={inp} type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Custom amount"/>
              <textarea style={{...inp,height:60,resize:'none'}} placeholder="Message (optional)..." value={message} onChange={e=>setMessage(e.target.value)}/>
              <button style={tipBtn} onClick={sendTip}>⚡ Send Tip — Instant On-Chain</button>
              <div style={{padding:'12px',background:'rgba(0,0,0,0.3)',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:11}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--muted)'}}>Balance</span><span style={{color:'var(--accent2)'}}>1.847 ETH</span></div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}><span style={{color:'var(--muted)'}}>Gas Est.</span><span style={{color:'var(--accent2)'}}>~$0.42</span></div>
              </div>
            </div>
          )}
          {tab==='board'&&(
            <div style={{padding:12,display:'flex',flexDirection:'column',gap:6}}>
              <div style={{padding:'12px 16px',display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:700}}>Top Tippers</span><span style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--muted)'}}>THIS STREAM</span></div>
              {leaderboard.map((item,i)=>(
                <div key={item.name} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:6}}>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:700,width:20,color:['#ffd700','#c0c0c0','#cd7f32'][i]||'var(--muted)'}}>
                    {['🥇','🥈','🥉'][i]||(i+1)}
                  </div>
                  <div style={{fontSize:20}}>{item.emoji}</div>
                  <div style={{flex:1,fontSize:13,fontWeight:600}}>{item.name}</div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:'var(--accent)'}}>{item.amount} ETH</div>
                </div>
              ))}
            </div>
          )}
          {tab==='earn'&&(
            <div style={{padding:20}}>
              <div style={{textAlign:'center',padding:24,border:'1px solid var(--border)',borderRadius:8,marginBottom:16,background:'linear-gradient(135deg,rgba(0,245,160,0.05),rgba(0,200,255,0.05))'}}>
                <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:2,marginBottom:6}}>Total Earned Today</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:36,fontWeight:700,color:'var(--accent)'}}>{tips.toFixed(3)} ETH</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:14,color:'var(--muted)'}}>≈ ${(tips*3640).toFixed(0)} USD</div>
                <div style={{fontSize:11,color:'var(--accent2)',marginTop:8}}>✓ 100% yours — no platform cut</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{position:'fixed',top:80,right:20,zIndex:1000,display:'flex',flexDirection:'column',gap:8}}>
        {toasts.map(t=>(
          <div key={t.id} style={{background:'var(--surface2)',border:'1px solid var(--accent)',borderRadius:6,padding:'12px 16px',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--accent)',boxShadow:'0 0 20px rgba(0,245,160,0.2)'}}>{t.msg}</div>
        ))}
      </div>
      <style>{`@keyframes wave{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}`}</style>
    </>
  )
}

const nav={display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'1px solid var(--border)',background:'rgba(8,12,20,0.9)',backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:100}
const logo={fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:'var(--accent)',cursor:'pointer'}
const walletBadge={fontFamily:'var(--font-mono)',fontSize:12,color:'var(--accent2)',background:'rgba(0,200,255,0.08)',border:'1px solid rgba(0,200,255,0.2)',padding:'6px 14px',borderRadius:4}
const layout={display:'grid',gridTemplateColumns:'1fr 340px',height:'calc(100vh - 61px)'}
const leftPanel={display:'flex',flexDirection:'column',borderRight:'1px solid var(--border)',overflow:'hidden'}
const videoBox={position:'relative',background:'#000',aspectRatio:'16/9',flexShrink:0,overflow:'hidden'}
const videoBg={width:'100%',height:'100%',background:'linear-gradient(135deg,#0a1628,#0d2040,#091525)',display:'flex',alignItems:'center',justifyContent:'center'}
const waveWrap={display:'flex',alignItems:'center',gap:3}
const liveBadge={position:'absolute',top:16,left:16,background:'var(--danger)',color:'#fff',fontFamily:'var(--font-mono)',fontSize:10,fontWeight:700,padding:'4px 10px',borderRadius:3,letterSpacing:2,display:'flex',alignItems:'center',gap:5}
const liveDot={display:'inline-block',width:6,height:6,background:'#fff',borderRadius:'50%',animation:'blink 1s infinite'}
const viewerBadge={position:'absolute',top:16,right:16,background:'rgba(0,0,0,0.6)',fontFamily:'var(--font-mono)',fontSize:11,padding:'4px 10px',borderRadius:3}
const streamInfo={padding:'16px 24px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'var(--surface)'}
const chatArea={flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:8}
const chatMsg={display:'flex',gap:8,alignItems:'flex-start'}
const tipMsg={background:'linear-gradient(90deg,rgba(0,245,160,0.08),transparent)',borderLeft:'2px solid var(--accent)',padding:'8px 10px',borderRadius:'0 6px 6px 0'}
const chatInput={padding:'12px 16px',borderTop:'1px solid var(--border)',background:'var(--surface)'}
const inp={width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',color:'var(--text)',padding:'8px 12px',borderRadius:4,fontSize:13,outline:'none',fontFamily:'var(--font-body)'}
const rightPanel={display:'flex',flexDirection:'column',background:'var(--surface)',overflow:'hidden'}
const tabs={display:'flex',borderBottom:'1px solid var(--border)'}
const tabItem={flex:1,padding:12,textAlign:'center',fontFamily:'var(--font-mono)',fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'var(--muted)',cursor:'pointer',borderBottom:'2px solid transparent'}
const activeTab={color:'var(--accent)',borderBottomColor:'var(--accent)',background:'rgba(0,245,160,0.04)'}
const coinBtn={background:'var(--surface2)',border:'1px solid var(--border)',color:'var(--text)',padding:'8px',borderRadius:4,cursor:'pointer',fontFamily:'var(--font-mono)',fontSize:11}
const activeCoin={borderColor:'var(--accent2)',color:'var(--accent2)',background:'rgba(0,200,255,0.08)'}
const amtBtn={background:'var(--surface2)',border:'1px solid var(--border)',color:'var(--text)',padding:'8px 4px',borderRadius:4,cursor:'pointer',fontFamily:'var(--font-mono)',fontSize:11}
const activeAmt={borderColor:'var(--accent)',color:'var(--accent)',background:'rgba(0,245,160,0.06)'}
const tipBtn={width:'100%',background:'linear-gradient(135deg,var(--accent),var(--accent2))',color:'#000',border:'none',padding:12,borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,fontWeight:700,cursor:'pointer',letterSpacing:1,textTransform:'uppercase'}
