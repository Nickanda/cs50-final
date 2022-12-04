const express = require('express');

const router = express.Router();

const ants = require('../../../models/ants');

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

module.exports = router;