import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface OutletCardProps {
  name: string
  url: string
  description: string
  isAvailable?: boolean
  imageUrl?: string
}

export function OutletCard({ name, url, description, isAvailable = true, imageUrl }: OutletCardProps) {
  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col">
      <div className="relative w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200">
        {imageUrl ? (
          <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-slate-400 text-sm font-medium px-4 text-center">{name}</div>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col">
        {isAvailable && (
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full w-fit">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-[10px] font-semibold text-green-600">Available</span>
          </div>
        )}

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
          {name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed min-h-[3rem] flex-1">{description}</p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors pt-2"
        >
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </a>

        <Link
          href="/checkout"
          className="mt-3 w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 text-sm font-medium py-2.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
        >
          Claim
        </Link>
      </div>
    </div>
  )
}
