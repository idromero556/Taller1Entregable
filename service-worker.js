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
  { url: "/scripts/app.js", revision: null }
]);

workbox.routing.registerRoute(
  new RegExp('/styles/.*\\.css'),
  new workbox.strategies.NetworkFirst({
    cacheName: `runtimeCache`,
    networkTimeoutSeconds: 2
  })
);
