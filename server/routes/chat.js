const router = require('express').Router();

const {
    getChat, 
    getUserChats,
    getChatPhoto,
    createChat,
    getChatMessages,
    markChatAsRead,
    getChatMembers,
    getUnseenChats,
    seeChats,
    checkIfChatExists
} = require('../controllers/chat');

router.get('/:chatId', getChat);
router.get('/user/:uid', getUserChats);
router.post('/photo', getChatPhoto);
router.post('/create',createChat);
router.get('/messages/:chatId', getChatMessages);
router.post('/messages/read', markChatAsRead);
router.post('/members', getChatMembers);
router.get('/unseen/:uid', getUnseenChats);
router.put('/see/:uid', seeChats);
router.post('/exists', checkIfChatExists);

module.exports = router;