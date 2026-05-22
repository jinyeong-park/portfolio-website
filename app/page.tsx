import Image from "next/image";

function PromptLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-accent select-none">&gt;</span>
      <span className="text-accent">{text}</span>
    </div>
  );
}

function IndentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l border-border pl-4 sm:pl-6 mt-1">{children}</div>
  );
}

const skills = [
  { label: "product", value: "Product Strategy · Roadmapping · PRD Writing" },
  { label: "marketing", value: "Meta Ads · TikTok Ads · ROAS Optimization" },
  {
    label: "engineering",
    value: "Python · JavaScript · Node.js · React · REST APIs",
  },
  {
    label: "ai/ml",
    value: "Claude API · GPT-4o · LLM APIs · Google AI Studio · RAG",
  },
  { label: "data", value: "SQL · Funnel Analytics · Cohort Analysis" },
];

const projects = [
  {
    name: "JYNLAB",
    description: "App Store intelligence — find zombie app niches",
    href: "https://jynlab.com",
    label: "jynlab.com",
  },
  {
    name: "ADMADE",
    description: "AI-powered ad creative generation platform",
    href: "https://admade.com",
    label: "admade.com",
  },
  {
    name: "funnellens",
    description: "AI funnel diagnostic agent for conversion gaps",
    href: "https://github.com/jinyeong-park/funnellens",
    label: "github",
  },
  {
    name: "qrefiner",
    description: "User-research question refinement (The Mom Test)",
    href: "https://github.com/jinyeong-park/qrefiner",
    label: "github",
  },
  {
    name: "pm-prd-generator",
    description: "Automate product requirements docs with LLM",
    href: "https://github.com/jinyeong-park/pm-prd-generator",
    label: "github",
  },
];

const contacts = [
  {
    label: "email",
    value: "byjennypark@gmail.com",
    href: "mailto:byjennypark@gmail.com",
  },
  {
    label: "linkedin",
    value: "/in/jennypark7",
    href: "https://www.linkedin.com/in/jennypark7/",
  },
  {
    label: "github",
    value: "/jinyeong-park",
    href: "https://github.com/jinyeong-park",
  },
  { label: "web", value: "jynlab.com", href: "https://jynlab.com" },
];

export default function Home() {
  return (
    <main className="bg-background min-h-screen p-2 sm:p-3">
      <div className="border border-border rounded-lg overflow-hidden min-h-[calc(100vh-1rem)] flex flex-col">
        {/* Chrome bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: "#ff5f57" }}
            />
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: "#febc2e" }}
            />
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: "#28c840" }}
            />
            <span className="text-dim ml-3 text-sm">
              jenny@terminal — 0:45
            </span>
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
          {/* Prompt 1: who is jenny? */}
          <section>
            <PromptLine text="who is jenny?" />
            <IndentBlock>
              <div className="flex flex-col md:flex-row gap-8 mt-4">
                {/* Avatar */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div
                    className="relative w-52 h-52 rounded-full ring-2 ring-accent"
                    style={{
                      boxShadow: "0 0 80px -15px rgba(245,158,11,0.55)",
                    }}
                  >
                    <Image
                      src="/me.png"
                      alt="Jenny Park"
                      fill
                      className="rounded-full object-cover"
                      priority
                    />
                  </div>
                  <span className="text-muted text-xs">me.png</span>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3 justify-center">
                  <h1 className="text-5xl sm:text-6xl font-bold uppercase tracking-wide text-foreground">
                    JENNY PARK
                  </h1>
                  <p className="text-2xl text-success">
                    Product Manager &amp; AI-Native Builder
                  </p>
                  <p className="text-lg leading-relaxed">
                    Multi-disciplinary operator bridging{" "}
                    <span className="text-accent">performance marketing</span>{" "}
                    and{" "}
                    <span className="text-accent">product engineering</span>
                  </p>
                  <p className="text-dim">// San Jose, CA</p>

                  {/* Social icons */}
                  <div className="flex items-center gap-4 mt-1">
                    {/* GitHub */}
                    <a
                      href="https://github.com/jinyeong-park"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dim hover:text-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/jennypark7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dim hover:text-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>

                    {/* Globe (jynlab.com) */}
                    <a
                      href="https://jynlab.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dim hover:text-accent transition-colors"
                      aria-label="Website"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </a>

                    {/* Mail */}
                    <a
                      href="mailto:byjennypark@gmail.com"
                      className="text-dim hover:text-accent transition-colors"
                      aria-label="Email"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </IndentBlock>
          </section>

          {/* Prompt 2: background */}
          <section>
            <PromptLine text="tell me more about her background" />
            <IndentBlock>
              <p className="text-lg leading-8 max-w-3xl mt-4">
                Jenny Park is a PM and indie builder operating at the
                intersection of{" "}
                <span className="text-accent">AdTech strategy</span> and{" "}
                <span className="text-accent">AI-native product development</span>
                . She has driven ROAS-optimized campaigns across{" "}
                <span className="text-accent">Meta and TikTok Ads</span>, while
                rapid-prototyping and shipping tools leveraging{" "}
                <span className="text-accent">Claude Code</span>,{" "}
                <span className="text-accent">OpenAI Codex</span>, and the
                broader{" "}
                <span className="text-accent">LLM ecosystem</span> (Gemini,
                Perplexity). Currently, she is building{" "}
                <span className="text-accent">JYNLAB</span>, a
                market-intelligence platform helping indie developers spot
                opportunities in underperforming App Store apps.
              </p>
            </IndentBlock>
          </section>

          {/* Prompt 3: skills */}
          <section>
            <PromptLine text="cat skills.txt" />
            <IndentBlock>
              <div className="mt-4 space-y-1.5">
                {skills.map(({ label, value }) => (
                  <div key={label} className="flex gap-4 text-sm sm:text-base">
                    <span className="text-highlight w-24 shrink-0">{label}</span>
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </IndentBlock>
          </section>

          {/* Prompt 4: projects */}
          <section>
            <PromptLine text="ls projects/" />
            <IndentBlock>
              <div className="mt-4 space-y-2">
                {projects.map(({ name, description, href, label }) => (
                  <div
                    key={name}
                    className="flex items-baseline justify-between gap-4 text-sm sm:text-base"
                  >
                    <div className="flex items-baseline gap-0 min-w-0">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-highlight hover:underline underline-offset-4 shrink-0"
                      >
                        {name}
                      </a>
                      <span className="text-foreground truncate">
                        &nbsp;— {description}
                      </span>
                    </div>
                    <span className="text-muted text-xs shrink-0">
                      ↗ {label}
                    </span>
                  </div>
                ))}
              </div>
            </IndentBlock>
          </section>

          {/* Prompt 5: contact */}
          <section>
            <PromptLine text="cat contact.txt" />
            <IndentBlock>
              <div className="mt-4 space-y-1.5">
                {contacts.map(({ label, value, href }) => (
                  <div key={label} className="flex gap-4 text-sm sm:text-base">
                    <span className="text-dim w-20 shrink-0">{label}</span>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel={
                        href.startsWith("mailto")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="text-highlight hover:underline underline-offset-4"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </IndentBlock>
          </section>

          {/* Trailing cursor */}
          <div className="flex items-center gap-2 pt-2 pb-4">
            <span className="text-accent">&gt;</span>
            <span className="w-2 h-5 bg-accent inline-block" />
          </div>
        </div>
      </div>
    </main>
  );
}
