import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'wouter';
import {
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import './links.css';

const inquirySchema = z.object({
  name: z.string().trim().min(1, 'Enter your name').max(80, 'Keep your name under 80 characters'),
  email: z.string().trim().email('Enter a valid email address').max(254, 'Email address is too long'),
  message: z.string().trim().min(10, 'Please add a little more detail').max(2000, 'Keep your message under 2,000 characters'),
});

type InquiryValues = z.infer<typeof inquirySchema>;

const contactLinks = [
  {
    label: 'Email Rhett',
    value: 'clementsrhett@gmail.com',
    href: 'mailto:clementsrhett@gmail.com',
    note: 'Best for a thoughtful introduction',
    Icon: Mail,
    testId: 'link-email',
  },
  {
    label: 'Call Rhett',
    value: '479-806-2587',
    href: 'tel:+14798062587',
    note: 'Direct phone line',
    Icon: Phone,
    testId: 'link-phone',
  },
  {
    label: 'LinkedIn',
    value: 'Connect professionally',
    href: 'https://www.linkedin.com/in/clementsrhettjba/',
    note: 'Experience, education & updates',
    Icon: ArrowUpRight,
    testId: 'link-linkedin',
    external: true,
  },
  {
    label: 'X',
    value: '@Rhettac70',
    href: 'https://x.com/Rhettac70',
    note: 'Find Rhett on X',
    Icon: AtSign,
    testId: 'link-x',
    external: true,
  },
];

function MessageForm() {
  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const handleSubmit = (values: InquiryValues) => {
    const query = new URLSearchParams({
      subject: `Portfolio inquiry from ${values.name}`,
      body: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    });

    window.location.href = `mailto:clementsrhett@gmail.com?${query.toString()}`;
  };

  return (
    <section id="message" className="border-t border-foreground/15 pt-8 sm:pt-10" aria-labelledby="message-heading">
      <div className="mb-6 flex items-end justify-between gap-5">
        <div>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.19em] text-accent">A note, your way</p>
          <h2 id="message-heading" className="mt-2 font-display text-4xl leading-none tracking-[-0.035em] sm:text-5xl">
            Send a message
          </h2>
        </div>
        <Send size={19} className="mb-1 shrink-0 text-accent" aria-hidden="true" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5" data-testid="form-links-inquiry">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono-ui text-[9px] uppercase tracking-[0.12em]">Your name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      maxLength={80}
                      placeholder="Name"
                      className="mt-1 h-12 rounded-none border-foreground/20 bg-transparent text-foreground shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-accent"
                      data-testid="input-links-name"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">How should I address you?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono-ui text-[9px] uppercase tracking-[0.12em]">Email address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      placeholder="you@example.com"
                      className="mt-1 h-12 rounded-none border-foreground/20 bg-transparent text-foreground shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-accent"
                      data-testid="input-links-email"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">So I can reply to you.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-mono-ui text-[9px] uppercase tracking-[0.12em]">Your message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    maxLength={2000}
                    placeholder="What would you like to discuss?"
                    className="mt-1 min-h-32 resize-y rounded-none border-foreground/20 bg-transparent text-foreground shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-accent"
                    data-testid="input-links-message"
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">Add a little context or your question.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 border-t border-foreground/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground" data-testid="text-mailto-explanation">
              This opens your email app with a draft. Nothing is sent until you review and send it.
            </p>
            <button
              type="submit"
              className="focus-ring inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-primary px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[0.13em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              data-testid="button-open-email-draft"
            >
              Open email draft <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default function LinksPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionMeta?.content;
    const createdMeta = !descriptionMeta;
    const meta = descriptionMeta ?? document.createElement('meta');
    const socialTags = [
      ['og:title', 'Connect with Rhett Clements'],
      ['og:description', 'Email, call, or connect with Rhett Clements on LinkedIn and X.'],
      ['twitter:title', 'Connect with Rhett Clements'],
      ['twitter:description', 'Email, call, or connect with Rhett Clements on LinkedIn and X.'],
    ].map(([property, content]) => {
      const tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"], meta[name="${property}"]`);
      const previousContent = tag?.content;
      if (tag) tag.content = content;
      return { tag, previousContent };
    });

    if (createdMeta) {
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    document.title = 'Connect with Rhett Clements';
    meta.content = 'Contact Rhett Clements by email, phone, LinkedIn, or X, or write a message to open as an email draft.';

    return () => {
      document.title = previousTitle;
      if (createdMeta) meta.remove();
      else if (previousDescription !== undefined) meta.content = previousDescription;
      socialTags.forEach(({ tag, previousContent }) => {
        if (tag && previousContent !== undefined) tag.content = previousContent;
      });
    };
  }, []);

  return (
    <div className="links-page noise relative min-h-[100dvh] overflow-hidden text-foreground">
      <main className="relative z-[1] mx-auto flex min-h-[100dvh] max-w-[1120px] flex-col px-5 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-8">
        <header className="flex items-center justify-between border-b border-foreground/15 pb-4">
          <Link href="/" className="focus-ring inline-flex min-h-11 items-center gap-3" data-testid="link-back-portfolio">
            <span className="relative inline-flex h-9 w-9 items-center justify-center border border-foreground/30 bg-accent text-accent-foreground" aria-hidden="true">
              <span className="font-mono-ui text-[11px] font-bold tracking-[-0.08em]">RC</span>
              <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-foreground" />
            </span>
            <span className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.17em] sm:text-[10px]">Rhett Clements</span>
          </Link>
          <Link href="/" className="focus-ring inline-flex min-h-11 items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:text-accent sm:text-[10px]" data-testid="link-return-home">
            Portfolio <ArrowDownRight size={14} aria-hidden="true" />
          </Link>
        </header>

        <div className="links-content mx-auto grid w-full max-w-[860px] flex-1 gap-8 pb-10 pt-9 sm:gap-10 sm:pt-12 lg:grid-cols-[.83fr_1.17fr] lg:items-start lg:gap-14 lg:pt-16">
          <section aria-labelledby="intro-heading" className="lg:sticky lg:top-12">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="mb-4 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.19em] text-accent">
                  <span className="h-px w-6 bg-accent" /> Greenwood, Arkansas
                </p>
                <h1 id="intro-heading" className="font-display text-[clamp(3.7rem,16vw,6.4rem)] leading-[0.78] tracking-[-0.055em]">
                  Rhett
                  <br />
                  <span className="ml-8 text-accent sm:ml-12">Clements</span>
                </h1>
              </div>
              <div className="links-stamp mt-1 hidden h-[76px] w-[76px] shrink-0 items-center justify-center border border-accent/55 text-center sm:flex lg:mt-8">
                <span className="font-mono-ui text-[8px] uppercase leading-[1.7] tracking-[0.12em] text-accent">Open to<br />what&apos;s next</span>
              </div>
            </div>

            <p className="mt-7 max-w-sm text-[15px] leading-[1.75] text-muted-foreground sm:mt-9 sm:text-base">
              A dependable early-career professional learning how good systems, clear communication, and thoughtful analysis help people do their best work.
            </p>

            <div className="mt-6 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              <MapPin size={13} className="text-accent" aria-hidden="true" />
              Business analytics · Product innovation
            </div>

            <div className="mt-8 flex items-center gap-3 border-y border-foreground/15 py-4">
              <span className="font-display text-3xl leading-none text-accent">01</span>
              <p className="font-mono-ui text-[9px] uppercase leading-[1.7] tracking-[0.13em] text-muted-foreground">
                One place for a quick<br className="sm:hidden" /> introduction
              </p>
            </div>
          </section>

          <div className="min-w-0">
            <section aria-labelledby="connect-heading" className="mb-8 sm:mb-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 id="connect-heading" className="font-mono-ui text-[9px] uppercase tracking-[0.19em] text-muted-foreground">
                  Choose how to connect
                </h2>
                <span className="font-mono-ui text-[9px] text-accent">04 channels</span>
              </div>
              <div className="border-t border-foreground/20">
                {contactLinks.map(({ label, value, href, note, Icon, testId, external }, index) => (
                  <a
                    key={testId}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="links-row focus-ring group flex min-h-[78px] items-center gap-4 border-b border-foreground/15 py-3 transition-colors hover:border-accent/50 hover:bg-secondary/35 sm:min-h-[84px] sm:px-3"
                    data-testid={testId}
                    aria-label={external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/15 bg-background text-accent transition-colors group-hover:border-accent/50 group-hover:bg-accent group-hover:text-accent-foreground" aria-hidden="true">
                      <Icon size={17} strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-semibold">{label}</span>
                        <span className="break-all text-sm text-muted-foreground">{value}</span>
                      </span>
                      <span className="mt-1 block font-mono-ui text-[8px] uppercase tracking-[0.1em] text-muted-foreground/80 sm:text-[9px]">{note}</span>
                    </span>
                    <span className="font-mono-ui text-[9px] text-accent/70">0{index + 1}</span>
                    <ArrowUpRight size={15} className="shrink-0 text-foreground/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            <MessageForm />
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-foreground/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-ui text-[8px] uppercase tracking-[0.14em] text-muted-foreground">A thoughtful introduction is always welcome.</p>
          <Link href="/" className="focus-ring inline-flex min-h-11 items-center gap-2 self-start font-mono-ui text-[9px] uppercase tracking-[0.13em] text-accent transition-colors hover:text-foreground sm:self-auto" data-testid="link-footer-portfolio">
            Back to the portfolio <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}