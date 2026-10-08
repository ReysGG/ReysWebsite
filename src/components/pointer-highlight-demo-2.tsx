import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function PointerHighlightDemo() {
  return (
    <div className="max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl">
      Website bisnis yang
      <PointerHighlight
        rectangleClassName="border-brand-soft bg-brand-tint"
        pointerClassName="text-brand"
      >
        <span className="relative z-10">siap launch lebih cepat</span>
      </PointerHighlight>
    </div>
  );
}
