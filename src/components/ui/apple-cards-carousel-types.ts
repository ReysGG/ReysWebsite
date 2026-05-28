export interface CarouselProps {
  items: React.JSX.Element[];
  initialScroll?: number;
}

export type AppleCard = {
  src: string;
  gifUrl?: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export type CarouselContextValue = {
  onCardClose: (index: number) => void;
  currentIndex: number;
};
