import Constant from "../constant";
import { mainWrapper } from "../main";


function partyListing(params) {
    return mainWrapper.get(Constant.host + "party", params);
};


const ActionServices = {
    partyListing
};

export default ActionServices;
