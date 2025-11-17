export function ProcessTimelineSection() {
  const steps = [
    {
      number: 1,
      title: "You Order",
      time: "Takes 2 minutes",
      description: "Choose your package and complete checkout",
    },
    {
      number: 2,
      title: "Quick Questionnaire",
      time: "Takes 5 minutes",
      description: "Answer 5-7 questions about your business · We use this to write your article",
    },
    {
      number: 3,
      title: "We Write Your Article",
      time: "",
      description: "Professional writers create your article · You receive it via email for approval",
    },
    {
      number: 4,
      title: "You Approve",
      time: "Or request changes",
      description: "Love it? Approve immediately · Want changes? We revise until perfect",
    },
    {
      number: 5,
      title: "We Publish",
      time: "Within 48 hours",
      description: "Your article goes live on premium outlets · You receive the live link via email",
    },
  ]

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
        Here's Exactly What Happens in 48 Hours
      </h2>
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {step.number}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="font-bold text-slate-900">{step.title}</h3>
                {step.time && <span className="text-sm text-slate-600">({step.time})</span>}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
