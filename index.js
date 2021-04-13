const express = require ('express');
const app = express ();
const cors = require ('cors');
const path = require ('path');
const {v4: uuidv4} = require ('uuid');

var multer = require ('multer');

var storage = multer.diskStorage ({
  destination: function (req, file, cb) {
    cb (null, './uploads');
  },
  filename: function (req, file, cb) {
    cb (null, file.originalname);
  },
});

var upload = multer ({storage: storage});

// middleware
app.use (cors ());
app.use (express.json ());

app.post ('/uploadFile', upload.single ('file'), async function (
  req,
  res,
  next
) {
  try {
    const {path, mimetype, originalname} = req.file;

    res.json ('uploaded:', path, mimetype, originalname);
  } catch (error) {
    console.log (error);
  }
});

app.get ('/download/:file_name', async (req, res) => {
  try {
    const file_name = req.params.file_name;
    const full_path = path.join (__dirname, 'uploads/' + file_name);
    res.sendFile (full_path);
  } catch (error) {
    res.status (400).send ('Error while downloading file. Try again later.');
  }
});

///////////////// init server

app.listen (5000, () => {
  console.log ('Server has started on port 5000');
});
