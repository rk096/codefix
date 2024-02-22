import {backendUrl} from "./Config";
import { getToken } from "./Config";

export const addquestion = async (question) => {
    try {
        //console.log(question);
        const token = getToken();
        //console.log(token);
       const response = await fetch(`${backendUrl}/codehub/question/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(question),
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error creating question: ${error.message}`);
    }
};



export const getAllQuestions = async () => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const formattedResponse = await response.json();
        //console.log("Response from backend:", formattedResponse);
        return formattedResponse;
    } catch (error) {
        console.error("Error fetching question:", error);
        throw new Error(`Error fetching question: ${error.message}`);
    }
}

export const getQuestionById = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const formattedResponse = await response.json();
        console.log("Response from backend:", formattedResponse);
        return formattedResponse;
    } catch (error) {
        console.error("Error fetching question:", error);
        throw new Error(`Error fetching question: ${error.message}`);
    }
}
