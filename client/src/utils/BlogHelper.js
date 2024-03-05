import {backendUrl} from "./Config";
import { getToken } from "./Config";

export const addblog = async (blog) => {
    try {
        const token = getToken();
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

export const updateBlog = async (id, blog) => {
    try {
        const token = getToken();
       const response = await fetch(`${backendUrl}/codehub/blog/update/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(blog),
        });
        
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error updating blog: ${error.message}`);
    }
};

export const deleteBlog = async (id) => {
    try {
        const token = getToken();
       const response = await fetch(`${backendUrl}/codehub/blog/delete/${id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;
        
    } catch (error) {
        throw new Error(`Error deleting blog: ${error.message}`);
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

export const getBlogById = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/blog/${id}`, {
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


export const upvoteBlog = async (id) => {
    try {
        const token = getToken();
       // console.log(token);
        const response = await fetch(`${backendUrl}/codehub/blog/upvote/${id}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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

export const getvoteBlog = async (id) => {
    try {
        const token = getToken();
        //console.log(token);
        const response = await fetch(`${backendUrl}/codehub/blog/getvote/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const formattedResponse = await response.json();
       console.log("Response from backend:", formattedResponse);
        return formattedResponse;
    } catch (error) {
        console.error("Error fetching blog:", error);
        throw new Error(`Error fetching blog: ${error.message}`);
    }
}


export const downvoteBlog = async (id) => {
    try {
        const token = getToken();
       // console.log(token);
        const response = await fetch(`${backendUrl}/codehub/blog/downvote/${id}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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

// fetch all blogs of a user with ':id'
export const fetchBlogsOfaUser = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/blog/owner/${id}`, {
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