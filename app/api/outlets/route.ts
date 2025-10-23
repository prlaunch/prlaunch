import { outletsData } from "@/lib/outlets-data"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Return the local outlets data
    return Response.json(outletsData)
  } catch (error) {
    return Response.json(
      {
        error: "Failed to load outlets",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
