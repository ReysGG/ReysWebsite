import Link from "next/link";

export function ArticleCta() {
  return <section className="mt-14 rounded-3xl bg-gradient-to-br from-neutral-950 to-indigo-950 p-8 text-white shadow-xl md:p-10"><h2 className="text-3xl font-bold text-white dark:text-white">Butuh website yang lebih rapi?</h2><p className="mt-3 max-w-2xl text-white/70 dark:text-white/70">Diskusikan kebutuhan bisnis Anda dan dapatkan arahan teknis yang praktis untuk tahap berikutnya.</p><Link href="/#contact" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-neutral-950 dark:text-neutral-950">Mulai konsultasi</Link></section>;
}
