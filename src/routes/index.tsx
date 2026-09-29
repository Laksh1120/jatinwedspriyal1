import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, Heart, MapPin, Menu, Music2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import coupleAsset from "@/assets/couple.jpg.asset.json";
import lakeAsset from "@/assets/lake.jpg.asset.json";
import proposalImage from "@/assets/story-proposal.jpg";
import venueImage from "@/assets/story-venue.jpg";
import engagementImage from "@/assets/story-engagement.jpg";
import welcomeLunchImage from "@/assets/events/welcome-lunch.jpg";
import ringCeremonyImage from "@/assets/events/ring-ceremony.jpg";
import haldiImage from "@/assets/events/haldi.jpg";
import baraatImage from "@/assets/events/baraat.jpg";
import receptionImage from "@/assets/events/reception.jpg";
import phereImage from "@/assets/events/phere.jpg";

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
  const dark = tone === "dark";
  return <div className="mb-12 text-center md:mb-16"><p className={`font-body text-xs uppercase tracking-[0.28em] ${dark ? "text-blush" : "text-foreground"}`}>{eyebrow}</p><h2 className={`mt-3 font-display text-5xl font-medium md:text-7xl ${dark ? "text-cream" : "text-foreground"}`}>{title}</h2><Flourish dark={dark} /></div>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-gold-soft/25 bg-emerald-deep/92 px-5 text-cream backdrop-blur-md md:px-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href="#home" className="font-display text-2xl">Lake <span className="text-gold-soft">&</span> Love</a>
          <Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-gold-soft md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</Button>
          <div className="hidden gap-8 text-[11px] uppercase tracking-[0.25em] md:flex">
            <a href="#couple" className="transition-colors hover:text-gold-soft">Us</a><a href="#event" className="transition-colors hover:text-gold-soft">Countdown</a><a href="#events" className="transition-colors hover:text-gold-soft">Events</a><a href="#venue" className="transition-colors hover:text-gold-soft">Venue</a><a href="#blog" className="transition-colors hover:text-gold-soft">Stories</a>
          </div>
        </div>
        {menuOpen && <div className="flex flex-col gap-5 border-t border-gold/20 py-6 text-center text-xs uppercase tracking-[0.25em] md:hidden">{[["#couple","Us"],["#event","Countdown"],["#events","Events"],["#venue","Venue"],["#blog","Stories"]].map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>}
      </nav>

      <header id="home" className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-emerald px-5 pb-20 pt-28 text-center text-foreground">
        <img src={lakeAsset.url} alt="A tranquil lake at dusk" className="absolute inset-0 size-full object-cover opacity-15 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-blush/50 via-emerald/15 to-beige/55" aria-hidden="true" />
        <div className="paper-texture absolute inset-0" />
        <div className="sconce left-3 md:left-10" aria-hidden="true"><span className="lamp" /><span className="stem" /></div>
        <div className="sconce right-3 md:right-10" aria-hidden="true"><span className="lamp" /><span className="stem" /></div>
        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-foreground md:text-sm">You're invited to celebrate</p>
          <h1 className="mt-7 font-display text-7xl font-medium leading-[0.78] md:text-[9rem]">Priyal <span className="block py-4 text-4xl italic text-foreground md:text-6xl">&</span> Jatin</h1>
          <Flourish />
          <p className="mt-7 text-xs uppercase tracking-[0.22em] text-foreground md:text-sm">November 12, 2026 · Lakeside at Dusk</p>
          <div className="mx-auto mt-12 w-full max-w-xl arch-frame"><div className="arch-inner"><img src={coupleAsset.url} alt="Priyal and Jatin by the lake" className="h-[43vh] min-h-80 w-full object-cover object-[center_38%] md:h-[48vh]" /></div></div>
        </div>
        <a href="#couple" aria-label="Scroll to explore" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-foreground/70"><ArrowDown className="animate-bounce" /></a>
      </header>

      <section id="couple" className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Two hearts, one lake" title="Meet the Couple" />
          <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-20">
            <div className="arch-frame arch-frame--light"><div className="arch-inner"><img src={coupleAsset.url} alt="Priyal and Jatin by the lake" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div></div>
            <div className="grid gap-5">
              <article className="ornate-panel"><span className="text-xs uppercase tracking-[0.28em] text-blush">The Bride</span><h3 className="mt-3 font-display text-4xl text-cream md:text-5xl">Priyal Bang</h3><div className="my-5 h-px bg-gold-soft/40" /><p className="text-xs uppercase tracking-[0.2em] text-blush">Daughter of</p><p className="mt-2 font-display text-2xl text-cream">Mr. Dinesh Bang<br />& Mrs. Meenakshi Bang</p></article>
              <article className="ornate-panel"><span className="text-xs uppercase tracking-[0.28em] text-blush">The Groom</span><h3 className="mt-3 font-display text-4xl text-cream md:text-5xl">Jatin Mulchandani</h3><div className="my-5 h-px bg-gold-soft/40" /><p className="text-xs uppercase tracking-[0.2em] text-blush">Son of</p><p className="mt-2 font-display text-2xl text-cream">Mr. Shyam Mulchandani<br />& Mrs. Aarti Mulchandani</p></article>
            </div>
          </div>
        </div>
      </section>

      <section id="event" className="checker-section px-5 py-24 md:px-10 md:py-32"><div className="relative mx-auto max-w-5xl"><SectionHeading eyebrow="Counting the days" title="The Countdown" />
        <Countdown />
        <div className="mt-10 grid border border-gold/40 bg-cream md:grid-cols-2"><div className="p-7 text-center md:border-r md:border-gold/40"><p className="text-xs uppercase tracking-[0.25em] text-gold">The Day</p><p className="mt-2 font-display text-2xl">Thursday, December 10, 2026</p></div><div className="border-t border-gold/40 p-7 text-center md:border-t-0"><p className="text-xs uppercase tracking-[0.25em] text-gold">Dress Code</p><p className="mt-2 font-display text-2xl">Garden Formal · Earth tones encouraged</p></div></div>
      </div></section>

      <section id="events" className="events-section px-5 py-24 md:px-10 md:py-32">
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading eyebrow="Three days of celebration" title="The Events" tone="dark" />
          {eventDays.map((dayGroup) => (
            <div key={dayGroup.label} className="mt-20 first:mt-0">
              <div className="event-divider"><span className="text-[11px] uppercase tracking-[0.3em] text-cream">{dayGroup.label}</span></div>
              <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                {dayGroup.items.map((item) => (
                  <article key={item.title} className="event-card">
                    <div className="event-img-wrap">
                      <img src={item.image} alt={item.alt} loading="lazy" width={896} height={1024} />
                    </div>
                    <div className="relative px-6 py-9 text-center md:px-8">
                      <h3 className="font-script text-4xl font-normal text-gold md:text-5xl">{item.title}</h3>
                      <p className="mt-2 font-display text-sm italic text-foreground/70">{item.tagline}</p>
                      <div className="mx-auto my-6 h-px w-16 bg-gold-soft/60" />
                      <p className="font-display text-2xl text-foreground md:text-3xl">
                        {item.date[0]} <span className="mx-2 text-gold">|</span> {item.date[1]} <span className="mx-2 text-gold">|</span> {item.date[2]}
                      </p>
                      <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-foreground/70">{item.time}</p>
                      <p className="mt-1 font-script text-3xl text-gold">{item.day}</p>
                      {item.note && <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-foreground/70">{item.note}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="venue" className="relative bg-emerald-deep px-5 py-24 text-cream md:px-10 md:py-32"><div className="paper-texture absolute inset-0" /><div className="relative mx-auto max-w-6xl"><SectionHeading eyebrow="Where we'll gather" title="The Venue" tone="dark" />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20"><div><p className="font-display text-5xl text-blush">Praveg Lake Resort</p><address className="mt-5 not-italic leading-7 text-cream/75">Daman - 3 Kachigam, Kachigam Damanganga Garden<br />Nearby Kachigam Talab, Daman, 396215</address><p className="mt-6 leading-8 text-cream/75">A breathtaking lakeside retreat spread across four enchanting islands on Kachigam Talab — where nature, luxury, and celebration come together for an unforgettable destination wedding by the water.</p><ul className="my-8 divide-y divide-gold/25 border-y border-gold/25">{[["Getting There","Approximately 6 km from Vapi Railway Station"],["Accommodations","On-site resort rooms and villas for overnight guests"],["Nearby","5–10 km from Devka and Jampore beaches"]].map(([title,copy]) => <li key={title} className="py-4"><strong className="block text-xs uppercase tracking-[0.22em] text-blush">{title}</strong><span className="mt-1 block text-sm text-cream/70">{copy}</span></li>)}</ul><Button asChild variant="outline" className="h-12 rounded-none border-gold-soft bg-transparent px-7 uppercase tracking-[0.2em] text-gold-soft hover:bg-gold-soft hover:text-emerald-deep"><a href="https://share.google/wXPgCUtC4Ho5l4KOc" target="_blank" rel="noopener noreferrer"><MapPin /> Get Directions</a></Button></div>
          <div className="border border-gold-soft/45 bg-gold-soft/10 p-3"><div className="aspect-[4/3] overflow-hidden"><iframe title="Praveg Lake Resort location map" src="https://maps.google.com/maps?q=Praveg+Lake+Resort+Daman,+Kachigam,+Daman+396215&hl=en&z=15&output=embed" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="size-full grayscale-[30%]" /></div></div>
        </div>
      </div></section>

      <section id="blog" className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Our journey" title="Stories & Updates" /><div className="grid gap-8 md:grid-cols-3">{stories.map((story) => <article key={story.title} className="group"><div className="overflow-hidden border border-cream/70 bg-blush p-2"><img src={story.image} alt={story.alt} loading="lazy" width={912} height={1104} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div><time className="mt-6 block text-[11px] uppercase tracking-[0.22em] text-foreground/80">{story.date}</time><h3 className="mt-2 font-display text-3xl">{story.title}</h3><p className="mt-3 text-sm leading-7 text-foreground/80">{story.copy}</p><a href="#" className="mt-5 inline-flex border-b border-foreground/40 pb-1 text-xs uppercase tracking-[0.2em] text-foreground">Read more</a></article>)}</div></div></section>

      <footer className="checker-footer border-t border-gold-soft/40 px-5 py-16 text-center"><Music2 className="mx-auto size-6 text-gold-soft" /><p className="mt-5 font-display text-4xl text-cream">Priyal <span className="text-gold-soft">&</span> Jatin</p><p className="mt-3 text-xs uppercase tracking-[0.25em] text-blush">November 12, 2026</p><p className="mt-8 font-display text-xl italic text-cream/70">Where the lake meets forever</p></footer>
    </main>
  );
}
