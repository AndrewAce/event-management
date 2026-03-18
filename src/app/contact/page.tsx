"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-24">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(112, 42, 225, 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              PARTNER WITH US
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Let&apos;s build something{" "}
              <span className="text-primary italic">together.</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-10">
              Are you an organisation, club, or brand looking to connect with
              youth in your community? Reach out and let&apos;s collaborate on
              something unforgettable.
            </p>

            {/* Why partner */}
            <div className="space-y-5">
              {[
                {
                  icon: "group",
                  title: "Reach thousands of youths",
                  desc: "Instant access to an engaged youth community.",
                },
                {
                  icon: "campaign",
                  title: "Promote your activities",
                  desc: "The central hub for clubs, societies, and events.",
                },
                {
                  icon: "trending_up",
                  title: "Grow your attendance",
                  desc: "Smart discovery that matches your event to the right audience.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-on-surface-variant text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {success ? (
              <div className="bg-surface-container-lowest rounded-lg p-12 shadow-soft border border-outline-variant/10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl text-green-600">
                    check_circle
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold mb-3">
                  Message Received!
                </h2>
                <p className="text-on-surface-variant">
                  Thanks for reaching out. Our team will get back to you within
                  2 business days.
                </p>
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-lg p-8 shadow-soft border border-outline-variant/10">
                <h2 className="text-2xl font-extrabold mb-6">
                  Get in Touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Organisation Name"
                      placeholder="e.g. Youth Sports Club"
                      value={form.orgName}
                      onChange={(e) => update("orgName", e.target.value)}
                      required
                    />
                    <Input
                      label="Your Name"
                      placeholder="Full name"
                      value={form.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                      required
                    />
                  </div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="hello@org.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                  <Input
                    label="Phone (optional)"
                    type="tel"
                    placeholder="+65 9xxx xxxx"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                  <Textarea
                    label="Tell us about your collaboration idea"
                    placeholder="Describe your organisation, what type of event you'd like to host, and how we can work together..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                    required
                  />

                  {error && (
                    <p className="text-sm text-error bg-error-container/20 rounded-lg px-4 py-3">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full kinetic-gradient text-on-primary rounded-full py-4 text-base font-bold shadow-glow hover:opacity-90"
                  >
                    Send Message
                  </Button>

                  <p className="text-center text-xs text-on-surface-variant">
                    By submitting, you agree to our Community Guidelines.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="bg-surface-container-low py-24 px-6">
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
                color: "bg-primary-container text-on-primary-container",
                items: [
                  "Discover community events",
                  "Join social circles",
                  "Track personal goals",
                ],
                checkColor: "text-primary",
              },
              {
                icon: "campaign",
                title: "For Organisations",
                color: "bg-secondary-container text-on-secondary-container",
                items: [
                  "Promote your activities",
                  "Reach targeted audiences",
                  "Manage registrations",
                ],
                checkColor: "text-secondary",
              },
              {
                icon: "ads_click",
                title: "For Brands",
                color: "bg-tertiary-container text-on-tertiary-container",
                items: [
                  "Connect with Gen-Z",
                  "Sponsorship opportunities",
                  "Community activations",
                ],
                checkColor: "text-tertiary",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-lowest p-8 rounded-lg shadow-soft flex flex-col items-center text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full ${card.color} flex items-center justify-center mb-6`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {card.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <ul className="space-y-3 text-on-surface-variant">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-sm ${card.checkColor}`}
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
    </div>
  );
}
