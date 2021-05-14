const express = require("express");
const router = express.Router()

const itemsService = require("../service/itemsService.js")
const validation = require("../middleware/validation.js")

router.get(`/`, itemsService.showAllItems);

router.get(`/:name`, itemsService.getASpecificItem);

router.post(`/`, validation.validateIncomingData, itemsService.createAnItem);

router.put(`/:name`, validation.validateIncomingData,itemsService.updateAnItem);

router.delete(`/:name`, itemsService.deleteAnItem);

module.exports = router;

