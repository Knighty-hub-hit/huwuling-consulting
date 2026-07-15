"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    no: "01",
    title: "品牌战略",
    en: "BRAND STRATEGY",
    body: "从品牌定位、联名合作到创意策划，找到与企业阶段、预算和组织能力真正匹配的增长路径。",
    tags: ["品牌定位", "联名合作", "创意策划"],
  },
  {
    no: "02",
    title: "企业文化",
    en: "CULTURE DESIGN",
    body: "把创始人的信念转化为团队能够理解、认同与行动的文化语言，让组织在变化中保持方向。",
    tags: ["文化梳理", "员工赋能", "精神传承"],
  },
  {
    no: "03",
    title: "内容 IP",
    en: "CONTENT IP",
    body: "从人设、选题、叙事到矩阵搭建，由千万粉账号操盘团队陪跑，让好内容持续转化为品牌资产。",
    tags: ["IP创作", "内容陪跑", "新媒体培训"],
  },
  {
    no: "04",
    title: "整合营销",
    en: "INTEGRATED GROWTH",
    body: "整合抖音电商、本地生活、小红书与商业流投放资源，按行业、规模和目标给出更优解。",
    tags: ["抖音本地生活", "全域投放", "资源整合"],
  },
];

const methods = [
  ["洞察", "读懂企业、创始人与市场此刻真正的问题，而不是套用标准答案。"],
  ["共识", "梳理价值观、品牌定位与增长目标，让组织上下使用同一套语言。"],
  ["解法", "连接内容、平台、渠道与专业伙伴，按预算寻找当前阶段的最优组合。"],
  ["陪跑", "持续复盘内容和业务结果，让一次咨询沉淀为可复用的组织能力。"],
];

const insights = [
  { label: "观点 01", title: "企业文化不是墙上的句子", body: "它是每一次选择背后的判断标准。" },
  { label: "观点 02", title: "内容不是流量的消耗品", body: "它应该成为品牌长期复利的资产。" },
  { label: "观点 03", title: "没有万能的营销方案", body: "只有匹配阶段、预算与组织的更优解。" },
];

const partnerGroups = [
  ["抖音电商", "超头 DP 全案 · 全国头部服务商 · 数据服务"],
  ["小红书", "全国头部服务商代理 · 大型 MCN 机构"],
  ["平台直客", "字节 · 小红书一手政策与行业资源"],
  ["本地生活", "餐饮 · 休娱 · 丽人全行业交付经验"],
];

function InkFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let pointerX = 0.68;
    let pointerY = 0.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width;
      pointerY = (event.clientY - rect.top) / rect.height;
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(50, 46, 40, 0.075)";
      ctx.lineWidth = 1;
      const grid = 54;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      const phase = frame * 0.003;
      const centerY = height * (0.58 + (pointerY - 0.5) * 0.08);
      for (let line = 0; line < 42; line += 1) {
        const spread = (line - 21) * 3.25;
        const alpha = 0.035 + (1 - Math.abs(line - 21) / 21) * 0.12;
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 9) {
          const n = x / width;
          const wave = Math.sin(n * 8.2 + phase + line * 0.045) * 28;
          const wave2 = Math.sin(n * 18.6 - phase * 1.4) * 7;
          const lift = (n - 0.48) * height * 0.34;
          const cursorPull = Math.exp(-Math.pow(n - pointerX, 2) / 0.025) * (pointerY - 0.5) * 52;
          const y = centerY + spread + wave + wave2 - lift + cursorPull;
          if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(23, 24, 22, ${alpha})`;
        ctx.lineWidth = line % 9 === 0 ? 1.6 : 0.75;
        ctx.stroke();
      }

      for (let i = 0; i < 38; i += 1) {
        const x = ((i * 173 + frame * (i % 3 === 0 ? 0.07 : 0.025)) % (width + 80)) - 40;
        const n = x / width;
        const y = centerY + Math.sin(n * 8.2 + phase + i * 0.12) * 30 - (n - 0.48) * height * 0.34 + ((i % 7) - 3) * 12;
        ctx.beginPath();
        ctx.arc(x, y, i % 6 === 0 ? 2.3 : 1.15, 0, Math.PI * 2);
        ctx.fillStyle = i % 9 === 0 ? "rgba(164, 45, 35, .75)" : "rgba(25, 24, 21, .55)";
        ctx.fill();
      }

      frame += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="ink-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [insight, setInsight] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const copyChecklist = async () => {
    const text = "湖雾岭咨询预约清单：\n1. 企业/品牌当前阶段\n2. 最希望解决的三个问题\n3. 现有团队与资源\n4. 预算范围与期望时间\n5. 可公开与需保密的信息";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <div className="pointer-halo" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="湖雾岭咨询首页">
          <span>湖雾岭咨询</span><i aria-hidden="true" />
        </a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="主导航">
          {[
            ["首页", "#home"], ["方法论", "#method"], ["服务", "#services"],
            ["实战", "#results"], ["洞察", "#founder"], ["关于我们", "#about"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="version-link" href="./dark/">深色科技版 <span>●</span></a>
        <a className="header-cta" href="#consult">开启咨询 <span>↗</span></a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </header>

      <section className="hero" id="home">
        <InkFlow />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span>AI</span> DRIVEN CULTURE & GROWTH</p>
          <h1>让品牌<br /><em>穿越周期</em></h1>
          <p className="hero-subtitle">企业文化 <b>×</b> 品牌战略 <b>×</b> 整合营销</p>
          <p className="motto">义利平衡 <i /> 向善若水</p>
          <a className="text-link" href="#method">查看方法论 <span>→</span></a>
        </div>

        <div className="insight-stack" data-reveal>
          <article className="insight-card active-card">
            <div className="card-top"><span>{insights[insight].label}</span><span>●</span></div>
            <h2>{insights[insight].title}</h2>
            <p>{insights[insight].body}</p>
            <div className="card-actions">
              <span>{String(insight + 1).padStart(2, "0")} / 03</span>
              <div>
                <button type="button" aria-label="上一条观点" onClick={() => setInsight((insight + 2) % 3)}>←</button>
                <button type="button" aria-label="下一条观点" onClick={() => setInsight((insight + 1) % 3)}>→</button>
              </div>
            </div>
          </article>
          <div className="ghost-card ghost-one" aria-hidden="true" />
          <div className="ghost-card ghost-two" aria-hidden="true" />
        </div>

        <div className="hero-metrics" data-reveal>
          <div><strong>12<small>年</small></strong><span>平台锤炼</span></div>
          <div><strong>10,000<small>+</small></strong><span>企业服务陪跑</span></div>
          <div><strong>5—10<small>年</small></strong><span>专业伙伴经验</span></div>
        </div>

        <div className="hero-timeline" aria-label="职业经历时间线">
          <span className="timeline-year start">2012</span>
          <div className="timeline-line">
            <i className="major" /><i /><i className="major" /><i /><i className="major" /><i /><i className="major current" />
          </div>
          <span className="timeline-year end">NOW</span>
        </div>
      </section>

      <section className="statement section-pad" id="method">
        <div className="section-index" data-reveal><span>01</span><p>我们的判断</p></div>
        <div className="statement-content" data-reveal>
          <p className="kicker">THE LONG-TERM VIEW</p>
          <h2>信息比任何时代都更重要，<br />但判断力比信息更稀缺。</h2>
          <p className="lead">我们不是标准答案的售卖者。我们与企业站在一起，看清问题、建立共识、连接资源，让品牌与组织拥有穿越变化的能力。</p>
        </div>
      </section>

      <section className="method section-pad">
        <div className="method-intro" data-reveal>
          <p className="kicker">HOW WE WORK</p>
          <h2>从洞察，到增长</h2>
          <p>非标准、独一无二的咨询服务。每个解法，都从真实的企业处境出发。</p>
        </div>
        <div className="method-list">
          {methods.map(([title, body], index) => (
            <article key={title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="founder" id="founder">
        <div className="founder-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="founder-label" data-reveal>
          <span>02</span><p>洞察者</p>
        </div>
        <div className="founder-copy" data-reveal>
          <p className="kicker">FOUNDER & PRINCIPAL CONSULTANT</p>
          <h2>湖雾岭</h2>
          <p className="founder-role">企业与企业老板共同的<br />“心理健康与身体健康咨询师”</p>
          <div className="experience-grid">
            <div><strong>5</strong><span>年阿里服务商经验</span></div>
            <div><strong>7</strong><span>年字节官方经验</span></div>
            <div><strong>1</strong><span>年全国超头餐饮品牌高管经验</span></div>
          </div>
          <p className="founder-bio">宁波工程学院汉语言文学专业。长期涉猎西方哲学、心理学、红学、儒释道、辩证唯物主义、政治经济学，以跨学科视角理解企业、品牌与人的发展路径。</p>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="services-heading" data-reveal>
          <div><p className="kicker">WHAT WE SOLVE</p><h2>服务，不止于方案</h2></div>
          <p>一套战略语言，连接文化共识、内容表达与增长执行。</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.no} data-reveal>
              <div className="service-number">{service.no}</div>
              <p className="service-en">{service.en}</p>
              <h3>{service.title}</h3>
              <p className="service-body">{service.body}</p>
              <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <a href="#consult" aria-label={`了解${service.title}`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="results" id="results">
        <div className="results-heading" data-reveal>
          <p className="kicker">PROVEN IN PRACTICE</p>
          <h2>用内容制造引力，<br />用结果校准方向。</h2>
          <p>内容 IP 陪跑由合伙人小北老师负责，拥有多个千万粉、百万粉账号操盘经验。</p>
        </div>
        <div className="result-data">
          <article data-reveal><span>01</span><strong>6<small>条</small></strong><p>过亿播放视频</p><i /></article>
          <article data-reveal><span>02</span><strong>数百<small>条</small></strong><p>百万级播放内容</p><i /></article>
          <article data-reveal><span>03</span><strong>8,000<small>万+</small></strong><p>大场直播投流峰值</p><i /></article>
        </div>
      </section>

      <section className="partners section-pad" id="about">
        <div className="partners-intro" data-reveal>
          <p className="kicker">THE RIGHT PEOPLE, THE RIGHT ANSWER</p>
          <h2>不堆资源，<br />只寻找更优解。</h2>
          <p>所有合作伙伴均拥有 5—10 年以上专业从业经验。我们根据预算、规模与真实需求，组织最合适的专业力量。</p>
        </div>
        <div className="partner-list">
          {partnerGroups.map(([title, body], index) => (
            <article key={title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p><i>＋</i>
            </article>
          ))}
        </div>
      </section>

      <section className="consult section-pad" id="consult">
        <div className="consult-heading" data-reveal>
          <p className="kicker">START WITH A REAL QUESTION</p>
          <h2>时间宝贵，<br /><em>从一次真诚对话开始。</em></h2>
        </div>
        <div className="pricing" data-reveal>
          <article><p>线上咨询</p><strong>¥198</strong><span>/ 1小时</span></article>
          <article><p>线下面询</p><strong>¥1,980</strong><span>/ 1天 · 不含差旅</span></article>
          <p className="capacity">精力有限，每周仅接 3 个线下面访客户。</p>
        </div>
        <div className="consult-action" data-reveal>
          <p>在联系前，建议先整理企业阶段、核心问题、现有资源与期望时间。</p>
          <button type="button" onClick={copyChecklist}>{copied ? "已复制咨询清单" : "复制咨询清单"}<span>↗</span></button>
          <a href="https://github.com/Knighty-hub-hit/huwuling-consulting/issues/new?title=%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2%EF%BC%9A" target="_blank" rel="noreferrer">发起合作咨询 <span>→</span></a>
          <small>请勿在公开页面填写商业机密或个人敏感信息。</small>
        </div>
      </section>

      <footer>
        <div className="footer-brand">湖雾岭咨询<i /></div>
        <p>企业品牌全生命周期顾问</p>
        <div><span>AI DRIVEN</span><span>CULTURE FIRST</span><span>GROWTH FOCUSED</span></div>
        <a href="#home" aria-label="返回顶部">↑</a>
      </footer>
    </main>
  );
}
