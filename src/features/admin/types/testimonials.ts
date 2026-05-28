export type AdminTestimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string | null;
  createdAt: Date;
};

export type AdminTestimonialsData = {
  testimonials: AdminTestimonial[];
  withAvatar: number;
  avgLength: number;
  featured: AdminTestimonial[];
  databaseError: boolean;
};
