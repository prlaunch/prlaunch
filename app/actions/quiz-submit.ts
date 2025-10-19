"use server"

export async function submitQuizLead(data: {
  name: string
  email: string
  phone?: string
  publication?: string
  companyName?: string
  articleAngle?: string
  keyMessage?: string
  website?: string
  quizAnswers?: Record<string, string>
}) {
  // In a real app, you would save this to a database
  // For now, we'll just log it
  console.log("[v0] Quiz lead submitted:", data)

  // You could integrate with your CRM, email service, etc.
  // Example: await sendToHubspot(data)
  // Example: await saveToDatabase(data)

  return { success: true }
}
