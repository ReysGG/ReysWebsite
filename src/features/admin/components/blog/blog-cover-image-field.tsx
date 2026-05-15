import { ImageUploadField } from './image-upload-field';

export function BlogCoverImageField({ defaultValue, defaultOgImage }: { defaultValue?: string | null; defaultOgImage?: string | null }) {
  return (
    <div className="space-y-4">
      <ImageUploadField
        name="coverImage"
        label="Cover Image"
        defaultValue={defaultValue}
        hint="Gambar utama artikel di listing blog."
      />
      <ImageUploadField
        name="ogImage"
        label="OG Image (opsional)"
        defaultValue={defaultOgImage}
        hint="Gambar saat dibagikan di media sosial (1200x630)."
      />
    </div>
  );
}
