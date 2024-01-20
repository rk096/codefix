const express = require('express');

import { login , signup} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;