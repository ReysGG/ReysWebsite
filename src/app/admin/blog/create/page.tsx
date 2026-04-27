import { CreatePostForm } from '@/features/blog/components/admin/create-post-form';

export const metadata = {
  title: 'Buat Artikel Blog | Admin Dashboard',
};

export default function CreateBlogPage() {
  return (
    <div className="w-full">
      <CreatePostForm />
    </div>
  );
}
