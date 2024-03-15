//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const fs = require('fs-extra') // needed to import the json data

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


// V5 ROUTES

router.post('/v5/:test/:role/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  res.redirect('/v5/a/' + url[5] + '/' + url[6] )
})

router.post('/v5/:test/:role/switchbrand', function (req, res) {
  // trim out the white space we we can count it easier
  let brand = req.session.data['brand']
  var url = req.get('Referrer') .split( '/' );
  // /b/supervisor/switch-to-a
  res.redirect('/v5/' + url[4] + '/' + url[5] + '/' + url[6] )
})

router.post('/v5/:test/switch', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  res.redirect('/v5/a/careers')
})

router.post('/v5/:test/switchbrand', function (req, res) {
  // trim out the white space we we can count it easier
  let target = req.session.data['target']
  var url = req.get('Referrer') .split( '/' );
  res.redirect('/v5/a/careers')
})

router.get('/v5/a/new-to-care/requirements', function (req, res) {
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

  return res.render('v5/a/new-to-care/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v5/a/new-to-care/courses', function (req, res) {
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
  return res.render('v5/a/new-to-care/courses', {
    'training': trainingList
  })
})

router.get('/v5/a/care-worker/requirements', function (req, res) {
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

  return res.render('v5/a/care-worker/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v5/a/care-worker/courses', function (req, res) {
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
  return res.render('v5/a/care-worker/courses', {
    'training': trainingList
  })
})

router.get('/v5/a/supervisor/requirements', function (req, res) {
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

  return res.render('v5/a/supervisor/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v5/a/supervisor/courses', function (req, res) {
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
  return res.render('v5/a/supervisor/courses', {
    'training': trainingList
  })
})

router.get('/v5/a/leader/requirements', function (req, res) {
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

  return res.render('v5/a/leader/requirements', {
    'categories': skillCategories,
    'training': trainingList
  })
})

router.get('/v5/a/leader/courses', function (req, res) {
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
  return res.render('v5/a/leader/courses', {
    'training': trainingList
  })
})

// function to load in data files
function loadJSONFromFile(fileName, path = 'app/data/') {
  let jsonFile = fs.readFileSync(path + fileName)
  return JSON.parse(jsonFile)
}
router.post("/datafile", function(req,res) {
  // grab the value from the form and use it to build the file name
  let grantsFile = req.session.data.selectedData
  req.session.data.selectedFile = 'session-data-defaults-'+ contentFile +'.json'
  console.log('setting data file as: session-data-defaults-' + contentFile + '.json')

  // reload index page
  res.redirect("/")
})

function allRoutes(req, res, next) {
  // check the version number of the referer if it exists
  if (req.get('Referrer')) {
    var refererURL = req.get('Referrer') .split( '/' );
    var refererVersion = refererURL[3]
    if (refererVersion === '') {
      console.log('link from homepage')
      var homepageLink = 'true'
    }
  }

  var destURL = req.path .split( '/' );
  const destVersion = destURL[1]

  console.log('refererURL: ' + refererURL)
  console.log('destURL: ' + destURL)

  // if url hacked or the link was from the homepage
  if (refererURL == null || homepageLink === 'true') {
    if (destVersion != null) {
      console.log('version number changed')
      // check the change
      if (destVersion === req.session.data.headVersion) {
        // reset data to the defaults
        req.session.data = req.app.locals
        console.log('restoring default data')
      } else {
        // change the data to the corresponding file
        req.session.data.selectedFile = 'session-data-defaults_'+ destVersion +'.json'
        console.log('file:' + req.session.data.selectedFile)
        req.session.data = loadJSONFromFile(req.session.data.selectedFile)
        console.log('loading in ' + destVersion + ' data')
      }
    }
  }

  console.log(refererVersion)
  console.log('version=' + destVersion)
  next()
}

router.get('/*', allRoutes)

