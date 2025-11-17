"use client"

import { User } from "lucide-react"

export function WikiPageMockup() {
  return (
    <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-sm">
      {/* Wikipedia-style header */}
      <div className="bg-white border-b border-slate-300 px-4 py-2 flex items-center gap-2">
        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
          <span className="text-xs font-bold text-slate-600">W</span>
        </div>
        <span className="text-sm font-semibold text-slate-700">EverybodyWiki</span>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2 border-b border-slate-300 pb-2">
              Your Name Here
            </h1>

            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              <span className="font-semibold">Your Name</span> is an entrepreneur and business leader known for [your
              achievements]. Based in [Your City], they have established themselves in the [your industry] sector.
            </p>

            <h2 className="text-xl font-serif font-bold text-slate-900 mb-2 border-b border-slate-300 pb-1 mt-4">
              Career
            </h2>

            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              [Your Name] founded [Your Company] in [Year], which has grown to serve [achievement]. Their work focuses
              on [your expertise area].
            </p>

            <h2 className="text-xl font-serif font-bold text-slate-900 mb-2 border-b border-slate-300 pb-1 mt-4">
              Recognition
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Notable achievements include [your accomplishments and media mentions].
            </p>
          </div>

          {/* Sidebar info box */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-slate-50 border border-slate-300 rounded p-3">
              <div className="bg-slate-200 aspect-square rounded mb-3 flex items-center justify-center">
                <User className="h-16 w-16 text-slate-400" />
              </div>

              <h3 className="font-bold text-slate-900 text-center mb-3 text-sm">Your Name</h3>

              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-t border-slate-300">
                    <td className="py-1.5 font-semibold text-slate-700">Born</td>
                    <td className="py-1.5 text-slate-600">[Your Info]</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1.5 font-semibold text-slate-700">Occupation</td>
                    <td className="py-1.5 text-slate-600">Entrepreneur</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1.5 font-semibold text-slate-700">Known for</td>
                    <td className="py-1.5 text-slate-600">[Your Company]</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1.5 font-semibold text-slate-700">Website</td>
                    <td className="py-1.5 text-blue-600 underline">yoursite.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="bg-slate-50 border-t border-slate-300 px-4 py-2">
        <p className="text-xs text-slate-500 text-center">
          This is a preview mockup. Your actual page will be customized with your information.
        </p>
      </div>
    </div>
  )
}
