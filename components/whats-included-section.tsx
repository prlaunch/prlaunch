import { Check } from "lucide-react"

export function WhatsIncludedSection() {
  const features = [
    "Professional Article Writing",
    "Guaranteed Publication in 48 Hours",
    "Google-Ranking Outlets",
    "Shareable Publication Link",
    '"As Featured In" Social Proof',
    "Unlimited Revisions",
  ]

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
        What's Included in Every Package
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
            <p className="text-sm text-slate-700">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
