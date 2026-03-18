import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-primary mb-4 block"
            >
              VibeShift
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Empowering the next generation to explore, connect, and thrive
              through shared community experiences.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-on-surface mb-4 uppercase text-xs tracking-widest">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/events"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Explore Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Host an Event
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-on-surface mb-4 uppercase text-xs tracking-widest">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-on-surface mb-4 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
                aria-label="Website"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
                aria-label="Email"
              >
                <span className="material-symbols-outlined text-sm">
                  alternate_email
                </span>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-outline-variant/10 gap-4">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} VibeShift. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
}
