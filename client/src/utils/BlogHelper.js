import {backendUrl} from "./Config";
import { getToken } from "./Config";

export const addblog = async (blog) => {
    try {
        console.log(blog);
        const token = getToken();
        console.log(token);
       const response = await fetch(`${backendUrl}/codehub/blog/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(blog),
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error creating blog: ${error.message}`);
    }
};

export const getAllBlogs = async () => {
    try {
        const response = await fetch(`${backendUrl}/codehub/blog`, {
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
        console.error("Error fetching blog:", error);
        throw new Error(`Error fetching blog: ${error.message}`);
    }
}

