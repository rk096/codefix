import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './css/allblog.css';
import ReactHtmlParser from "react-html-parser";
import { getUser } from '../../utils/UserHelper';


function AllBlogs({ data}) {

    const [user, setUser] = useState('');
    const [like, setLike] = useState('0');

    useEffect(() => {
        const fetchusername = async () => {
            try {
                const user = await getUser(data.user);
                let len = data.upvote.length - data.downvote.length;
                setLike(len);
                setUser(user.username);
            } catch (error) {
                console.error('Error fetching username:', error.message);
            }
        };
        fetchusername();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className='all-blogs'>
            <div className='all-blogs-container'>
                <div className='all-blogs-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                            <p>{like}</p>
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
                        <Link to={`/user/${data.user}`}>
                            <Avatar>{user?.charAt(0)}</Avatar>
                            <p>{user}</p>
                        </Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllBlogs
