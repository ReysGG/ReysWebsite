import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import { normalizeEmailLink } from "@/lib/contact-links";
import { getSiteSettings, type SiteSettings } from "@/lib/site-settings";

type FooterProps = {
  settings?: SiteSettings;
};

type SmartFooterLinkProps = {
  href: string;
  className: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

function SmartFooterLink({ href, className, children, ariaLabel }: SmartFooterLinkProps) {
  const isInternal = href.startsWith("/");
  const isExternal = /^https?:\/\//i.test(href);

  if (isInternal) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export const Footer = async ({ settings }: FooterProps) => {
  const resolvedSettings = settings ?? (await getSiteSettings());
  const emailHref = normalizeEmailLink(resolvedSettings.contactEmail);
  const siteName =
    resolvedSettings.siteName && resolvedSettings.siteName !== "WebServices"
      ? resolvedSettings.siteName
      : "Build With Reys";
  const description =
    resolvedSettings.description ||
    "Membangun standar baru aplikasi web digital untuk UMKM, Startup, dan Personal Brand Anda.";

  const socialLinks = [
    resolvedSettings.whatsapp
      ? {
          label: "WhatsApp",
          href: resolvedSettings.whatsapp,
          icon: <IconBrandWhatsapp className="h-4 w-4" stroke={1.8} />,
        }
      : null,
    emailHref
      ? {
          label: "Email",
          href: emailHref,
          icon: <Mail className="h-4 w-4" strokeWidth={1.8} />,
        }
      : null,
    resolvedSettings.instagram
      ? {
          label: "Instagram",
          href: resolvedSettings.instagram,
          icon: <IconBrandInstagram className="h-4 w-4" stroke={1.8} />,
        }
      : null,
    resolvedSettings.twitter
      ? {
          label: "X",
          href: resolvedSettings.twitter,
          icon: <IconBrandX className="h-4 w-4" stroke={1.8} />,
        }
      : null,
    resolvedSettings.linkedin
      ? {
          label: "LinkedIn",
          href: resolvedSettings.linkedin,
          icon: <IconBrandLinkedin className="h-4 w-4" stroke={1.8} />,
        }
      : null,
    resolvedSettings.github
      ? {
          label: "GitHub",
          href: resolvedSettings.github,
          icon: <IconBrandGithub className="h-4 w-4" stroke={1.8} />,
        }
      : null,
  ].filter(Boolean) as Array<{ label: string; href: string; icon: React.ReactNode }>;

  return (
    <footer className="w-full border-t border-neutral-900 bg-black pb-10 pt-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 flex flex-col md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
                R
              </span>
              <span className="text-xl font-bold tracking-tight text-white">{siteName}</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-neutral-400">{description}</p>

            {socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <SmartFooterLink
                    key={link.label}
                    href={link.href}
                    ariaLabel={link.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 transition-colors hover:border-blue-400 hover:text-blue-300"
                  >
                    {link.icon}
                  </SmartFooterLink>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Layanan</h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="/#services" className="transition-colors hover:text-blue-300">
                Company Profile
              </Link>
              <Link href="/#services" className="transition-colors hover:text-blue-300">
                Web Application
              </Link>
              <Link href="/#services" className="transition-colors hover:text-blue-300">
                Sistem E-Commerce
              </Link>
              <Link href="/#services" className="transition-colors hover:text-blue-300">
                SEO &amp; Performa
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Perusahaan</h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="/#workflow" className="transition-colors hover:text-blue-300">
                Tentang Kami
              </Link>
              <Link href="/#portfolio" className="transition-colors hover:text-blue-300">
                Portofolio Kerja
              </Link>
              <Link href="/#testimonials" className="transition-colors hover:text-blue-300">
                Testimonial Klien
              </Link>
              <Link href="/#cta" className="transition-colors hover:text-blue-300">
                Hubungi Kami
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Legal</h3>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="/#faq" className="transition-colors hover:text-blue-300">
                Syarat &amp; Ketentuan
              </Link>
              <Link href="/#faq" className="transition-colors hover:text-blue-300">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8 h-px w-full bg-neutral-900" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex gap-6">
            <SmartFooterLink
              href={resolvedSettings.whatsapp || "/#cta"}
              className="transition-colors hover:text-blue-300"
            >
              WhatsApp
            </SmartFooterLink>
            <SmartFooterLink href={emailHref || "/#cta"} className="transition-colors hover:text-blue-300">
              Email
            </SmartFooterLink>
            <Link href="/blog" className="transition-colors hover:text-blue-300">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
