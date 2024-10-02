import ChatServices from "../Services/chatServices";


const getChatList = async (data) => {
    let response = await ChatServices.getChatList(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const ChatController = {
    getChatList
};

export default ChatController;