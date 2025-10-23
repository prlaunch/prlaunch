"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { getOutletImage } from "./outlet-images"

export const outletsByCategory = {
  business: [
    "USA Wire",
    "LA Tabloid",
    "Success XL",
    "Bosses Mag",
    "Medium",
    "Top Hustler",
    "Successful Daily",
    "Breaking 9 to 5",
    "GoPreneurs",
  ],
  finance: [
    "Time Business News",
    "365 Business Tips",
    "New York Business Now",
    "The US Times",
    "Street Register",
    "Article Rich",
  ],
  lifestyle: ["Rolling Hype", "Medium", "Celeb Homes", "Fashion And Beauty World", "TravelsHQ", "The NYC Times"],
  tech: ["InfoTech Inc", "New York Tech", "Social Media Explorer", "Thrive Insider", "ROBOEarth", "Social-Matic"],
  health: [
    "Health Fitness Wire",
    "Harcourt Health",
    "Brights Future",
    "Charity and Life",
    "Childcare Partnerships",
    "Faith Family America",
  ],
} as const

export type Category = keyof typeof outletsByCategory

export function getOutletsWithImages(category: Category): string[] {
  return outletsByCategory[category].filter((outlet) => getOutletImage(outlet) !== undefined)
}

const CampaignBuilder = () => {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")

  // Progress calculation
  const progress = (currentScreen / 6) * 100

  // Countdown timer (starts at Screen 5)
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  useEffect(() => {
    if (currentScreen >= 5 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentScreen, timeLeft])

  // Confetti on Screen 4
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // Auto-advance
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal)
    setTimeout(() => {
      setCurrentScreen(2)
    }, 500)
  }

  // Logo stagger animation
  const animateLogos = () => {
    const logos = document.querySelectorAll(".outlet-logo")
    logos.forEach((logo, index) => {
      setTimeout(() => {
        logo.style.opacity = "1"
        logo.style.transform = "translateY(0)"
      }, index * 300)
    })
  }

  return (
    <div className="container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Screens */}
      {currentScreen === 0 && (
        <div className="screen">
          {/* Hype/Intro Screen */}
          <div className="gradient-bg">
            <div className="animated-icon">🚀</div>
            <div className="outlet-logos">{/* Rotating outlet logos */}</div>
            <div className="confetti-animation"></div>
            <h1>🚀 You're About to Get Featured In:</h1>
            <p>Let's build your custom PR campaign!</p>
            <p className="subtext">Join 500+ businesses featured this month</p>
            <button className="cta-button" onClick={() => setCurrentScreen(1)}>
              Start Building My Campaign →
            </button>
          </div>
        </div>
      )}

      {currentScreen === 1 && (
        <div className="screen">
          {/* Goal Selection Screen */}
          <h1>Step 1 of 6 • Let's Get Started</h1>
          <h2>What's your #1 goal with PR?</h2>
          <div className="goal-cards">
            {/* Goal Cards */}
            <div className="card purple-border" onClick={() => handleGoalSelect("Trust & Credibility")}>
              <div className="icon">🎯</div>
              <div className="text">
                Build Trust & Credibility
                <p>Get featured on trusted news sites and look established</p>
              </div>
            </div>
            <div className="card cyan-border" onClick={() => handleGoalSelect("Sales & Revenue")}>
              <div className="icon">📈</div>
              <div className="text">
                Increase Sales & Revenue
                <p>Drive more customers and boost conversions</p>
              </div>
            </div>
            <div className="card pink-border" onClick={() => handleGoalSelect("Google Rankings")}>
              <div className="icon">🔍</div>
              <div className="text">
                Boost Google Rankings
                <p>Appear higher in search results and get found</p>
              </div>
            </div>
            <div className="card purple-border" onClick={() => handleGoalSelect("Bad Reviews")}>
              <div className="icon">⭐</div>
              <div className="text">
                Overcome Bad Reviews
                <p>Build positive online reputation and bury negativity</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 2 && (
        <div className="screen">
          {/* Industry/Category Selection Screen */}
          <h1>Step 2 of 6 • Building Your Campaign</h1>
          <h2>Which category best fits your business?</h2>
          <p className="subtext">💡 This helps us recommend the perfect outlets for you</p>
          <div className="category-cards">
            {/* Category Cards */}
            <div
              className="card purple-border"
              onClick={() => {
                setSelectedCategory("business")
                setCurrentScreen(3)
              }}
            >
              <div className="icon">💼</div>
              <div className="text">
                Business & Entrepreneurship
                <p>Perfect for: Startups, coaches, consultants, agencies</p>
              </div>
            </div>
            <div
              className="card cyan-border"
              onClick={() => {
                setSelectedCategory("finance")
                setCurrentScreen(3)
              }}
            >
              <div className="icon">📈</div>
              <div className="text">
                Finance & Economics
                <p>Perfect for: Financial services, investing, fintech, accounting</p>
              </div>
            </div>
            <div
              className="card pink-border"
              onClick={() => {
                setSelectedCategory("lifestyle")
                setCurrentScreen(3)
              }}
            >
              <div className="icon">✨</div>
              <div className="text">
                Lifestyle & Culture
                <p>Perfect for: Fashion, beauty, travel, food, entertainment</p>
              </div>
            </div>
            <div
              className="card purple-border"
              onClick={() => {
                setSelectedCategory("tech")
                setCurrentScreen(3)
              }}
            >
              <div className="icon">💻</div>
              <div className="text">
                Technology & Digital Marketing
                <p>Perfect for: SaaS, apps, tech products, digital agencies</p>
              </div>
            </div>
            <div
              className="card cyan-border"
              onClick={() => {
                setSelectedCategory("health")
                setCurrentScreen(3)
              }}
            >
              <div className="icon">💪</div>
              <div className="text">
                Health & Wellness
                <p>Perfect for: Fitness, nutrition, mental health, medical</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 3 && (
        <div className="screen">
          {/* Outlet Preview + Education Screen */}
          <h1>Step 3 of 6 • Your Perfect Outlets</h1>
          <h2>
            Based on {selectedCategory} + {selectedGoal}, you'll get featured in outlets like:
          </h2>
          <div className="outlet-preview">
            {/* Outlet Preview Section */}
            {getOutletsWithImages(selectedCategory)
              .slice(0, 6)
              .map((outlet, index) => (
                <div key={index} className="outlet-logo" style={{ opacity: "0", transform: "translateY(50px)" }}>
                  {outlet}
                </div>
              ))}
          </div>
          <div className="educational-message">
            {/* Educational Message */}
            <h3>💎 How It Works:</h3>
            <ol>
              <li>You'll choose from 100+ premium outlets</li>
              <li>We write your custom article (included free)</li>
              <li>You review and approve before publishing</li>
              <li>Published in 7 days - guaranteed</li>
            </ol>
            <ul>
              <li>You pick the exact outlets after purchase</li>
              <li>Our team guides you through selection</li>
              <li>Every article is professionally written</li>
              <li>100% money-back guarantee</li>
            </ul>
          </div>
          <div className="value-indicator">
            {/* Value Indicator */}
            <h3>📊 Campaign Value: $8,500+</h3>
          </div>
          <button
            className="cta-button"
            onClick={() => {
              setCurrentScreen(4)
              triggerConfetti()
            }}
          >
            This Sounds Perfect! Continue →
          </button>
        </div>
      )}

      {currentScreen === 4 && (
        <div className="screen">
          {/* Reward Unlock + Commitment Boost Screen */}
          <div className="confetti-overlay">{/* Confetti Animation */}</div>
          <h1>🎉 CONGRATULATIONS!</h1>
          <h2>You've unlocked exclusive bonuses:</h2>
          <ul>
            <li>
              🎁 FREE Professional Media Kit ($97 value)
              <ul>
                <li>Shareable graphics for social media</li>
                <li>Press release template</li>
                <li>Brand assets package</li>
              </ul>
            </li>
            <li>
              🎁 +1 BONUS Article (on 3+ article packages)
              <ul>
                <li>Get more coverage for free</li>
              </ul>
            </li>
            <li>
              🎁 Priority Outlet Selection
              <ul>
                <li>Choose from premium outlets first</li>
              </ul>
            </li>
          </ul>
          <button className="cta-button" onClick={() => setCurrentScreen(5)}>
            Claim My Bonuses →
          </button>
        </div>
      )}

      {currentScreen === 5 && (
        <div className="screen">
          {/* Package Selection Screen */}
          <h1>Step 5 of 6 • Choose Your Package</h1>
          <h2>How many articles do you want?</h2>
          <p>
            Your campaign will feature {selectedCategory} outlets focused on {selectedGoal}
          </p>
          <div className="package-cards">
            {/* Package Cards */}
            <div
              className="card purple-border"
              onClick={() => {
                setSelectedPackage("Starter")
                setCurrentScreen(6)
              }}
            >
              <div className="text">
                1 Article
                <p>$47</p>
                <p className="strikethrough">$94</p>
                <ul>
                  <li>1 premium outlet of your choice</li>
                  <li>Professional article writing</li>
                  <li>Free media kit ($97 value)</li>
                  <li>7-day guarantee</li>
                </ul>
                <p>Perfect for: Testing PR</p>
              </div>
            </div>
            <div
              className="card cyan-border best-value"
              onClick={() => {
                setSelectedPackage("Growth")
                setCurrentScreen(6)
              }}
            >
              <div className="text">
                ⭐ MOST POPULAR
                <p>3 Articles + 1 FREE BONUS</p>
                <p>$127</p>
                <p className="strikethrough">$252</p>
                <ul>
                  <li>4 premium outlets (3 + 1 bonus!)</li>
                  <li>Professional article writing</li>
                  <li>Free media kit ($97 value)</li>
                  <li>Priority outlet selection</li>
                  <li>7-day guarantee</li>
                </ul>
                <p>💰 You save $125 (50% OFF)</p>
                <p>Perfect for: Building credibility</p>
              </div>
            </div>
            <div
              className="card pink-border"
              onClick={() => {
                setSelectedPackage("Scale")
                setCurrentScreen(6)
              }}
            >
              <div className="text">
                5 Articles + 1 FREE BONUS
                <p>$197</p>
                <p className="strikethrough">$470</p>
                <ul>
                  <li>6 premium outlets (5 + 1 bonus!)</li>
                  <li>Professional article writing</li>
                  <li>Free media kit ($97 value)</li>
                  <li>Priority outlet selection</li>
                  <li>Dedicated PR consultant</li>
                  <li>7-day guarantee</li>
                </ul>
                <p>💰 You save $273 (58% OFF)</p>
                <p>Perfect for: Maximum exposure</p>
              </div>
            </div>
          </div>
          <div className="urgency-timer" style={{ backgroundColor: "#ef4444" }}>
            {/* Urgency Timer */}
            <p>
              ⏰ 50% OFF ends in: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          </div>
          <div className="social-proof">
            {/* Social Proof */}
            <p>✓ 1,247 businesses chose Growth this month</p>
          </div>
        </div>
      )}

      {currentScreen === 6 && (
        <div className="screen">
          {/* Final Preview + Checkout Screen */}
          <h1>🎉 Final Step - Your Campaign Summary</h1>
          <div className="campaign-summary">
            {/* Campaign Summary Card */}
            <h2>🚀 YOUR CUSTOM PR CAMPAIGN</h2>
            <ul>
              <li>Goal: {selectedGoal}</li>
              <li>Category: {selectedCategory}</li>
              <li>Package: {selectedPackage}</li>
              <li>✓ [X] professional PR articles (+ 1 bonus if Growth/Scale)</li>
              <li>✓ Featured in [X] premium {selectedCategory} outlets</li>
              <li>✓ Free professional media kit ($97 value)</li>
              <li>✓ Priority outlet selection</li>
              {selectedPackage === "Scale" && <li>✓ Dedicated PR consultant</li>}
            </ul>
            <div className="outlet-preview">
              {/* Outlet Preview Section */}
              {getOutletsWithImages(selectedCategory)
                .slice(0, 6)
                .map((outlet, index) => (
                  <div key={index} className="outlet-logo">
                    {outlet}
                  </div>
                ))}
            </div>
            <div className="value-indicator">
              {/* Value Indicator */}
              <h3>📊 TOTAL VALUE: $8,500+</h3>
              <h3>💰 YOUR INVESTMENT: $[price]</h3>
              <h3>🎉 YOU SAVE: $[savings] (50% OFF)</h3>
            </div>
            <div className="trust-indicators">
              {/* Trust Indicators */}
              <p>🔒 Secure 256-bit encryption</p>
              <p>✓ 4.8/5 on Trustpilot (500+ reviews)</p>
              <p>✓ 100% money-back guarantee</p>
            </div>
            <div className="urgency-timer" style={{ backgroundColor: "#ef4444" }}>
              {/* Urgency Timer */}
              <p>
                ⏰ Your 50% OFF expires in: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </p>
            </div>
            <div className="email-capture">
              {/* Email Capture Section */}
              <label htmlFor="email">✉️ Email address:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded border"
              />
              <label htmlFor="firstName">👤 First name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded border"
              />
            </div>
            <div className="payment-section">
              {/* Payment Section */}
              <h2>💳 Secure Payment</h2>
              <input type="text" placeholder="Card number" className="rounded border" />
              <input type="text" placeholder="Expiry" className="rounded border" />
              <input type="text" placeholder="CVV" className="rounded border" />
              <input type="text" placeholder="Billing ZIP" className="rounded border" />
            </div>
            <button className="cta-button pulsing">Launch My Campaign - $[price] →</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CampaignBuilder
