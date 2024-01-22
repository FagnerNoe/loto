const loto = "loto-fagner";
const assets = [

    "/",
    "/index.html",
    "/assets/css/style.css/",
    "/assets/imagem/loto.png/",
    "/assets/js/scripts.js",

]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(loto).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});



