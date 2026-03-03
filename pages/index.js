        <Link href="/dashboard"><button style={btnBig}>Launch Your Stream →</button></Link>
      </section>
      <footer style={footer}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:16,fontWeight:700,color:'var(--accent)'}}>LiveOnChain</div>
        <div style={{color:'var(--muted)',fontSize:12,fontFamily:'var(--font-mono)'}}>© 2025 LiveOnChain.</div>
      </footer>
    </>
  )
}

const nav={display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 40px',borderBottom:'1px solid var(--border)',background:'rgba(8,12,20,0.9)',backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:100}
const logo={fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:'var(--accent)'}
const btnPrimary={background:'var(--accent)',color:'#000',border:'none',padding:'8px 20px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,fontWeight:700,letterSpacing:1,textTransform:'uppercase'}
const btnOutline={background:'transparent',color:'var(--text)',border:'1px solid var(--border)',padding:'8px 20px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:1,textTransform:'uppercase'}
const btnBig={background:'var(--accent)',color:'#000',border:'none',padding:'16px 36px',borderRadius:4,fontFamily:'var(--font-mono)',fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase'}
const btnBigOutline={...btnBig,background:'transparent',color:'var(--text)',border:'1px solid var(--border)'}
const hero={minHeight:'85vh',display:'flex',alignItems:'center',padding:'80px 40px',position:'relative',zIndex:1}
const heroInner={maxWidth:700,display:'flex',flexDirection:'column',gap:28}
const badge={display:'inline-flex',alignItems:'center',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--accent)',background:'rgba(0,245,160,0.08)',border:'1px solid rgba(0,245,160,0.2)',padding:'6px 14px',borderRadius:4,letterSpacing:2,width:'fit-content'}
const h1={fontSize:'clamp(48px,7vw,88px)',fontWeight:800,lineHeight:1.05,letterSpacing:-2}
const sub={fontSize:20,color:'var(--muted)',lineHeight:1.6,maxWidth:520}
const stats={display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginTop:16,paddingTop:32,borderTop:'1px solid var(--border)'}
const statBox={textAlign:'center'}
const statVal={fontFamily:'var(--font-mono)',fontSize:28,fontWeight:700,color:'var(--accent)'}
const statLbl={fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:1,marginTop:4}
const features={padding:'100px 40px',maxWidth:1200,margin:'0 auto',position:'relative',zIndex:1}
const sectionTitle={fontFamily:'var(--font-mono)',fontSize:32,fontWeight:700,marginBottom:48}
const featureGrid={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}
const featureCard={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:28}
const cta={padding:'100px 40px',textAlign:'center',borderTop:'1px solid var(--border)',position:'relative',zIndex:1}
const footer={padding:'32px 40px',borderTop:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',position:'relative',zIndex:1}
