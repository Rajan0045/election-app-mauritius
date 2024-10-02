import Constant from "../constant";
import { mainWrapper } from "../main";


function getCandidateList(params) {
    return mainWrapper.get(Constant.host + `candidates`, params);
};


const CandidateSerices = {
    getCandidateList
};

export default CandidateSerices;
