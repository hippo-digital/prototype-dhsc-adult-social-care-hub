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

router.post('/v1/:test/:role/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  if (target === 'a'){
    console.log('url is:' + url)
    res.redirect('/v1/a/' + url[5] + '/' + url[6] )
  } else {
    res.redirect('/v1/b/' + url[5] + '/' + url[6] )
  }
})

router.post('/v2/:test/:role/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  if (target === 'a'){
    console.log('url is:' + url)
    res.redirect('/v2/a/' + url[5] + '/' + url[6] )
  } else {
    res.redirect('/v2/b/' + url[5] + '/' + url[6] )
  }
})

router.post('/v3/:test/:role/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  if (target === 'a'){
    console.log('url is:' + url)
    res.redirect('/v3/a/' + url[5] + '/' + url[6] )
  } else {
    res.redirect('/v3/b/' + url[5] + '/' + url[6] )
  }
})

router.get('/v2/a/care-worker/requirements2', function (req, res) {
  // get the skills for this role
  const skillsList = req.session.data['roleb']
  // create an empty array to store a list of the categories
  let skillCategories = [];

  // loop through the skills object looking for a matches against the returned checked items
  skillsList.forEach(item => {
    if (item.category && !skillCategories.includes(item.category)) {
      skillCategories.push(item.category);
    }
  });

  console.log("Categories: " + skillCategories)

  return res.render('v2/a/care-worker/requirements2', {
    'categories': skillCategories
  })
})

router.get('/v3/a/care-worker/requirements2', function (req, res) {
  // get the skills for this role
  const skillsList = req.session.data['roleb']
  // create an empty array to store a list of the categories
  let skillCategories = [];

  // loop through the skills object looking for a matches against the returned checked items
  skillsList.forEach(item => {
    if (item.category && !skillCategories.includes(item.category)) {
      skillCategories.push(item.category);
    }
  });

  console.log("Categories: " + skillCategories)

  return res.render('v3/a/care-worker/requirements2', {
    'categories': skillCategories
  })
})

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