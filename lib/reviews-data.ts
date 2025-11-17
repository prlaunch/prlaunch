export interface Review {
  name: string
  title: string
  initials: string
  color: string
  image: string
  rating: number
  date: string
  review: string
  verified: boolean
}

export interface UpsellReview {
  quote: string
  author: string
  role: string
}

export interface QuizTestimonial {
  name: string
  role: string
  image: string
  quote: string
  outlets: string[]
}

// Main reviews used across the site (social proof grid, payment page, etc.)
export const mainReviews: Review[] = [
  {
    name: "Marcus T.",
    title: "Startup Founder",
    initials: "MT",
    color: "bg-blue-500",
    image: "/testimonials/profile-1.jpg",
    rating: 5,
    date: "Jan 15, 2025",
    review:
      "From the moment we kicked things off, PrLaunch.io was on it. Fast, efficient, and laser-focused every step of the process felt seamless. They didn't just meet expectations, they crushed them. The article quality was top-tier, the team was sharp, and the results spoke for themselves. If you're looking for a PR partner that actually delivers, stop searching. PrLaunch.io is it.",
    verified: true,
  },
  {
    name: "Jennifer R.",
    title: "Marketing Consultant",
    initials: "JR",
    color: "bg-purple-500",
    image: "/testimonials/profile-2.jpg",
    rating: 5,
    date: "Jan 12, 2025",
    review: "Great PR firm with high quality articles they write and post. They work quick as well.",
    verified: true,
  },
  {
    name: "David K.",
    title: "Business Owner",
    initials: "DK",
    color: "bg-pink-500",
    image: "/testimonials/profile-3.jpg",
    rating: 5,
    date: "Jan 10, 2025",
    review:
      "Great Experience with PrLaunch. I engaged the company for PR article placement and couldn't be happier with the results.",
    verified: true,
  },
  {
    name: "Michelle L.",
    title: "Tech Entrepreneur",
    initials: "ML",
    color: "bg-indigo-500",
    image: "/testimonials/profile-4.jpg",
    rating: 5,
    date: "Jan 8, 2025",
    review:
      "Our experience with PrLaunch.io was smooth and effective. They quickly understood our goals, crafted a compelling article, and secured quality publication placement that boosted our brand visibility and credibility. Communication was solid, and the results more traffic, leads, and engagement made the partnership well worth it. Highly recommended.",
    verified: true,
  },
  {
    name: "Robert P.",
    title: "SaaS Founder",
    initials: "RP",
    color: "bg-emerald-500",
    image: "/testimonials/profile-5.jpg",
    rating: 5,
    date: "Jan 6, 2025",
    review: "Prlaunch.io did a fantastic job.",
    verified: true,
  },
  {
    name: "Priya W.",
    title: "E-commerce Owner",
    initials: "PW",
    color: "bg-orange-500",
    image: "/testimonials/profile-6.jpg",
    rating: 5,
    date: "Jan 5, 2025",
    review: "Quick and High Quality service. It was seamless and my article was published in less than a week.",
    verified: true,
  },
  {
    name: "Amanda P.",
    title: "Content Creator",
    initials: "AP",
    color: "bg-blue-600",
    image: "/testimonials/profile-7.jpg",
    rating: 5,
    date: "Jan 3, 2025",
    review: "Fast and Easy to use they did a great article.",
    verified: true,
  },
  {
    name: "James H.",
    title: "Agency Owner",
    initials: "JH",
    color: "bg-teal-500",
    image: "/testimonials/profile-8.jpg",
    rating: 5,
    date: "Jan 2, 2025",
    review:
      "Our Seamless Journey with PrLaunch.io. Our experience with PrLaunch.io was seamless and highly professional. The process was easy, and their services were extremely valuable to our business. We had a great experience and look forward to working with them again in the future. The process is so easy. You answer a few questions, give them the key points, and they take it from there, positioning you in the best light and creating an amazing PR article about you very quickly.",
    verified: true,
  },
  {
    name: "Thomas K.",
    title: "Product Manager",
    initials: "TK",
    color: "bg-red-500",
    image: "/testimonials/profile-9.jpg",
    rating: 5,
    date: "Dec 30, 2024",
    review:
      "Our experience with PrLaunch.io was smooth and effective. They quickly understood our goals, crafted a compelling article, and secured quality publication placement that boosted our brand visibility and credibility. Communication was solid, and the results more traffic, leads, and engagement made the partnership well worth it. Highly recommended.",
    verified: true,
  },
  {
    name: "Michael S.",
    title: "Entrepreneur",
    initials: "MS",
    color: "bg-cyan-500",
    image: "/testimonials/profile-10.jpg",
    rating: 5,
    date: "Dec 28, 2024",
    review: "Prlaunch.io helped me post a article on USAWire within 7 days I highly recommend.",
    verified: true,
  },
  {
    name: "Daniel M.",
    title: "Business Consultant",
    initials: "DM",
    color: "bg-violet-500",
    image: "/testimonials/profile-11.jpg",
    rating: 5,
    date: "Dec 26, 2024",
    review:
      "PrLaunch.io exceeded expectations. Within 5 days of submitting my information, my article was live on a major publication and Google-indexed. The writing was professional, the placement was legitimate, and the impact on my business was immediate. Prospects now take me seriously from the first interaction. If you need instant credibility, this is the fastest path to get it. Worth every penny.",
    verified: true,
  },
  {
    name: "Alex T.",
    title: "Sales Director",
    initials: "AT",
    color: "bg-amber-500",
    image: "/testimonials/profile-12.jpg",
    rating: 5,
    date: "Dec 24, 2024",
    review:
      "Game changer. I was skeptical, but PrLaunch.io delivered exactly as promised. Article was well written, published on a legit outlet. Now prospects see media coverage when they search me. My closing rate improved immediately people come to calls already half-sold. Fast turnaround, solid results. If you're on the fence, just do it.",
    verified: true,
  },
]

// Upsell-specific reviews
export const upsellReviews: UpsellReview[] = [
  {
    quote:
      "I added the EverybodyWiki page and now I show up on Google's Knowledge Panel. Investors Google me before calls and I look 10x more established.",
    author: "Sarah K.",
    role: "SaaS Founder",
  },
  {
    quote: "Best $197 I've spent. My LinkedIn profile now has the Wikipedia icon next to my name. Instant credibility.",
    author: "Mike R.",
    role: "Consultant",
  },
]

// Quiz testimonials (different format with outlets)
export const quizTestimonials: QuizTestimonial[] = [
  {
    name: "Sarah Chen",
    role: "Tech Founder",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "Got featured in 3 outlets within a week. Game changer for credibility.",
    outlets: ["Forbes", "TechCrunch"],
  },
  {
    name: "Marcus Johnson",
    role: "Real Estate Investor",
    image: "https://i.pravatar.cc/150?img=12",
    quote: "Best $47 I've spent on marketing. Clients mention seeing my article.",
    outlets: ["Business Insider", "Inc."],
  },
  {
    name: "Emily Rodriguez",
    role: "E-commerce Owner",
    image: "https://i.pravatar.cc/150?img=9",
    quote: "Thought my story wasn't big enough. They made it shine!",
    outlets: ["Entrepreneur", "Fast Company"],
  },
]

// Helper function to get a subset of reviews for specific pages
export function getReviewsSubset(count: number): Review[] {
  return mainReviews.slice(0, count)
}
