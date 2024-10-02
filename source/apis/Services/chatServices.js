import Constant from "../constant";
import { mainWrapper } from "../main";


function getChatList(params) {
    return mainWrapper.get(Constant.host + `chatroom`, params);
};


const ChatServices = {
    getChatList
};

export default ChatServices;
