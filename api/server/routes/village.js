const express = require('express');
const router = express.Router();

const villageController = require('./../controllers/village');

router
	.route('/')
	.get(villageController.getVillages)
	.post(villageController.addVillage)
	.patch(villageController.updateVillage)
	.delete(villageController.deleteVillage)

module.exports = router;
