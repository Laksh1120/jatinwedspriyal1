import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heart, MapPin, Menu, Music2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import proposalImage from "@/assets/story-proposal.jpg";
import venueImage from "@/assets/story-venue.jpg";
import engagementImage from "@/assets/story-engagement.jpg";
import welcomeLunchImage from "@/assets/events/welcome-lunch.jpg";
import ringCeremonyImage from "@/assets/events/ring-ceremony.jpg";
import haldiImage from "@/assets/events/haldi.jpg";
import baraatImage from "@/assets/events/baraat.jpg";
import receptionImage from "@/assets/events/reception.jpg";
import phereImage from "@/assets/events/phere.jpg";
import introVideo from "@/assets/priyal-jatin-intro.mp4.asset.json";
import introVideoWebm from "@/assets/priyal-jatin-intro.webm.asset.json";
import introLastFrame from "@/assets/priyal-jatin-intro-last-frame.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priyal & Jatin — Wedding Invitation" },
      { name: "description", content: "Celebrate Priyal and Jatin at Praveg Lake Resort on November 12, 2026." },
      { property: "og:title", content: "Priyal & Jatin — Wedding Invitation" },
      { property: "og:description", content: "Celebrate Priyal and Jatin at Praveg Lake Resort on November 12, 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stories = [
  { image: proposalImage, alt: "Proposal by the lake", date: "March 12, 2025", title: "The Proposal at Mirror Lake", copy: "Jatin got down on one knee as the sun painted the water gold. Priyal said yes before he could finish the question." },
  { image: venueImage, alt: "Venue scouting", date: "January 8, 2025", title: "Finding Our Perfect Shore", copy: "We visited a dozen venues before stepping onto the shores of Praveg Lake Resort — we knew instantly this was the one." },
  { image: engagementImage, alt: "Engagement party", date: "November 2, 2024", title: "Engagement Celebration", copy: "Family and friends gathered for an intimate garden party. So much love, laughter, and homemade pie." },
];

type EventItem = { image: string; alt: string; title: string; tagline: string; date: [string, string, string]; time: string; day: string; note?: string };

const eventDays: { label: string; items: EventItem[] }[] = [
  {
    label: "Friday · 11 December 2026",
    items: [
      { image: welcomeLunchImage, alt: "Welcome lunch on the lawn", title: "Welcome Lunch", tagline: "A First Toast to Forever", date: ["11", "12", "26"], time: "1:00 pm onwards", day: "Friday" },
      { image: ringCeremonyImage, alt: "Rings on a lavender cushion", title: "Ring Ceremony", tagline: "A Promise Sealed by the Water", date: ["11", "12", "26"], time: "5:00 pm onwards", day: "Friday", note: "Followed by Sangeet & Cocktails" },
    ],
  },
  {
    label: "Saturday · 12 December 2026",
    items: [
      { image: haldiImage, alt: "Flower haldi seat with marigolds", title: "Phoolon Wali Haldi", tagline: "Bathed in Flowers & Blessings", date: ["12", "12", "26"], time: "10:00 am onwards", day: "Saturday" },
      { image: baraatImage, alt: "Baraat procession with dhol", title: "Baraat", tagline: "The Joyful Procession", date: ["12", "12", "26"], time: "6:00 pm onwards", day: "Saturday" },
      { image: receptionImage, alt: "Candlelit reception by the lake", title: "Reception", tagline: "An Evening of Glamour & Grace", date: ["12", "12", "26"], time: "8:00 pm onwards", day: "Saturday" },
      { image: phereImage, alt: "Mandap by the lake at night", title: "Phere", tagline: "Seven Steps Around the Sacred Fire", date: ["12", "12", "26"], time: "11:00 pm onwards", day: "Saturday" },
    ],
  },
];

const COUNTDOWN_TARGET = new Date("2026-12-10T00:00:00+05:30").getTime();
const ENVELOPE_SESSION_KEY = "priyal-jatin-envelope-opened";

type IntroStep = "boot" | "envelope" | "opening" | "video" | "transition" | "final";

