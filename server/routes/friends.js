const router = require('express').Router();

const {
    getUserFriends,
    getFriendStatus,
    getUnreadFriendRequests,
    readFriendRequests
} = require('../controllers/friends');

router.get('/:profileId', getUserFriends);
router.post('/status', getFriendStatus);
router.get('/unreadrequests/:uid',  getUnreadFriendRequests);
router.put('/readrequests/:uid', readFriendRequests);

module.exports = router; 