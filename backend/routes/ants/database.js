const express = require('express');
const fs = require('fs/promises');
const multer = require('multer');

const upload = multer({ dest: 'public/static/images/' })

const router = express.Router();

const ants = require('../../../models/ants');
const cookies = require('../../../models/cookies');

router.get('/', async (req, res) => {
  const options = req.query;

  const filteredOptions = {};

  const speciesName = options.search;

  for (const key in options) {
    if ((key == "species" || key == "caste") && options[key] != "") {
      if (options[key] == "asc") {
        filteredOptions[key] = 1;
      } else if (options[key] == "desc") {
        filteredOptions[key] = -1;
      }
    }

    if (key == "feignsDeath" && typeof options[key] == 'boolean') {
      filteredOptions[key] = options[key];
    }

    if (key == "order" && options[key] != "") {
      filteredOptions['date'] = options[key];
    }
  }

  let antFinds;

  if (speciesName) {
    antFinds = await ants.find({ species: new RegExp(speciesName, "i") }, filteredOptions).exec();
  } else {
    antFinds = await ants.find({}, undefined, {
      sort: filteredOptions
    }).exec();
  }

  console.log(antFinds)

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

  if (!req.cookies?.['antlab-session']) {
    await fs.unlink('public/static/images/' + req.file.filename);
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  const cookie = await cookies.findOne({ cookie: req.cookies['antlab-session'] }).populate('user').exec();

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

// router.options('/');
router.put('/', async (req, res) => {
  const { _id, species, caste, feignsDeath, HL, HH, EL, WL, MH, PL, PH, GL, TL } = req.body;

  if (!species || !caste || !feignsDeath || !HL || !HH || !EL || !WL || !MH || !PL || !PH || !GL || !TL) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields',
    });
  }

  console.log(req.cookies)
  console.log(req.headers)

  if (!req.cookies?.['antlab-session']) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  const cookie = await cookies.findOne({ cookie: req.cookies['antlab-session'] }).populate('user').exec();

  if (!cookie) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }

  await ants.updateOne({
    _id: _id,
  }, {
    $set: {
      species: species,
      caste: caste,
      feignsDeath: feignsDeath,
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
      }
    }
  });

  res.json({
    status: 'ok',
  });
});

module.exports = router;