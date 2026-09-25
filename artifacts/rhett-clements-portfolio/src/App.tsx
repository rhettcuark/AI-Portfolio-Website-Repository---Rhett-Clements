import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  return <div className={`reveal ${delay} ${className}`}>{children}</div>;
}

function LogoMark() {
  return (
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center border border-foreground/30 bg-accent text-accent-foreground" aria-hidden="true">
      <span className="font-mono-ui text-[11px] font-bold tracking-[-0.08em]">RC</span>
      <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-foreground" />
    </span>
  );
}

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#contact', label: 'Contact' },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="focus-ring flex items-center gap-3" data-testid="link-logo">
          <LogoMark />
          <span className="font-mono-ui text-[11px] font-bold uppercase tracking-[0.18em]">Rhett Clements</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="line-draw focus-ring font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground" data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="mailto:clementsrhett@gmail.com" className="focus-ring hidden items-center gap-2 border border-foreground/20 px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[0.13em] transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground sm:flex" data-testid="link-header-email">
          Let&apos;s connect <ArrowUpRight size={13} />
        </a>
        <button type="button" className="focus-ring flex h-10 w-10 items-center justify-center md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-foreground/10 bg-background px-5 py-5 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="focus-ring flex items-center justify-between border-b border-foreground/10 pb-4 font-mono-ui text-[11px] uppercase tracking-[0.16em]" data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                {item.label} <ArrowUpRight size={15} className="text-accent" />
              </a>
            ))}
            <a href="mailto:clementsrhett@gmail.com" onClick={() => setOpen(false)} className="focus-ring flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-accent" data-testid="link-mobile-email">
              Email Rhett <Mail size={14} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function SignalBar() {
  return (
    <div className="overflow-hidden border-y border-foreground/15 bg-secondary/60 py-3">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, group) => (
          <div className="flex items-center gap-10" key={group}>
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Information systems</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Business analytics</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Greenwood, Arkansas</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="paper-grid relative overflow-hidden pt-[72px]" data-testid="section-hero">
      <div className="mx-auto grid min-h-[700px] max-w-[1440px] grid-cols-1 gap-10 px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[1.2fr_.8fr] lg:px-12 lg:pb-28">
        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="mb-8 flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" />
              Open to what&apos;s next
            </div>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <h1 className="max-w-4xl text-balance font-display text-[clamp(4.8rem,12vw,10.5rem)] leading-[0.78] tracking-[-0.045em] text-foreground">
              Rhett
              <br />
              <span className="ml-[10vw] text-accent">Clements</span>
            </h1>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="mt-10 max-w-2xl">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A dependable early-career professional learning how good systems, clear communication, and thoughtful analysis help people do their best work.
            </p>
          </Reveal>
          <Reveal delay="reveal-delay-3" className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#experience" className="focus-ring inline-flex items-center gap-3 bg-primary px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="link-hero-experience">
              See the work <ArrowDownRight size={16} />
            </a>
            <a href="mailto:clementsrhett@gmail.com" className="focus-ring inline-flex items-center gap-2 border-b border-foreground/40 pb-2 font-mono-ui text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-accent hover:text-accent" data-testid="link-hero-contact">
              Get in touch <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
        <div className="relative flex min-h-[340px] items-center justify-center lg:min-h-0">
          <div className="absolute right-[8%] top-[7%] h-64 w-64 rounded-full border border-foreground/15 sm:h-80 sm:w-80" />
          <div className="absolute right-[18%] top-[18%] h-44 w-44 rounded-full border border-accent/45 sm:h-56 sm:w-56" />
          <div className="hero-mark relative z-10 flex h-56 w-56 rotate-[-7deg] items-center justify-center border border-foreground/25 bg-accent p-8 text-accent-foreground shadow-[14px_14px_0_hsl(var(--primary))] sm:h-64 sm:w-64">
            <div className="text-center">
              <BarChart3 size={36} strokeWidth={1.3} className="mx-auto mb-7" />
              <p className="font-mono-ui text-[10px] uppercase leading-[1.8] tracking-[0.18em]">
                People
                <br />
                + systems
                <br />
                + curiosity
              </p>
            </div>
          </div>
          <div className="absolute bottom-[8%] left-[3%] flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-2 w-2 bg-accent" /> 35° 19&apos; N / 94° 24&apos; W
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 border-t border-foreground/15 sm:grid-cols-4">
        {[
          ['3.62', 'Undergraduate GPA'],
          ['2026', "Bachelor's in Business Analytics"],
          ["Master's", 'Product Innovation · in progress'],
          ['AR', 'Rooted in Greenwood'],
        ].map(([value, label], index) => (
          <div key={value} className={`border-r border-foreground/15 px-5 py-6 last:border-r-0 sm:px-8 lg:px-12 ${index > 1 ? 'border-t sm:border-t-0' : ''}`} data-testid={`stat-${index}`}>
            <p className="font-display text-3xl tracking-[-0.03em] text-accent sm:text-4xl">{value}</p>
            <p className="mt-2 max-w-[150px] font-mono-ui text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="section-about">
      <div className="grid gap-12 lg:grid-cols-[.4fr_1fr] lg:gap-24">
        <Reveal>
          <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-accent">
            <span className="font-display text-4xl text-foreground">01</span>
            <span className="h-px w-8 bg-accent" />
            The short version
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="max-w-4xl font-display text-5xl leading-[0.92] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
              Thoughtful by
              <br />
              <em className="text-accent">default.</em>
            </h2>
          </Reveal>
          <Reveal delay="reveal-delay-1" className="mt-10 grid gap-8 border-t border-foreground/15 pt-8 sm:grid-cols-2">
            <p className="text-base leading-[1.8] text-muted-foreground" data-testid="text-about-primary">
              I graduated from the University of Arkansas in 2026 with a bachelor&apos;s degree in Business Analytics. I&apos;m now pursuing a master&apos;s in Product Innovation at the same university.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground" data-testid="text-about-secondary">
              My background has taught me to be both detail-oriented and adaptable. Whether I&apos;m organizing a space, learning a new tool, or contributing to a team, I bring a steady presence and a genuine willingness to learn.
            </p>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="mt-9 border-l-2 border-accent pl-5" data-testid="text-career-goals">
            <p className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-accent">Looking ahead</p>
            <p className="mt-3 max-w-3xl text-base leading-[1.8] text-muted-foreground">
              My goal is to bring my graphic design skills into a more business-oriented workplace and stay ahead of the AI revolution. I&apos;m interested in using AI efficiently to make better use of available resources in a changing marketplace.
            </p>
          </Reveal>
          <Reveal delay="reveal-delay-3" className="mt-10 flex flex-wrap gap-2">
            {['Analytical', 'Dependable', 'Creative', 'Clear communicator'].map((label) => (
              <span key={label} className="border border-foreground/20 px-3 py-2 font-mono-ui text-[9px] uppercase tracking-[0.13em] text-foreground/75" data-testid={`tag-quality-${label.toLowerCase().replaceAll(' ', '-')}`}>
                {label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-primary text-primary-foreground" data-testid="section-experience">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.4fr_1fr] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-accent">
              <span className="font-display text-4xl text-primary-foreground">02</span>
              <span className="h-px w-8 bg-accent" />
              Experience
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="max-w-2xl font-display text-5xl leading-[.95] tracking-[-0.03em] sm:text-7xl">
                Work that rewards
                <br />
                <em className="text-accent">showing up.</em>
              </p>
            </Reveal>
            <div className="mt-14">
              <Reveal>
                <article className="grid gap-7 border-t border-primary-foreground/20 py-8 sm:grid-cols-[.7fr_1fr] lg:grid-cols-[.7fr_1.3fr]">
                  <div>
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-accent">Jan 2022 — Present</p>
                    <h3 className="mt-4 text-xl font-semibold">House Cleaner</h3>
                    <p className="mt-1 text-sm text-primary-foreground/60">Ronald Ragon Realty · Pea Ridge, Arkansas</p>
                  </div>
                  <div>
                    <p className="max-w-xl text-base leading-[1.8] text-primary-foreground/70">
                      Maintaining clean, ready spaces with consistency and care. Swept, mopped, and vacuumed floors; dusted and wiped furniture, built-in surfaces, and appliances; and removed bin waste from offices and bathrooms.
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.12em] text-accent"><Check size={14} /> Consistency in the details</div>
                  </div>
                </article>
              </Reveal>
              <Reveal delay="reveal-delay-1">
                <article className="grid gap-7 border-y border-primary-foreground/20 py-8 sm:grid-cols-[.7fr_1fr] lg:grid-cols-[.7fr_1.3fr]">
                  <div>
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-accent">Jun 2019 — Aug 2021</p>
                    <h3 className="mt-4 text-xl font-semibold">Landscaper / Construction Clean-up</h3>
                    <p className="mt-1 text-sm text-primary-foreground/60">Ronald Ragon Realty · Pea Ridge, Arkansas</p>
                  </div>
                  <div>
                    <p className="max-w-xl text-base leading-[1.8] text-primary-foreground/70">
                      Worked across housing development lots and construction sites: watered trees and greenery, rearranged materials, swept dust and construction debris from homes, and disposed of or stored excess materials and tools.
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.12em] text-accent"><Check size={14} /> Practical problem solving</div>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  const skills = [
    { name: 'Microsoft Office Suite', note: 'Everyday productivity' },
    { name: 'Adobe Suite', note: 'Creative communication' },
    { name: 'QuickBooks', note: 'Business fundamentals' },
    { name: 'SAS Viya', note: 'Analytics software' },
    { name: 'Tableau', note: 'Analytics software' },
  ];

  return (
    <section id="toolkit" className="paper-grid border-b border-foreground/15" data-testid="section-toolkit">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.4fr_1fr] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-accent">
              <span className="font-display text-4xl text-foreground">03</span>
              <span className="h-px w-8 bg-accent" />
              Toolkit
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="max-w-3xl font-display text-5xl leading-[.93] tracking-[-0.035em] sm:text-7xl">
                Tools are useful.
                <br />
                <em className="text-accent">People make them matter.</em>
              </h2>
            </Reveal>
            <Reveal delay="reveal-delay-1" className="mt-8 max-w-2xl">
              <p className="text-base leading-[1.8] text-muted-foreground">
                I&apos;m building fluency across business, creative, and analytics tools — with a focus on using them clearly and responsibly.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-px border border-foreground/15 bg-foreground/15 sm:grid-cols-2">
              {skills.map((skill, index) => (
                <Reveal key={skill.name} delay={`reveal-delay-${(index % 3) + 1}`} className={`bg-background p-6 ${index === skills.length - 1 ? 'sm:col-span-2' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono-ui text-[9px] text-accent">0{index + 1}</span>
                      <h3 className="mt-3 text-lg font-semibold">{skill.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{skill.note}</p>
                    </div>
                    <Sparkles size={16} className="mt-1 text-accent" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="section-education">
      <div className="grid gap-12 lg:grid-cols-[.4fr_1fr] lg:gap-24">
        <Reveal>
          <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-accent">
            <span className="font-display text-4xl text-foreground">04</span>
            <span className="h-px w-8 bg-accent" />
            Foundation
          </div>
        </Reveal>
        <div className="grid gap-12 sm:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <div className="border-t border-foreground/15 pt-6">
              <GraduationCap size={23} className="text-accent" />
              <p className="mt-7 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Bachelor&apos;s &amp; master&apos;s programs</p>
              <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.025em] sm:text-5xl">University of Arkansas</h2>
              <div className="mt-7 space-y-7">
                <div className="border-l-2 border-accent pl-4">
                  <p className="font-mono-ui text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Bachelor&apos;s degree · Graduated 2026</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground">Business Analytics</p>
                  <div className="mt-4 inline-flex items-baseline gap-3">
                    <span className="font-display text-3xl text-accent">3.62</span>
                    <span className="font-mono-ui text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Undergraduate GPA</span>
                  </div>
                </div>
                <div className="border-l-2 border-foreground/20 pl-4">
                  <p className="font-mono-ui text-[9px] uppercase tracking-[0.14em] text-accent">Currently attending</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground">Master&apos;s in Product Innovation</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <div className="border-t border-foreground/15 pt-6">
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-accent">Recognition</p>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                  <div><p className="font-semibold">Dean&apos;s List</p><p className="mt-1 text-sm text-muted-foreground">Fall 2023 — Spring 2024</p></div>
                </div>
                {[
                  ['Donald E. Hall Memorial Scholarship', 'May 2023 — present'],
                  ['University of Arkansas Leadership Scholarship', 'May 2022 — present'],
                  ['Arkansas Lottery Challenge Scholarship', 'May 2022 — present'],
                ].map(([award, date]) => (
                  <div className="flex gap-4" key={award}>
                    <span className="mt-1 h-2 w-2 shrink-0 bg-foreground/30" />
                    <div><p className="font-semibold">{award}</p><p className="mt-1 text-sm text-muted-foreground">Recipient · {date}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-accent text-accent-foreground" data-testid="section-contact">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em]">
            <span className="font-display text-4xl">05</span>
            <span className="h-px w-8 bg-accent-foreground/70" />
            Make a connection
          </div>
        </Reveal>
        <Reveal delay="reveal-delay-1" className="mt-12">
          <h2 className="max-w-4xl font-display text-6xl leading-[.86] tracking-[-0.04em] sm:text-8xl lg:text-[9.5rem]">
            Let&apos;s talk
            <br />
            <em>things through.</em>
          </h2>
        </Reveal>
        <Reveal delay="reveal-delay-2" className="mt-12 flex flex-col justify-between gap-12 border-t border-accent-foreground/30 pt-8 sm:flex-row sm:items-end">
          <p className="max-w-md text-base leading-[1.75] text-accent-foreground/75">
            Looking for an early-career opportunity where I can keep learning, contribute to a team, and do work that holds up.
          </p>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <a href="mailto:clementsrhett@gmail.com" className="focus-ring flex items-center gap-3 font-mono-ui text-sm tracking-[0.04em] transition-transform hover:translate-x-1" data-testid="link-contact-email">
              <Mail size={18} /> clementsrhett@gmail.com <ArrowUpRight size={16} />
            </a>
            <a href="tel:+14798062587" className="focus-ring flex items-center gap-3 font-mono-ui text-sm tracking-[0.04em] transition-transform hover:translate-x-1" data-testid="link-contact-phone">
              <Phone size={18} /> 479-806-2587 <ArrowUpRight size={16} />
            </a>
            <a href="https://www.linkedin.com/in/clementsrhettjba/" target="_blank" rel="noreferrer" className="focus-ring flex items-center gap-3 font-mono-ui text-sm tracking-[0.04em] transition-transform hover:translate-x-1" data-testid="link-contact-linkedin">
              <ExternalLink size={18} /> LinkedIn <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.15em]">Rhett Clements</span>
        </div>
        <div className="flex flex-wrap items-center gap-5 font-mono-ui text-[9px] uppercase tracking-[0.14em] text-primary-foreground/60">
          <span className="flex items-center gap-2"><MapPin size={13} /> Greenwood, Arkansas</span>
          <a href="#top" className="focus-ring flex items-center gap-2 transition-colors hover:text-accent" data-testid="link-back-top">Back to top <ChevronDown size={13} className="rotate-180" /></a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell noise min-h-[100dvh]">
      <Header />
      <main>
        <Hero />
        <SignalBar />
        <About />
        <Experience />
        <Toolkit />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;