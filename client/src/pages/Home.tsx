/*
 * Editorial Signal design: use authored editorial hierarchy, warm neutrals,
 * cobalt evidence markers, and offset content blocks rather than a generic grid.
 */
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Network,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
const heroImage = publicAsset("assets/imane-editorial-hero.svg");
const geocaraImage = publicAsset("assets/imane-geocara-project.svg");
const ragImage = publicAsset("assets/imane-rag-project.svg");
const portraitImage = publicAsset("assets/imane-portrait.svg");
const monogram = publicAsset("imane-monogram.png");
const cvUrl = publicAsset("Imane_Taghzout_CV_FR_EN.pdf");

const projects = [
  {
    number: "01",
    title: "GEOCARA",
    type: "Generative Engine Optimization",
    description:
      "A full content intelligence platform that moves from audit to brief, writing, fact checking, and publication across AI answer engines.",
    metric: "6 GEO metrics",
    metricLabel: "scored across 50 page crawls",
    role: "Full Stack AI Engineer Intern · Generovo",
    period: "Feb to Jun 2026",
    stack: "React · TypeScript · Puppeteer · Cheerio · LLMs",
    image: geocaraImage,
    featured: true,
  },
  {
    number: "02",
    title: "Enterprise RAG",
    type: "Segula Technologies",
    description:
      "A multimodal retrieval system for thousands of internal documentation pages, engineered to make technical knowledge easier to find and trust.",
    metric: "5 min → 20 s",
    metricLabel: "average research time",
    role: "AI and Data Engineer Intern · Segula Technologies",
    period: "Feb to Jul 2025",
    stack: "SentenceTransformers · Qdrant · BM25 · FastAPI · Docker",
    image: ragImage,
    featured: false,
  },
  {
    number: "03",
    title: "Document Intelligence",
    type: "Barid Al Maghrib",
    description:
      "An OCR and NLP pipeline that converts semi manual document workflows into structured data, increasing throughput by 30% and cutting manual review by 40% through layout aware preprocessing and custom post OCR rules.",
    metric: "+30%",
    metricLabel: "processing throughput",
    role: "Data Science and AI Intern · Barid Al Maghrib",
    period: "Mar to Jul 2024",
    stack: "Python · OpenCV · Tesseract · NLP",
    image: null,
    featured: false,
  },
];

const experience = [
  {
    period: "Feb–Jun 2026",
    role: "Full Stack AI Engineer Intern",
    company: "Generovo · Casablanca",
    detail: "Co developed GEOCARA, the LLM content pipeline, Audit Engine, and responsive frontend.",
  },
  {
    period: "Feb–Jul 2025",
    role: "AI & Data Engineer Intern",
    company: "Segula Technologies · Casablanca",
    detail: "Scoped, built, and deployed a multimodal enterprise RAG chatbot with hybrid retrieval.",
  },
  {
    period: "Mar–Jul 2024",
    role: "Data Science & AI Intern",
    company: "Barid Al Maghrib · Casablanca",
    detail: "Designed and deployed an OCR based document processing pipeline and internal web application.",
  },
  {
    period: "Apr–Jul 2022",
    role: "Systems & Network Administration Intern",
    company: "Ministry of Energy and Mines · Casablanca",
    detail: "Supported clustered virtualized infrastructure, server monitoring, and backup procedures.",
  },
];

