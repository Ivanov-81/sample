const CACHE_NAME = 'sw_loyalty_v2.0',
    CACHED_URLS = [
        './static/bundle.js',
        './static/styles.css',
        './static/images/logo.svg',
        './static/images/home-bg.png',
        './static/images/company.png',
        './static/images/gift.svg',
        './static/images/avatar.svg',
        './static/images/arrow-back.svg',
        './static/images/main-image-welcome.svg',
        './static/images/cat.png',
        './static/images/qr-code.svg',
        './static/images/info.svg',
        './static/images/person.svg',
        './static/images/coffee-empty.svg',
        './static/images/gift-grey.svg',
        './static/images/gold-medal-empty.svg',
        './static/images/gray-medal-empty.svg',
        './static/images/promo1.png',
        './static/images/promo2.png',
        './static/images/promo3.png',
        './static/images/promo4.png',
        './static/images/promo5.png',
        './static/images/promo6.png',
        './static/images/down.svg',
        './static/images/coffee-full.svg',
        './static/images/settings.svg',
        './static/images/logout.svg',
        './static/images/accept.svg',
        './static/images/book.png',
        './static/images/full-cat.png',
        './static/images/plus.png',
    ];

// При установке воркера мы кешируем данные (статику).
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(CACHED_URLS))
            // `skipWaiting()` необходим, потому что мы хотим активировать SW
            // и контролировать его сразу, а не после перезагрузки.
            .then(() => self.skipWaiting())
    )
});

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(CACHE_NAMES => {
            return Promise.all(
                CACHE_NAMES.map(cache => {
                    if(cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') 
        return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if(response) {
                    const resClone = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => {
                            if (!/^https?:$/i.test(new URL(event.request.url).protocol)) return;
                            cache.put(event.request, resClone);
                        });
                    return response;
                }
            })
            .catch(err => {
                return caches.match(event.request)
                    .then(response => response)
                    .catch(err => {
                        console.log(err);
                    })
            })
    );
});
