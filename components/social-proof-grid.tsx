import Image from "next/image"
import { mainReviews } from "@/lib/reviews-data"

export function SocialProofGrid() {
  const reviews = mainReviews

  return (
    <section id="reviews" className="bg-slate-50 relative py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">500+ Success Stories Written </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">See what our clients are saying</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 pb-10 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative"
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
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
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

                  {review.verified && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                      <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[10px] font-medium text-green-700">Verified customer</span>
                    </div>
                  )}
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
