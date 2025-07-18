const express = require('express');
const upload = require('../middleware/upload'); 

const router = express.Router();
const { createAd, getAds, deleteAd, updateAd } = require('../controllers/ad');

router.post('/ads', upload.single('image'), createAd);
router.get('/ads', getAds);
router.delete('/ads/:id', deleteAd);
router.put('/ads/:id', upload.single('image'), updateAd);

module.exports = router;

