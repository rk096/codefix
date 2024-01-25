import { useCookies } from 'react-cookie';

const UseToken = () => {
    const [cookies] = useCookies(['token']);
    return cookies.token || null;
};

export default UseToken;