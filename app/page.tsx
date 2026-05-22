"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "hidden" | "prompt" | "tools" | "stream" | "done";

interface SectionState {
  phase: Phase;
  promptChars: number;
  toolsDone: number;
  toolsExpanded: boolean;
  streamedUnits: number;
}

// ─── Animation constants ──────────────────────────────────────────────────────

const BRAILLE = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const TYPING_MS = 34;
const TOOL_MS = 390;
const TOOL_COLLAPSE_MS = 220;

const PROMPTS = [
  "who is jenny?",
  "tell me more about her background",
  "cat skills.txt",
  "ls projects/",
  "cat contact.txt",
];

const SECTION_TOOLS: string[][] = [
  ["Reading bio.md", "Loading me.png", "Fetching profile.json"],
  ["Reading background.md", "Fetching experience.json"],
  ["Parsing skills.json", "Reading tech-stack.md"],
  ["Fetching projects/", "Loading project metadata", "Resolving links"],
  ["Reading contact.txt"],
];

// ─── Bio tokens ──────────────────────────────────────────────────────────────

type BioToken = { word: string; accent?: boolean };

const RAW_BIO: Array<{ text: string; accent?: boolean }> = [
  { text: "Jenny Park is a PM and indie builder operating at the intersection of " },
  { text: "AdTech strategy", accent: true },
  { text: " and " },
  { text: "AI-native product development", accent: true },
  { text: ". She has driven ROAS-optimized campaigns across " },
  { text: "Meta and TikTok Ads", accent: true },
  { text: ", while rapid-prototyping and shipping tools leveraging " },
  { text: "Claude Code", accent: true },
  { text: ", " },
  { text: "OpenAI Codex", accent: true },
  { text: ", and the broader " },
  { text: "LLM ecosystem", accent: true },
  { text: " (Gemini, Perplexity). Currently, she is building " },
  { text: "JYNLAB", accent: true },
  { text: ", a market-intelligence platform helping indie developers spot opportunities in underperforming App Store apps." },
];

const BIO_TOKENS: BioToken[] = RAW_BIO.flatMap((part) =>
  part.accent
    ? [{ word: part.text, accent: true }]
    : (part.text.match(/\S+\s*/g) ?? []).map((w) => ({ word: w }))
);

const STREAM_UNITS = [4, BIO_TOKENS.length, 5, 5, 4];
const STREAM_MS = [110, 28, 75, 65, 65];

// ─── Section data ─────────────────────────────────────────────────────────────

const skills = [
  { label: "product", value: "Product Strategy · Roadmapping · PRD Writing" },
  { label: "marketing", value: "Meta Ads · TikTok Ads · ROAS Optimization" },
  { label: "engineering", value: "Python · JavaScript · Node.js · React · REST APIs" },
  { label: "ai/ml", value: "Claude API · GPT-4o · LLM APIs · Google AI Studio · RAG" },
  { label: "data", value: "SQL · Funnel Analytics · Cohort Analysis" },
];

const projects = [
  { name: "JYNLAB", description: "App Store intelligence — find zombie app niches", href: "https://jynlab.com", label: "jynlab.com" },
  { name: "ADMADE", description: "AI-powered ad creative generation platform", href: "https://admade.com", label: "admade.com" },
  { name: "funnellens", description: "AI funnel diagnostic agent for conversion gaps", href: "https://github.com/jinyeong-park/funnellens", label: "github" },
  { name: "qrefiner", description: "User-research question refinement (The Mom Test)", href: "https://github.com/jinyeong-park/qrefiner", label: "github" },
  { name: "pm-prd-generator", description: "Automate product requirements docs with LLM", href: "https://github.com/jinyeong-park/pm-prd-generator", label: "github" },
];

const contacts = [
  { label: "email", value: "byjennypark@gmail.com", href: "mailto:byjennypark@gmail.com" },
  { label: "linkedin", value: "/in/jennypark7", href: "https://www.linkedin.com/in/jennypark7/" },
  { label: "github", value: "/jinyeong-park", href: "https://github.com/jinyeong-park" },
  { label: "web", value: "jynlab.com", href: "https://jynlab.com" },
];

// ─── Small components ─────────────────────────────────────────────────────────

function BlockCursor({ blinking = false }: { blinking?: boolean }) {
  return (
    <span
      className={`inline-block w-[9px] h-[1.1em] bg-accent align-middle ml-0.5${blinking ? " cursor-blink" : ""}`}
    />
  );
}

function BrailleSpinner() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % BRAILLE.length), 100);
    return () => clearInterval(id);
  }, []);
  return <span className="text-accent">{BRAILLE[frame]}</span>;
}

function IndentBlock({ children }: { children: React.ReactNode }) {
  return <div className="border-l border-border pl-4 sm:pl-6 mt-1">{children}</div>;
}

