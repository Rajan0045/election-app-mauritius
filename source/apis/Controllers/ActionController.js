import ActionServices from "../Services/ActionServices";


const partyListing = async (data) => {
    let response = await ActionServices.partyListing(data);
    if (response && response.status) {
        return response
    }
    else {
        return null
    }
};


const ActionController = {
    partyListing
};

export default ActionController;
