"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) { return <div className="rounded-md border border-red-200 bg-red-50 p-6 text-red-700"><h2 className="font-bold">Gagal memuat editor</h2><button onClick={reset} className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white">Coba lagi</button></div>; }
