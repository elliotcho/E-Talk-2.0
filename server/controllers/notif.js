const {Notification} = require('../models/notif');

exports.getUnreadNotifications = async (req, res) => {
    const {uid} = req.params;

    const notifs = await Notification.find({receiverId: uid});

    res.json({
        unreadNotifs: notifs.filter(notif => !notif.seen).length
    });
}

exports.readNotifications = async (req, res) =>{
    const {uid} = req.params; 

    await Notification.updateMany({receiverId: uid}, {seen: true});

    const notifs = await Notification.find({receiverId: uid});
    notifs.sort((a, b) => b.date - a.date);

    res.json(notifs);
}