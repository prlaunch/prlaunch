import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Which publications will I be featured in?",
      answer:
        "We place articles in reputable USA publications like USA Wire, Success XL, LA Tabloid, and 100+ more. You'll have a chance to pick your preferred outlets before we publish.",
    },
    {
      question: "How is this so affordable?",
      answer:
        "We've built relationships and systems that make PR placement efficient. Traditional agencies charge $500-$1,000 for the same service because they're inefficient. We're not.",
    },
    {
      question: "What if I'm not satisfied?",
      answer:
        "We offer a 100% money-back guarantee if articles are not published within 48 hours of your approval. Once you approve your article, we guarantee publication within 48 hours or you get a full refund.",
    },
    {
      question: "Do I need to be an expert or have a big company?",
      answer:
        "No. We've placed articles for solopreneurs, coaches, consultants, and small businesses. If you have a story or expertise, we can place it.",
    },
    {
      question: "How fast do you actually deliver?",
      answer: "Most placements happen within 24 hours. Guaranteed within 48 hours or you pay nothing.",
    },
    {
      question: "What happens after I order?",
      answer:
        "You'll receive a simple questionnaire to gather your information. We handle everything else—pitching, writing, placement, and delivery of your published link.",
    },
    {
      question: "Is this legitimate? How can you do this so fast?",
      answer:
        "Yes, 100% legitimate. We have direct relationships with editorial teams and know exactly what they're looking for. Speed comes from experience and systems, not shortcuts.",
    },
  ]

  return (
    <section id="faq" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
