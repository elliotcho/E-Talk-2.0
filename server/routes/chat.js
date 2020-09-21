const router = require('express').Router();

const {
    getChat, 
    getUserChats,
    getChatMemberIds,
    createChat,
    getChatMessages,
    markChatAsRead,
    getMemberNames,
    getUnseenChats,
    seeChats,
    checkIfChatExists,
    createMessage,
    handleComposerQuery,
    getMessageImage
} = require('../controllers/chat');

router.get('/:chatId', getChat);
router.get('/user/:uid', getUserChats);
router.post('/memberids', getChatMemberIds);
router.post('/create',createChat);
router.post('/message', createMessage);
router.get('/messages/:chatId', getChatMessages);
router.post('/messages/read', markChatAsRead);
router.post('/members', getMemberNames);
router.get('/unseen/:uid', getUnseenChats);
router.put('/see/:uid', seeChats);
router.post('/exists', checkIfChatExists);
router.post('/composer', handleComposerQuery);
router.post('/image', getMessageImage);

module.exports = router;