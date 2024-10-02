import Constant from "../constant";
import { mainWrapper } from "../main";


function getNotificationListing(params) {
    return mainWrapper.get(Constant.host + `notifications`, params);
}

function readAllNotifications(params) {
    return mainWrapper.post(Constant.host + `all-notifications-read`, params);
}

function readNotification (params) {
    return mainWrapper.post(Constant.host + `notifications-read`, params);
}

function countNotification (params) {
    return mainWrapper.get(Constant.host + `notifications-count`, params);
}


const NotificationServices = {
    getNotificationListing,
    readAllNotifications,
    readNotification,
    countNotification
};

export default NotificationServices;
