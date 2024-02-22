import { Avatar } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './css/allblog.css';
import ReactHtmlParser from "react-html-parser";
import { getuname } from '../../utils/UserHelper';


function AllBlogs({data}) {

     //console.log("blog",data);

     const [user, setUser] = useState('');

    useEffect(() => {
        const fetchusername = async () => {
            try{
                const user = await getuname(data.user);
                setUser(user.username);
            }catch (error) {
                console.error('Error fetching username:', error.message);
            }
        };
        fetchusername();
    }, [data.user]);

     function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
        <div className='all-blogs'>
            <div className='all-blogs-container'>
                <div className='all-blogs-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                            <p>0</p>
                            <span>Votes</span>
                        </div>

                        <div className='all-option'>
                            <small>0 Views</small>
                        </div>
                    </div>
                </div>
                <div className='blog-answer'>
                    <Link to={`/blog/${data._id}`}>{data.title}</Link>
                    <div style={{
                        width: "90%"
                    }}>
                        <div>{ReactHtmlParser(truncate(data.body, 200))}</div>
                        

                    </div>
                    <div style={{
                        display: "flex"
                    }}>
                         {data.tags.map((tag) => 
                        <span className='question-tag'>{tag}</span>
                    )
                    }

                    </div>
                    <div className='author'>
                        <small>{data.created_at.split("T")[0]}</small>
                        <div className='author-deatails'>
                        <Avatar>{user?.charAt(0)}</Avatar>
                            <p>{user}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllBlogs
