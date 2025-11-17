import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Will this help me close more deals?",
      answer:
        "Absolutely. Here's how you'll use these articles:\n- Instagram highlights & posts (instant authority)\n- Website homepage (\"As Featured In\" section)\n- Email signature (every email builds credibility)\n- LinkedIn profile (featured section)\n- Portfolio presentations (show prospects before meetings)\n- Pitch decks & proposals (social proof on every slide)\n- Social media content (share your features regularly)\n\nEven if prospects don't Google you, YOU control where they see your credibility. Every touchpoint becomes proof you're the real deal.",
    },
    {
      question: 'Will people think I "paid for this"?',
      answer:
        'Here\'s what people actually think when they see media coverage:\n\n"The media wrote about them → They must be successful"\n"They\'re featured in publications → They must be legitimate"\n"They\'re published → They must be the real deal"\n\nNobody questions HOW you got featured. They just see authority. The same way nobody asks if someone "paid" to be in Forbes or Inc. Magazine. Media coverage = instant validation in people\'s minds. That\'s the power of third-party credibility.',
    },
    {
      question: "Where will I be published?",
      answer:
        'Clean, credible outlets like USA Wire, Success XL, Medium, and 100+ more professional publications. They\'re indexed on Google, look completely legitimate, and give you the "As Featured In" credibility that makes people take you seriously.',
    },
    {
      question: "What happens when someone Googles me right now vs. after this?",
      answer:
        'RIGHT NOW: Either nothing comes up, or just your LinkedIn and basic stuff. No proof. No credibility. No reason to believe you\'re the expert you say you are.\n\nAFTER: Published articles about your expertise. Your story. Your achievements. Instant credibility. They think "This person is established" before you even talk.',
    },
    {
      question: "How long does this actually take?",
      answer:
        "2-4 business days total. We write your articles within 24-48 hours, you review and approve them (unlimited revisions), then we publish. Most people waste MONTHS trying to get featured. You'll be published by next week.",
    },
    {
      question: "Can you write about anything I want?",
      answer:
        "Absolutely. This is YOUR story. Want to be known as the top consultant in your industry? Done. Want to highlight a specific achievement? Done. We create the exact narrative you want the world to see and remember. You control how you're positioned.",
    },
    {
      question: 'What if I\'m not a "big name" yet? Will this still work?',
      answer:
        "Even better. This is how you BECOME a big name. Every expert you see with \"As Featured In\" badges started exactly where you are. They just took action. You're 48 hours away from having the same credibility they have. That's it.",
    },
    {
      question: "What if I don't like what you write?",
      answer:
        "Unlimited revisions until you love it. Plus 100% money-back guarantee if you're not satisfied. We've published thousands of professionals with a 98% first-draft approval rate. But if you want changes, we'll rewrite it as many times as needed.",
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
                <AccordionContent className="text-pretty leading-relaxed text-muted-foreground whitespace-pre-line">
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
