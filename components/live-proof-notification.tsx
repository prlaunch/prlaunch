"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

const firstNames = [
  "Emma",
  "Olivia",
  "Ava",
  "Sophia",
  "Isabella",
  "Mia",
  "Charlotte",
  "Amelia",
  "Harper",
  "Evelyn",
  "James",
  "Michael",
  "David",
  "John",
  "Robert",
  "William",
  "Richard",
  "Thomas",
  "Christopher",
  "Daniel",
  "Sarah",
  "Jessica",
  "Ashley",
  "Jennifer",
  "Emily",
  "Madison",
  "Elizabeth",
  "Ella",
  "Grace",
  "Victoria",
]

const cities = [
  "Los Angeles",
  "New York",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Boston",
  "Nashville",
  "Detroit",
  "Portland",
  "Las Vegas",
  "Miami",
  "Atlanta",
  "Minneapolis",
  "Tampa",
  "Orlando",
  "Sacramento",
]

const packages = [1, 3, 5]

const packageInfo = {
  1: { price: 47, value: "Starter" },
  3: { price: 127, value: "Growth" },
  5: { price: 197, value: "Authority" },
}

function generateNotification() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastInitial = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const city = cities[Math.floor(Math.random() * cities.length)]
  const articleCount = packages[Math.floor(Math.random() * packages.length)] as 1 | 3 | 5
  const info = packageInfo[articleCount]

  return {
    name: `${firstName} ${lastInitial}.`,
    city,
    articleCount,
    price: info.price,
    packageName: info.value,
    message: `${firstName} ${lastInitial}. from ${city} just got ${articleCount} article${articleCount > 1 ? "s" : ""}`,
  }
}

export function LiveProofNotification() {
  const [notification, setNotification] = useState(generateNotification())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(initialTimeout)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const hideTimeout = setTimeout(() => {
      setIsVisible(false)
    }, 4000)

    const showTimeout = setTimeout(
      () => {
        setNotification(generateNotification())
        setIsVisible(true)
      },
      4000 + Math.random() * 7000 + 5000,
    ) // 4s (display time) + random 5-12s = total 9-16s between notifications

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(showTimeout)
    }
  }, [isVisible, notification])

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 flex items-start gap-2.5 max-w-[280px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent animate-shimmer" />

        <div className="flex-shrink-0 mt-0.5 relative z-10">
          <div className="bg-green-500 rounded-full p-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0 relative z-10">
          <p className="text-xs font-semibold text-gray-900 leading-tight">
            {notification.name} from {notification.city}
          </p>
          <p className="text-xs text-gray-700 mt-0.5 leading-tight">
            Got{" "}
            <span className="font-bold text-blue-600">
              {notification.articleCount} article{notification.articleCount > 1 ? "s" : ""}
            </span>{" "}
            for only <span className="font-bold text-green-600">${notification.price}</span>
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[10px] text-gray-500">Just now</span>
            <span className="text-[10px] text-gray-300">•</span>
            <span className="text-[10px] font-medium text-blue-600">{notification.packageName} Package</span>
          </div>
        </div>
      </div>
    </div>
  )
}
