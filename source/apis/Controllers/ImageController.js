import ImageService from "../Services/ImageServices";

const addImage = async (data) => {
    let post = {
        "file": data && data.image && data.image.base64 ? `data:${data && data.image && data.image.type};base64,${data.image.base64}` : null,
        "name": data && data.image && data.image.fileName ? data.image.fileName : null,
        "file_type": "image",
        "path": data && data.folder ? data.folder : null
    }
    let response = await ImageService.addImage(post, data.callback)
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const removeProfile = async (data) => {
    let response = await ImageService.removeProfile(data)
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};

const removeImage = async (data) => {
    let post = {
        file: data ? data : null,
    }
    let response = await ImageService.removeImage(post)
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
}


const ImageController = {
    addImage,
    removeProfile,
    removeImage
}

export default ImageController