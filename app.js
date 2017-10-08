const express = require('express')
const app = express()
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!')
})

const fs = require ('fs')

app.post('/image', upload.single('file'), function (req, res, next) {
  console.log('got image', req.file)
  // Instantiates a client
  const vision = Vision();
  // The path to the local image file, e.g. "/path/to/image.png"
   var fileName = req.file.path+'.jpg';
   var landmarks = {}
  // Performs landmark detection on the local file
  vision.landmarkDetection({ source: {filename: fileName} })
    .then((results) => {
      landmarks = results[0].landmarkAnnotations;
      console.log('Landmarks:');
      landmarks.forEach((landmark) => console.log(landmark));
    })
  .catch((err) => {
    console.error('ERROR:', err);
  });
  res.send(landmarks)
})