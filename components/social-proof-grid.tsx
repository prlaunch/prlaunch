import Image from "next/image"

export function SocialProofGrid() {
  const reviews = [
    {
      name: "Jessica M.",
      title: "Health Coach",
      initials: "JM",
      color: "bg-blue-500",
      image: "/casual-business-coach-selfie.jpg",
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
      image: "/tech-founder-office-photo.jpg",
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
      image: "/life-coach-outdoor-casual.jpg",
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
      image: "/saas-founder-home-office.jpg",
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
      image: "/marketing-consultant-cafe-photo.jpg",
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
      image: "/ecommerce-owner-warehouse-casual.jpg",
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
      image: "/ceo-conference-professional.jpg",
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
      image: "/business-consultant-smart-casual.jpg",
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
      image: "/fintech-founder-startup-casual.jpg",
      rating: 5,
      date: "Jan 3, 2025",
      review:
        "Super easy process. Filled out a quick form, they handled everything else. No back and forth, no hassle. Just results. My follower count exploded after the features went live.",
      verified: true,
    },
  ]

  return (
    <section id="reviews" className="bg-slate-50 relative py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Real Results, Real People</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">See what our clients are saying</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  {/* Header with avatar and name */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-200">
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-slate-900 truncate">{review.name}</h3>
                      <p className="text-slate-500 text-sm mb-2">{review.title}</p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-blue-500 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-slate-600 text-base leading-relaxed mb-4">{review.review}</p>

                  {/* Date */}
                  <p className="text-slate-400 text-sm">{review.date}</p>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
