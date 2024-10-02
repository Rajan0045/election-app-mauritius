import Constant from "../constant";
import { mainWrapper } from "../main";

const addImage = (params, progressCallback) => {
    return mainWrapper.upload(`${Constant.host}upload-file`, params, progressCallback)
}

const removeProfile = (params) => {
    return mainWrapper.get(`${Constant.host}profile-picture-remove`, params)
}

const removeImage = (params) => {
    return mainWrapper.post(`${Constant.host}remove-file`, params)
}

const ImageService = {
    addImage,
    removeProfile,
    removeImage
}

export default ImageService