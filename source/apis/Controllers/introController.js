import IntroServices from "../Services/introServices";



const getIntroList = async (data) => {
    let response = await IntroServices.getIntroList(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const IntroController = {
    getIntroList,
};

export default IntroController;