const capabilities = [
  { icon: Network, label: "AI systems", text: "LLMs · RAG · NLP · Prompt engineering · Evaluation" },
  { icon: Database, label: "Data practice", text: "Python · SQL · Statistics · Power BI · ETL" },
  { icon: Code2, label: "Production", text: "FastAPI · React · TypeScript · Docker · CI/CD" },
  { icon: FileText, label: "Working style", text: "Structured thinking · Stakeholder reporting · Ownership" },
];

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const header = document.querySelector<HTMLElement>(".site-header");
  const offset = (header?.offsetHeight ?? 84) + 14;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("work");
  const [showBackTop, setShowBackTop] = useState(false);
  const [scrollBounds, setScrollBounds] = useState({ atTop: true, atBottom: false });
  const [caseStudyVisible, setCaseStudyVisible] = useState(false);
  useEffect(() => {
    const sectionIds = ["work", "geocara", "experience", "capabilities", "about", "field-notes", "credentials", "contact"];
    const updateScrollState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setShowBackTop(window.scrollY > 320);
      setScrollBounds({
        atTop: window.scrollY <= 8,
        atBottom: window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8,
      });
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 84;
      const marker = window.scrollY + headerHeight + 24;
      let current = "work";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      setActiveSection(current);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const target = document.getElementById("geocara");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCaseStudyVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    scrollToId(id);
  };

  const scrollByViewport = (direction: 1 | -1) => {
    if ((direction < 0 && scrollBounds.atTop) || (direction > 0 && scrollBounds.atBottom)) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollBy({ top: window.innerHeight * 0.82 * direction, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Imane Taghzout home">
          <img src={monogram} alt="" className="brand-mark" />
          <span>IMANE<br /><em>TAGHZOUT</em></span>
        </a>
        <nav className={mobileOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          <button className={activeSection === "work" ? "is-active" : ""} onClick={() => go("work")} aria-current={activeSection === "work" ? "location" : undefined}>Work <span>01</span></button>
          <button className={activeSection === "geocara" ? "nav-secondary is-active" : "nav-secondary"} onClick={() => go("geocara")} aria-current={activeSection === "geocara" ? "location" : undefined}>GEOCARA <span>01A</span></button>
          <button className={activeSection === "experience" ? "is-active" : ""} onClick={() => go("experience")} aria-current={activeSection === "experience" ? "location" : undefined}>Experience <span>02</span></button>
          <button className={activeSection === "capabilities" ? "nav-secondary is-active" : "nav-secondary"} onClick={() => go("capabilities")} aria-current={activeSection === "capabilities" ? "location" : undefined}>Capabilities <span>03</span></button>
          <button className={activeSection === "about" ? "is-active" : ""} onClick={() => go("about")} aria-current={activeSection === "about" ? "location" : undefined}>About <span>04</span></button>
          <button className={activeSection === "field-notes" ? "nav-secondary is-active" : "nav-secondary"} onClick={() => go("field-notes")} aria-current={activeSection === "field-notes" ? "location" : undefined}>Field notes <span>05</span></button>
          <button className={activeSection === "credentials" ? "nav-secondary is-active" : "nav-secondary"} onClick={() => go("credentials")} aria-current={activeSection === "credentials" ? "location" : undefined}>Credentials <span>06</span></button>
          <a href={cvUrl} target="_blank" rel="noreferrer">CV <span>PDF</span></a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}<span>{theme === "dark" ? "Light" : "Dark"}</span></button><a className="nav-contact" href="#contact" onClick={(event) => { event.preventDefault(); go("contact"); }}>Let&apos;s talk <ArrowUpRight size={15} /></a>
        </nav>
        <button className="mobile-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      <div className="reading-progress" aria-hidden="true"><span style={{ width: `${readingProgress}%` }} /></div>

      <main id="top">
        <section className="hero-section page-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Available for applied AI roles</p>
            <p className="hero-kicker">IM / FIELD NOTE 001 · Casablanca → Everywhere</p>
            <h1>I build AI systems that make information <em>easier to trust</em>{" "}and act on.</h1>
            <p className="hero-intro">Data Scientist and AI Engineer working at the intersection of production LLM systems, measurable analytics, and useful interfaces.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => go("work")}>Explore the work <ArrowUpRight size={17} /></button>
              <a className="text-link" href="#contact" onClick={(event) => { event.preventDefault(); go("contact"); }}>Start a conversation <ArrowUpRight size={15} /></a>
              <a className="text-link cv-link" href={cvUrl} target="_blank" rel="noreferrer">Download CV <FileText size={14} /></a>
            </div>
            <nav className="section-jump" aria-label="Jump to section">
              <span>Jump to</span><button onClick={() => go("work")}>Work</button><button onClick={() => go("experience")}>Experience</button><button onClick={() => go("about")}>About</button><button onClick={() => go("contact")}>Contact</button>
            </nav>
            <div className="hero-meta">
              <span>Casablanca, Morocco</span>
              <span className="meta-rule" />
              <span>FR · EN · AR · TZ</span>
            </div>
          </div>
          <div className="hero-visual-wrap">
            <div className="hero-visual">
              <img src={heroImage} alt="Abstract editorial diagram of an AI information system" />
              <div className="hero-scanline" aria-hidden="true" />
              <div className="hero-stamp">FIELD<br />NOTES<br /><strong>IM / 26</strong></div>
              <p className="hero-caption">Systems thinking, made legible.<br /><span>01 / 04 · TRUST THE TRACE</span></p>
              <div className="hero-coordinates">33.5731° N<br />7.5898° W</div>
            </div>
            <aside className="proof-rail" aria-label="Selected proof points">
              <p className="rail-label">Proof of work</p>
              <a href="#segula-project"><strong>0.61 → 0.81</strong><span>Segula Recall@5 on a 100 question benchmark</span></a>
              <a href="#real-estate-project"><strong>30,000+</strong><span>real estate listings analyzed</span></a>
              <a href="#gold-project"><strong>22%</strong><span>RMSE improvement on gold prediction</span></a>
            </aside>
          </div>
        </section>

        <section data-chapter="00 / THESIS" className="statement-section page-section">
          <div className="section-index"><span>00</span><span>THESIS</span></div>
          <div className="statement-content">
            <p className="eyebrow">The through line</p>
            <p className="statement">I am interested in the quiet engineering between a messy question and a reliable next step.</p>
          </div>
          <div className="statement-note">From documentation search to content quality, I care about the distance between a model demo and a dependable tool.</div>
        </section>

        <section id="work" data-chapter="01 / SELECTED PROJECTS" className="work-section page-section">
          <div className="section-heading">
            <div className="section-index"><span>01</span><span>SELECTED WORK</span></div>
            <div><p className="eyebrow">Selected projects</p><h2>Work I built<br /><em>in real contexts.</em></h2></div>
            <p className="section-lede">Projects I worked on during internships and applied settings. Each one shows the context, my contribution, the tools, and the measurable result.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article id={project.number === "02" ? "segula-project" : project.number === "03" ? "bam-project" : undefined} className={project.featured ? "project-card project-featured" : "project-card"} key={project.number} onClick={() => scrollToId(project.number === "01" ? "geocara" : project.number === "02" ? "segula-project" : "bam-project")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") scrollToId(project.number === "01" ? "geocara" : project.number === "02" ? "segula-project" : "bam-project"); }} role="link" tabIndex={0} aria-label={`Open ${project.title} project story`}>
                {project.image ? <div className="project-image"><img src={project.image} alt={`${project.title} project visual`} /></div> : <div className="project-image project-image-placeholder" aria-hidden="true"><span>OCR / NLP</span><div className="document-sheet"><i /><i /><i /><b>+30%</b></div><div className="document-sheet document-sheet-back"><i /><i /></div></div>}
                <div className="project-number">{project.number}</div>
                <div className="project-body">
                  <p className="project-type">{project.type}</p>
                  <p className="project-context">{project.role} · {project.period}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-stack">{project.stack}</p>
                </div>
                <div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
                <span className="project-arrow"><ArrowUpRight size={20} /></span>
              </article>
            ))}
          </div>
          <div className="project-signal" aria-label="Selected project metrics">
            <div className="signal-heading"><span>LIVE EVIDENCE</span><strong>Measured outcomes, not just model names.</strong></div>
            <div className="signal-chart"><span className="chart-label">Recall@5</span><div className="chart-track"><i className="chart-bar chart-bar-before" /><i className="chart-bar chart-bar-after" /></div><strong>0.61 <b>→</b> 0.81</strong></div>
            <div className="signal-chart"><span className="chart-label">Throughput</span><div className="chart-track"><i className="chart-bar chart-bar-throughput" /></div><strong>+30%</strong></div>
            <div className="signal-chart"><span className="chart-label">Gold RMSE</span><div className="chart-track"><i className="chart-bar chart-bar-rmse" /></div><strong>−22%</strong></div>
          </div>
          <div className="additional-studies"><div className="additional-studies-heading"><p className="eyebrow">Additional studies</p><p>Independent analytical and academic work that shows the range of my data practice.</p></div><div className="mini-projects">
            <div id="forecasting-project"><span>01 / Forecasting · independent study</span><strong>CPU usage · MAPE about 8% versus about 18%</strong><p>SARIMAX and LightGBM ensemble with 12 month walk forward backtesting.</p></div>
            <div id="analytics-project"><span>02 / Analytics · academic project</span><strong>Sales intelligence · 4 dashboards</strong><p>Star schema warehouse and Power BI decision layer.</p></div>
            <div id="real-estate-project"><span>03 / Real estate · independent study</span><strong>30,000 plus Morocco listings</strong><p>ETL and statistical analysis across Avito, Sarouty, and Mubawab to identify price drivers by city and property type.</p></div>
            <div id="gold-project"><span>04 / Gold prediction · academic project</span><strong>GRU · 22% RMSE improvement</strong><p>LSTM and GRU models trained on 10 years of historical data and evaluated on a held out year.</p></div>
          </div></div>
        </section>

        <section id="geocara" data-chapter="01A / CASE STUDY" className={`case-study-section page-section ${caseStudyVisible ? "is-visible" : ""}`}>
          <div className="section-index"><span>01</span><span>CASE STUDY</span></div>
          <div className="case-study-content geocara-redesign">
            <div className="geocara-intro">
              <div className="geocara-kicker"><span className="eyebrow">Featured system</span><strong>GEOCARA</strong><span className="geocara-status">Generovo · Full Stack AI Engineer Intern</span></div>
              <div className="geocara-title"><h2>From crawl to<br /><em>credible answer.</em></h2><p>GEOCARA turns scattered web evidence into structured, fact checked answer material that can be reviewed before publication.</p></div>
            </div>
            <div className="geocara-evidence-head"><span>01 / Evidence map</span><p>A content intelligence pipeline that keeps the path from source page to answer material visible.</p></div>
            <div className="case-study-grid geocara-evidence-grid">
              <article className="case-stat"><span className="case-label">Problem</span><h3>Trust breaks when answer engines cannot show where a claim came from.</h3><p>Research teams needed a repeatable way to move from audit brief to citation ready answer without losing the evidence trail.</p></article>
              <article className="case-stat"><span className="case-label">System</span><h3>One pipeline, six GEO metrics, one editorial trace.</h3><p>React, TypeScript, Puppeteer, Cheerio, and LLM workflows coordinate crawling, enrichment, scoring, fact checking, and publication.</p></article>
              <article className="case-stat case-stat-result"><span className="case-label">Result</span><strong className="geocara-big-metric">6 <small>GEO metrics</small></strong><h3>Scored across 50 page crawls.</h3><p>Audit scores run from 0 to 100, with publication blocked when the fact check score falls below the agreed 70% threshold.</p></article>
            </div>
            <div className="geocara-process-label"><span>02 / Operating sequence</span><span>Audit to publication</span></div>
            <div className="case-study-diagram" aria-label="GEOCARA process diagram">
              <div><span>01</span><strong>crawl</strong><small>source pages</small></div><i>→</i><div><span>02</span><strong>enrich</strong><small>structured evidence</small></div><i>→</i><div><span>03</span><strong>verify</strong><small>fact check gate</small></div><i>→</i><div><span>04</span><strong>publish</strong><small>answer material</small></div>
            </div>
          </div>
        </section>

        <section id="experience" data-chapter="02 / EXPERIENCE" className="experience-section page-section">
          <div className="section-index"><span>02</span><span>EXPERIENCE</span></div>
          <div className="experience-main">
            <div className="section-heading compact"><div><p className="eyebrow">The timeline</p><h2>Learning by<br /><em>shipping.</em></h2></div><p className="section-lede">A foundation in systems and networks, deepened through applied data science, and now focused on AI products that earn their place in a workflow.</p></div>
            <div className="timeline">
              {experience.map((item) => <div className="timeline-item" key={item.period + item.company}><span className="timeline-year">{item.period}</span><div><h3>{item.role}</h3><p className="timeline-company">{item.company}</p><p>{item.detail}</p></div></div>)}
            </div>
          </div>
        </section>

        <section id="capabilities" data-chapter="03 / CAPABILITIES" className="capabilities-section page-section">
          <div className="section-index"><span>03</span><span>CAPABILITIES</span></div>
          <div className="capabilities-main"><div className="section-heading compact"><div><p className="eyebrow">The working set</p><h2>Tools that make<br /><em>systems useful.</em></h2></div><p className="section-lede">The technical range behind the projects, from retrieval and data practice to production interfaces and clear handoffs.</p></div>
          <div className="capability-grid">{capabilities.map(({ icon: Icon, label, text }) => <div className="capability" key={label}><Icon size={20} strokeWidth={1.6} /><p>{label}</p><span>{text}</span></div>)}</div></div>
        </section>

        <section id="about" data-chapter="04 / ABOUT" className="about-section page-section">
          <div className="section-index"><span>04</span><span>ABOUT</span></div>
          <div className="about-copy"><div className="about-portrait"><img src={portraitImage} alt="Portrait illustration of Imane Taghzout" /><span>IM / PORTRAIT 01</span></div><p className="eyebrow">A little context</p><h2>Curious about the space between a question and a <em>useful answer.</em></h2><p>I am Imane, a Data Scientist and AI Engineer with a Master&apos;s degree in Data Science & AI. My work spans retrieval, language models, document intelligence, forecasting, and analytics. I like the parts of a project where technical judgment meets a real person&apos;s need: choosing what to measure, making uncertainty visible, and leaving the next person a clearer system than I found.</p><div className="about-details"><span>01 / Mundiapolis University<br /><strong>M.Sc. Data Science & AI · 2025</strong></span><span>02 / In the margins<br /><strong>Chess · AI research · travel</strong></span></div></div>
        </section>

        <section id="field-notes" data-chapter="05 / FIELD NOTES" className="field-notes-section page-section">
          <div className="section-index"><span>05</span><span>FIELD NOTES</span></div>
          <div className="field-notes-main"><div className="section-heading compact"><div><p className="eyebrow">How I work</p><h2>Three notes from<br /><em>the workbench.</em></h2></div><p className="section-lede">The decisions I return to when the model is only one part of the system.</p></div><div className="field-note-grid"><article><span>01</span><h3>Trace the trust.</h3><p>Make the path from source to answer visible enough that another person can question it, improve it, and use it with confidence.</p></article><article><span>02</span><h3>Measure the useful.</h3><p>Choose metrics that describe a real workflow. A better score matters most when it gives somebody time, clarity, or a better decision.</p></article><article><span>03</span><h3>Ship the whole thing.</h3><p>A model is not a product. I care about the retrieval, interface, logging, handoff, and small details that make intelligence dependable.</p></article></div></div>
        </section>

        <section id="credentials" data-chapter="06 / CREDENTIALS" className="credentials-section page-section">
          <div className="section-index"><span>06</span><span>CREDENTIALS</span></div>
          <div className="credentials-main"><div className="section-heading compact"><div><p className="eyebrow">The full picture</p><h2>More than a<br /><em>project list.</em></h2></div><p className="section-lede">The training, tools, and context behind the work, collected so the person behind the projects is easy to understand.</p></div><div className="credentials-grid"><article><span className="credential-label">Education</span><h3>M.Sc. Data Science & AI</h3><p>Mundiapolis University · Casablanca · 2025</p><h3>Data Science Program</h3><p>ALX Africa · 16 months · 2024</p><h3>Cybersecurity Fundamentals</h3><p>Cyber4D · 6 months · 2023</p><h3>B.Sc. Mathematics & Computer Science</h3><p>Hassan II University · 2021</p></article><article><span className="credential-label">Certifications</span><p>Microsoft Azure Fundamentals, Data Fundamentals, and AI Fundamentals.</p><p>AI Augmented Data Analyst Bootcamp · JobInTech / AI Institute by Holmarcom, Oct 2025 to Feb 2026.</p><p>Oracle Cloud Infrastructure Data Science Professional, Analytics Cloud Professional, and AI Foundations Associate.</p><p>Cyber4D Cybersecurity Fundamentals · AWS Academy Cloud Foundations · 365 Data Science Career Track.</p></article><article><span className="credential-label">Languages & interests</span><p>Arabic and Tamazight · native<br />French · fluent, C1/C2<br />English · fluent, C1</p><p className="credential-interests">Chess · AI research trends · reading · travel</p></article></div></div>
        </section>

        <section id="contact" data-chapter="07 / CONTACT" className="contact-section page-section"><div className="section-transition"><span>06 → 07</span><strong>From capability to conversation.</strong></div><div className="contact-inner"><p className="eyebrow">Have a good problem?</p><h2>Let&apos;s make the<br /><em>signal clearer.</em></h2><a className="button button-light" href="mailto:taghzoutimane@gmail.com?subject=Applied%20AI%20portfolio%20conversation&body=Hello%20Imane%2C%0A%0AI%20would%20like%20to%20discuss%20an%20applied%20AI%20opportunity.">Email Imane <Mail size={17} /></a><p className="contact-note">Open to Data Scientist, Data Analyst, and ML Engineer opportunities in applied AI, consulting, financial services, and LLM powered products.</p></div><div className="contact-index">07<br /><span>CONTACT</span></div></section>
      </main>

      <footer className="site-footer"><div><img src={monogram} alt="" className="footer-mark" /><span>IMANE TAGHZOUT<br /><small>Data Scientist · AI Engineer</small></span></div><div className="footer-links"><a href="https://github.com/imane-tag" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="https://linkedin.com/in/imane-taghzout" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="mailto:taghzoutimane@gmail.com"><Mail size={16} /> Email</a></div><p>© 2026 Imane Taghzout. Built with intent.</p></footer>
      <div className="scroll-controls" aria-label="Page scrolling controls"><button className={`scroll-control scroll-control-up ${scrollBounds.atTop ? "is-disabled" : ""}`} onClick={() => scrollByViewport(-1)} disabled={scrollBounds.atTop} aria-label={scrollBounds.atTop ? "Already at the top" : "Scroll up"} title={scrollBounds.atTop ? "Already at the top" : "Scroll up"}><ChevronUp size={17} /></button><button className={`scroll-control scroll-control-down ${scrollBounds.atBottom ? "is-disabled" : ""}`} onClick={() => scrollByViewport(1)} disabled={scrollBounds.atBottom} aria-label={scrollBounds.atBottom ? "Already at the bottom" : "Scroll down"} title={scrollBounds.atBottom ? "Already at the bottom" : "Scroll down"}><ChevronDown size={17} /></button></div>
    </div>
  );
}
