import { joinURL } from 'ufo'
import type { AttractionsResponse } from '@/types/attractions';

export default defineEventHandler(async (event) => {
  const travelTaipeiBaseUrl = 'https://www.travel.taipei/open-api' 
  
  // Convert /api/travel-taipei/foobar to foobar
  const eventPath = event.path.replace(/^\/api\/travel-taipei\//, '') 
  const proxyUrl = joinURL(travelTaipeiBaseUrl, eventPath)

  // h3 proxy utils: https://h3.unjs.io/utils/advanced#proxy
  return sendProxy(event, proxyUrl, {
    headers: {
      "Accept": "application/json"
    }
  }) as Promise<AttractionsResponse>
})