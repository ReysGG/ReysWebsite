import {
  LayoutDashboard,
  Globe,
  FileText,
  Briefcase,
  MessageCircle,
  Settings,
  Plus,
  List,
  Image as ImageIcon,
  PencilLine,
  Type,
  BarChart3,
  ListChecks,
  DatabaseZap,
  FileWarning,
  PackageCheck,
  MousePointerClick,
  DollarSign,
  Megaphone,
  Sparkles,
  CircleHelp,
  Mail,
  MessageSquareText,
  Send,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";
import type { AdminSidebarNavGroup, AdminSidebarSubItem } from "@/components/admin/admin-sidebar-types";

const LANDING_SECTIONS: AdminSidebarSubItem[] = [
  { label: "Sync Copy", href: "/admin/landing-page/sync", icon: <DatabaseZap className="h-3.5 w-3.5" /> },
  { label: "Hero", href: "/admin/landing-page/hero", icon: <Type className="h-3.5 w-3.5" /> },
  { label: "Trust Strip", href: "/admin/landing-page/trustStrip", icon: <DatabaseZap className="h-3.5 w-3.5" /> },
  { label: "Problem", href: "/admin/landing-page/problems", icon: <FileWarning className="h-3.5 w-3.5" /> },
  { label: "Statistik", href: "/admin/landing-page/stats", icon: <BarChart3 className="h-3.5 w-3.5" /> },
  { label: "Layanan", href: "/admin/landing-page/services", icon: <ListChecks className="h-3.5 w-3.5" /> },
  { label: "Workflow", href: "/admin/landing-page/workflow", icon: <MousePointerClick className="h-3.5 w-3.5" /> },
  { label: "Contoh Solusi", href: "/admin/landing-page/solutions", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { label: "Pricing", href: "/admin/landing-page/pricing", icon: <DollarSign className="h-3.5 w-3.5" /> },
  { label: "What You Get", href: "/admin/landing-page/whatYouGet", icon: <PackageCheck className="h-3.5 w-3.5" /> },
  { label: "CTA Akhir", href: "/admin/landing-page/cta", icon: <Megaphone className="h-3.5 w-3.5" /> },
  { label: "FAQ", href: "/admin/landing-page/faq", icon: <CircleHelp className="h-3.5 w-3.5" /> },
];

export const ADMIN_NAV_GROUPS: AdminSidebarNavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
    ],
  },
  {
    title: "Website",
    items: [
      { label: "Landing Page", basePath: "/admin/landing-page", icon: <Globe className="h-4 w-4" />, subItems: LANDING_SECTIONS },
    ],
  },
  {
    title: "Blog",
    items: [
      {
        label: "Blog Content",
        basePath: "/admin/blog",
        icon: <FileText className="h-4 w-4" />,
        subItems: [
          { label: "Overview Artikel", href: "/admin/blog", icon: <List className="h-3.5 w-3.5" /> },
          { label: "Published", href: "/admin/blog/published", icon: <Send className="h-3.5 w-3.5" /> },
          { label: "Draft", href: "/admin/blog/drafts", icon: <PencilLine className="h-3.5 w-3.5" /> },
          { label: "SEO Issues", href: "/admin/blog/seo", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
          { label: "Editorial Calendar", href: "/admin/blog/calendar", icon: <CalendarDays className="h-3.5 w-3.5" /> },
          { label: "Tulis Artikel", href: "/admin/blog/create", icon: <Plus className="h-3.5 w-3.5" /> },
        ],
      },
    ],
  },
  {
    title: "Portfolio",
    items: [
      {
        label: "Portfolio Content",
        basePath: "/admin/portfolio",
        icon: <Briefcase className="h-4 w-4" />,
        subItems: [
          { label: "Semua Project", href: "/admin/portfolio", icon: <List className="h-3.5 w-3.5" /> },
          { label: "Tambah Project", href: "/admin/portfolio/add", icon: <Plus className="h-3.5 w-3.5" /> },
          { label: "Edit Intro", href: "/admin/portfolio/hero", icon: <ImageIcon className="h-3.5 w-3.5" /> },
        ],
      },
      {
        label: "Showcase Prototipe",
        basePath: "/admin/showcase",
        icon: <Sparkles className="h-4 w-4" />,
        subItems: [
          { label: "Semua Showcase", href: "/admin/showcase", icon: <List className="h-3.5 w-3.5" /> },
          { label: "Published", href: "/admin/showcase?status=published", icon: <Send className="h-3.5 w-3.5" /> },
          { label: "Draft", href: "/admin/showcase?status=draft", icon: <PencilLine className="h-3.5 w-3.5" /> },
          { label: "Showcase Baru", href: "/admin/showcase/new", icon: <Plus className="h-3.5 w-3.5" /> },
        ],
      },
    ],
  },
  {
    title: "Social Proof",
    items: [
      {
        label: "Testimonials",
        basePath: "/admin/testimonials",
        icon: <MessageCircle className="h-4 w-4" />,
        subItems: [
          { label: "Daftar Testimoni", href: "/admin/testimonials", icon: <List className="h-3.5 w-3.5" /> },
          { label: "Tambah Testimoni", href: "/admin/testimonials/add", icon: <Plus className="h-3.5 w-3.5" /> },
        ],
      },
    ],
  },
  {
    title: "Audience",
    items: [
      { label: "Subscribers", href: "/admin/subscribers", icon: <Mail className="h-4 w-4" /> },
      { label: "Comments", href: "/admin/comments", icon: <MessageSquareText className="h-4 w-4" /> },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Promo Banner", href: "/admin/banner", icon: <Megaphone className="h-4 w-4" /> },
      { label: "Settings", href: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
    ],
  },
];
