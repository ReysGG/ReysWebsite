export function BlogHero({ totalPosts }: { totalPosts: number }) {
  return <section className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-indigo-600">Blog & Insights</p>
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 md:text-6xl">Catatan praktis untuk membangun web yang cepat dan menjual.</h1>
    </div>
    <div className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm">
      <p className="text-base leading-7 text-neutral-600">Panduan teknis, studi kasus, dan keputusan desain untuk membantu bisnis bergerak lebih rapi di digital.</p>
      <p className="mt-4 text-sm font-bold text-indigo-700">{totalPosts} artikel dipublikasikan</p>
    </div>
  </section>;
}
