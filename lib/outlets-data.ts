export interface Outlet {
  number: number
  name: string
  url: string
  category: string
  description: string
}

export const outletsData: Outlet[] = [
  // Business & Entrepreneurship
  {
    number: 1,
    name: "USA Wire",
    url: "https://usawire.com",
    category: "Business & Entrepreneurship",
    description: "National news platform covering business, technology, and entrepreneurship stories",
  },
  {
    number: 2,
    name: "SUCCESS XL",
    url: "https://successxl.com",
    category: "Business & Entrepreneurship",
    description: "Success stories and insights for entrepreneurs and business leaders",
  },
  {
    number: 3,
    name: "TopHustler",
    url: "https://tophustler.com",
    category: "Business & Entrepreneurship",
    description: "Entrepreneurship and business growth strategies for ambitious founders",
  },
  {
    number: 4,
    name: "Thrive Insider",
    url: "https://thriveinsider.com",
    category: "Business & Entrepreneurship",
    description: "Business insights and success strategies for modern entrepreneurs",
  },
  {
    number: 5,
    name: "Bosses Mag",
    url: "https://bossesmag.com",
    category: "Business & Entrepreneurship",
    description: "Magazine featuring successful business leaders and their strategies",
  },
  {
    number: 6,
    name: "Hustle Weekly",
    url: "https://hustleweekly.com",
    category: "Business & Entrepreneurship",
    description: "Weekly insights on entrepreneurship, startups, and business growth",
  },
  {
    number: 7,
    name: "LA Tabloid",
    url: "https://latabloid.com",
    category: "Business & Entrepreneurship",
    description: "Business news and entrepreneurship stories from Los Angeles and beyond",
  },
  {
    number: 8,
    name: "Medium",
    url: "https://medium.com",
    category: "Business & Entrepreneurship",
    description: "Popular publishing platform for thought leadership and business insights",
  },
  {
    number: 9,
    name: "Successful Daily",
    url: "https://successfuldaily.com",
    category: "Business & Entrepreneurship",
    description: "Daily inspiration and strategies for business success",
  },
  {
    number: 10,
    name: "Breaking 9 to 5",
    url: "https://breaking9to5.com",
    category: "Business & Entrepreneurship",
    description: "Stories of entrepreneurs who left corporate life to build their own businesses",
  },
  {
    number: 11,
    name: "GoPreneurs",
    url: "https://gopreneurs.com",
    category: "Business & Entrepreneurship",
    description: "Resources and inspiration for aspiring and established entrepreneurs",
  },

  // Finance & Economics
  {
    number: 20,
    name: "Time Business News",
    url: "https://timebusinessnews.com",
    category: "Finance & Economics",
    description: "Breaking business and financial news coverage",
  },
  {
    number: 21,
    name: "Washington Guardian",
    url: "https://washingtonguardian.com",
    category: "Finance & Economics",
    description: "Financial news and economic analysis from Washington DC",
  },
  {
    number: 22,
    name: "365 Business Tips",
    url: "https://365businesstips.com",
    category: "Finance & Economics",
    description: "Daily financial advice and business tips",
  },
  {
    number: 23,
    name: "New York Business Now",
    url: "https://newyorkbusinessnow.com",
    category: "Finance & Economics",
    description: "Business and financial news from New York's business district",
  },
  {
    number: 24,
    name: "The US Times",
    url: "https://theustimes.com",
    category: "Finance & Economics",
    description: "National news covering finance, economics, and business",
  },
  {
    number: 25,
    name: "Street Register",
    url: "https://streetregister.com",
    category: "Finance & Economics",
    description: "Financial markets and investment news",
  },
  {
    number: 26,
    name: "Article Rich",
    url: "https://articlerich.com",
    category: "Finance & Economics",
    description: "Financial insights and wealth-building strategies",
  },

  // Lifestyle & Culture
  {
    number: 30,
    name: "Rolling Hype",
    url: "https://rollinghype.com",
    category: "Lifestyle & Culture",
    description: "Entertainment, music, and pop culture news",
  },
  {
    number: 31,
    name: "Celeb Homes",
    url: "https://celebhomes.com",
    category: "Lifestyle & Culture",
    description: "Celebrity real estate and luxury lifestyle coverage",
  },
  {
    number: 32,
    name: "Fashion And Beauty World",
    url: "https://fashionandbeautyworld.com",
    category: "Lifestyle & Culture",
    description: "Latest trends in fashion, beauty, and style",
  },
  {
    number: 33,
    name: "TravelsHQ",
    url: "https://travelshq.com",
    category: "Lifestyle & Culture",
    description: "Travel destinations, tips, and adventure stories",
  },
  {
    number: 34,
    name: "The NYC Times",
    url: "https://thenyctimes.com",
    category: "Lifestyle & Culture",
    description: "New York City lifestyle, culture, and entertainment",
  },

  // Technology & Digital Marketing
  {
    number: 40,
    name: "NY Tech Media",
    url: "https://nytechmedia.com",
    category: "Technology & Digital Marketing",
    description: "Technology news and digital innovation from New York",
  },
  {
    number: 41,
    name: "InfoTech Inc",
    url: "https://infotechinc.com",
    category: "Technology & Digital Marketing",
    description: "Technology trends and digital transformation insights",
  },
  {
    number: 42,
    name: "Social Media Explorer",
    url: "https://socialmediaexplorer.com",
    category: "Technology & Digital Marketing",
    description: "Social media marketing strategies and digital trends",
  },
  {
    number: 43,
    name: "ROBOEarth",
    url: "https://roboearth.com",
    category: "Technology & Digital Marketing",
    description: "Robotics, AI, and emerging technology coverage",
  },
  {
    number: 44,
    name: "Social-Matic",
    url: "https://social-matic.com",
    category: "Technology & Digital Marketing",
    description: "Social media automation and digital marketing tools",
  },

  // Health & Wellness
  {
    number: 50,
    name: "Health Fitness Wire",
    url: "https://healthfitnesswire.com",
    category: "Health & Wellness",
    description: "Health, fitness, and wellness news and tips",
  },
  {
    number: 51,
    name: "Harcourt Health",
    url: "https://harcourthealth.com",
    category: "Health & Wellness",
    description: "Medical news and healthcare insights",
  },
  {
    number: 52,
    name: "Brights Future",
    url: "https://brightsfuture.com",
    category: "Health & Wellness",
    description: "Mental health and personal wellness resources",
  },
  {
    number: 53,
    name: "Charity and Life",
    url: "https://charityandlife.com",
    category: "Health & Wellness",
    description: "Charitable causes and healthy living initiatives",
  },
  {
    number: 54,
    name: "Childcare Partnerships",
    url: "https://childcarepartnerships.com",
    category: "Health & Wellness",
    description: "Childcare resources and family health information",
  },
  {
    number: 55,
    name: "Faith Family America",
    url: "https://faithfamilyamerica.com",
    category: "Health & Wellness",
    description: "Family wellness and faith-based health perspectives",
  },
]
