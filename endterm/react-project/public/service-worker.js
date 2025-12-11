const CACHE_NAME = "app-shell-v1";
const RUNTIME_CACHE = "runtime-cache-v1";

const APP_SHELL = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/assets/index-CpGLSE3q.js",
    "/assets/index-CxlFd0Dn.css",
];

self.addEventListener("install", (event) => {
    console.log("SW Installed");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(APP_SHELL);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("SW Activated");

    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => ![CACHE_NAME, RUNTIME_CACHE].includes(key))
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});


self.addEventListener("fetch", (event) => {
    console.log('Request is active');

    const req = event.request;
    const url = new URL(req.url);
    

    if (url.hostname.includes("google-analytics.com")) {
    return;
  }

    if (req.mode === "navigate") {
        event.respondWith(
            fetch(req).catch(() => caches.match("/index.html"))
        );
        return;
    }

    if (req.url.startsWith("ws://") || req.url.startsWith("wss://")) {
        return;
    }

    if (url.origin === 'https://api.jikan.moe/v4') {
        if (req.destination === "image") return; 

        event.respondWith(networkFirst(req));
        return;
    }

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    }
});

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    return await fetch(req);
  } catch (err) {
    
    if (req.destination === "style") {
      return new Response("/* offline */", { headers: { "Content-Type": "text/css" } });
    }
    if (req.destination === "script") {
      return new Response("", { headers: { "Content-Type": "application/javascript" } });
    }
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function networkFirst(req) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (err) {
        const cached = await cache.match(req);
        return cached || new Response(JSON.stringify({ error: "Offline" }), {
            headers: { "Content-Type": "application/json" }
        });
    }
}
