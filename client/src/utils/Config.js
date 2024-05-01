// export const backendUrl = "http://localhost:80";
export const backendUrl = "https://code-hub-three.vercel.app/";

export const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
