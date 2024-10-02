import CandidateSerices from "../Services/candidateServices";


const getCandidateList = async (data) => {
    let response = await CandidateSerices.getCandidateList(data);
    if (response && response.status) {
        return response
    }
    else {
        return response
    }
};


const CandidateController = {
    getCandidateList
};

export default CandidateController;