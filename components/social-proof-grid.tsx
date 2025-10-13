export function SocialProofGrid() {
  const reviews = [
    {
      name: "Jessica M.",
      title: "Business Coach",
      initials: "JM",
      color: "bg-blue-500",
      rating: 5,
      date: "Jan 8, 2025",
      review: "got featured in forbes within 2 weeks. this is exactly what my coaching business needed",
      verified: true,
    },
    {
      name: "Michael R.",
      title: "Tech Founder",
      initials: "MR",
      color: "bg-purple-500",
      rating: 5,
      date: "Dec 15, 2024",
      review: "Featured in 3 major publications in my first month. Worth every penny",
      verified: true,
    },
    {
      name: "Sarah K.",
      title: "Life Coach",
      initials: "SK",
      color: "bg-pink-500",
      rating: 5,
      date: "Jan 2, 2025",
      review: "just got my entrepreneur.com feature live!! my DMs are exploding with new opportunities",
      verified: true,
    },
    {
      name: "David L.",
      title: "SaaS Founder",
      initials: "DL",
      color: "bg-indigo-500",
      rating: 5,
      date: "Dec 28, 2024",
      review: "best investment I've made this year. professional, fast, and delivers real results",
      verified: true,
    },
    {
      name: "Alex P.",
      title: "Marketing Consultant",
      initials: "AP",
      color: "bg-emerald-500",
      rating: 5,
      date: "Jan 5, 2025",
      review: "Got my inc.com article published. The credibility boost has been incredible for my business",
      verified: true,
    },
    {
      name: "Rachel P.",
      title: "Founder & CEO",
      initials: "RP",
      color: "bg-blue-600",
      rating: 5,
      date: "Dec 20, 2024",
      review: "featured in business insider! huge thanks to PR Launch. highly recommend to any entrepreneur",
      verified: true,
    },
    {
      name: "Tom W.",
      title: "E-commerce Owner",
      initials: "TW",
      color: "bg-orange-500",
      rating: 5,
      date: "Jan 10, 2025",
      review: "never thought i'd see my name in fast company. this service changed everything for my brand",
      verified: true,
    },
    {
      name: "Lisa H.",
      title: "Consultant",
      initials: "LH",
      color: "bg-teal-500",
      rating: 5,
      date: "Dec 30, 2024",
      review: "5 features in 6 weeks. my linkedin is blowing up with partnership requests now",
      verified: true,
    },
    {
      name: "Nina K.",
      title: "Fintech Founder",
      initials: "NK",
      color: "bg-red-500",
      rating: 5,
      date: "Jan 3, 2025",
      review: "yahoo finance picked up my story. the ROI on this has been absolutely insane",
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
                      <div
                        className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
                      >
                        {review.initials}
                      </div>
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-slate-900 truncate">{review.name}</h3>
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
