importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "383676" },
  { url: "/styles/inline.css", revision: null },
  { url: "/scripts/app.js", revision: null },
  { url: "/pouchdb.min.js", revision: null },
  { url: "/images/icons/icon-128x128.png", revision: null },
  { url: "/images/icons/icon-144x144.png", revision: null },
  { url: "/images/icons/icon-152x152.png", revision: null },
  { url: "/images/icons/icon-192x192.png", revision: null },
  { url: "/images/icons/icon-256x256.png", revision: null },
  { url: "/images/icons/icon-32x32.png", revision: null },
  { url: "/images/icons/icon-512x512.png", revision: null },
  { url: "/images/ic_add_white_24px.svg", revision: null },
  { url: "/images/ic_refresh_white_24px.svg", revision: null },
]);


workbox.routing.registerRoute(
  //v4/schedules/
  new RegExp(/.*(?:api-ratp.pierre-grimaud)\.fr/,),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'dynamicCache',
  })
);
