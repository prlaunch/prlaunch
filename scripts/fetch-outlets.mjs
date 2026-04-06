import fs from 'fs'

const CSV_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Media_Outlets_Complete-VGV5IVXvfasvX9ZGes0MkG7nSuUzBc.csv'

async function fetchAndParseCSV() {
  try {
    console.log('[v0] Fetching CSV from:', CSV_URL)
    const response = await fetch(CSV_URL)
    const csvText = await response.text()
    
    console.log('[v0] CSV fetched, parsing...')
    const lines = csvText.split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    
    const outlets = []
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue
      
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
      const outlet = {
        number: parseInt(values[0]) || 0,
        name: values[1] || '',
        url: values[2] || '',
        category: values[3] || '',
        description: values[4] || ''
      }
      outlets.push(outlet)
    }
    
    console.log('[v0] Parsed', outlets.length, 'outlets')
    
    // Save to JSON file
    fs.writeFileSync(
      'public/data/outlets.json',
      JSON.stringify(outlets, null, 2)
    )
    
    console.log('[v0] Saved to public/data/outlets.json')
    
    // Group by category
    const categories = {}
    outlets.forEach(outlet => {
      if (!categories[outlet.category]) {
        categories[outlet.category] = []
      }
      categories[outlet.category].push(outlet)
    })
    
    console.log('[v0] Categories:', Object.keys(categories))
    Object.keys(categories).forEach(cat => {
      console.log(`  ${cat}: ${categories[cat].length} outlets`)
    })
    
  } catch (error) {
    console.error('[v0] Error fetching CSV:', error)
  }
}

fetchAndParseCSV()
