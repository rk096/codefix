import {backendUrl} from "./Config";
import { getToken } from "./Config";

export const addanswer = async (answer) => {
    try {
        console.log(answer);
        const token = getToken();
        //console.log(token);
       const response = await fetch(`${backendUrl}/codehub/answer/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(answer),
        });
        const formattedResponse = await response.json();
        //console.log("Answer", formattedResponse);
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error creating answer: ${error.message}`);
    }
};


export const fetchAllAnswers = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/answer?questionId=${id}`, {
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
        console.error("Error fetching answer:", error);
        throw new Error(`Error fetching answer: ${error.message}`);
    }
}