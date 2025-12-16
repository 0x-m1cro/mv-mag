import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Magazine', href: '/magazine' },
  { label: 'Blog', href: '/blog' },
  { label: 'Itineraries', href: '/itineraries' },
  { label: 'About', href: '/about' },
]

const heroSlides = [
  {
    title: 'Where the Maldives reveals itself.',
    kicker: 'Latest Issue · Azure Horizons',
    copy: 'A serene, subscriber-first journey across South Ari Atoll, luminous lagoons, and slow evenings overwater.',
    cta: 'Subscribe Now',
    image:
      'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1600&q=80',
    alt: 'Serene overwater bungalows at dusk in the Maldives',
  },
  {
    title: 'Sustainable sanctuaries, curated with care.',
    kicker: 'Insider Guides · Eco-Tourism',
    copy: 'Conscious stays, reef-safe dives, and slow travel rituals for the mindful explorer.',
    cta: 'Discover Guides',
    image:
      'https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Calm turquoise lagoon surrounded by green islands',
  },
  {
    title: 'Itineraries that let you exhale.',
    kicker: 'Milestone Moments · Seven Nights',
    copy: 'From seaplane horizons to lantern-lit dinners, each day curated for renewal and wonder.',
    cta: 'Plan My Escape',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80',
    alt: 'Soft sunrise over a wooden jetty in the Maldives',
  },
]

const magazineFeatures = [
  {
    id: 'mag-01',
    title: 'Azure Horizons — South Ari Atoll',
    summary: 'An immersive long-form spread on whale sharks, sandbanks, and dusk dhoni sails.',
    readTime: '8 min read',
    category: 'Magazine',
    tag: 'Latest Issue',
    image:
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=900&q=80',
    premium: true,
  },
  {
    id: 'mag-02',
    title: 'Quiet Luxury — Raa Atoll Hideaways',
    summary: 'Suite spotlights, private sandbank suppers, and slow-sailing rituals.',
    readTime: '6 min read',
    category: 'Magazine',
    tag: 'Luxury with Conscience',
    image:
      'https://images.unsplash.com/photo-1500375591096-5bc0b4aeabdd?auto=format&fit=crop&w=900&q=80',
    premium: true,
  },
  {
    id: 'mag-03',
    title: 'Tidal Greens — Reef Renewal',
    summary: 'Meet the marine biologists restoring coral gardens with community-led care.',
    readTime: '7 min read',
    category: 'Magazine',
    tag: 'Stewardship',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    premium: true,
  },
]

const blogStories = [
  {
    id: 'blog-01',
    title: '48 Hours in Malé — An Elegant Stopover',
    summary: 'Curated galleries, coffee bars, and design-forward boutiques that feel intentional.',
    readTime: '4 min read',
    category: 'Blog',
    tag: 'City Notes',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    premium: false,
  },
  {
    id: 'blog-02',
    title: 'How to Travel Light — Maldivian Edition',
    summary: 'A calm packing list: reef-safe SPF, linen layers, and respectful resort wear.',
    readTime: '3 min read',
    category: 'Blog',
    tag: 'Calm Tips',
    image:
      'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=900&q=80',
    premium: false,
  },
  {
    id: 'blog-03',
    title: 'Dining Over Water — Chef’s Table Picks',
    summary: 'Azure-lit dinners, zero-waste menus, and sommelier-led pairings.',
    readTime: '5 min read',
    category: 'Blog',
    tag: 'Taste',
    image:
      'https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=900&q=80',
    premium: false,
  },
]

const itineraryCards = [
  {
    id: 'it-01',
    title: 'Seven Nights of Stillness — Baa & Raa',
    summary: 'Manta rays at Hanifaru, sunrise yoga, and lantern-lit sandbank dinners.',
    readTime: '7 day arc',
    category: 'Itineraries',
    tag: 'Milestone Journey',
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80',
    premium: true,
  },
  {
    id: 'it-02',
    title: 'Eco-Escape — Laamu’s Conscious Circuit',
    summary: 'Mangrove kayaking, seagrass snorkels, and reef restoration workshops.',
    readTime: '5 day arc',
    category: 'Itineraries',
    tag: 'Sustainability',
    image:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80',
    premium: true,
  },
  {
    id: 'it-03',
    title: 'Refined Romance — South Malé Interlude',
    summary: 'Overwater spa rituals, private cinema nights, and slow sails at golden hour.',
    readTime: '4 day arc',
    category: 'Itineraries',
    tag: 'Refined Romantic',
    image:
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=900&q=80',
    premium: true,
  },
]

