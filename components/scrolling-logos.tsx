export function ScrollingLogos() {
  const logosRow1 = [
    { src: "/images/logos/sf-tribune.png", alt: "The San Francisco Tribune" },
    { src: "/images/logos/successxl.png", alt: "Success XL" },
    { src: "/images/logos/usawire.png", alt: "USA Wire" },
  ]

  const logosRow2 = [
    { src: "/images/logos/la-tabloid.webp", alt: "L.A. Tabloid" },
    { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
    { src: "/images/logos/medium.png", alt: "Medium" },
  ]

  const allLogos = [...logosRow1, ...logosRow2]

  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-0 my-3.5">
      <div className="md:hidden space-y-6">
        {/* First row - scrolls left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-scroll-left gap-8">
            {[...logosRow1, ...logosRow1, ...logosRow1].map((logo, index) => (
              <div key={`row1-${index}`} className="flex h-10 w-28 flex-shrink-0 items-center justify-center">
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="h-full w-full object-contain grayscale opacity-60 hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second row - scrolls right */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-scroll-right gap-8">
            {[...logosRow2, ...logosRow2, ...logosRow2].map((logo, index) => (
              <div key={`row2-${index}`} className="flex h-10 w-28 flex-shrink-0 items-center justify-center">
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="h-full w-full object-contain grayscale opacity-60 hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block relative">
        <div className="relative flex overflow-hidden">
          <div className="flex animate-scroll-left gap-12">
            {[...allLogos, ...allLogos, ...allLogos].map((logo, index) => (
              <div key={`desktop-${index}`} className="flex h-16 w-40 flex-shrink-0 items-center justify-center">
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="h-full w-full object-contain grayscale opacity-60 hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
