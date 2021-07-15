
const staticAssets = [
  "./",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png",
  "./styles.css",
]; 

const cacheName = "financeMainCache"; 

self.addEventListener("install", function(event) {
    console.log("install was made");
    event.waitUntil(
    // when installed offline .. 
    caches.open(cacheName)
    .then((cache) => {
        return cache.addAll(staticAssets); 
    }).then(self.skipWaiting())
    ); 


}); 

// used to intercept requests so we can check for data or a file 
self.addEventListener('fetch', (event )=> { 
    console.log("Fetch was made");
    console.log(event.request); 
    if (!navigator.onLine) {
    console.log("We are offline");
    } else {
    console.log("We are online");
    }

    event.respondWith(
        fetch(event.request)
            .catch(() => {
                    return caches.open(cacheName)
                        .then((cache)=> {
                            return cache.match(event.request); 
                        }) 
            }) 
    )
});


self.addEventListener('activate', (event )=> {
    console.log("activate was made");
    event.waitUntil(self.clients.claim()); 
});

