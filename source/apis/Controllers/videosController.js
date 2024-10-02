import VideoServices from "../Services/videoServices";


const getVideoList = async (params) => {
    let response = await VideoServices.getVideoList(params);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const VideoController = {
    getVideoList,
};

export default VideoController;