const {Notification} = require('../dbschemas');

const router = require('express').Router();

router.get('/unread/:uid', async (req, res) =>{
    const {uid} = req.params;

    const notifs = await Notification.find({receiverId: uid});

    res.json({
        unreadNotifs: notifs.filter(notif => !notif.seen).length
    });
});

router.put('/read/:uid', async (req, res) =>{
    const {uid} = req.params;

    await Notification.updateMany({receiverId: uid}, {seen: true});

    const notifs = await Notification.find({receiverId: uid});

    notifs.sort((a, b) => b.date - a.date);

    res.json(notifs);
});

module.exports = router;