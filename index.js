const handler = require('./src/handler')

addEventListener('fetch', event => {
  event.respondWith(handler(event.request))
})
