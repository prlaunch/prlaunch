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
    name: "Jessica M.",
    title: "Health Coach",
    initials: "JM",
    color: "bg-blue-500",
    image: "/casual-woman-selfie-smartphone-natural-lighting.jpg",
    rating: 5,
    date: "Jan 8, 2025",
    review:
      "Honestly was skeptical at first but the team walked me through everything. Got featured in Thrive Insider within 2 weeks and my wellness coaching practice has never been busier.",
    verified: true,
  },
  {
    name: "Michael R.",
    title: "Tech Startup Founder",
    initials: "MR",
    color: "bg-purple-500",
    image: "/casual-man-selfie-home-office-relaxed.jpg",
    rating: 5,
    date: "Dec 15, 2024",
    review:
      "The speed blew me away. Submitted my info on a Monday, had my first article live by Thursday. Way faster than I expected for this kind of service.",
    verified: true,
  },
  {
    name: "Sarah K.",
    title: "Fashion Blogger",
    initials: "SK",
    color: "bg-pink-500",
    image: "/casual-woman-outdoor-selfie-natural-candid.jpg",
    rating: 5,
    date: "Jan 2, 2025",
    review:
      "Best investment I made for my brand. Fashion And Beauty World feature went live and brand deals started rolling in immediately. ROI was insane.",
    verified: true,
  },
  {
    name: "David L.",
    title: "E-commerce Owner",
    initials: "DL",
    color: "bg-indigo-500",
    image: "/casual-man-warehouse-smartphone-photo-authentic.jpg",
    rating: 5,
    date: "Dec 28, 2024",
    review:
      "Customer service was top notch. They answered all my questions at 11pm on a Saturday. Felt like I had a dedicated team working just for me.",
    verified: true,
  },
  {
    name: "Amanda P.",
    title: "Digital Marketing Consultant",
    initials: "AP",
    color: "bg-emerald-500",
    image: "/casual-woman-cafe-selfie-laptop-candid.jpg",
    rating: 5,
    date: "Jan 5, 2025",
    review:
      "Was worried about the price but after getting featured in Social Media Explorer and landing 3 enterprise clients, I made back 10x what I spent. Worth every penny.",
    verified: true,
  },
  {
    name: "Marcus W.",
    title: "Real Estate Agent",
    initials: "MW",
    color: "bg-orange-500",
    image: "/casual-man-car-selfie-smartphone-natural.jpg",
    rating: 5,
    date: "Jan 10, 2025",
    review:
      "Had some bad reviews showing up on Google. After getting published in multiple outlets, those negative results got pushed way down. Exactly what I needed.",
    verified: true,
  },
  {
    name: "Rachel P.",
    title: "Business Consultant",
    initials: "RP",
    color: "bg-blue-600",
    image: "/casual-woman-coworking-space-selfie-relaxed.jpg",
    rating: 5,
    date: "Dec 20, 2024",
    review:
      "Thought this was too good to be true but took a chance. Featured in Time Business News within days and speaking requests tripled overnight. Should've done this years ago.",
    verified: true,
  },
  {
    name: "Lisa H.",
    title: "Financial Advisor",
    initials: "LH",
    color: "bg-teal-500",
    image: "/casual-woman-home-selfie-smartphone-authentic.jpg",
    rating: 5,
    date: "Dec 30, 2024",
    review:
      "The before and after is crazy. Before: struggling to get 2-3 clients a month. After: fully booked with a waitlist. Went from 20 clients to 60+ in less than a month.",
    verified: true,
  },
  {
    name: "Nina K.",
    title: "Lifestyle Influencer",
    initials: "NK",
    color: "bg-red-500",
    image: "/casual-woman-mirror-selfie-smartphone-candid.jpg",
    rating: 5,
    date: "Jan 3, 2025",
    review:
      "Super easy process. Filled out a quick form, they handled everything else. No back and forth, no hassle. Just results. My follower count exploded after the features went live.",
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
