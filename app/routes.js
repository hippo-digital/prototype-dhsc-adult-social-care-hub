//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.use((req, res, next) => {
  const log = {
    method: req.method,
    url: req.originalUrl,
    data: req.session.data
  }
  console.log(JSON.stringify(log, null, 2))
  next()
})

// Add your routes here

function devModeRoute(req, res, next) {
  if (!req.session.data['devMode']) {
    console.log('no data found')
    var devMode = req.query.devMode
    if (devMode === 'true') {
      console.log('devmode detected')
      req.session.data['devMode'] = 'true'
      console.log('local storage updated')
    } else {
      console.log('devmode not detected')
    }
  } else {
    console.log('data found and set to ' + req.session.data['devMode'])
  }
  if (process.env.PROD === 'TRUE') {
    req.session.data['local'] = ''
  } else {
    req.session.data['local'] = 'true'
  }
  next()
}

router.get('/*', devModeRoute)