import { Check } from "lucide-react"

export function WhatsIncludedSection() {
  const valueItems = [
    { name: "Professional Article Writing", value: 67 },
    { name: "Premium Outlet Distribution", value: 94 },
    { name: "Express 48-Hour Publishing", value: 49 },
    { name: "Multi-Outlet Syndication", value: 38 },
    { name: "Editorial Review & Approval", value: 27 },
    { name: "Unlimited Revisions", value: 23 },
  ]

  const regularPrice = valueItems.reduce((sum, item) => sum + item.value, 0)
  const yourPrice = 28
  const savings = regularPrice - yourPrice

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm">
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1 text-center">WHAT YOU GET</h2>
      <p className="text-xs md:text-sm text-slate-600 mb-4 text-center">Per Article</p>

      <div className="space-y-2 mb-4">
        {valueItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-1">
              <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              <span className="text-xs md:text-sm text-slate-700">{item.name}</span>
            </div>
            <div className="flex-1 border-b border-dotted border-slate-300 mx-2 min-w-[20px]"></div>
            <span className="text-xs md:text-sm text-slate-600 font-semibold whitespace-nowrap">${item.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 my-4"></div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm md:text-base text-slate-700 font-medium">Regular Price:</span>
        <span className="text-base md:text-lg text-slate-600 font-bold line-through">${regularPrice}/article</span>
      </div>

      <a
        href="/payment?package=authority"
        className="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg p-3 md:p-4 mb-3 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm md:text-base text-white font-bold">YOUR PRICE:</span>
          <span className="text-2xl md:text-3xl text-white font-black group-hover:scale-105 transition-transform">
            ${yourPrice}/article
          </span>
        </div>
        <p className="text-[10px] md:text-xs text-blue-100 text-right">(with 7-article package)</p>
      </a>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
        <p className="text-base md:text-lg font-bold text-green-700 mb-0.5">💰 SAVE ${savings} PER ARTICLE</p>
        <p className="text-[10px] md:text-xs text-green-600">(compared to traditional PR agencies)</p>
      </div>
    </div>
  )
}
