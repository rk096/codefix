import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import Bookmark from "@material-ui/icons/Bookmark";
import History from "@material-ui/icons/History";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { addanswer } from '../../utils/AnswerHelper';
import { fetchAllAnswers } from '../../utils/AnswerHelper';
import ReactHtmlParser from "react-html-parser";
import { getQuestionById, upvoteQuestion } from '../../utils/QuestionHelper';
import { getuname } from '../../utils/UserHelper';
import { addComment, AllcommentsByQuestion } from '../../utils/CommentHelper';

function MainQuestion({ id }) {

    const [show, setshow] = useState(false);
    const [answer, setAnswer] = useState('');
    const [allanswer, setAllanswer] = useState([]);
    const [ques, setQuestion] = useState('');
    // const [ansuname, setAnsUname] = useState('');
    const [comment, setComment] = useState('');
    const [allcomments, setAllComments] = useState([]);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [like, setLike] = useState('');

    // console.log("ques", ques);

    const handlePostAnswer = async () => {

        if (!answer.trim()) {
            // If the answer is empty, return or handle the error as needed
            alert("plese fill answer");
            return;
        }
        const ans = { body: answer, question: id }
        const data = await addanswer(ans);
        setAllanswer([...allanswer, data]);
        setAnswer('');

        // console.log(data);
    }

    const handleUpvote = async () => {
       
        try {
            if(!upvoted){
            const response = await upvoteQuestion(id);
            // console.log("Response:", response);
            // console.log(response.question.vote.length);
            setUpvoted(true);
            setLike(response.question.vote.length);
            }
            else{
                alert("you already upovoted the question");
            }
        } catch (error) {
            console.error("Error upvoting question:", error);
        }
       
    }


    const handleDownvote = async () => {
       
        try {
            if(!downvoted){
            //const response = await upvoteQuestion(id);
            // console.log("Response:", response);
            // console.log(response.question.vote.length);
            setDownvoted(true);
            setLike(prevLike => {
                if (prevLike > 0) {
                    return prevLike - 1;
                } else {
                    return 0; 
                }
            });
            }
            else{
                alert("you already downvoted the question");
            }
        } catch (error) {
            console.error("Error upvoting question:", error);
        }
       
    }

    const handleAddComment = () => {
        try {
            if (comment.trim() !== '') {

                const com = {
                    body: comment,
                    question: id
                }
                //console.log(com);
                addComment(com);

                console.log('Comment added successfully!');
                setComment('');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const answer = await fetchAllAnswers(id);
                const question = await getQuestionById(id);
                const com = await AllcommentsByQuestion(id);
                const count = question.vote.length;
               // console.log("count", count);
               if(count > 0){
                setLike(count);
               }
                console.log('Fetched answers:', answer);
                // console.log('Fetched question:', question);
                console.log('Fetched comment:', com);

                setAllanswer(answer.answers);
                setQuestion(question);
                setAllComments(com.comments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id,allanswer]);

    //console.log(allanswer);
    //console.log(allanswer.answers.length);
    //console.log(allcomments);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

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
                        <p>Timestamp</p>
                        <p>Active <span>today</span></p>
                        <p>Viewed <span>43 times</span> </p>
                    </div>
                </div>
                {ques && (
                    <div className='all-questions'>
                        <div className='all-questions-container'>
                            <div className='all-questions-left'>
                                <div className='all-options'>
                                    {/* <p className='arrow'>▲</p>
                                    <p className='arrow'>0</p>
                                    <p className='arrow'>▼</p> */}
                                    <p className='arrow' onClick={handleUpvote}>▲</p>
                        <p className='arrow'>{like > 0 ? like : 0}</p>
                        <p className='arrow' onClick={handleDownvote}>▼</p>

                                    <Bookmark />
                                    <History />
                                </div>
                            </div>
                            <div className='question-answer'>
                                {ReactHtmlParser(truncate(ques.body, 200))}

                                <div className='author'>
                                    <small>asked "{ques.created_at.split("T")[0]}"</small>
                                    <div className='auth-details'>
                                    {/* <Avatar>{answer.name.charAt(0)}</Avatar> */}
                                    </div>
                                    <p>name</p>
                                </div>
                                <div className='comments'>
                                    {/* <div className='comment'>
                                        <p>
                                            This is comment <span>User name</span>
                                            <small>
                                                Time Stamp
                                            </small>
                                        </p>
                                    </div> */}

                                    {allcomments.length > 0 && allcomments.map((comment, index) => (
                                        <div className='comment' key={index}>
                                            <p>
                                                {comment.body} <span>{comment.user}</span>
                                                <small>{comment.created_at.split("T")[0]}</small>
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
                        fontWeight: "300",
                    }}>No of answers :{allanswer.length}</p>


                    {allanswer.length > 0 && allanswer.map((answer, index) => (
                        <div className='all-questions-container' key={index}>
                            <div className='all-questions-left'>
                                <div className='all-options'>
                                    <React.Fragment>
                                        <p className='arrow'>▲</p>
                                        <p className='arrow'>0</p>
                                        <p className='arrow'>▼</p>
                                    </React.Fragment>
                                    <Bookmark />
                                    <History />
                                </div>
                            </div>
                            <div className='question-answer'>
                                {ReactHtmlParser(truncate(answer.body, 200))}
                                <div className='author'>
                                    <small>{answer.created_at.split("T")[0]}</small>
                                    <div className='auth-details'>
                                <Avatar>{answer.name.charAt(0)}</Avatar>
                                </div>
                               {answer.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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