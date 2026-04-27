import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { IconBrandFacebook, IconBrandX, IconBrandLinkedin, IconBrandWhatsapp, IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string | null;
}

export function SharePostModal({ isOpen, onClose, slug }: SharePostModalProps) {
  const router = useRouter();
  
  // We assume the origin is window.location.origin
  const shareUrl = typeof window !== 'undefined' && slug ? `${window.location.origin}/blog/${slug}` : '';
  const title = "Cek artikel terbaru yang keren ini!";

  const handleClose = () => {
    onClose();
    router.push('/admin/blog');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="flex flex-col items-center sm:text-center mt-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
            <IconCheck size={32} />
          </div>
          <DialogTitle className="text-2xl">Artikel Berhasil Dibuat!</DialogTitle>
          <DialogDescription className="pt-2">
            Hebat! Artikel blog Anda sudah berhasil disimpan. Bagikan segera ke audiens Anda menggunakan platform di bawah.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-4 py-8">
          <FacebookShareButton url={shareUrl}>
            <div className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
              <IconBrandFacebook size={24} />
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <div className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black rounded-full flex items-center justify-center transition-colors">
              <IconBrandX size={24} />
            </div>
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl} title={title}>
            <div className="w-12 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors">
              <IconBrandLinkedin size={24} />
            </div>
          </LinkedinShareButton>

          <WhatsappShareButton url={shareUrl} title={title}>
            <div className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors">
              <IconBrandWhatsapp size={24} />
            </div>
          </WhatsappShareButton>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button variant="default" onClick={handleClose} className="w-full sm:w-auto px-8 font-semibold">
            Kembali ke Dashboard
          </Button>
          {slug && (
            <Link href={`/blog/${slug}`} target="_blank">
              <Button variant="outline" className="w-full sm:w-auto">
                Lihat Artikel
              </Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
