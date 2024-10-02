import Constant from "../constant";
import { mainWrapper } from "../main";


function getVideoList(params) {
    return mainWrapper.get(Constant.host + `videos`, params);
};


const VideoServices = {
    getVideoList
};

export default VideoServices;
