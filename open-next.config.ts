import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Всички страници са предварително генерирани (SSG) и няма ISR, затова
// prerender-натият HTML се чете директно от Workers Static Assets.
// Cache interception означава, че Worker-ът връща отговора, без да стартира
// Next.js рендера — важно за 10ms CPU лимита на безплатния план.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
