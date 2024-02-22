import { Avatar } from '@mui/material'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import Bookmark from "@material-ui/icons/Bookmark";
import History from "@material-ui/icons/History";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getBlogById } from '../../utils/BlogHelper';
import ReactHtmlParser from "react-html-parser";
import { getuname } from '../../utils/UserHelper';
import { addComment, AllcommentsByBlog } from '../../utils/CommentHelper';

function MainBlog({blg}) {

    const [show, setshow] = useState(false);
    const [blog, setBlog] = useState(blg);
    const [uname, setUname] = useState('');
    const [comment, setComment] = useState('');
    const [allcomments, setAllComments] = useState([])

    const handleAddComment =  () => {
        try{ 
            // if (comment.trim() !== ''){
            
            const com = {
                body:comment,
                blog: blg._id
            }
            //console.log(com);
             addComment(com);
        
            console.log('Comment added successfully!');
            setComment('');
        // }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                
                const user = await getuname(blog.user)
                const com = await AllcommentsByBlog(blog._id);
               
               //console.log('Fetched blog:', user);
              console.log('Fetched comment:', com);

               setUname(user.username);
                setAllComments(com);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [blog]);

    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                { blog && (
                    <>
                    <h2 className='main-blog'>{blog.title}</h2>
                    <Link to='/add-blog'>
                        <button>Add Blog</button>
                    </Link>
                    </>
                )}
                </div>
                
                <div className='main-desc'>
                    <div className='info'>
                        <p>Timestamp</p>
                        <p>Active <span>today</span></p>
                        <p>Viewed <span>43 times</span> </p>
                    </div>
                </div>

                { blog && (
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
                        {ReactHtmlParser(truncate(blog.body, 200))}
                            <div className='author'>
                                <small>{blog.created_at.split("T")[0]}</small>
                               
                                    <div className='auth-details'>
                                <Avatar>{uname.charAt(0)}</Avatar>
                                </div>
                               {uname}
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
                                         value={comment}
                                                onChange={(e) => setComment(e.target.value)}
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
                                        }} onClick={handleAddComment}>Add Comment</button>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* <div style={{
                    flexDirection: "column"
                }} className='all-blogs'>
                    <p style={{
                        marginBottom: "20px",
                        fontSize: "1.3rem",
                        fontWeight: "300",
                    }}>Blog Content</p> */}
                    {/* <div className='all-blogs-container'>
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

                    </div> */}
                {/* </div> */}
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
