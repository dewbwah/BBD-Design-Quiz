"use client"

import { ImageCard } from "./image-card"

const inspirationImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/202109134306Manor_BBD014.JPG-hvQwXx9GKOrQyxRHYnz7zTTL1P07ux.jpeg",
    alt: "Traditional kitchen with curved island",
    caption: "Light Luxury Kitchen"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2023117_9436Spruce_BuiltbyDesign0011-FwtEfPvZO0XQH1O5V3Pi3ofHcIfelE.jpg",
    alt: "Spa bathroom with freestanding tub",
    caption: "Spa-Inspired Bathroom"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20231005_12301W.168th_BuiltbyDesign0011%20-1sKMBwbSnHQ6Cv9EEixRNtIToV1SP2.jpg",
    alt: "Rustic bar with brick wall",
    caption: "Moody Basement Bar"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-jbZN4voHBTqPnOl6qVshBEjok6faps.jpg",
    alt: "Open living room with stone fireplace",
    caption: "Transitional Living Space"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20240627_11213W.153rd_BBD0003%20%281%29-vDdOoJeHwSqa5QxcEQrO97VKGZW2Jt.jpg",
    alt: "Blue cabinets with gold faucet",
    caption: "Custom Cabinet Detail"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20230623_BuiltbyDesign0003%20-Tjttz3hhe4eZcCwaaEZklM7jJW8SnN.jpg",
    alt: "Basement bar with dark cabinets",
    caption: "Entertaining Lower Level"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20241021_14795S.GlenEyrie_BuildbyDesign0002-zBczLBncVqpmd1TvmcUEZvLOcDaVEN.jpg",
    alt: "Kitchen with copper hood",
    caption: "Warm Modern Kitchen"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20231005_1620Oakmont_BuiltbyDesign0018-9gNdNJYYDsOXu2OdPGemYuQnXWNTuj.jpg",
    alt: "Bar with geometric tile",
    caption: "Statement Tile + Vanity"
  }
]

export function StickyInspirationGallery() {
  return (
    <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar-hide">
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-charcoal mb-2">Project Inspiration</h2>
        <p className="text-soft-gray text-sm leading-relaxed">
          A look at the textures, finishes, and spaces that define the Built By Design aesthetic.
        </p>
      </div>
      
      {/* Desktop: Vertical stack */}
      <div className="hidden lg:flex flex-col gap-6 pb-8">
        {inspirationImages.map((image, index) => (
          <ImageCard
            key={index}
            src={image.src}
            alt={image.alt}
            caption={image.caption}
          />
        ))}
      </div>
      
      {/* Mobile: Horizontal scroll */}
      <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {inspirationImages.map((image, index) => (
          <div key={index} className="flex-none w-72">
            <ImageCard
              src={image.src}
              alt={image.alt}
              caption={image.caption}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
