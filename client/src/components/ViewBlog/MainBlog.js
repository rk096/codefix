import { Avatar } from '@mui/material'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import Bookmark from "@material-ui/icons/Bookmark";
import History from "@material-ui/icons/History";
import { Link } from "react-router-dom";
import { useState } from 'react';

function MainBlog() {

    const [show, setshow] = useState(false);

    return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    <h2 className='main-blog'> Blog title</h2>
                    <Link to='/add-blog'>
                        <button>Add Blog</button>
                    </Link>
                </div>
                <div className='main-desc'>
                    <div className='info'>
                        <p>Timestamp</p>
                        <p>Active <span>today</span></p>
                        <p>Viewed <span>43 times</span> </p>
                    </div>
                </div>
                <div className='all-blogs'>
                    <div className='all-blogs-container'>
                        <div className='all-blogs-left'>
                            <div className='all-options'>
                                <p className='arrow'>▲</p>
                                <p className='arrow'>0</p>
                                <p className='arrow'>▼</p>

                                <Bookmark />
                                <History />

                            </div>
                        </div>
                        <div className='blog-answer'>
                            <p>This is test answer body</p>
                            <div className='author'>
                                <small>asked "timestamp"</small>
                                <div className='auth-details'>
                                    <Avatar />
                                    <p>name</p>
                                </div>
                            </div>
                            <div className='comments'>
                                <div className='comment'>
                                    <p>
                                        This is comment <span>User name</span>
                                        <small>
                                            Time Stamp
                                        </small>
                                    </p>
                                </div>
                                <p onClick={() => setshow(!show)}>Add a comment</p>
                                {
                                    show && (<div className='title'>
                                        <textarea
                                            type='text'
                                            placeholder='Add your comment'
                                            rows={5}
                                            style={{
                                                margin: "5px 0px",
                                                padding: "10px",
                                                border: "1px solid rgba(0,0,0,0.2)",
                                                borderRadius: "3px",
                                                outline: "none",
                                                width : "100%"
                                            }}>

                                        </textarea>
                                        <button style={{
                                            maxWidth: "fit-content"
                                        }}>Add Comment</button>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    flexDirection: "column"
                }} className='all-blogs'>
                    <p style={{
                        marginBottom: "20px",
                        fontSize: "1.3rem",
                        fontWeight: "300",
                    }}>Blog Content</p>
                    <div className='all-blogs-container'>
                        <div className='all-blogs-left'>
                            <div className='all-options'>
                                <p className='arrow'>▲</p>
                                <p className='arrow'>0</p>
                                <p className='arrow'>▼</p>

                                <Bookmark />
                                <History />

                            </div>
                        </div>


                        <div className='blog-answer'>
                            <p>This is test answer body</p>
                            <div className='author'>
                                <small>asked "timestamp"</small>
                                <div className='auth-details'>
                                    <Avatar />
                                    <p>name</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {/* <div className='main-answer'>
                    <h3 style={{
                        fontSize: "22px",
                        margin: "10px 0",
                        fontWeight: "400"
                    }}>Your answer</h3>
                    <ReactQuill className='react-quill' theme='snow' style={{ height: "200px" }} />
                </div>
                <button style={{
                    maxWidth: "fit-content",
                    marginTop: "80px"
                }}>Post Your Answer</button> */}

            </div>

        </div>
    )
}

export default MainBlog
