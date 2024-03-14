import { Avatar, IconButton} from '@mui/material'
import React from 'react'
import 'react-quill/dist/quill.snow.css';
import './index.css';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getBlogById, downvoteBlog, getvoteBlog, upvoteBlog, deleteBlog, incrementBlogView } from '../../utils/BlogHelper';
import ReactHtmlParser from "react-html-parser";
import { getUser, getUserByEmail } from '../../utils/UserHelper';
import { addComment, AllcommentsByBlog, deleteComment } from '../../utils/CommentHelper';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MainBlog({ id }) {

    const authUser = useSelector(selectUser);
    const [owner, setOwner] = useState('');
    const navigate = useNavigate();
    const [show, setshow] = useState(false);
    const [blog, setBlog] = useState('');
    const [comment, setComment] = useState('');
    const [allcomments, setAllComments] = useState([]);
    const [like, setLike] = useState('0');
    const [userHasUpvoted, setUserHasUpvoted] = useState(false);
    const [userHasDownvoted, setUserHasDownvoted] = useState(false);

    const handleAddComment = async () => {
        try {
            if (comment.trim() !== '') {
                const com = {
                    body: comment,
                    blog: id
                }
                await addComment(com);
                const comnt = await AllcommentsByBlog(id);
                setComment('');
                setshow(false);
                setAllComments(comnt.comments);
            }
            else {
                alert("plese fill comment");
                return;
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleBlogDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Blog?');
        if (confirmDelete) {
            await deleteBlog(id);
            navigate('/');
        }
    };

    const handleCommentDelete = async (cid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Comment?');
        if (confirmDelete) {
            await deleteComment(cid);
            const cmnts = await AllcommentsByBlog(id);
            setAllComments(cmnts.comments);
        }
    };

    const handleEditBlog = (id) => {
        navigate(`/edit-blog/${id}`)
    }

    const handleUpvote = async () => {

        try {
            const userexist = await getvoteBlog(id);
            if (userexist.exist !== "user") {
                const response = await upvoteBlog(id);
                let len = response.blog.upvote.length - response.blog.downvote.length;
                if (userHasUpvoted)
                    setUserHasUpvoted(false);
                else {
                    setUserHasUpvoted(true);
                    setUserHasDownvoted(false);
                }
                setLike(len);
            }
            else {
                alert("you already voted the blog");
            }
        } catch (error) {
            console.error("Error upvoting blog", error);
        }
    }

    const handleDownvote = async () => {

        try {
            const userexist = await getvoteBlog(id);
            if (userexist.exist !== "user") {
                const response = await downvoteBlog(id);
                let len = response.blog.upvote.length - response.blog.downvote.length;
                if (userHasDownvoted)
                    setUserHasDownvoted(false);
                else {
                    setUserHasDownvoted(true);
                    setUserHasUpvoted(false);
                }
                setLike(len);
            }
            else {
                alert("you already voted the blog");
            }
        } catch (error) {
            console.error("Error downvoting blog:", error);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await incrementBlogView(id);
                const blg = await getBlogById(id);
                const com = await AllcommentsByBlog(id);
                const user = await getUser(blg.user)
                const count = blg.upvote.length - blg.downvote.length;

                const mUserForVote = await getUserByEmail(authUser.email);
                if (blg.upvote.includes(mUserForVote._id)) {
                    setUserHasUpvoted(true);
                }
                else if (blg.downvote.includes(mUserForVote._id)) {
                    setUserHasDownvoted(true);
                }

                setLike(count);
                setOwner(user);
                setAllComments(com.comments);
                setBlog(blg);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
    },[allcomments, like]);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    {blog && (
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
                    <p>
                            {(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (
                                <IconButton onClick={() => handleEditBlog(id)}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </p>

                        <p>
                            {(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (
                                <IconButton onClick={() => handleBlogDelete(blog._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}

                        </p>
                        {/* <p>{(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (<Link to={`/edit-blog/${id}`}>edit</Link>)}</p>
                        <p>{(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (<Link onClick={() => handleBlogDelete(blog._id)}>delete</Link>)}</p> */}
                    </div>
                </div>

                {blog && (
                    <div className='all-blogs'>
                        <div className='all-blogs-container'>
                            <div className='all-blogs-left'>
                                <div className='all-options'>
                                    <div className='all-option'>
                                        <p className={`arrow ${userHasUpvoted ? 'upvoted' : ''}`} onClick={handleUpvote}>▲</p>
                                        <p className='arrow'>{like}</p>
                                        <p className={`arrow ${userHasDownvoted ? 'downvoted' : ''}`} onClick={handleDownvote}>▼</p>
                                    </div>
                                    <div className='all-option'>
                                        <small>{blog.view} Views</small>
                                    </div>
                                </div>

                            </div>
                            <div className='blog-answer'>
                                {ReactHtmlParser(blog.body)}

                                <div className='author'>
                                    <small>asked "{blog.created_at.split("T")[0]}"</small>
                                    <div className='auth-details'>
                                        <Link to={`/user/${owner._id}`}>
                                            <Avatar>{owner?.username.charAt(0)}</Avatar> <span>{owner.username}</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className='comments'>
                                    {allcomments.length > 0 && allcomments.map((cmnt, index) => (
                                        <div className='comment' key={index}>
                                            <p>
                                            <span><Link to={`/user/${cmnt.user}`}>{cmnt.name}</Link></span> : {cmnt.body}
                                                <small> at {cmnt.created_at.split("T")[0]}</small>
                                            </p>
                                            <p>{(authUser.email === 'moderator.hotfix@gmail.com' || cmnt.email === authUser.email) && ( <Link onClick={() => handleCommentDelete(cmnt._id)} className="delete-link">delete</Link>)}</p>
                                        </div>
                                    ))}

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
                                                    width: "100%"
                                                }}>

                                            </textarea>
                                            <button style={{
                                                maxWidth: "fit-content"
                                            }} onClick={handleAddComment}>Add Comment</button>
                                        </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                
            </div>

        </div>
    );
}

export default MainBlog