function createTicketPath(width: number, height: number) {
  const inset = Math.min(width * 0.08, 40);
  const radius = 22;
  return [
    `M ${inset + radius} 0`,
    `H ${width - inset - radius}`,
    `A ${radius} ${radius} 0 0 1 ${width - inset} ${radius}`,
    `A ${inset} ${inset} 0 0 0 ${width} ${radius + inset}`,
    `V ${height - radius - inset}`,
    `A ${inset} ${inset} 0 0 0 ${width - inset} ${height - radius}`,
    `A ${radius} ${radius} 0 0 1 ${width - inset - radius} ${height}`,
    `H ${inset + radius}`,
    `A ${radius} ${radius} 0 0 1 ${inset} ${height - radius}`,
    `A ${inset} ${inset} 0 0 0 0 ${height - radius - inset}`,
    `V ${radius + inset}`,
    `A ${inset} ${inset} 0 0 0 ${inset} ${radius}`,
    `A ${radius} ${radius} 0 0 1 ${inset + radius} 0 Z`,
  ].join(" ");
}

function InvitationExperience({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<IntroStep>("boot");
  const [ticketPath, setTicketPath] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadyOpened = false;
    try {
      alreadyOpened = Boolean(window.sessionStorage.getItem(ENVELOPE_SESSION_KEY));
    } catch {
      // The opening still works when browser storage is unavailable.
    }
    setStep(reducedMotion || alreadyOpened ? "final" : "envelope");
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const updatePath = () => setTicketPath(createTicketPath(card.clientWidth, card.clientHeight));
    updatePath();
    const observer = new ResizeObserver(updatePath);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (step !== "transition") return;
    const timeout = window.setTimeout(() => setStep("final"), 2200);
    return () => window.clearTimeout(timeout);
  }, [step]);

  const openEnvelope = () => {
    if (step !== "envelope") return;
    try {
      window.sessionStorage.setItem(ENVELOPE_SESSION_KEY, "true");
    } catch {
      // A blocked storage write should not stop the opening.
    }
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = false;
      void video.play().catch(() => undefined);
    }
    window.requestAnimationFrame(() => setStep("opening"));
    window.setTimeout(() => setStep("video"), 3100);
    fallbackRef.current = window.setTimeout(() => setStep("transition"), 4200);
  };

  const finishVideo = () => {
    if (step !== "opening" && step !== "video") return;
    if (fallbackRef.current !== null) window.clearTimeout(fallbackRef.current);
    const video = videoRef.current;
    if (video) video.pause();
    setStep("transition");
  };

  const showEnvelope = step === "envelope" || step === "opening";
  const showVideo = step !== "boot";
  const showCard = step === "transition" || step === "final";
  const clipPath = ticketPath ? `path('${ticketPath}')` : undefined;

  return (
    <div className={`invitation-experience invitation-experience--${step}`}>
      {showVideo && (
        <div className="intro-video-layer" aria-hidden={step === "final"}>
          <video
            ref={videoRef}
            className="intro-video"
            poster={introLastFrame.url}
            playsInline
            preload="auto"
            onEnded={finishVideo}
            onLoadedMetadata={(event) => {
              if (step === "final" && Number.isFinite(event.currentTarget.duration)) {
                event.currentTarget.currentTime = Math.max(0, event.currentTarget.duration - 0.05);
              }
            }}
          >
            <source src={introVideoWebm.url} type="video/webm" />
            <source src={introVideo.url} type="video/mp4" />
          </video>
        </div>
      )}

      {showEnvelope && (
        <div
          className={`envelope-v2 fixed inset-0 z-[5] h-[100dvh] w-[100dvw] cursor-pointer overflow-hidden [--tip:55%] [perspective:1200px]${step === "opening" ? " envelope-v2--opening pointer-events-none" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Open wedding invitation"
          onClick={openEnvelope}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openEnvelope();
            }
          }}
        >
          <style>{`
            .envelope-v2__paper{background-color:#FAF6F2;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' result='noise'/%3E%3CfeDiffuseLighting in='noise' surfaceScale='1.5' lighting-color='%23fff'%3E%3CfeDistantLight azimuth='225' elevation='75'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23paper)' opacity='.42'/%3E%3C/svg%3E");background-blend-mode:multiply}
            .envelope-v2__flap{transform-origin:top center;transform-style:preserve-3d}
            .envelope-v2__face{backface-visibility:hidden;-webkit-backface-visibility:hidden}
            .envelope-v2__back{transform:rotateX(180deg);background:linear-gradient(to bottom,#F3C2A0,#F7D8C2)}
            .envelope-v2__vine path,.envelope-v2__vine circle{vector-effect:non-scaling-stroke;stroke-width:1px}
            .envelope-v2__seal{border-radius:48% 52% 50% 50%;background:radial-gradient(circle at 35% 30%,#E6D8B8,#CDBA95 55%,#A8946C);box-shadow:inset 0 0 0 5px rgba(255,255,255,.18),0 4px 8px rgba(80,50,30,.3);backface-visibility:hidden;-webkit-backface-visibility:hidden}
            .envelope-v2__seal::after{content:"";position:absolute;inset:-6px;border:2px solid rgba(205,186,149,.7);border-radius:inherit;animation:envelope-v2-ring 1.8s ease-in-out infinite}
            .envelope-v2--opening .envelope-v2__flap{will-change:transform;animation:envelope-v2-flap 1.3s cubic-bezier(.45,0,.2,1) forwards}
            .envelope-v2--opening .envelope-v2__pocket{will-change:transform;animation:envelope-v2-pocket 2.2s cubic-bezier(.65,0,.35,1) .9s forwards}
            .envelope-v2--opening .envelope-v2__seal::after{opacity:0;animation:none}
            @keyframes envelope-v2-ring{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.12);opacity:.2}}
            @keyframes envelope-v2-flap{to{transform:rotateX(-180deg)}}
            @keyframes envelope-v2-pocket{to{transform:translate3d(0,105%,0)}}
          `}</style>

          <svg className="absolute size-0" aria-hidden="true">
            <defs>
              <symbol id="envelope-vine" viewBox="0 0 100 100">
                <path d="M4 96C20 70 16 46 46 30S82 12 96 6M30 62c8-4 12-1 13 4M24 78c-6-6-12-4-15 1M54 28c0-8 6-12 12-11M72 20c4 7 10 8 15 4" vectorEffect="non-scaling-stroke" strokeWidth="1" />
                <circle cx="46" cy="30" r="4.5" vectorEffect="non-scaling-stroke" strokeWidth="1" /><circle cx="28" cy="64" r="3.5" vectorEffect="non-scaling-stroke" strokeWidth="1" /><circle cx="84" cy="14" r="4" vectorEffect="non-scaling-stroke" strokeWidth="1" />
              </symbol>
            </defs>
          </svg>

          <div className="envelope-v2__flap fixed inset-0 z-[3] h-[100dvh] w-[100dvw]" aria-hidden="true">
            <div className="envelope-v2__face envelope-v2__paper absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_var(--tip))]">
              <svg className="envelope-v2__vine absolute left-0 top-0 size-[clamp(90px,min(34vw,34vh),200px)] fill-none" viewBox="0 0 100 100">
                <use href="#envelope-vine" transform="translate(-.8 -.8)" stroke="white" opacity=".9" />
                <use href="#envelope-vine" transform="translate(.8 .8)" stroke="rgba(150,105,95,.22)" />
              </svg>
            </div>
            <div className="envelope-v2__face envelope-v2__back absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_var(--tip))]" />
            <div className="envelope-v2__seal fixed left-1/2 top-[var(--tip)] z-[4] aspect-square w-[clamp(64px,18vw,88px)] -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="envelope-v2__pocket envelope-v2__paper fixed inset-0 z-[1] h-[100dvh] w-[100dvw] [clip-path:polygon(0_0,50%_var(--tip),100%_0,100%_100%,0_100%)]" aria-hidden="true">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 50 55 100 0M0 100 50 55 100 100" fill="none" stroke="rgba(150,110,100,.28)" strokeWidth=".16" vectorEffect="non-scaling-stroke" />
              <path d="M0 100 50 55 100 100Z" fill="rgba(255,255,255,.35)" />
            </svg>
            <svg className="envelope-v2__vine absolute bottom-0 left-0 size-[clamp(90px,min(34vw,34vh),200px)] fill-none" viewBox="0 0 100 100">
              <use href="#envelope-vine" transform="translate(-.8 -.8)" stroke="white" opacity=".9" />
              <use href="#envelope-vine" transform="translate(.8 .8)" stroke="rgba(150,105,95,.22)" />
            </svg>
            <svg className="envelope-v2__vine absolute bottom-0 right-0 size-[clamp(90px,min(34vw,34vh),200px)] scale-x-[-1] fill-none" viewBox="0 0 100 100">
              <use href="#envelope-vine" transform="translate(-.8 -.8)" stroke="white" opacity=".9" />
              <use href="#envelope-vine" transform="translate(.8 .8)" stroke="rgba(150,105,95,.22)" />
            </svg>
          </div>
        </div>
      )}

      <div
        ref={cardRef}
        className={`framed-invitation${showCard ? " framed-invitation--visible" : ""}`}
        style={{ clipPath }}
        aria-hidden={!showCard}
      >
        <div className="framed-invitation__paper" />
        <div className="framed-invitation__scroll"><div className="framed-invitation__content">{children}</div></div>
      </div>
      {showCard && ticketPath && (
        <>
          <svg className="ticket-glow" viewBox={`0 0 ${cardRef.current?.clientWidth ?? 1} ${cardRef.current?.clientHeight ?? 1}`} preserveAspectRatio="none" aria-hidden="true"><path d={ticketPath} /></svg>
          <svg className="ticket-border" viewBox={`0 0 ${cardRef.current?.clientWidth ?? 1} ${cardRef.current?.clientHeight ?? 1}`} preserveAspectRatio="none" aria-hidden="true">
            <path className="ticket-border__pink" d={ticketPath} />
            <path className="ticket-border__cream" d={ticketPath} />
          </svg>
        </>
      )}
    </div>
  );
}

function getRemaining() {
  const diff = COUNTDOWN_TARGET - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    arrived: diff <= 0,
    days: Math.floor(clamped / 86400000),
    hours: Math.floor(clamped / 3600000) % 24,
    minutes: Math.floor(clamped / 60000) % 60,
    seconds: Math.floor(clamped / 1000) % 60,
  };
}

function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { label: "Days", value: remaining ? String(remaining.days) : "--" },
    { label: "Hours", value: remaining ? pad(remaining.hours) : "--" },
    { label: "Minutes", value: remaining ? pad(remaining.minutes) : "--" },
    { label: "Seconds", value: remaining ? pad(remaining.seconds) : "--" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {units.map((unit) => (
          <div key={unit.label} className="count-card">
            <span className="num" aria-hidden="true">{unit.value}</span>
            <span className="rule" aria-hidden="true" />
            <span className="lbl">{unit.label}</span>
            <span className="sr-only">{unit.value} {unit.label.toLowerCase()}</span>
          </div>
        ))}
      </div>
      <p className="mt-9 text-center font-display text-xl italic text-foreground/80 md:text-2xl">{remaining?.arrived ? "Today is the day — the lake is waiting." : "Until we say “I do” by the water"}</p>
    </div>
  );
}

function Flourish({ dark = false }: { dark?: boolean }) {
  return <div className={`flourish ${dark ? "flourish--dark" : ""}`} aria-hidden="true"><span /><Heart className="size-3" /><span /></div>;
}

function SectionHeading({ eyebrow, title, tone = "light" }: { eyebrow: string; title: string; tone?: "light" | "dark" }) {
  return <div className="section-heading text-center"><p className="font-body text-sm uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p><h2 className="mt-3 font-display text-5xl font-normal text-foreground md:text-7xl">{title}</h2><Flourish dark={tone === "dark"} /></div>;
}

function InvitationFlorals() {
  return (
    <>
      <svg className="invitation-florals invitation-florals--top" viewBox="0 0 480 250" aria-hidden="true">
        <g className="floral-sway floral-sway--left">
          <path className="floral-stem" d="M38 0c2 54 15 88 47 125 15 17 19 41 16 67M74 0c-3 50 5 84 25 112" />
          <path className="floral-leaf" d="M40 27c-28 3-34 24-34 24 23 3 35-8 34-24Zm12 34c25 3 30 22 30 22-21 3-31-7-30-22ZM74 91c-27 1-33 21-33 21 21 5 33-4 33-21Zm25 33c23 5 25 24 25 24-20 0-28-10-25-24Z" />
          <path className="floral-bloom" d="M28 3c8 13 20 14 31 2 1 16-8 25-21 25S16 20 28 3Zm52 60c7 11 17 12 26 2 1 13-7 21-18 21S70 77 80 63Zm8 70c7 11 17 12 26 2 1 13-7 21-18 21s-18-9-8-23Z" />
          <circle className="floral-bud" cx="101" cy="190" r="7" />
        </g>
        <g className="floral-sway floral-sway--right">
          <path className="floral-stem" d="M442 0c-2 54-15 88-47 125-15 17-19 41-16 67M406 0c3 50-5 84-25 112" />
          <path className="floral-leaf" d="M440 27c28 3 34 24 34 24-23 3-35-8-34-24Zm-12 34c-25 3-30 22-30 22 21 3 31-7 30-22Zm-22 30c27 1 33 21 33 21-21 5-33-4-33-21Zm-25 33c-23 5-25 24-25 24 20 0 28-10 25-24Z" />
          <path className="floral-bloom" d="M452 3c-8 13-20 14-31 2-1 16 8 25 21 25s22-10 10-27Zm-52 60c-7 11-17 12-26 2-1 13 7 21 18 21s18-9 8-23Zm-8 70c-7 11-17 12-26 2-1 13 7 21 18 21s18-9 8-23Z" />
          <circle className="floral-bud" cx="379" cy="190" r="7" />
        </g>
        <g className="floral-sway floral-sway--center">
          <path className="floral-stem" d="M240 0v59M214 0c4 24 13 38 26 52M266 0c-4 24-13 38-26 52" />
          <path className="floral-bloom" d="M240 42c-14-20-31-11-28 4 2 10 13 15 28 21 15-6 26-11 28-21 3-15-14-24-28-4Z" />
          <circle className="floral-bud" cx="212" cy="26" r="7" /><circle className="floral-bud" cx="268" cy="26" r="7" />
        </g>
      </svg>
      <svg className="invitation-florals invitation-florals--bottom" viewBox="0 0 480 250" aria-hidden="true">
        <g className="floral-sway floral-sway--bottom">
          <path className="lotus-stem" d="M46 250c7-68 24-104 47-136M156 250c-3-60 5-103 23-143M253 250c0-73-1-121-8-169M350 250c-3-58 9-98 38-137M448 250c-1-60-8-102-27-137" />
          <path className="palm-leaf" d="M0 230C31 161 65 151 111 166 75 177 48 196 23 229Zm4 18c19-49 52-63 91-50-36 9-58 27-75 51Z" />
          <g className="lotus-bloom"><path d="M93 126c-28-5-40 15-35 31 5 18 22 28 35 36 13-8 30-18 35-36 5-16-7-36-35-31Z" /><path d="M93 182c-13-22-13-45 0-72 13 27 13 50 0 72Zm0 3c-25-13-37-30-41-55 25 12 38 30 41 55Zm0 0c25-13 37-30 41-55-25 12-38 30-41 55Z" /></g>
          <g className="lotus-bloom"><path d="M179 118c-25-4-36 14-31 29 4 16 19 25 31 32 12-7 27-16 31-32 5-15-6-33-31-29Z" /><path d="M179 171c-12-20-12-41 0-66 12 25 12 46 0 66Z" /></g>
          <g className="lotus-bloom lotus-bloom--large"><path d="M245 93c-32-6-46 18-40 37 5 21 25 32 40 42 15-10 35-21 40-42 6-19-8-43-40-37Z" /><path d="M245 162c-16-27-16-56 0-88 16 32 16 61 0 88Zm0 4c-31-16-46-37-51-68 31 15 47 37 51 68Zm0 0c31-16 46-37 51-68-31 15-47 37-51 68Z" /></g>
          <g className="lotus-bloom"><path d="M388 124c-27-5-39 15-34 31 5 17 21 27 34 35 13-8 29-18 34-35 5-16-7-36-34-31Z" /><path d="M388 181c-13-22-13-44 0-71 13 27 13 49 0 71Z" /></g>
          <g className="lotus-bloom"><path d="M421 119c-22-4-32 12-28 25 4 14 17 22 28 29 11-7 24-15 28-29 4-13-6-29-28-25Z" /></g>
        </g>
      </svg>
    </>
  );
}

function InvitationHero() {
  return (
    <header id="home" className="invitation-hero">
      <div className="invitation-grain" aria-hidden="true" />
      <div className="invitation-card">
        <div className="invitation-damask" aria-hidden="true" />
        <InvitationFlorals />
        <div className="invitation-copy">
          <div className="invitation-reveal invitation-reveal--1">
            <div className="ganesh-mark" aria-hidden="true">ॐ</div>
            <p className="invitation-blessing">|| Shri Ganeshay Namah ||</p>
          </div>
          <p className="invitation-intro invitation-reveal invitation-reveal--2">You are invited to the wedding of</p>
          <div className="invitation-reveal invitation-reveal--3">
            <h1 className="invitation-name">Priyal Bang</h1>
            <div className="invitation-family">
              <p>grand d/o Late Shri Shakerlalji &amp; Smt. Sitadevi Bang</p>
              <p>d/o Mr. Dinesh Bang &amp; Mrs. Meenakshi Bang</p>
            </div>
          </div>
          <div className="invitation-ampersand invitation-reveal invitation-reveal--4">&amp;</div>
          <div className="invitation-reveal invitation-reveal--5">
            <h2 className="invitation-name invitation-name--groom">Jatin Mulchandani</h2>
            <div className="invitation-family">
              <p>s/o Mr. Hiranand Mulchandani &amp; Mrs. Ganeshi Devi Mulchandani</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <InvitationExperience>
      <main className="overflow-hidden bg-background text-foreground">
      <nav className="sticky inset-x-0 top-0 z-40 border-b border-blush bg-background/92 px-5 text-foreground backdrop-blur-md md:px-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href="#home" className="font-display text-3xl text-primary">Lake <span className="text-gold-soft">&</span> Love</a>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-blush/50 hover:text-accent md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</Button>
          <div className="hidden gap-8 text-sm uppercase tracking-[0.18em] md:flex">
            <a href="#home" className="transition-colors hover:text-accent">Us</a><a href="#event" className="transition-colors hover:text-accent">Countdown</a><a href="#events" className="transition-colors hover:text-accent">Events</a><a href="#venue" className="transition-colors hover:text-accent">Venue</a><a href="#blog" className="transition-colors hover:text-accent">Stories</a>
          </div>
        </div>
        {menuOpen && <div className="flex flex-col gap-5 border-t border-blush py-6 text-center text-sm uppercase tracking-[0.18em] md:hidden">{[["#home","Us"],["#event","Countdown"],["#events","Events"],["#venue","Venue"],["#blog","Stories"]].map(([href,label]) => <a key={href} href={href} className="hover:text-accent" onClick={() => setMenuOpen(false)}>{label}</a>)}</div>}
      </nav>

      <InvitationHero />

       <section id="event" className="checker-section page-section px-5 md:px-10"><div className="relative mx-auto max-w-5xl"><SectionHeading eyebrow="Counting the days" title="The Countdown" />
        <Countdown />
        <div className="mt-10 grid overflow-hidden rounded-lg border border-blush bg-card/60 md:grid-cols-2"><div className="p-7 text-center md:border-r md:border-gold/40"><p className="text-sm uppercase tracking-[0.2em] text-primary">The Day</p><p className="mt-2 font-invitation text-2xl">Thursday, December 10, 2026</p></div><div className="border-t border-gold/40 p-7 text-center md:border-t-0"><p className="text-sm uppercase tracking-[0.2em] text-primary">Dress Code</p><p className="mt-2 font-invitation text-2xl">Garden Formal · Earth tones encouraged</p></div></div>
      </div></section>

       <section id="events" className="events-section page-section px-5 md:px-10">
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading eyebrow="Three days of celebration" title="The Events" tone="dark" />
          {eventDays.map((dayGroup) => (
            <div key={dayGroup.label} className="mt-20 first:mt-0">
              <div className="event-divider"><span className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{dayGroup.label}</span></div>
              <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                {dayGroup.items.map((item) => (
                  <article key={item.title} className="event-card">
                    <div className="event-img-wrap">
                      <img src={item.image} alt={item.alt} loading="lazy" width={896} height={1024} />
                    </div>
                    <div className="relative px-6 py-9 text-center md:px-8">
                       <h3 className="font-script text-4xl font-normal text-primary md:text-5xl">{item.title}</h3>
                       <p className="mt-2 font-invitation text-base italic text-muted-foreground">{item.tagline}</p>
                      <div className="mx-auto my-6 h-px w-16 bg-gold-soft/60" />
                       <p className="font-invitation text-2xl text-foreground md:text-3xl">
                        {item.date[0]} <span className="mx-2 text-gold">|</span> {item.date[1]} <span className="mx-2 text-gold">|</span> {item.date[2]}
                      </p>
                       <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">{item.time}</p>
                       <p className="mt-1 font-script text-3xl text-primary">{item.day}</p>
                       {item.note && <p className="mt-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">{item.note}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

        <section id="venue" className="page-section relative border-y border-blush bg-transparent px-5 text-foreground md:px-10"><div className="relative mx-auto max-w-6xl"><SectionHeading eyebrow="Where we'll gather" title="The Venue" tone="dark" />
         <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20"><div><p className="font-display text-5xl text-primary">Praveg Lake Resort</p><address className="mt-5 not-italic leading-7 text-muted-foreground">Daman - 3 Kachigam, Kachigam Damanganga Garden<br />Nearby Kachigam Talab, Daman, 396215</address><p className="mt-6 leading-8 text-muted-foreground">A breathtaking lakeside retreat spread across four enchanting islands on Kachigam Talab — where nature, luxury, and celebration come together for an unforgettable destination wedding by the water.</p><ul className="my-8 divide-y divide-gold/35 border-y border-gold/35">{[["Getting There","Approximately 6 km from Vapi Railway Station"],["Accommodations","On-site resort rooms and villas for overnight guests"],["Nearby","5–10 km from Devka and Jampore beaches"]].map(([title,copy]) => <li key={title} className="py-4"><strong className="block text-sm uppercase tracking-[0.18em] text-primary">{title}</strong><span className="mt-1 block text-base text-muted-foreground">{copy}</span></li>)}</ul><Button asChild variant="outline" className="h-12 rounded-lg border-primary bg-primary px-7 uppercase tracking-[0.16em] text-primary-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"><a href="https://share.google/wXPgCUtC4Ho5l4KOc" target="_blank" rel="noopener noreferrer"><MapPin /> Get Directions</a></Button></div>
           <div className="rounded-lg border border-blush bg-card/55 p-3"><div className="aspect-[4/3] overflow-hidden rounded-md"><iframe title="Praveg Lake Resort location map" src="https://maps.google.com/maps?q=Praveg+Lake+Resort+Daman,+Kachigam,+Daman+396215&hl=en&z=15&output=embed" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="size-full grayscale-[30%]" /></div></div>
        </div>
      </div></section>

        <section id="blog" className="page-section px-5 md:px-10"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Our journey" title="Stories & Updates" /><div className="grid gap-8 md:grid-cols-3">{stories.map((story) => <article key={story.title} className="group rounded-lg border border-blush bg-card/45 p-3"><div className="overflow-hidden rounded-md border border-blush bg-blush p-2"><img src={story.image} alt={story.alt} loading="lazy" width={912} height={1104} className="aspect-[4/5] w-full rounded-sm object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div><time className="mt-6 block text-sm uppercase tracking-[0.18em] text-muted-foreground">{story.date}</time><h3 className="mt-2 font-script text-3xl text-primary">{story.title}</h3><p className="mt-3 text-base leading-7 text-muted-foreground">{story.copy}</p><a href="#" className="mt-5 inline-flex border-b border-primary/50 pb-1 text-sm uppercase tracking-[0.16em] text-primary transition-colors hover:border-accent hover:text-accent">Read more</a></article>)}</div></div></section>

        <footer className="checker-footer page-footer border-t border-gold-soft/40 px-5 text-center"><Music2 className="mx-auto size-6 text-gold-soft" /><p className="mt-5 font-display text-4xl text-primary">Priyal <span className="text-gold-soft">&</span> Jatin</p><p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">November 12, 2026</p><p className="mt-8 font-invitation text-xl italic text-muted-foreground">Where the lake meets forever</p></footer>
      </main>
    </InvitationExperience>
  );
}
