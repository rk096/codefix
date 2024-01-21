import { Avatar } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import './css/allblog.css';

function AllBlogs() {
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
                    <Link to='/blog'>title</Link>
                    <div style={{
                        width: "90%"
                    }}>
                        <div>answer</div>

                    </div>
                    <div style={{
                        display: "flex"
                    }}>
                        <span className='blog-tag'>react</span>
                        <span className='blog-tag'>antc</span>
                        <span className='blog-tag'>frontend</span>

                    </div>
                    <div className='author'>
                        <small>time stamp</small>
                        <div className='author-deatails'>
                            <Avatar />
                            <p>username</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllBlogs
