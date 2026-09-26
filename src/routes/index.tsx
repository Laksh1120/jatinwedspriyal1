import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, Clock3, Flower2, Gem, GlassWater, Heart, MapPin, Menu, Music2, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import coupleAsset from "@/assets/couple.jpg.asset.json";
import lakeAsset from "@/assets/lake.jpg.asset.json";
import proposalImage from "@/assets/story-proposal.jpg";
import venueImage from "@/assets/story-venue.jpg";
import engagementImage from "@/assets/story-engagement.jpg";
import ganeshaImage from "@/assets/ganesha.png";

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

const events = [
  { icon: Flower2, time: "4:00 PM", name: "Guest Arrival", copy: "Welcome drinks on the lakeside terrace. Light acoustic music and meadow views." },
  { icon: Gem, time: "5:30 PM", name: "Ceremony", copy: "An outdoor ceremony on the wooden dock, overlooking Mirror Lake at golden hour." },
  { icon: GlassWater, time: "6:30 PM", name: "Reception & Dinner", copy: "Farm-to-table dinner under the stars, followed by dancing by the water's edge." },
  { icon: Sparkles, time: "10:00 PM", name: "Farewell", copy: "Lantern send-off over the lake. Shuttle service departs at 11:00 PM." },
];

const stories = [
  { image: proposalImage, alt: "Proposal by the lake", date: "March 12, 2025", title: "The Proposal at Mirror Lake", copy: "Jatin got down on one knee as the sun painted the water gold. Priyal said yes before he could finish the question." },
  { image: venueImage, alt: "Venue scouting", date: "January 8, 2025", title: "Finding Our Perfect Shore", copy: "We visited a dozen venues before stepping onto the shores of Praveg Lake Resort — we knew instantly this was the one." },
  { image: engagementImage, alt: "Engagement party", date: "November 2, 2024", title: "Engagement Celebration", copy: "Family and friends gathered for an intimate garden party. So much love, laughter, and homemade pie." },
];

function Flourish() {
  return <div className="flourish" aria-hidden="true"><span /><Heart className="size-3" /><span /></div>;
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mb-12 text-center md:mb-16"><p className="font-body text-xs uppercase tracking-[0.28em] text-gold">{eyebrow}</p><h2 className="mt-3 font-display text-5xl font-medium text-foreground md:text-7xl">{title}</h2><Flourish /></div>;
}

