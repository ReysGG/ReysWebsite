import { createContext } from "react";
import type { CarouselContextValue } from "@/components/ui/apple-cards-carousel-types";

export const CarouselContext = createContext<CarouselContextValue>({
  onCardClose: () => {},
  currentIndex: 0,
});
