import {backendUrl} from "./Config";

export const getuname = async (id) => {
    try {
       const response = await fetch(`${backendUrl}/codehub/user/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        //console.log("response from backend", formattedResponse);
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};
