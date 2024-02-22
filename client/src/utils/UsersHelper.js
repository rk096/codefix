import {backendUrl} from "./Config";

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${backendUrl}/codehub/user`, {
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
        console.error("Error fetching users:", error);
        throw new Error(`Error fetching users: ${error.message}`);
    }
}