function ToolUseBlock({
  tools,
  toolsDone,
  expanded,
  running,
  onToggle,
}: {
  tools: string[];
  toolsDone: number;
  expanded: boolean;
  running: boolean;
  onToggle: () => void;
}) {
  const allDone = toolsDone >= tools.length;
  return (
    <div className="my-2 text-xs">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 text-dim hover:text-foreground transition-colors cursor-pointer"
      >
        <span className={allDone ? "text-success" : "text-accent"}>●</span>
        <span>
          {tools.length} tool use{tools.length !== 1 ? "s" : ""}
        </span>
        <span className="text-muted">{expanded ? "▾" : "▸"}</span>
      </button>
      {expanded && (
        <div className="mt-1 pl-3 border-l border-border space-y-0.5">
          {tools.map((tool, i) => (
            <div key={tool} className="flex items-center gap-2 text-dim">
              {i < toolsDone ? (
                <span className="text-success">✓</span>
              ) : i === toolsDone && running ? (
                <BrailleSpinner />
              ) : (
                <span className="w-3 inline-block" />
              )}
              <span>{tool}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section body components ──────────────────────────────────────────────────

function HeroBody({ revealed }: { revealed: number }) {
  const r = revealed === Infinity ? 999 : revealed;
  return (
    <div className="flex flex-col md:flex-row gap-8 mt-4">
      {r >= 1 && (
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div
            className="relative w-52 h-52 rounded-full ring-2 ring-accent"
            style={{ boxShadow: "0 0 80px -15px rgba(245,158,11,0.55)" }}
          >
            <Image src="/me.png" alt="Jenny Park" fill className="rounded-full object-cover" priority />
          </div>
          <span className="text-muted text-xs">me.png</span>
        </div>
      )}
      {r >= 2 && (
        <div className="flex flex-col gap-3 justify-center">
          <h1 className="text-5xl sm:text-6xl font-bold uppercase tracking-wide text-foreground">
            JENNY PARK
          </h1>
          <p className="text-2xl text-success">Product Manager &amp; AI-Native Builder</p>
          {r >= 3 && (
            <>
              <p className="text-lg leading-relaxed">
                Multi-disciplinary operator bridging{" "}
                <span className="text-accent">performance marketing</span> and{" "}
                <span className="text-accent">product engineering</span>
              </p>
              <p className="text-dim">// San Jose, CA</p>
            </>
          )}
          {r >= 4 && (
            <div className="flex items-center gap-4 mt-1">
              <a href="https://github.com/jinyeong-park" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/jennypark7/" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://jynlab.com" target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors" aria-label="Website">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
              <a href="mailto:byjennypark@gmail.com" className="text-dim hover:text-accent transition-colors" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BioBody({ revealed, showCursor }: { revealed: number; showCursor?: boolean }) {
  const tokens = BIO_TOKENS.slice(0, revealed === Infinity ? BIO_TOKENS.length : revealed);
  return (
    <p className="text-lg leading-8 max-w-3xl mt-4">
      {tokens.map((t, i) =>
        t.accent ? (
          <span key={i} className="text-accent">{t.word}</span>
        ) : (
          <span key={i}>{t.word}</span>
        )
      )}
      {showCursor && <BlockCursor blinking />}
    </p>
  );
}

function SkillsBody({ revealed, showCursor }: { revealed: number; showCursor?: boolean }) {
  const cap = Math.min(revealed === Infinity ? 999 : revealed, skills.length);
  return (
    <div className="mt-4 space-y-1.5">
      {skills.slice(0, cap).map(({ label, value }, idx) => (
        <div key={label} className="flex gap-4 text-sm sm:text-base">
          <span className="text-highlight w-24 shrink-0">{label}</span>
          <span className="text-foreground">
            {value}
            {showCursor && idx === cap - 1 && <BlockCursor blinking />}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProjectsBody({ revealed, showCursor }: { revealed: number; showCursor?: boolean }) {
  const cap = Math.min(revealed === Infinity ? 999 : revealed, projects.length);
  return (
    <div className="mt-4 space-y-2">
      {projects.slice(0, cap).map(({ name, description, href, label }, idx) => (
        <div key={name} className="flex items-baseline justify-between gap-4 text-sm sm:text-base">
          <div className="flex items-baseline gap-0 min-w-0">
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline underline-offset-4 shrink-0">
              {name}
            </a>
            <span className="text-foreground truncate">&nbsp;— {description}</span>
            {showCursor && idx === cap - 1 && <BlockCursor blinking />}
          </div>
          <span className="text-muted text-xs shrink-0">↗ {label}</span>
        </div>
      ))}
    </div>
  );
}

function ContactBody({ revealed, showCursor }: { revealed: number; showCursor?: boolean }) {
  const cap = Math.min(revealed === Infinity ? 999 : revealed, contacts.length);
  return (
    <div className="mt-4 space-y-1.5">
      {contacts.slice(0, cap).map(({ label, value, href }, idx) => (
        <div key={label} className="flex gap-4 text-sm sm:text-base">
          <span className="text-dim w-20 shrink-0">{label}</span>
          <a
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="text-highlight hover:underline underline-offset-4"
          >
            {value}
          </a>
          {showCursor && idx === cap - 1 && <BlockCursor blinking />}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const DONE_STATE: SectionState[] = Array.from({ length: 5 }, () => ({
  phase: "done" as Phase,
  promptChars: Infinity,
  toolsDone: Infinity,
  toolsExpanded: false,
  streamedUnits: Infinity,
}));

export default function Home() {
  const [sections, setSections] = useState<SectionState[]>(DONE_STATE);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyRan = sessionStorage.getItem("portfolio-animated") === "1";
    if (reduced || alreadyRan) return;
    sessionStorage.setItem("portfolio-animated", "1");

    const cancelled = { value: false };

    function update(i: number, patch: Partial<SectionState>) {
      setSections((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s))
      );
    }

    function sleep(ms: number) {
      return new Promise<void>((res) => setTimeout(res, ms));
    }

    async function animateSection(i: number) {
      const prompt = PROMPTS[i];
      const tools = SECTION_TOOLS[i];
      const totalUnits = STREAM_UNITS[i];
      const streamMs = STREAM_MS[i];

      // Type the prompt
      update(i, { phase: "prompt", promptChars: 0 });
      for (let c = 1; c <= prompt.length; c++) {
        if (cancelled.value) return;
        await sleep(TYPING_MS);
        update(i, { promptChars: c });
      }

      // Run tool actions (expanded)
      update(i, { phase: "tools", toolsDone: 0, toolsExpanded: true });
      for (let t = 0; t < tools.length; t++) {
        if (cancelled.value) return;
        await sleep(TOOL_MS);
        update(i, { toolsDone: t + 1 });
      }

      // Collapse tool block
      await sleep(TOOL_COLLAPSE_MS);
      if (cancelled.value) return;
      update(i, { toolsExpanded: false });

      // Stream section body
      update(i, { phase: "stream", streamedUnits: 0 });
      for (let u = 1; u <= totalUnits; u++) {
        if (cancelled.value) return;
        await sleep(streamMs);
        update(i, { streamedUnits: u });
      }

      update(i, { phase: "done" });
    }

    async function runAll() {
      setSections(
        Array.from({ length: 5 }, () => ({
          phase: "hidden" as Phase,
          promptChars: 0,
          toolsDone: 0,
          toolsExpanded: false,
          streamedUnits: 0,
        }))
      );
      for (let i = 0; i < 5; i++) {
        if (cancelled.value) return;
        await animateSection(i);
      }
    }

    runAll();
    return () => { cancelled.value = true; };
  }, []);

  const allDone = sections.every((s) => s.phase === "done");

  function renderSection(i: number) {
    const s = sections[i];
    if (s.phase === "hidden") return null;

    const prompt = PROMPTS[i];
    const tools = SECTION_TOOLS[i];
    const isTyping = s.phase === "prompt";
    const isTools = s.phase === "tools";
    const isStream = s.phase === "stream";
    const isDone = s.phase === "done";
    const showBody = isStream || isDone;
    const revealed = isDone ? Infinity : s.streamedUnits;

    return (
      <section key={i}>
        {/* Prompt line */}
        <div className="flex items-center gap-2">
          <span className="text-accent select-none">&gt;</span>
          <span className="text-accent">
            {isTyping ? prompt.slice(0, s.promptChars) : prompt}
          </span>
          {isTyping && <BlockCursor blinking />}
        </div>

        {/* Tool use block */}
        {!isTyping && (
          <ToolUseBlock
            tools={tools}
            toolsDone={s.toolsDone}
            expanded={s.toolsExpanded}
            running={isTools}
            onToggle={() =>
              setSections((prev) =>
                prev.map((sec, idx) =>
                  idx === i ? { ...sec, toolsExpanded: !sec.toolsExpanded } : sec
                )
              )
            }
          />
        )}

        {/* Section body */}
        {showBody && (
          <IndentBlock>
            {i === 0 && <HeroBody revealed={revealed} />}
            {i === 1 && <BioBody revealed={revealed} showCursor={isStream} />}
            {i === 2 && <SkillsBody revealed={revealed} showCursor={isStream} />}
            {i === 3 && <ProjectsBody revealed={revealed} showCursor={isStream} />}
            {i === 4 && <ContactBody revealed={revealed} showCursor={isStream} />}
            {i === 0 && isStream && (
              <div className="mt-2">
                <BlockCursor blinking />
              </div>
            )}
          </IndentBlock>
        )}
      </section>
    );
  }

  return (
    <main className="bg-background min-h-screen p-2 sm:p-3">
      <div className="border border-border rounded-lg overflow-hidden min-h-[calc(100vh-1rem)] flex flex-col">
        {/* Chrome bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#28c840" }} />
            <span className="text-dim ml-3 text-sm">jenny@terminal — 0:45</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-accent text-accent text-xs px-3 py-1 rounded-md cursor-default">
              new session
            </button>
            <kbd className="border border-border text-dim text-xs px-2 py-1 rounded font-mono">
              Ctrl+K
            </kbd>
            <span className="flex items-center gap-1.5 text-dim text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              online
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-10">
          {sections.map((_, i) => renderSection(i))}

          {/* Trailing cursor — blinks only when all sections are done */}
          <div className="flex items-center gap-2 pt-2 pb-4">
            <span className="text-accent">&gt;</span>
            <BlockCursor blinking={allDone} />
          </div>
        </div>
      </div>
    </main>
  );
}
