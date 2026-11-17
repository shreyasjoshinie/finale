import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { visualizations } from "./visualizations";
import "./style.css";
import { DataAudit } from "./DataAudit";

const categories = [
  {name:"Overview", icon:"◫"},
  {name:"Data Audit", icon:"📊"},
  {name:"Figures", icon:"✦"},
  {name:"Pollution", icon:"◉"},
  {name:"Temporal", icon:"◷"},
  {name:"Statistical", icon:"▥"},
  {name:"Weather", icon:"☁"},
  {name:"Spatial", icon:"⌖"},
  {name:"Interactive", icon:"↗"}
];

const interactive = [
  {id:"model",title:"Interactive AQI Model",category:"Interactive",desc:"Explore the interactive AQI model visualisation.",src:"/interactive/interactive-model-aqi.html",tag:"Plotly"},
  {id:"timeline",title:"Interactive Pollution Timeline",category:"Interactive",desc:"Explore the interactive pollution timeline.",src:"/interactive/pollution-timeline.html",tag:"Plotly"},
  {id:"stations",title:"Interactive Station Context",category:"Interactive",desc:"Explore the interactive station context map.",src:"/interactive/station-context.html",tag:"Leaflet"}
];

const titleCase = s => s.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase());

function App(){
  const [section,setSection]=useState("Overview");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const [format,setFormat]=useState("png");
  const [mobileOpen,setMobileOpen]=useState(false);

  useEffect(()=>{
    const nodes=[...document.querySelectorAll('.reveal')];
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }),{threshold:.12});
    nodes.forEach(node=>observer.observe(node));
    const move=e=>{
      const x=(e.clientX/window.innerWidth-.5)*2;
      const y=(e.clientY/window.innerHeight-.5)*2;
      document.documentElement.style.setProperty('--pointer-x',`${x}`);
      document.documentElement.style.setProperty('--pointer-y',`${y}`);
    };
    window.addEventListener('pointermove',move,{passive:true});
    return ()=>{observer.disconnect();window.removeEventListener('pointermove',move);};
  },[section,query]);

  const allItems = section==="Interactive" ? interactive : visualizations;
  const filtered = useMemo(()=>allItems.filter(v=>
    (section==="Overview" || section==="Data Audit" || v.category===section) &&
    (v.title+" "+v.id+" "+v.category).toLowerCase().includes(query.toLowerCase())
  ),[allItems,section,query]);

  const total=visualizations.length;
  const counts=["Figures","Pollution","Temporal","Statistical","Weather","Spatial"].map(c=>({name:c,count:visualizations.filter(v=>v.category===c).length}));
  const go = s=>{setSection(s);setQuery("");setMobileOpen(false);};

  return <div className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <aside className={`sidebar ${mobileOpen?"open":""}`}>
      <div className="brand"><div className="brand-mark">A</div><div><b>AirScope</b><span>AQI ANALYTICS</span></div></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{categories.map(c=><button key={c.name} className={section===c.name?"nav-item active":"nav-item"} onClick={()=>go(c.name)}><span className="nav-icon">{c.icon}</span>{c.name}{c.name==="Interactive"&&<i>3</i>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="live-dot"></div><div><b>Research showcase</b><span>Visualisation library</span></div></div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)}>☰</button>
        <div className="crumb">Workspace <span>/</span> <b>{section}</b></div>
        <div className="top-right"><span className="status"><i></i> DATA VISUALISATIONS</span><div className="avatar">AQ</div></div>
      </header>
      <div className="content">
        {section==="Overview" ? <>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span></span> THE AIR WE BREATHE · DATA WE CAN SEE</div>
              <h1>Every breath<br/>leaves a <em>trace.</em></h1>
              <p>Explore the invisible world around us. A visual journey through air quality, particulate matter, pollution trends and the forces shaping the air we breathe.</p>
              <div className="hero-actions">
                <button className="primary" onClick={()=>go("Figures")}>Explore visualisations <span>↗</span></button>
                <button className="secondary" onClick={()=>go("Interactive")}>Open interactive tools</button>
              </div>
            </div>
            <div className="hero-art">
              <div className="particle-field">{Array.from({length:24},(_,i)=><i key={i} style={{"--i":i,left:`${(i*37)%97}%`,top:`${(i*61)%93}%`,width:`${2+(i%3)}px`,height:`${2+(i%3)}px`,animationDuration:`${7+(i%5)}s`,animationDelay:`-${i*.4}s`}}/>)}</div>
              <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="glow"></div>
              <div className="hero-core"><div className="core-icon">◉</div><b>ATMOSPHERE</b><span>INVISIBLE DATA<br/>VISIBLE IMPACT</span></div>
              <div className="float-chip chip-one"><span>PM</span> Particle analysis</div>
              <div className="float-chip chip-two"><span>↗</span> Spatial patterns</div>
              <div className="float-chip chip-three"><span>◷</span> Time series</div>
            </div>
          </section>
          <section className="stats-grid reveal">
            <div className="stat-card"><span className="stat-icon">▧</span><span className="stat-label">CHART EXPORTS</span><b>{total}</b><small>PNG visualisations</small></div>
            <div className="stat-card"><span className="stat-icon">◇</span><span className="stat-label">VECTOR VERSIONS</span><b>38</b><small>SVG counterparts</small></div>
            <div className="stat-card"><span className="stat-icon">↗</span><span className="stat-label">INTERACTIVE TOOLS</span><b>03</b><small>Embedded experiences</small></div>
            <div className="stat-card"><span className="stat-icon">▦</span><span className="stat-label">ANALYSIS AREAS</span><b>06</b><small>Organised collections</small></div>
          </section>
          <section className="section-block reveal">
            <div className="section-heading">
              <div><div className="eyebrow">EXPLORE THE WORK</div><h2>Analysis collections</h2><p>Browse the visualisations by analytical theme.</p></div>
              <button className="text-link" onClick={()=>go("Figures")}>View all visualisations ↗</button>
            </div>
            <div className="collection-grid">
              {counts.map((c,i)=><button className="collection-card" key={c.name} onClick={()=>go(c.name)}>
                <div className="collection-top"><span className="collection-icon">{["✦","◉","◷","▥","☁","⌖"][i]}</span><span className="collection-count">{String(c.count).padStart(2,"0")} CHARTS</span></div>
                <h3>{c.name} analysis</h3>
                <p>{({Figures:"Focused event and environmental comparisons.",Pollution:"Pollutant distributions, episodes and emissions.",Temporal:"Daily, monthly, annual and seasonal patterns.",Statistical:"Coverage, imputation and statistical relationships.",Weather:"Weather conditions and pollution behaviour.",Spatial:"Geographic context, stations and population patterns."})[c.name]}</p>
                <span className="card-arrow">Explore collection ↗</span>
              </button>)}
            </div>
          </section>
          <section className="section-block reveal">
            <div className="section-heading"><div><div className="eyebrow">INTERACTIVE EXPERIENCES</div><h2>Go beyond static charts</h2><p>Open the interactive visualisations included in the project files.</p></div></div>
            <div className="interactive-grid">
              {interactive.map(x=><button className="interactive-card" key={x.id} onClick={()=>setSelected(x)}>
                <div className="interactive-symbol">{x.id==="stations"?"⌖":"⌁"}</div>
                <span>{x.tag} EXPERIENCE</span>
                <h3>{x.title}</h3>
                <p>{x.desc}</p>
                <b>Launch visualisation ↗</b>
              </button>)}
            </div>
          </section>
        </> : section==="Data Audit" ? (
          <DataAudit />
        ) : <>
          <section className="page-intro reveal">
            <div className="eyebrow">AIR QUALITY INTELLIGENCE / {section.toUpperCase()}</div>
            <h1>{section==="Interactive"?"Interactive experiences":section+" analysis"}</h1>
            <p>{section==="Interactive"?"Explore the original interactive visualisations from the project.":"Explore the original visual outputs, organised into a searchable visual library."}</p>
          </section>
          <div className="toolbar">
            <div className="searchbox"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search visualisations..." /></div>
            {section!=="Interactive"&&<div className="format-switch"><button className={format==="png"?"chosen":""} onClick={()=>setFormat("png")}>PNG</button><button className={format==="svg"?"chosen":""} onClick={()=>setFormat("svg")}>SVG</button></div>}
            <span className="result-count">{filtered.length} {filtered.length===1?"item":"items"}</span>
          </div>
          {section==="Interactive"?
            <div className="interactive-grid large">{filtered.map(x=><button className="interactive-card" key={x.id} onClick={()=>setSelected(x)}><div className="interactive-symbol">{x.id==="stations"?"⌖":"⌁"}</div><span>{x.tag} EXPERIENCE</span><h3>{x.title}</h3><p>{x.desc}</p><b>Launch visualisation ↗</b></button>)}</div>:
            <div className="visual-grid">{filtered.map(v=><button className="visual-card" key={v.id} onClick={()=>setSelected({...v,src:format==="svg"&&v.hasSvg?v.svg:v.image,tag:format.toUpperCase()})}><div className="visual-image"><img src={format==="svg"&&v.hasSvg?v.svg:v.image} loading="lazy" alt={titleCase(v.title)}/><span>{v.category}</span><div className="expand">↗</div></div><div className="visual-info"><div><h3>{titleCase(v.title)}</h3><p>{v.id}</p></div><span className="open-arrow">↗</span></div></button>)}</div>
          }
          {filtered.length===0&&<div className="empty">No visualisations match that search. Try another term.</div>}
        </>}
        <footer>
          <div className="footer-brand"><div className="brand-mark small">A</div><b>AirScope</b></div>
          <span>A visual archive of air quality analysis.</span>
          <span>Built to explore · Designed to understand</span>
        </footer>
      </div>
    </main>
    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className={`modal ${selected.src?.endsWith(".html")?"interactive-modal":""}`} onClick={e=>e.stopPropagation()}><div className="modal-head"><div><span>{selected.category||"INTERACTIVE VISUALISATION"}</span><h3>{selected.title}</h3></div><button onClick={()=>setSelected(null)}>✕</button></div>{selected.src?.endsWith(".html")?<iframe src={selected.src} title={selected.title}/>:<div className="modal-image-wrap"><img src={selected.src} alt={selected.title}/></div>}<div className="modal-foot"><span>{selected.id}</span><button onClick={()=>setSelected(null)}>Close viewer</button></div></div></div>}
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);
