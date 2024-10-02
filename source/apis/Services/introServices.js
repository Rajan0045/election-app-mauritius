import Constant from "../constant";
import { mainWrapper } from "../main";


function getIntroList(params) {
    return mainWrapper.get(Constant.host + "intro", params);
};


const IntroServices = {
    getIntroList,
};

export default IntroServices;
