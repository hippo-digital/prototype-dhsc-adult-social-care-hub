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

// V3 ROUTES

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

router.post('/v3/:test/:role/switchbrand', function (req, res) {
  // trim out the white space we we can count it easier
  let brand = req.session.data['brand']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  res.redirect('/v3/' + url[4] + '/' + url[5] + '/' + url[6] )
})

router.post('/v3/:test/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  if (target === 'a'){
    console.log('url is:' + url)
    res.redirect('/v3/a/')
  } else {
    res.redirect('/v3/b/')
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

  return res.render('v3/a/care-worker/requirements2', {
    'categories': skillCategories
  })
})

router.get('/v3/a/care-worker/requirements', function (req, res) {
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

  return res.render('v3/a/care-worker/requirements', {
    'categories': skillCategories
  })
})

router.get('/v3/a/supervisor/requirements', function (req, res) {
  // get the skills for this role
  const skillsList = req.session.data['rolec']
  // create an empty array to store a list of the categories
  let skillCategories = [];

  // loop through the skills object looking for a matches against the returned checked items
  skillsList.forEach(item => {
    if (item.category && !skillCategories.includes(item.category)) {
      skillCategories.push(item.category);
    }
  });

  console.log("Categories: " + skillCategories)

  return res.render('v3/a/supervisor/requirements', {
    'categories': skillCategories
  })
})

// V4 ROUTES

router.post('/v4/:test/:role/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  res.redirect('/v4/a/' + url[5] + '/' + url[6] )
})

router.post('/v4/:test/:role/switchbrand', function (req, res) {
  // trim out the white space we we can count it easier
  let brand = req.session.data['brand']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  res.redirect('/v4/' + url[4] + '/' + url[5] + '/' + url[6] )
})

router.post('/v4/:test/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  res.redirect('/v4/a/careers')
})

router.post('/v4/:test/switchbrand', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  res.redirect('/v4/a/careers')
})

router.get('/v4/a/new-to-care/requirements', function (req, res) {
  // get the skills for this role
  const skillsList = req.session.data['skillsCats']
  const training = req.session.data['training']

  // create an empty array to store a list of the categories
  let skillCategories = [];
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  skillsList.forEach(item => {
    if (item.role === 'rolea') {
      skillCategories.push(item.category);
    }
  });
  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('rolea')) {
      trainingList.push(item);
    }
  });

  return res.render('v4/a/new-to-care/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v4/a/new-to-care/courses', function (req, res) {
  // get the skills for this role
  const training = req.session.data['training']
  // create an empty array to store a list of the categories
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('rolea')) {
      trainingList.push(item);
    }
  });

  console.log(trainingList)
  return res.render('v4/a/new-to-care/courses', {
    'training': trainingList
  })
})

router.get('/v4/a/care-worker/requirements', function (req, res) {
  // get the skills for this role
  const skillsList = req.session.data['skillsCats']
  const training = req.session.data['training']

  // create an empty array to store a list of the categories
  let skillCategories = [];
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  skillsList.forEach(item => {
    if (item.role === 'roleb') {
      skillCategories.push(item.category);
    }
  });
  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('roleb')) {
      trainingList.push(item);
    }
  });

  return res.render('v4/a/care-worker/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v4/a/care-worker/courses', function (req, res) {
  // get the skills for this role
  const training = req.session.data['training']
  // create an empty array to store a list of the categories
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('roleb')) {
      trainingList.push(item);
    }
  });

  console.log(trainingList)
  return res.render('v4/a/care-worker/courses', {
    'training': trainingList
  })
})

router.get('/v4/a/supervisor/requirements', function (req, res) {
  // get the skills for this role
  const skillsList = req.session.data['skillsCats']
  const training = req.session.data['training']

  // create an empty array to store a list of the categories
  let skillCategories = [];
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  skillsList.forEach(item => {
    if (item.role === 'rolec') {
      skillCategories.push(item.category);
    }
  });
  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('rolec')) {
      trainingList.push(item);
    }
  });

  return res.render('v4/a/supervisor/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v4/a/supervisor/courses', function (req, res) {
  // get the skills for this role
  const training = req.session.data['training']
  // create an empty array to store a list of the categories
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('rolec')) {
      trainingList.push(item);
    }
  });

  console.log(trainingList)
  return res.render('v4/a/supervisor/courses', {
    'training': trainingList
  })
})

router.get('/v4/a/leader/requirements', function (req, res) {
  // get the skills for this role
  const skillsList = req.session.data['skillsCats']
  const training = req.session.data['training']

  // create an empty array to store a list of the categories
  let skillCategories = [];
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  skillsList.forEach(item => {
    if (item.role === 'roled') {
      skillCategories.push(item.category);
    }
  });
  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('roled')) {
      trainingList.push(item);
    }
  });

  return res.render('v4/a/leader/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v4/a/leader/courses', function (req, res) {
  // get the skills for this role
  const training = req.session.data['training']
  // create an empty array to store a list of the categories
  let trainingList = [];

  // loop through the skills object looking for a matches against the returned checked items
  training.forEach(item => {
    if (item.roleCat.includes('roled')) {
      trainingList.push(item);
    }
  });

  console.log(trainingList)
  return res.render('v4/a/leader/courses', {
    'training': trainingList
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

