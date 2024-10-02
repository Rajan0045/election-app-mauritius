import GalleryServices from "../Services/galleryServices";


const getGalleryList = async (data) => {
    let response = await GalleryServices.getGalleryList(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const GalleryController = {
    getGalleryList
};

export default GalleryController;