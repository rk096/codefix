import { Avatar, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { addanswer, fetchAllAnswers, deleteAnswer } from '../../utils/AnswerHelper';
import { getUser, getUserByEmail } from '../../utils/UserHelper';
import ReactHtmlParser from "react-html-parser";
import { downvoteQuestion, getQuestionById, getvoteQuestion, upvoteQuestion, deleteQuestion } from '../../utils/QuestionHelper';
import { addComment, AllcommentsByQuestion, deleteComment } from '../../utils/CommentHelper';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MainQuestion({ id }) {

    const authUser = useSelector(selectUser);
    const [owner, setOwner] = useState('');
    const navigate = useNavigate();
    const [show, setshow] = useState(false);
    const [answer, setAnswer] = useState('');
    const [allanswer, setAllanswer] = useState([]);
    const [ques, setQuestion] = useState('');
    const [comment, setComment] = useState('');
    const [allcomments, setAllComments] = useState([]);
    const [like, setLike] = useState(0);
    const [userHasUpvoted, setUserHasUpvoted] = useState(false);
    const [userHasDownvoted, setUserHasDownvoted] = useState(false);

    const handlePostAnswer = async () => {

        if (!answer.trim()) {
            alert("plese fill answer");
            return;
        }
        const ans = { body: answer, question: id }
        await addanswer(ans);
        const answers = await fetchAllAnswers(id);
        setAnswer('');
        setAllanswer(answers.answers);
    }

    const handleUpvote = async () => {
        try {
            const userexist = await getvoteQuestion(id);
            if (userexist.exist !== "user") {
                const response = await upvoteQuestion(id);
                let len = response.question.upvote.length - response.question.downvote.length;
                if (userHasUpvoted)
                    setUserHasUpvoted(false);
                else {
                    setUserHasUpvoted(true);
                    setUserHasDownvoted(false);
                }
                setLike(len);
            }
            else {
                alert("you already voted the question");
            }
        } catch (error) {
            console.error("Error upvoting question:", error);
        }

    }

    const handleDownvote = async () => {
        try {
            const userexist = await getvoteQuestion(id);
            if (userexist.exist !== "user") {
                const response = await downvoteQuestion(id);
                let len = response.question.upvote.length - response.question.downvote.length;
                if (userHasDownvoted)
                    setUserHasDownvoted(false);
                else {
                    setUserHasDownvoted(true);
                    setUserHasUpvoted(false);
                }
                setLike(len);
            }
            else {
                alert("you already voted the question");
            }
        } catch (error) {
            console.error("Error downvoting question:", error);
        }
    }

    const handleAddComment = async () => {
        try {
            if (comment.trim() === '') {
                alert("plese fill comment");
                return;
            }
            const com = {
                body: comment,
                question: id
            }
            await addComment(com);
            const comnt = await AllcommentsByQuestion(id);
            setComment('');
            setshow(false);
            setAllComments(comnt.comments);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleQuestionDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Question?');
        if (confirmDelete) {
            await deleteQuestion(id);
            navigate('/');
        }
    };

    const handleEditQuestion = (id) => {
        navigate(`/edit-question/${id}`)
    }

    const handleCommentDelete = async (cid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Comment?');
        if (confirmDelete) {
            await deleteComment(cid);
            const cmnts = await AllcommentsByQuestion(id);
            setAllComments(cmnts.comments);
        }
    };

    const handleAnswerDelete = async (aid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Answer?');
        if (confirmDelete) {
            await deleteAnswer(aid);
            const anss = await fetchAllAnswers(id);
            setAllanswer(anss.answers);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const answer = await fetchAllAnswers(id);
                const question = await getQuestionById(id);
                const com = await AllcommentsByQuestion(id);
                const user = await getUser(question.user);
                const count = question.upvote.length - question.downvote.length;

                const mUserForVote = await getUserByEmail(authUser.email);
                if (question.upvote.includes(mUserForVote._id)) {
                    setUserHasUpvoted(true);
                }
                else if (question.downvote.includes(mUserForVote._id)) {
                    setUserHasDownvoted(true);
                }

                setLike(count);
                setOwner(user);
                setAllanswer(answer.answers);
                setQuestion(question);
                setAllComments(com.comments);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
    }, [allanswer, allcomments, like]);

   

    return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    {ques && (
                        <>
                            <h2 className='main-question'>{ques.title}</h2>
                            <Link to='/add-question'>
                                <button>Ask Question</button>
                            </Link>
                        </>
                    )}
                </div>
                <div className='main-desc'>
                    <div className='info'>

                        <p>
                            {(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (
                                <IconButton onClick={() => handleEditQuestion(id)}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </p>

                        <p>
                            {(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (
                                <IconButton onClick={() => handleQuestionDelete(ques._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}

                        </p>
                        {/* <p>{(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (<Link to={`/edit-question/${id}`}>edit</Link>)}</p>  
                      
                      <p>{(authUser.email === 'moderator.hotfix@gmail.com' || owner.email === authUser.email) && (<Link onClick={() => handleQuestionDelete(ques._id)}>delete</Link>)}</p> */}


                    </div>
                </div>
                {ques && (
                    <div className='all-questions'>
                        <div className='all-questions-container'>
                            <div className='all-questions-left'>
                                <div className='all-options'>
                                    <p className={`arrow ${userHasUpvoted ? 'upvoted' : ''}`} onClick={handleUpvote}>▲</p>
                                    <p className='arrow'>{like}</p>
                                    <p className={`arrow ${userHasDownvoted ? 'downvoted' : ''}`} onClick={handleDownvote}>▼</p>
                                </div>
                            </div>
                            <div className='question-answer'>
                                {ReactHtmlParser(ques.body)}

                                <div className='author'>
                                    <small>asked "{ques.created_at.split("T")[0]}"</small>
                                    <div className='auth-details'>
                                        <Link to={`/user/${owner._id}`}>
                                            <Avatar>{owner.username.charAt(0)}</Avatar> <span>{owner.username}</span>
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

                                            <p>
                                                {(authUser.email === 'moderator.hotfix@gmail.com' || cmnt.email === authUser.email) && (

                                                    <Link onClick={() => handleCommentDelete(cmnt._id)} className="delete-link">delete</Link>

                                                )}
                                            </p>

                                        </div>
                                    ))}

                                    <p onClick={() => setshow(!show)}>Add a comment</p>
                                    {show && (
                                        <div className='title'>
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
                                            }} onClick={handleAddComment} >Add Comment</button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                <div style={{
                    flexDirection: "column"
                }} className='all-questions'>
                    <p style={{
                        marginBottom: "20px",
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                    }}>{allanswer.length} Answers :</p>


                    {allanswer.length > 0 && allanswer.map((answer, index) => (
                        <div className='all-questions-container' key={index}>
                            <div className='all-questions-left' style={{ width: "1.5%" }}>
                                <div className='all-options' >
                                    {/* <IconButton onClick={() => handleAnswerDelete(answer._id)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton> */}

                                    <p>
                                        {(authUser.email === 'moderator.hotfix@gmail.com' || answer.email === authUser.email) && (

                                            <img src="/deleteicon2.png" alt="Delete Icon" className="delete-icon" onClick={() => handleAnswerDelete(answer._id)} />
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className='answer-body'>
                            <p className="answer-content"> {ReactHtmlParser(answer.body)}</p>
                               
                                <div className='author'>
                                    <small>{answer.created_at.split("T")[0]}</small>
                                    <div className='auth-details'>
                                    </div>

                                    <Link to={`/user/${answer.user}`}>
                                        <Avatar>{answer.name?.charAt(0)}</Avatar>
                                        <span>{answer.name}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* {allanswer.length > 0 && allanswer.map((answer, index) => (
                        <div className='answer-body' key={index}>

                           

                            <div className='all-questions-left'>
                                <div className='all-options'>

                                    {(authUser.email === 'moderator.hotfix@gmail.com' || answer.email === authUser.email) && (
                                        <p>
                                            <IconButton onClick={() => handleAnswerDelete(answer._id)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='question-answer'>
                                
                                {ReactHtmlParser(truncate(answer.body, 200))}
                                <div className='author'>
                                    <small>{answer.created_at.split("T")[0]}</small>
                                    <div className='auth-details'>
                                    </div>
                                    <Link to={`/user/${answer.user}`}>
                                        <Avatar>{answer.name?.charAt(0)}</Avatar>
                                        <p>{answer.name}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}


                <div className='main-answer'>
                    <h3 style={{
                        fontSize: "22px",
                        margin: "10px 0",
                        fontWeight: "400"
                    }}>Your answer</h3>
                    <ReactQuill className='react-quill' theme='snow' style={{ height: "200px" }} value={answer} onChange={(e) => { setAnswer(e) }} />
                </div>
                <button style={{
                    maxWidth: "fit-content",
                    marginTop: "80px"
                }} onClick={handlePostAnswer}>Post Your Answer</button>
            </div>
        </div>
    );

}

export default MainQuestion