function Index() {
  const [intro, setIntro] = useState(false);
  const [opening, setOpening] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const force = new URLSearchParams(window.location.search).has("intro");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && (force || !window.localStorage.getItem("priyal-jatin-intro-v5"))) setIntro(true);
  }, []);

  const finishIntro = () => {
    setOpening(true);
    window.localStorage.setItem("priyal-jatin-intro-v5", "1");
    window.setTimeout(() => setIntro(false), 1400);
  };

  useEffect(() => {
    if (!intro) return;
    const t = window.setTimeout(finishIntro, 7200);
    return () => window.clearTimeout(t);
  }, [intro]);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {intro && <div className={`ganpati-intro ${opening ? "is-opening" : ""}`} onClick={finishIntro}>
        <div className="gi-door gi-door-left" aria-hidden="true" />
        <div className="gi-door gi-door-right" aria-hidden="true" />
        <div className="paper-texture absolute inset-0" aria-hidden="true" />
        <div className="gi-floor" aria-hidden="true" />
        <div className="gi-screens" aria-hidden="true"><span /><span /></div>
        <div className="sconce gi-sconce left-4 md:left-16" aria-hidden="true"><span className="lamp" /><span className="stem" /></div>
        <div className="sconce gi-sconce right-4 md:right-16" aria-hidden="true"><span className="lamp" /><span className="stem" /></div>
        <Button variant="ghost" onClick={(e) => { e.stopPropagation(); finishIntro(); }} className="absolute right-5 top-5 z-20 uppercase tracking-[0.2em] text-cream hover:bg-cream/10 hover:text-cream">Skip</Button>
        <div className="gi-stage">
          <div className="gi-halo" aria-hidden="true" />
          <img src={ganeshaImage} alt="Lord Ganesha" width={1024} height={1024} className="gi-ganesha" />
          <p className="gi-mantra font-display text-gold">॥ श्री गणेशाय नमः ॥</p>
          <div className="gi-card">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">You're invited</p>
            <p className="mt-4 font-display text-4xl text-cream md:text-5xl">Priyal <span className="text-gold">&</span> Jatin</p>
            <Flourish />
            <p className="text-xs uppercase tracking-[0.22em] text-blush">November 12, 2026</p>
          </div>
        </div>
      </div>}

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-gold/25 bg-emerald/90 px-5 text-cream backdrop-blur-md md:px-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href="#home" className="font-display text-2xl">Lake <span className="text-gold">&</span> Love</a>
          <Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-gold md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</Button>
          <div className="hidden gap-8 text-[11px] uppercase tracking-[0.25em] md:flex">
            <a href="#couple" className="transition-colors hover:text-gold">Us</a><a href="#event" className="transition-colors hover:text-gold">Event</a><a href="#venue" className="transition-colors hover:text-gold">Venue</a><a href="#blog" className="transition-colors hover:text-gold">Stories</a>
          </div>
        </div>
        {menuOpen && <div className="flex flex-col gap-5 border-t border-gold/20 py-6 text-center text-xs uppercase tracking-[0.25em] md:hidden">{[["#couple","Us"],["#event","Event"],["#venue","Venue"],["#blog","Stories"]].map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>}
      </nav>

      <header id="home" className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-emerald px-5 pb-20 pt-28 text-center text-cream">
        <img src={lakeAsset.url} alt="A tranquil lake at dusk" className="absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity" />
        <div className="paper-texture absolute inset-0" />
        <div className="sconce left-3 md:left-10" aria-hidden="true"><span className="lamp" /><span className="stem" /></div>
        <div className="sconce right-3 md:right-10" aria-hidden="true"><span className="lamp" /><span className="stem" /></div>
        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-blush md:text-sm">You're invited to celebrate</p>
          <h1 className="mt-7 font-display text-7xl font-medium leading-[0.78] md:text-[9rem]">Priyal <span className="block py-4 text-4xl italic text-gold md:text-6xl">&</span> Jatin</h1>
          <Flourish />
          <p className="mt-7 text-xs uppercase tracking-[0.22em] text-cream/80 md:text-sm">November 12, 2026 · Lakeside at Dusk</p>
          <div className="mx-auto mt-12 w-full max-w-xl arch-frame"><div className="arch-inner"><img src={coupleAsset.url} alt="Priyal and Jatin by the lake" className="h-[43vh] min-h-80 w-full object-cover object-[center_38%] md:h-[48vh]" /></div></div>
        </div>
        <a href="#couple" aria-label="Scroll to explore" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold"><ArrowDown className="animate-bounce" /></a>
      </header>

      <section id="couple" className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Two hearts, one lake" title="Meet the Couple" />
          <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-20">
            <div className="arch-frame arch-frame--light"><div className="arch-inner"><img src={coupleAsset.url} alt="Priyal and Jatin by the lake" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div></div>
            <div className="grid gap-5">
              <article className="ornate-panel"><span className="text-xs uppercase tracking-[0.28em] text-gold">The Bride</span><h3 className="mt-3 font-display text-4xl text-cream md:text-5xl">Priyal Bang</h3><div className="my-5 h-px bg-gold/40" /><p className="text-xs uppercase tracking-[0.2em] text-blush">Daughter of</p><p className="mt-2 font-display text-2xl text-cream">Mr. Dinesh Bang<br />& Mrs. Meenakshi Bang</p></article>
              <article className="ornate-panel"><span className="text-xs uppercase tracking-[0.28em] text-gold">The Groom</span><h3 className="mt-3 font-display text-4xl text-cream md:text-5xl">Jatin Mulchandani</h3><div className="my-5 h-px bg-gold/40" /><p className="text-xs uppercase tracking-[0.2em] text-blush">Son of</p><p className="mt-2 font-display text-2xl text-cream">Mr. Shyam Mulchandani<br />& Mrs. Aarti Mulchandani</p></article>
            </div>
          </div>
        </div>
      </section>

      <section id="event" className="checker-section px-5 py-24 md:px-10 md:py-32"><div className="relative mx-auto max-w-6xl"><SectionHeading eyebrow="Mark your calendar" title="Event Details" />
        <div className="grid gap-px border border-gold/40 bg-gold/40 md:grid-cols-4">{events.map(({icon: Icon,time,name,copy}, index) => <article key={name} className={`p-7 text-center md:p-9 ${index === 1 ? "bg-blush" : "bg-cream"}`}><Icon className="mx-auto size-7 text-emerald" /><time className="mt-6 block text-xs uppercase tracking-[0.22em] text-emerald">{time}</time><h3 className="mt-3 font-display text-3xl">{name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div>
        <div className="mt-10 grid border border-gold/40 bg-cream md:grid-cols-2"><div className="p-7 text-center md:border-r md:border-gold/40"><p className="text-xs uppercase tracking-[0.25em] text-gold">Date</p><p className="mt-2 font-display text-2xl">Thursday, November 12, 2026</p></div><div className="border-t border-gold/40 p-7 text-center md:border-t-0"><p className="text-xs uppercase tracking-[0.25em] text-gold">Dress Code</p><p className="mt-2 font-display text-2xl">Garden Formal · Earth tones encouraged</p></div></div>
      </div></section>

      <section id="venue" className="relative bg-emerald px-5 py-24 text-cream md:px-10 md:py-32"><div className="paper-texture absolute inset-0" /><div className="relative mx-auto max-w-6xl"><SectionHeading eyebrow="Where we'll gather" title="The Venue" />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20"><div><p className="font-display text-5xl text-blush">Praveg Lake Resort</p><address className="mt-5 not-italic leading-7 text-cream/75">Daman - 3 Kachigam, Kachigam Damanganga Garden<br />Nearby Kachigam Talab, Daman, 396215</address><p className="mt-6 leading-8 text-cream/75">A breathtaking lakeside retreat spread across four enchanting islands on Kachigam Talab — where nature, luxury, and celebration come together for an unforgettable destination wedding by the water.</p><ul className="my-8 divide-y divide-gold/25 border-y border-gold/25">{[["Getting There","Approximately 6 km from Vapi Railway Station"],["Accommodations","On-site resort rooms and villas for overnight guests"],["Nearby","5–10 km from Devka and Jampore beaches"]].map(([title,copy]) => <li key={title} className="py-4"><strong className="block text-xs uppercase tracking-[0.22em] text-gold">{title}</strong><span className="mt-1 block text-sm text-cream/70">{copy}</span></li>)}</ul><Button asChild variant="outline" className="h-12 rounded-none border-gold bg-transparent px-7 uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-emerald"><a href="https://share.google/wXPgCUtC4Ho5l4KOc" target="_blank" rel="noopener noreferrer"><MapPin /> Get Directions</a></Button></div>
          <div className="border border-gold/50 bg-gold/10 p-3"><div className="aspect-[4/3] overflow-hidden"><iframe title="Praveg Lake Resort location map" src="https://maps.google.com/maps?q=Praveg+Lake+Resort+Daman,+Kachigam,+Daman+396215&hl=en&z=15&output=embed" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="size-full grayscale-[30%]" /></div></div>
        </div>
      </div></section>

      <section id="blog" className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Our journey" title="Stories & Updates" /><div className="grid gap-8 md:grid-cols-3">{stories.map((story) => <article key={story.title} className="group"><div className="overflow-hidden border border-gold/40 bg-blush p-2"><img src={story.image} alt={story.alt} loading="lazy" width={912} height={1104} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div><time className="mt-6 block text-[11px] uppercase tracking-[0.22em] text-gold">{story.date}</time><h3 className="mt-2 font-display text-3xl">{story.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{story.copy}</p><a href="#" className="mt-5 inline-flex border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-emerald">Read more</a></article>)}</div></div></section>

      <footer className="checker-footer border-t border-gold/40 px-5 py-16 text-center"><Music2 className="mx-auto size-6 text-gold" /><p className="mt-5 font-display text-4xl text-cream">Priyal <span className="text-gold">&</span> Jatin</p><p className="mt-3 text-xs uppercase tracking-[0.25em] text-blush">November 12, 2026</p><p className="mt-8 font-display text-xl italic text-cream/70">Where the lake meets forever</p></footer>
    </main>
  );
}