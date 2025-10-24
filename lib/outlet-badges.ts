export const POPULAR_OUTLETS = ["USA Wire", "SUCCESS XL", "LA Tabloid", "Medium", "Thrive Insider"]

export const TRENDING_OUTLETS = ["Rolling Hype", "TopHustler", "Bosses Mag", "Hustle Weekly", "NY Tech Media"]

export function getOutletBadge(outletName: string): "popular" | "trending" | null {
  if (POPULAR_OUTLETS.includes(outletName)) return "popular"
  if (TRENDING_OUTLETS.includes(outletName)) return "trending"
  return null
}
