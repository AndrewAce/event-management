import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* ── Mission Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-24 px-6">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(112, 42, 225, 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-sm font-bold mb-6">
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
              OUR MISSION
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-8">
              Connecting youth with{" "}
              <span className="text-primary italic">exciting</span> community
              events
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              VibeShift isn&apos;t just a platform — it&apos;s the pulse of
              your community. We bridge the gap between curiosity and
              connection, making sure you never miss a moment that matters.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-tertiary/10 rounded-full blur-2xl" />
            <div className="relative rounded-lg overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl bg-surface-container-high min-h-[480px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[160px] text-primary/20">
                groups
              </span>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-surface-container-lowest p-6 rounded-lg shadow-soft max-w-xs transform -rotate-2 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container">
                    groups
                  </span>
                </div>
                <span className="font-bold">Growing Community</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Real vibes happening right now across communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ecosystem ── */}
      <section className="bg-surface-container-low py-24 px-6 mx-4 lg:mx-8 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">
              The VibeShift Ecosystem
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
              A dynamic network built for youth, curated by organisations, and
              supported by the community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "school",
                title: "For Youths",
                bg: "bg-primary-container",
                text: "text-on-primary-container",
                check: "text-primary",
                items: [
                  "Discover hidden gems",
                  "Join social circles",
                  "Track personal goals",
                ],
              },
              {
                icon: "campaign",
                title: "For Organisations",
                bg: "bg-secondary-container",
                text: "text-on-secondary-container",
                check: "text-secondary",
                items: [
                  "Promote club events",
                  "Reach targeted audiences",
                  "Manage registrations",
                ],
              },
              {
                icon: "ads_click",
                title: "For Brands",
                bg: "bg-tertiary-container",
                text: "text-on-tertiary-container",
                check: "text-tertiary",
                items: [
                  "Connect with Gen-Z",
                  "Sponsorship deals",
                  "Community activations",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-lowest p-8 rounded-lg shadow-soft flex flex-col items-center text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full ${card.bg} flex items-center justify-center mb-6`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${card.text}`}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <ul className="space-y-3 text-on-surface-variant">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-sm ${card.check}`}
                      >
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Creating Real Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg bg-secondary-container p-8 flex flex-col justify-between min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary">
                  favorite
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-2 text-on-secondary-container">
                  New Connections
                </h3>
                <p className="text-on-secondary-container/80 text-sm">
                  Making communities feel like a smaller, friendlier place every
                  single day.
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-tertiary-container p-8 flex flex-col justify-between min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary">
                  bolt
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-2 text-on-tertiary-container">
                  Vibrant Life
                </h3>
                <p className="text-on-tertiary-container/80 text-sm">
                  Boosting local event attendance and community engagement
                  through targeted discovery.
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-primary-container/30 p-8 flex flex-col justify-between min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary">
                  explore
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-2">
                  Infinite Discovery
                </h3>
                <p className="text-on-surface-variant text-sm">
                  Students and youth finding their favourite community spots and
                  events through VibeShift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-lg kinetic-gradient p-12 text-center text-on-primary shadow-glow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h2 className="text-4xl font-extrabold mb-6 relative z-10">
            Ready to shift your community vibe?
          </h2>
          <p className="text-xl mb-10 opacity-90 relative z-10">
            Join youth across the community and start discovering experiences
            that define your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/auth/register"
              className="px-10 py-4 bg-white text-primary font-extrabold rounded-full hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-extrabold rounded-full hover:bg-white/10 transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
