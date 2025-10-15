// Mapping of outlet names to their image URLs
export const outletImages: Record<string, string> = {
  "A Green Sign":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001_agreensign-mgS9xjnqJNExOdxGXdYX1a9zwIYgKU.webp",
  "Celeb Homes":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/002_celebhomes-XVoC3VROskmp84273zXW6SZHcWWHDt.webp",
  "Time Business News":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/003_timebusinessnews-dBP4ZtOi40fdNnCoAlkjZmGPwQEQRq.webp",
  "365 Business Tips":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/004_365businesstips-4jazsaMCZ6TMnuJkP1llV9YpXqrVsY.webp",
  "Childcare Partnerships":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/005_childcarepartnerships-nbryJkAJFSVyGwWGOkMmTiTfGiphET.webp",
  "Side Car": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/006_side-UD6t6tYwu5KWIK6zGyCeuPaWstx7u5.webp",
  Entreprenerd:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/007_entreprenerd-clsfurnW13EXwVcUreOebm4bjVtzeR.webp",
  "Social Media Explorer":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/008_socialmediaexplorer-foyNoQpvLRJVh9tyzVUOGM0mL191Q3.webp",
  "Hotel Guide":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/009_hoteleguide-mC7E8FumIc9mmj5QL7uEQXVh6jDMu5.webp",
  "Thrive Insider":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/010_thriveinsider-cpg6fcm3Uxxl3MOHjre6EIuVLI4owq.webp",
  "Inc.": "/outlet-images/011_infotechinc.webp",
  SuccessXL: "/outlet-images/012_successxl.webp",
  "UK Uncut": "/outlet-images/013_ukuncut.webp",
  "Sli Mag": "/outlet-images/014_slimag.webp",
  Awesome: "/outlet-images/015_awesome.webp",
  ROBOEarth: "/outlet-images/016_roboearth.webp",
  "Social-Matic": "/outlet-images/017_social-matic.webp",
  "The NewsHub": "/outlet-images/018_the-newshub.webp",
  Phenomena: "/outlet-images/019_phenomena.webp",
  SourceFed: "/outlet-images/020_sourcefed.webp",
}

// Helper function to get image URL for an outlet
export function getOutletImage(outletName: string): string | undefined {
  return outletImages[outletName]
}
