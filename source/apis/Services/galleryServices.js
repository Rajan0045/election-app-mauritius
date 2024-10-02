import Constant from "../constant";
import { mainWrapper } from "../main";


function getGalleryList(params) {
    return mainWrapper.get(Constant.host + `gallery`, params);
};


const GalleryServices = {
    getGalleryList
};

export default GalleryServices;
