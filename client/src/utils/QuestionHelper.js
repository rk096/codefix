import {backendUrl} from "./Config";
import UseToken from "./Usetoken";

const token = UseToken();

const addquestion = async (question) => {

    try{

        
        console.log("token", token);

    }
    catch (error) {
        throw new Error(`Error creating question: ${error.message}`);
      }
}

export {addquestion}