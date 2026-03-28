import Image from "next/image"

interface ImageCardProps {
  src: string
  alt: string
  caption?: string
}

export function ImageCard({ src, alt, caption }: ImageCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-soft-gray font-sans">{caption}</p>
      )}
    </div>
  )
}
