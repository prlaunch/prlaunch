export const dynamic = "force-dynamic"

interface Outlet {
  number: number
  name: string
  url: string
  category: string
  description: string
}

export async function GET() {
  try {
    console.log("[v0] Fetching outlets CSV from blob storage...")

    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Media_Outlets_Complete-VGV5IVXvfasvX9ZGes0MkG7nSuUzBc.csv"
    const response = await fetch(csvUrl, {
      headers: {
        Accept: "text/csv, text/plain, */*",
      },
    })

    console.log("[v0] CSV fetch response status:", response.status)

    if (!response.ok) {
      console.error("[v0] Failed to fetch CSV. Status:", response.status, "Status Text:", response.statusText)
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log("[v0] CSV text length:", csvText.length)

    // Parse CSV to JSON
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    const outlets: Outlet[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // Handle CSV parsing with quoted fields
      const values: string[] = []
      let currentValue = ""
      let insideQuotes = false

      for (let j = 0; j < line.length; j++) {
        const char = line[j]

        if (char === '"') {
          insideQuotes = !insideQuotes
        } else if (char === "," && !insideQuotes) {
          values.push(currentValue.trim().replace(/^"|"$/g, ""))
          currentValue = ""
        } else {
          currentValue += char
        }
      }
      values.push(currentValue.trim().replace(/^"|"$/g, ""))

      if (values.length >= 5) {
        outlets.push({
          number: Number.parseInt(values[0]) || 0,
          name: values[1] || "",
          url: values[2] || "",
          category: values[3] || "",
          description: values[4] || "",
        })
      }
    }

    console.log("[v0] Successfully parsed", outlets.length, "outlets")
    return Response.json(outlets)
  } catch (error) {
    console.error("[v0] Error fetching outlets:", error)
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
