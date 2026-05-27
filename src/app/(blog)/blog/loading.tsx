export default function BlogLoading() {
  return <main className="min-h-screen bg-[#fffcc9] px-6 pt-32 pb-24"><div className="mx-auto max-w-7xl animate-pulse space-y-6"><div className="h-12 w-2/3 rounded-2xl bg-[#ffcd80]" /><div className="h-20 rounded-3xl bg-white" /><div className="grid gap-6 md:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-96 rounded-3xl bg-white" />)}</div></div></main>;
}
