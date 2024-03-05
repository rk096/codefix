import {backendUrl, getToken} from "./Config";

export const getUser = async (id) => {
    try {
       const response = await fetch(`${backendUrl}/codehub/user/id/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

export const getUserByEmail = async (email) => {
    try {
       const response = await fetch(`${backendUrl}/codehub/user/email/${encodeURIComponent(email)}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

export const updateUser = async (id, user) => {
    try {
        const token = getToken();
       const response = await fetch(`${backendUrl}/codehub/user/update/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });
        
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

export const deleteUser = async (id) => {
    try {
        const token = getToken();
       const response = await fetch(`${backendUrl}/codehub/user/delete/${id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error deleting question: ${error.message}`);
    }
};

export const getUserAnswers = async (id) => {
    try {
       const response = await fetch(`${backendUrl}/codehub/answer/owner/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export const getUserBlogs = async (id) => {
    try {
       const response = await fetch(`${backendUrl}/codehub/blog/owner/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export const getUserQuestions = async (id) => {
    try {
       const response = await fetch(`${backendUrl}/codehub/question/owner/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};