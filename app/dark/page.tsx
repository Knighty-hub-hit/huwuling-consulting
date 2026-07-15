"use client";

import { useEffect, useRef, useState } from "react";
import "./dark.css";

const darkServices = [
  {
    no: "01", title: "品牌定位", en: "BRAND POSITIONING",
    body: "用AI辅助信息整理与竞争洞察，由顾问完成关键判断，提炼真正属于企业的品牌坐标。",
    points: ["品牌定位", "联名合作", "创意策划"],
  },
  {
    no: "02", title: "企业文化", en: "CULTURE SYSTEM",
    body: "把创始人的信念、组织的真实经验与未来目标，转化为团队能够理解和行动的文化系统。",
    points: ["文化梳理", "员工赋能", "精神传承"],
  },
  {
    no: "03", title: "内容 IP", en: "CONTENT INTELLIGENCE",
    body: "从选题、人设、叙事到矩阵搭建，让好内容持续积累注意力，并沉淀为可复用的品牌资产。",
    points: ["IP创作", "矩阵搭建", "内容陪跑"],
  },
  {
    no: "04", title: "整合营销", en: "INTEGRATED GROWTH",
    body: "连接抖音电商、本地生活、小红书与商业流投放资源，按预算与目标组织最合适的专业力量。",
    points: ["抖音电商", "本地生活", "小红书"],
  },
];

function TechSphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let frame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width;
      pointerY = (event.clientY - rect.top) / rect.height;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w * (w < 760 ? 0.62 : 0.69);
      const cy = h * (w < 760 ? 0.43 : 0.46);
      const radius = Math.min(w * (w < 760 ? 0.34 : 0.235), h * 0.31);
      const rotation = frame * 0.0035 + (pointerX - 0.5) * 0.45;
      const tilt = (pointerY - 0.5) * 0.18;

      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(cx, cy, radius * 0.05, cx, cy, radius * 1.7);
      glow.addColorStop(0, "rgba(64,194,255,.25)");
      glow.addColorStop(.48, "rgba(30,93,255,.08)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - radius * 1.8, cy - radius * 1.8, radius * 3.6, radius * 3.6);

      ctx.save();
      ctx.translate(cx, cy);
      [1.28, 1.55, 1.86].forEach((scale, index) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * scale, radius * (0.36 + index * .08), rotation * (index % 2 ? -1 : 1) + index * .8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${index === 1 ? "45,123,255" : "48,196,255"},${0.26 - index * .045})`;
        ctx.lineWidth = index === 0 ? 1.4 : .8;
        ctx.stroke();
      });
      ctx.restore();

      type Point = { x:number; y:number; z:number; a:number };
      const rings: Point[][] = [];
      for (let lat = -75; lat <= 75; lat += 15) {
        const ring: Point[] = [];
        for (let lon = 0; lon <= 360; lon += 12) {
          const la = lat * Math.PI / 180;
          const lo = lon * Math.PI / 180 + rotation;
          const rawX = Math.cos(la) * Math.sin(lo);
          const rawY = Math.sin(la);
          const z = Math.cos(la) * Math.cos(lo);
          const y = rawY * Math.cos(tilt) - z * Math.sin(tilt);
          const depth = rawY * Math.sin(tilt) + z * Math.cos(tilt);
          ring.push({ x: cx + rawX * radius, y: cy + y * radius, z: depth, a: .14 + (depth + 1) * .32 });
        }
        rings.push(ring);
      }

      rings.forEach((ring, ringIndex) => {
        ring.forEach((point, index) => {
          const next = ring[index + 1];
          if (next && point.z > -.55 && next.z > -.55) {
            ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = `rgba(67,169,255,${Math.min(point.a, next.a)})`;
            ctx.lineWidth = .7; ctx.stroke();
          }
          const below = rings[ringIndex + 1]?.[index];
          if (below && point.z > -.55 && below.z > -.55) {
            ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(below.x, below.y);
            ctx.strokeStyle = `rgba(61,151,255,${Math.min(point.a, below.a) * .7})`;
            ctx.lineWidth = .55; ctx.stroke();
          }
          if (point.z > -.45) {
            ctx.beginPath(); ctx.arc(point.x, point.y, point.z > .65 ? 1.65 : .85, 0, Math.PI * 2);
            ctx.fillStyle = point.z > .72 ? "rgba(116,231,255,.95)" : `rgba(67,169,255,${point.a + .15})`;
            ctx.fill();
          }
        });
      });

      for (let i = 0; i < 17; i += 1) {
        const angle = i * 2.39 + frame * .0018;
        const orbit = radius * (1.22 + (i % 4) * .15);
        const x = cx + Math.cos(angle) * orbit;
        const y = cy + Math.sin(angle) * orbit * .33;
        ctx.beginPath(); ctx.arc(x, y, i % 5 === 0 ? 3.3 : 1.7, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? "#73efff" : "rgba(61,155,255,.7)"; ctx.fill();
        if (i % 5 === 0) {
          ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.strokeStyle = "rgba(81,203,255,.3)"; ctx.stroke();
        }
      }

      frame += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="techSphere" aria-hidden="true" />;
}

export default function DarkHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("darkVisible")),
      { threshold: .13 },
    );
    document.querySelectorAll(".darkSite [data-dark-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = darkServices[activeService];

  return (
    <main className="darkSite">
      <header className="darkHeader">
        <a className="darkBrand" href="#dark-home">湖雾岭咨询<span /></a>
        <nav className={menuOpen ? "darkNav darkNavOpen" : "darkNav"} aria-label="深色版主导航">
          <a href="#dark-home" onClick={() => setMenuOpen(false)}>首页</a>
          <a href="#dark-services" onClick={() => setMenuOpen(false)}>服务</a>
          <a href="#dark-method" onClick={() => setMenuOpen(false)}>方法论</a>
          <a href="#dark-results" onClick={() => setMenuOpen(false)}>实战</a>
          <a href="#dark-founder" onClick={() => setMenuOpen(false)}>关于我们</a>
        </nav>
        <a className="themeSwitch" href="../">浅色东方版 <span>○</span></a>
        <a className="darkCta" href="#dark-consult">开启咨询 <span>→</span></a>
        <button className="darkMenu" type="button" aria-label="切换菜单" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i/><i/></button>
      </header>

      <section className="darkHero" id="dark-home">
        <TechSphere />
        <div className="darkNoise" aria-hidden="true" />
        <div className="heroCounter"><i /><span>01</span><b>04</b></div>
        <div className="darkHeroCopy" data-dark-reveal>
          <p className="darkEyebrow">AI-DRIVEN BRAND LIFECYCLE ADVISORY</p>
          <h1>企业品牌全生命周期顾问</h1>
          <h2>AI驱动文化共识与品牌增长</h2>
          <p className="darkHeroLead">12年平台锤炼 · 上万家企业服务陪跑</p>
          <div className="darkHeroActions">
            <a href="#dark-consult">开启咨询 <span>→</span></a>
            <a href="#dark-method">探索方法论 <span>↓</span></a>
          </div>
        </div>
        <div className="sphereCore">湖雾岭咨询</div>
        <span className="sphereLabel labelTop">企业文化</span>
        <span className="sphereLabel labelLeft">品牌定位</span>
        <span className="sphereLabel labelRight">内容 IP</span>
        <span className="sphereLabel labelBottom">整合营销</span>
        <div className="darkServiceRail" data-dark-reveal>
          {darkServices.map((service, index) => (
            <button type="button" key={service.no} onClick={() => setActiveService(index)} className={activeService === index ? "railActive" : ""}>
              <i>{service.no}</i><span>{service.title}</span><b>↗</b>
            </button>
          ))}
        </div>
        <a className="scrollCue" href="#dark-method"><i />SCROLL<span>⌄</span></a>
      </section>

      <section className="darkMethod darkPad" id="dark-method">
        <div className="darkSectionHead" data-dark-reveal>
          <p><span>01</span> INTELLIGENCE WITH JUDGEMENT</p>
          <h2>AI 不替代判断力，<br /><em>让判断更接近真相。</em></h2>
          <p className="darkLead">我们用技术扩大信息处理的边界，用十二年平台与企业服务经验完成真正重要的判断。</p>
        </div>
        <div className="diagnosticPanel" data-dark-reveal>
          <div className="scanRadar"><i/><i/><i/><i/><span>INSIGHT<br/>ENGINE</span></div>
          <div className="signalList">
            <article><span>01</span><div><h3>识别真实问题</h3><p>过滤噪音，看清企业所处阶段。</p></div><b>98%</b></article>
            <article><span>02</span><div><h3>建立文化共识</h3><p>把价值观转化为决策与行动。</p></div><b>92%</b></article>
            <article><span>03</span><div><h3>连接增长资源</h3><p>按预算、体量与目标匹配解法。</p></div><b>96%</b></article>
          </div>
        </div>
      </section>

      <section className="darkSolutions darkPad" id="dark-services">
        <div className="solutionTabs" data-dark-reveal>
          <p className="darkMiniTitle">02 / SOLUTION MATRIX</p>
          {darkServices.map((service, index) => (
            <button type="button" key={service.no} onClick={() => setActiveService(index)} className={activeService === index ? "solutionActive" : ""}>
              <span>{service.no}</span>{service.title}<i>→</i>
            </button>
          ))}
        </div>
        <article className="solutionDetail" data-dark-reveal>
          <p>{current.en}</p>
          <h2>{current.title}</h2>
          <p className="solutionBody">{current.body}</p>
          <div>{current.points.map((point) => <span key={point}>{point}</span>)}</div>
          <a href="#dark-consult">探索合作方式 <span>↗</span></a>
        </article>
        <div className="solutionVisual" aria-hidden="true">
          <i/><i/><i/><i/><span>{current.no}</span>
        </div>
      </section>

      <section className="darkResults darkPad" id="dark-results">
        <div className="darkResultsHead" data-dark-reveal>
          <p className="darkMiniTitle">03 / PROVEN IN PRACTICE</p>
          <h2>让经验成为数据，<br />让数据回到增长。</h2>
        </div>
        <div className="darkMetrics">
          <article data-dark-reveal><span>PLATFORM EXPERIENCE</span><strong>12<small>年</small></strong><p>阿里服务商、字节官方与头部品牌管理经验</p><i /></article>
          <article data-dark-reveal><span>ENTERPRISE SERVICE</span><strong>10,000<small>+</small></strong><p>上万家企业服务与陪跑经验</p><i /></article>
          <article data-dark-reveal><span>CONTENT IMPACT</span><strong>6<small>条</small></strong><p>过亿播放视频，数百条百万级内容</p><i /></article>
          <article data-dark-reveal><span>LIVE INVESTMENT</span><strong>8,000<small>万+</small></strong><p>大场直播商业流投放峰值</p><i /></article>
        </div>
      </section>

      <section className="darkFounder darkPad" id="dark-founder">
        <div className="founderCode" aria-hidden="true">H<br/>W<br/>L</div>
        <div className="darkFounderIntro" data-dark-reveal>
          <p className="darkMiniTitle">04 / FOUNDER</p>
          <h2>湖雾岭</h2>
          <p>企业与企业老板共同的<br/>“心理健康与身体健康咨询师”</p>
        </div>
        <div className="darkFounderBio" data-dark-reveal>
          <p>宁波工程学院汉语言文学专业。5年阿里服务商、7年字节官方、1年全国超头餐饮品牌高级管理，长期以哲学、心理学与传统文化的跨学科视角理解企业和品牌。</p>
          <div><span><b>5</b>年阿里服务商</span><span><b>7</b>年字节官方</span><span><b>1</b>年头部品牌高管</span></div>
        </div>
      </section>

      <section className="darkPartners darkPad">
        <div data-dark-reveal><p className="darkMiniTitle">PARTNER NETWORK</p><h2>专业伙伴，<br/>共同寻找更优解。</h2></div>
        <div className="networkList" data-dark-reveal>
          <p><span>01</span>抖音电商与数据服务<b>5—10 YEARS</b></p>
          <p><span>02</span>小红书头部服务商与 MCN<b>TOP NETWORK</b></p>
          <p><span>03</span>平台一手政策与行业资源<b>DIRECT ACCESS</b></p>
          <p><span>04</span>本地生活全行业交付<b>LOCAL GROWTH</b></p>
        </div>
      </section>

      <section className="darkConsult darkPad" id="dark-consult">
        <div data-dark-reveal><p className="darkMiniTitle">START A REAL CONVERSATION</p><h2>准备好穿越<br/><em>下一个周期？</em></h2></div>
        <div className="darkPrice" data-dark-reveal><p>线上咨询 <strong>¥198</strong><span>/ 1小时</span></p><p>线下面询 <strong>¥1,980</strong><span>/ 1天</span></p><small>每周仅接 3 个线下面访客户 · 差旅另计</small></div>
        <a className="launchButton" href="https://github.com/Knighty-hub-hit/huwuling-consulting/issues/new?title=%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2%EF%BC%9A" target="_blank" rel="noreferrer" data-dark-reveal>发起合作咨询<span>→</span></a>
      </section>

      <footer className="darkFooter"><a href="#dark-home">湖雾岭咨询</a><p>AI DRIVEN · CULTURE FIRST · GROWTH FOCUSED</p><a href="../">切换浅色东方版 →</a></footer>
    </main>
  );
}
