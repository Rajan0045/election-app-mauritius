import { setNotification } from "../../redux/action/user";
import store from "../../redux/store";
import NotificationServices from "../Services/NotificationServices";

const getNotificationListing = async (data) => {
    let response = await NotificationServices.getNotificationListing(data);
    if (response && response.status) {
        return response
    }
    else {
        return response
    }
};

const readAllNotifications = async (data) => {
    let response = await NotificationServices.readAllNotifications(data);
    if (response && response.status) {
        store.dispatch(setNotification(0));
        return response
    }
    else {
        return response
    }
};

const readNotification = async (data) => {
    let post = {
        notification_id: data ? data : null
    }
    let response = await NotificationServices.readNotification(post);
    if (response && response.status) {
        return response
    }
    else {
        return response
    }
};

const countNotification = async (data) => {
    let response = await NotificationServices.countNotification();
    if (response && response.status) {
        return response
    }
    else {
        return response
    }
};

const NotificationController = {
    getNotificationListing,
    readAllNotifications,
    readNotification,
    countNotification
};

export default NotificationController;
