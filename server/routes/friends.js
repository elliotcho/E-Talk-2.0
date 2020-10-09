const router = require('express').Router();

const {
    getUserFriends,
    getFriendStatus,
    getUnreadFriendRequests,
    readFriendRequests,
    acceptFriendReq, 
    declineFriendReq
} = require('../controllers/friends');

router.get('/:profileId', getUserFriends);
router.post('/status', getFriendStatus);
router.get('/unreadrequests/:uid',  getUnreadFriendRequests);
router.put('/readrequests/:uid', readFriendRequests);
router.post('/accept', acceptFriendReq);
router.post('/decline', declineFriendReq);

module.exports = router; 