const categories = [
  ["♡", "Romance & dating scams", "Spot emotional manipulation, fake identities, and requests for money."],
  ["▣", "Shopping & marketplace", "Check suspicious sellers, listings, payment requests, and deals."],
  ["✉", "Phishing & impersonation", "Review messages pretending to be companies, banks, or people you trust."],
  ["⌘", "Jobs & business offers", "Examine unexpected job offers, fake recruiters, and business opportunities."],
  ["◇", "Investment & financial", "Recognize pressure tactics, unrealistic returns, and suspicious platforms."],
  ["◉", "Tech support & account alerts", "Evaluate urgent warnings, remote-access requests, and account messages."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav wrap">
        <a className="brand" href="#"><span className="brandIcon">⌕</span><span>SCAM<span className="blue">DETECTIVE</span></span></a>
        <div className="navLinks"><a href="#how">How it works</a><a href="#scams">Scam types</a><a href="#privacy">Privacy</a></div>
        <a className="navButton" href="#start">Get started <span>↗</span></a>
      </nav>

      <section className="hero wrap">
        <div className="heroCopy">
          <div className="eyebrow"><span className="pulse"></span> YOUR EVERYDAY ONLINE SAFETY PARTNER</div>
          <h1>Not sure?<br/>See the signs.<br/><span>Stay one step ahead.</span></h1>
          <p className="lead">Not sure if it’s a scam? Get a clearer picture. Scam Detective helps you examine suspicious messages, profiles, websites, and offers so you can make more informed decisions.</p>
          <div className="heroActions"><a className="primary" href="#start">Investigate a concern <span>→</span></a><a className="secondary" href="#how">See how it works</a></div>
          <div className="trust"><span>✓</span> No account required to explore <i></i><span>✓</span> Clear, practical guidance</div>
        </div>
        <div className="visual">
          <div className="orbit orbit1"></div><div className="orbit orbit2"></div>
          <div className="shield"><div className="shieldInner">⌕</div></div>
          <div className="scanLine"></div>
          <div className="floatTag tagTop"><b>●</b> ANALYSIS READY</div>
          <div className="floatTag tagBottom"><span>✓</span> THINK BEFORE YOU CLICK</div>
          <div className="dots"></div>
        </div>
      </section>

      <section className="stats wrap"><div><b>01</b><span>Share what concerns you</span></div><div><b>02</b><span>Review the warning signs</span></div><div><b>03</b><span>Choose safer next steps</span></div></section>

      <section className="section wrap" id="how">
        <div className="sectionHead"><div className="eyebrow">A CLEARER WAY TO CHECK</div><h2>Confidence starts with <span>knowing what to look for.</span></h2><p>Get help understanding the details that may be easy to miss when something feels urgent or too good to be true.</p></div>
        <div className="steps"><article><div className="stepNo">01</div><h3>Share the details</h3><p>Describe what happened or provide the suspicious content you want to understand.</p></article><article><div className="stepNo">02</div><h3>Examine the signals</h3><p>Review possible red flags, inconsistencies, pressure tactics, and missing verification.</p></article><article><div className="stepNo">03</div><h3>Decide what’s next</h3><p>Get practical steps to verify claims and protect your accounts, money, and information.</p></article></div>
      </section>

      <section className="section categories" id="scams"><div className="wrap"><div className="sectionHead"><div className="eyebrow">KNOW THE WARNING SIGNS</div><h2>One place. <span>Many kinds of scams.</span></h2><p>Online scams take many forms. Start with the situation that looks familiar.</p></div><div className="categoryGrid">{categories.map(([icon,title,desc])=><article className="category" key={title}><div className="catIcon">{icon}</div><h3>{title}</h3><p>{desc}</p><span className="arrow">↗</span></article>)}</div></div></section>

      <section className="privacy wrap" id="privacy"><div className="privacyIcon">⬡</div><div><div className="eyebrow">PRIVACY MATTERS</div><h2>Your information deserves care.</h2><p>Our goal is to analyze only what is needed to help with your question. Before launch, we’ll clearly explain how submitted content is processed and what may be retained by service providers.</p></div></section>

      <section className="cta wrap" id="start"><div className="eyebrow">A SMARTER FIRST STEP</div><h2>Pause. Check. Then decide.</h2><p>When something feels suspicious, you don’t have to figure it out alone.</p><a className="primary" href="mailto:hello@scamdetective.example">Get notified when investigations launch <span>→</span></a><small>Investigation tools are still in development. This homepage is an early preview.</small></section>
      <footer className="footer wrap"><a className="brand" href="#"><span className="brandIcon">⌕</span><span>SCAM<span className="blue">DETECTIVE</span></span></a><span>Think clearly. Verify independently. Stay safe online.</span><span>© 2026 Scam Detective</span></footer>
    </main>
  );
}
