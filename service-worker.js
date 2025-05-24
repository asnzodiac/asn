```javascript
const CACHE_NAME = "aix-flight-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://cdn.brandfetch.io/id-PSmaCm4/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  ".https://cdn.brandfetch.io/id-PSmaCm4/w/800/h/284/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
];

// Install event: Cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve cached content if offline
self.addEventListener("fetch", (event) => {
  // Skip caching for API requests
  if (event.request.url.includes("api.flightradar24.com")) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```
