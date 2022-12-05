const express = require('express');
const fs = require('fs/promises');
const multer  = require('multer');

const upload = multer({ dest: 'public/static/images/' })

const router = express.Router();

const ants = require('../../../models/ants');
const cookies = require('../../../models/cookies');

router.get('/', async (req, res) => {
  const options = req.body.options;

  const filteredOptions = {};

  for (const key in options) {
    if (key == "name" && options[key] != "") {
      filteredOptions[key] = options[key];
    }

    const DateRegExp = new RegExp(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/g);

    if (key == "date" && options[key] != "" && DateRegExp.test(options[key])) {
      if (key == "dateInequality" == "lte") {
        filteredOptions[key] = {
          $lte: options[key]
        }
      } else if (key == "dateInequality" == "gte") {
        filteredOptions[key] = {
          $gte: options[key]
        };
      }
    }
  }

  const antFinds = await ants.find(filteredOptions).exec();
  
  res.json({
    status: 'ok',
    data: antFinds,
  });
});

router.post('/', upload.single('image'), async (req, res) => {
  const { species, caste, feignsDeath, HL, HH, EL, WL, MH, PL, PH, GL, TL } = req.body;

  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'No image was uploaded',
    });
  }

  if (!species || !caste || !feignsDeath || !HL || !HH || !EL || !WL || !MH || !PL || !PH || !GL || !TL) {
    await fs.unlink('public/static/images/' + req.file.filename);
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields',
    });
  }

  if (!req.body.cookie) {
    await fs.unlink('public/static/images/' + req.file.filename);
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  const cookie = await cookies.findOne({ cookie: req.body.cookie }).populate('user').exec();

  if (!cookie) {
    await fs.unlink('public/static/images/' + req.file.filename);
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  await ants.create({
    owner: [cookie.user._id],
    species: species,
    caste: caste,
    feignsDeath: feignsDeath,
    image: req.file.filename,
    lengths: {
      HL: HL,
      HH: HH,
      EL: EL,
      WL: WL,
      MH: MH,
      PL: PL,
      PH: PH,
      GL: GL,
      TL: TL,
    },
    date: new Date(),
  });

  res.json({
    status: 'ok',
  });
});

router.put('/', async (req, res) => {

});

module.exports = router;