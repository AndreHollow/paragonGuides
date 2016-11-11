﻿var express = require('express');
var router = express.Router();
var guideModel = require('../models').guide;

router.get('/', function (req, res) {
    guideModel.getGuidesByCount(10, function (err, rows) {
        if (!err) {
            res.render('guides', { guides: rows  });
        } else {
            console.error('Guides  not found');
        }
    });
});
router.get('/create', function (req, res) {
    res.render('guide-constructor', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
});
router.get('/:id', function (req, res) {
    guideModel.getFullGuideByID(req.params.id, function (err, row) {
        if (!err) {
            res.render('guide', { guide:row , guidejson: JSON.stringify(row)});
        } else {
            console.error('Guide %s not found', req.params.id);
        }
    });
});
module.exports = router;