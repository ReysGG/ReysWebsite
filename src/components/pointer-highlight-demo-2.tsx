import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function PointerHighlightDemo() {
  return (
    <div className="max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl">
      Website bisnis yang
      <PointerHighlight
        rectangleClassName="border-[#ffcd80] bg-[#fffcc9]"
        pointerClassName="text-[#ff8a00]"
      >
        <span className="relative z-10">siap launch lebih cepat</span>
      </PointerHighlight>
    </div>
  );
}