const sustainabilityCards = [
  {
    id: 'sus-01',
    title: 'Inside a Coral Nursery',
    summary: 'Step-by-step with the marine team cultivating resilient reef frames.',
    readTime: '4 min read',
    category: 'Sustainability',
    tag: 'Stewardship',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    premium: false,
  },
  {
    id: 'sus-02',
    title: 'Low-Impact Seaplanes on the Horizon',
    summary: 'A calm primer on hybrid fleets and how to choose lower-emission hops.',
    readTime: '3 min read',
    category: 'Sustainability',
    tag: 'Future Forward',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    premium: false,
  },
]

const categories = ['All', 'Magazine', 'Blog', 'Itineraries', 'Sustainability']

function Header({ query, onQueryChange, onOpenModal, isSubscribed }) {
  const location = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 glass-panel">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-azure/80 via-sky-200 to-emerald-100 shadow-md" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Where&apos;s</p>
              <p className="font-display text-lg text-slate-900 leading-tight">Maldives Magazine</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'text-azure border-b border-azure pb-1' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <div className="hidden w-full max-w-xs items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-soft md:flex">
            <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
            </svg>
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search serene stays, guides, or issues"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              aria-label="Search content"
            />
          </div>
          <span className="hidden rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white md:inline-block">
            {location.pathname === '/' ? 'Calm Authority' : 'Curated Access'}
          </span>
          <button
            className="pill bg-azure text-white shadow-soft hover:-translate-y-0.5 transition"
            onClick={onOpenModal}
            type="button"
          >
            {isSubscribed ? 'Manage Access' : 'Login / Subscribe'}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onPrimaryAction, onSecondaryAction }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % heroSlides.length), 7000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[index]

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-slate-900 text-white shadow-soft">
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-azure/40" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:px-10 md:py-20">
        <div className="max-w-2xl space-y-4">
          <p className="pill inline-flex bg-white/15 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            {slide.kicker}
          </p>
          <h1 className="text-4xl md:text-5xl font-display leading-tight">{slide.title}</h1>
          <p className="text-lg text-slate-100/90">{slide.copy}</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onPrimaryAction}
              className="pill bg-azure text-white shadow-lg shadow-azure/30 transition hover:-translate-y-0.5"
              type="button"
            >
              {slide.cta}
            </button>
            <button
              onClick={onSecondaryAction}
              className="pill border border-white/40 bg-white/10 text-white transition hover:bg-white/15"
              type="button"
            >
              Browse the Magazine
            </button>
          </div>
        </div>
        <div className="grid w-full max-w-sm grid-cols-3 gap-2 rounded-2xl bg-white/10 p-3 backdrop-blur">
          {heroSlides.map((item, idx) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setIndex(idx)}
              className={`group relative h-20 overflow-hidden rounded-xl border border-white/20 transition ${
                idx === index ? 'ring-2 ring-gilded' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <p className="absolute bottom-2 left-2 text-xs font-semibold text-white drop-shadow">
                {item.kicker}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function CuratedGrid({ title, eyebrow, items, onRead, onSave, savedIds }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="pill inline-flex bg-azure/10 text-azure">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-display text-slate-900">{title}</h2>
        </div>
        <Link className="text-sm font-medium text-azure hover:underline" to="/magazine">
          View all
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="glass-panel overflow-hidden rounded-2xl transition hover:-translate-y-1">
            <div className="relative h-48">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="pill bg-white/80 text-slate-900">{item.tag}</span>
                {item.premium && (
                  <span className="pill bg-gilded text-slate-900 shadow-inner">Subscriber</span>
                )}
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.category}</p>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.summary}</p>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{item.readTime}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSave(item)}
                    className="text-azure hover:underline"
                    type="button"
                    aria-label="Save article"
                  >
                    {savedIds.includes(item.id) ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={() => onRead(item)}
                    className="text-slate-900 hover:text-azure"
                    type="button"
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ArticleReader({ article, isSubscribed, onSubscribe, onSave, savedIds }) {
  if (!article) return null
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white shadow-soft">
      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full rounded-2xl object-cover"
            loading="lazy"
          />
          {article.premium && !isSubscribed && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/65 text-center text-white">
              <div className="space-y-3">
                <p className="pill inline-flex bg-gilded/90 text-slate-900">Subscriber-only</p>
                <p className="text-lg font-semibold">A gentle reminder: Subscribe to continue your journey.</p>
                <button
                  onClick={onSubscribe}
                  className="pill bg-white text-slate-900 shadow-lg hover:-translate-y-0.5"
                  type="button"
                >
                  Unlock access
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <p className="pill inline-flex bg-azure/10 text-azure">{article.tag}</p>
          <h3 className="text-3xl font-display text-slate-900">{article.title}</h3>
          <p className="text-slate-600 leading-relaxed">
            {article.summary} This reader view is designed for calm, long-form immersion with generous line height and
            uncluttered margins. Subscribers can continue into the full spread with photography, reef-safe tips, and
            bespoke itineraries curated for this issue.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{article.readTime}</span>
            {article.premium && <span className="pill bg-gilded text-slate-900">Premium</span>}
            <button
              onClick={() => onSave(article)}
              className="text-azure hover:underline"
              type="button"
            >
              {savedIds.includes(article.id) ? 'Saved to profile' : 'Save for later'}
            </button>
          </div>
          <div className="rounded-2xl bg-azure/5 p-4 text-sm text-slate-700">
            <p className="font-semibold text-azure">Insider path</p>
            <p>
              Start with reef-friendly dives at sunrise, pause for slow brunches, and close with dhoni sails. Your
              saved preferences refine these notes over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function RecommendationRail({ items, onRead, onSave, savedIds }) {
  if (!items.length) return null
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="pill inline-flex bg-tidal/10 text-tidal">Personalized for you</p>
          <h2 className="mt-2 text-2xl font-display text-slate-900">Recommended next</h2>
        </div>
        <span className="text-sm text-slate-500">Based on what you viewed</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="glass-panel rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-16 w-20 overflow-hidden rounded-xl">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.category}</p>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{item.summary}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{item.readTime}</span>
                  <button onClick={() => onSave(item)} className="text-azure" type="button">
                    {savedIds.includes(item.id) ? 'Saved' : 'Save'}
                  </button>
                  <button onClick={() => onRead(item)} className="text-slate-900 hover:text-azure" type="button">
                    Read
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function DiscoverSection({ results, onRead }) {
  if (!results.length) return null
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="pill inline-flex bg-azure/10 text-azure">Search</p>
          <h2 className="mt-2 text-xl font-display text-slate-900">Discover</h2>
        </div>
        <span className="text-sm text-slate-500">{results.length} curated results</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {results.map((item) => (
          <button
            key={item.id}
            onClick={() => onRead(item)}
            className="group rounded-2xl bg-white p-4 text-left shadow-soft transition hover:-translate-y-1"
            type="button"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.category}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-azure">{item.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-2">{item.summary}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

function AdminPanel({ onCreate }) {
  const [draft, setDraft] = useState({
    title: '',
    category: 'Magazine',
    summary: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!draft.title || !draft.summary) return
    const draftId =
      typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `admin-${Date.now()}`
    onCreate({
      id: draftId,
      ...draft,
      readTime: 'Editor preview',
      tag: 'Founder upload',
      image:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
      premium: draft.category !== 'Blog',
    })
    setDraft({ title: '', category: 'Magazine', summary: '' })
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="pill inline-flex bg-slate-900 text-white">Admin</p>
          <h2 className="mt-2 text-2xl font-display text-slate-900">Founder Console</h2>
          <p className="text-sm text-slate-600">
            Upload stories in Markdown later; for now, curate quick teasers for subscribers.
          </p>
        </div>
        <span className="hidden rounded-full bg-neutralSand px-3 py-1 text-xs font-semibold text-slate-700 md:inline-block">
          Private
        </span>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Title
            <input
              value={draft.title}
              onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-azure"
              placeholder="Lagoon Poetry — January Issue"
              required
            />
          </label>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Category
            <select
              value={draft.category}
              onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-azure"
            >
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Summary
            <textarea
              value={draft.summary}
              onChange={(e) => setDraft((prev) => ({ ...prev, summary: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-azure"
              placeholder="Add a serene, sensory description..."
              rows={3}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="pill bg-azure text-white shadow-soft hover:-translate-y-0.5 md:w-max"
        >
          Add draft
        </button>
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200/70 bg-white/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-slate-800">Where&apos;s Maldives Magazine</p>
        <div className="flex flex-wrap gap-4">
          <Link to="/about" className="hover:text-azure">
            About
          </Link>
          <a href="#privacy" className="hover:text-azure">
            Privacy
          </a>
          <a href="#terms" className="hover:text-azure">
            Terms
          </a>
        </div>
        <p className="text-xs text-slate-500">A serene, ad-free travel companion.</p>
      </div>
    </footer>
  )
}

function SubscriptionModal({ open, onClose, onConfirm }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display text-slate-900">Choose your calm access</h3>
          <button onClick={onClose} type="button" aria-label="Close subscription dialog">
            ✕
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Two serene plans. Ad-free, immersive, with new issues monthly.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            { label: '$7.99 / month', detail: 'Pause anytime · All issues & blog', value: 'monthly' },
            { label: '$79.99 / year', detail: '2 months complimentary · VIP drops', value: 'yearly' },
          ].map((plan) => (
            <button
              key={plan.value}
              onClick={() => onConfirm(plan.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-azure hover:bg-white"
              type="button"
            >
              <p className="text-lg font-semibold text-slate-900">{plan.label}</p>
              <p className="text-sm text-slate-600">{plan.detail}</p>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Stripe-ready | Google sign-in coming soon</span>
          <button onClick={onClose} className="text-azure" type="button">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}

function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutralSand via-white to-sky-50">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">{children}</div>
    </div>
  )
}

function HomePage({
  onPrimaryAction,
  onSecondaryAction,
  onRead,
  onSave,
  savedIds,
  activeArticle,
  isSubscribed,
  onSubscribe,
  recommendations,
  searchResults,
  adminCreate,
}) {
  return (
    <PageLayout>
      <Hero onPrimaryAction={onPrimaryAction} onSecondaryAction={onSecondaryAction} />

      <div className="mt-10 grid gap-8">
        <DiscoverSection results={searchResults.slice(0, 6)} onRead={onRead} />
        <CuratedGrid
          title="Latest issue & evergreen features"
          eyebrow="Magazine"
          items={magazineFeatures}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
        <CuratedGrid
          title="Trending stories, refreshed weekly"
          eyebrow="Blog"
          items={blogStories}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
        <CuratedGrid
          title="Itineraries to exhale"
          eyebrow="Guided arcs"
          items={itineraryCards}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
        <CuratedGrid
          title="Sustainability notes"
          eyebrow="Stewardship"
          items={sustainabilityCards}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
        <ArticleReader
          article={activeArticle}
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
          onSave={onSave}
          savedIds={savedIds}
        />
        <RecommendationRail items={recommendations} onRead={onRead} onSave={onSave} savedIds={savedIds} />
        <AdminPanel onCreate={adminCreate} />
      </div>
    </PageLayout>
  )
}

function MagazinePage({ onRead, onSave, savedIds, searchResults }) {
  return (
    <PageLayout>
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <p className="pill inline-flex bg-azure/10 text-azure">Magazine</p>
        <h2 className="mt-2 text-3xl font-display text-slate-900">Monthly issues & collected features</h2>
        <p className="text-slate-600">
          Subscribe for ad-free reading, immersive photography, and printable PDF spreads powered by React PDF.
        </p>
      </div>
      <div className="mt-6 grid gap-8">
        <CuratedGrid
          title="Current Issue"
          eyebrow="Subscriber"
          items={magazineFeatures}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
        <DiscoverSection results={searchResults} onRead={onRead} />
      </div>
    </PageLayout>
  )
}

function BlogPage({ onRead, onSave, savedIds, searchResults }) {
  return (
    <PageLayout>
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <p className="pill inline-flex bg-azure/10 text-azure">Blog</p>
        <h2 className="mt-2 text-3xl font-display text-slate-900">Timely notes, refreshed weekly</h2>
        <p className="text-slate-600">
          Calm, concise dispatches with practical filters for eco-tourism, luxury resorts, and mindful tips.
        </p>
      </div>
      <div className="mt-6 grid gap-8">
        <CuratedGrid
          title="Trending today"
          eyebrow="Stories"
          items={blogStories}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
        <DiscoverSection results={searchResults} onRead={onRead} />
      </div>
    </PageLayout>
  )
}

function ItinerariesPage({ onRead, onSave, savedIds }) {
  return (
    <PageLayout>
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <p className="pill inline-flex bg-azure/10 text-azure">Itineraries</p>
        <h2 className="mt-2 text-3xl font-display text-slate-900">Intentional paths through the atolls</h2>
        <p className="text-slate-600">Personalized recommendations refine as you save articles and itineraries.</p>
      </div>
      <div className="mt-6 grid gap-8">
        <CuratedGrid
          title="Signature arcs"
          eyebrow="Slow travel"
          items={itineraryCards}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
        <CuratedGrid
          title="Stewardship spotlights"
          eyebrow="Sustainability"
          items={sustainabilityCards}
          onRead={onRead}
          onSave={onSave}
          savedIds={savedIds}
        />
      </div>
    </PageLayout>
  )
}

function AboutPage() {
  return (
    <PageLayout>
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <p className="pill inline-flex bg-azure/10 text-azure">About</p>
        <h2 className="mt-2 text-3xl font-display text-slate-900">Calm authority, curated for Maldives devotees</h2>
        <p className="text-slate-600 leading-relaxed">
          Where&apos;s Maldives Magazine is ad-free, subscriber-first, and design-led. We blend immersive imagery, long-form
          storytelling, and responsible travel insights. Expect personalization, saved itineraries, and a dashboard to
          manage your subscription with Stripe integration.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            'Explorer-Sage tone — serene, refined, curious.',
            'WCAG 2.1 AA: alt text, contrast, keyboard-friendly.',
            'Search, filters, and personalization baked in.',
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-neutralSand p-4 text-sm text-slate-700 shadow-inner">
              {item}
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

function App() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeArticle, setActiveArticle] = useState(() => magazineFeatures[0] ?? null)
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem('mv-saved') || '[]'))
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('mv-history') || '[]'))
  const [adminDrafts, setAdminDrafts] = useState([])

  const library = useMemo(
    () => [...adminDrafts, ...magazineFeatures, ...blogStories, ...itineraryCards, ...sustainabilityCards],
    [adminDrafts]
  )

  useEffect(() => {
    localStorage.setItem('mv-saved', JSON.stringify(savedIds))
  }, [savedIds])

  useEffect(() => {
    localStorage.setItem('mv-history', JSON.stringify(history))
  }, [history])

  const filteredResults = useMemo(() => {
    const term = query.toLowerCase().trim()
    return library
      .filter((item) => selectedCategory === 'All' || item.category === selectedCategory)
      .filter(
        (item) =>
          !term ||
          item.title.toLowerCase().includes(term) ||
          item.summary.toLowerCase().includes(term) ||
          item.tag?.toLowerCase().includes(term)
      )
  }, [library, query, selectedCategory])

  const recommendations = useMemo(() => {
    const lastCategory = history[0]?.category
    if (!lastCategory) return library.slice(0, 3)
    const next = library.filter((item) => item.category === lastCategory && item.id !== activeArticle?.id)
    return next.slice(0, 3).length ? next.slice(0, 3) : library.slice(0, 3)
  }, [history, library, activeArticle])

  const handleRead = (article) => {
    setActiveArticle(article)
    setHistory((prev) => {
      const updated = [article, ...prev.filter((item) => item.id !== article.id)]
      return updated.slice(0, 10)
    })
    if (article.premium && !isSubscribed) {
      setIsModalOpen(true)
    }
  }

  const handleSave = (article) => {
    setSavedIds((prev) => (prev.includes(article.id) ? prev : [...prev, article.id]))
  }

  const handleSubscribe = (plan) => {
    setIsSubscribed(true)
    setIsModalOpen(false)
    if (plan) {
      localStorage.setItem('mv-plan', plan)
    }
  }

  const handleAdminCreate = (draft) => {
    setAdminDrafts((prev) => [draft, ...prev])
    setActiveArticle(draft)
  }

  return (
    <div className="relative">
      <Header query={query} onQueryChange={setQuery} onOpenModal={() => setIsModalOpen(true)} isSubscribed={isSubscribed} />

      <div className="bg-sea-glow">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-28">
          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pill ${selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white/80 text-slate-800'}`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onPrimaryAction={() => setIsModalOpen(true)}
              onSecondaryAction={() => navigate('/magazine')}
              onRead={handleRead}
              onSave={handleSave}
              savedIds={savedIds}
              activeArticle={activeArticle}
              isSubscribed={isSubscribed}
              onSubscribe={() => setIsModalOpen(true)}
              recommendations={recommendations}
              searchResults={filteredResults}
              adminCreate={handleAdminCreate}
            />
          }
        />
        <Route
          path="/magazine"
          element={
            <MagazinePage onRead={handleRead} onSave={handleSave} savedIds={savedIds} searchResults={filteredResults} />
          }
        />
        <Route
          path="/blog"
          element={<BlogPage onRead={handleRead} onSave={handleSave} savedIds={savedIds} searchResults={filteredResults} />}
        />
        <Route
          path="/itineraries"
          element={<ItinerariesPage onRead={handleRead} onSave={handleSave} savedIds={savedIds} />}
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <Footer />

      <SubscriptionModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSubscribe} />
    </div>
  )
}

export default App
