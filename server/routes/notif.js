const router = require('express').Router();

const {
    getUnreadNotifications,
    readNotifications
} = require('../controllers/notif');

router.get('/unread/:uid', getUnreadNotifications);
router.put('/read/:uid', readNotifications);

module.exports = router;