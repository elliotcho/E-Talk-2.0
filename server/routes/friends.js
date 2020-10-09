const router = require('express').Router();

const {
    getUserFriends,
    getFriendStatus,
    getUnreadFriendRequests,
    readFriendRequests,
    acceptFriendReq, 
    declineFriendReq,
    changeFriendStatus
} = require('../controllers/friends');

router.get('/:profileId', getUserFriends);
router.post('/status', getFriendStatus);
router.get('/unreadrequests/:uid',  getUnreadFriendRequests);
router.put('/readrequests/:uid', readFriendRequests);
router.post('/accept', acceptFriendReq);
router.post('/decline', declineFriendReq);
router.post('/change', changeFriendStatus);

module.exports = router; 