const Router = require('./router')
const { links, sampleHtmlUrl } = require('./data')
const {
  LinksTransformer,
  TitleTransformer,
  ProfileTransformer,
  ProfileNameTransformer,
  ProfileAvatarTransformer,
  BodyClassTransformer,
} = require('./transformers')

async function serveJson() {
  return new Response(
    JSON.stringify(links.map(({ name, url }) => ({ name, url }))),
    { headers: { 'content-type': 'application/json' } },
  )
}

async function serveHtml() {
  const headers = {
    'content-type': 'text/html;charset=UTF-8',
  }

  const response = await fetch(sampleHtmlUrl, { headers })
  const rewriter = new HTMLRewriter()
    .on('div#links', new LinksTransformer(links))
    .on('div#profile', new ProfileTransformer())
    .on('h1#name', new ProfileNameTransformer('malikudit'))
    .on(
      'img#avatar',
      new ProfileAvatarTransformer('https://github.com/malikudit.png'),
    )
    .on('title', new TitleTransformer('Udit Malik'))
    .on('body', new BodyClassTransformer('bg-gray-900', 'bg-blue-700'))

  return rewriter.transform(response)
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
module.exports = async request => {
  const r = new Router()

  r.get('/links', serveJson)
  r.get('.*', serveHtml)

  const resp = await r.route(request)
  return resp
}
