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
import { getQuestionById } from '../../utils/QuestionHelper';
import { getuname } from '../../utils/UserHelper';

function MainQuestion({ id }) {

    const [show, setshow] = useState(false);
    const [answer, setAnswer] = useState('');
    const [allanswer, setAllanswer] = useState([]);
    const [ques, setQuestion] = useState('');
    const [ansuname, setAnsUname] = useState('');

    // console.log("ques", ques);

    const handlePostAnswer = () => {

        const ans = { body: answer, question: id }
        const data = addanswer(ans);
        setAllanswer([...allanswer, data]);
        setAnswer('');

        // console.log(data);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const answers = await fetchAllAnswers(id);
                const question = await getQuestionById(id);

                //console.log('Fetched answers:', answers);
                //console.log('Fetched question:', question);

                setAllanswer(answers);
                setQuestion(question);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const findUsernameById = async (userId) => {
        try {
            const user = await getuname(userId);
            console.log("user", user);
            if (user && user.username) {
               setAnsUname(user.username);
            } else {
                console.error("User or username not found.");
            }
        } catch (error) {
            console.error("Error retrieving username:", error);
        }
    };
    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    <h2 className='main-question'> questio title</h2>
                    <Link to='/add-question'>
                        <button>Ask Question</button>
                    </Link>
                </div>
                <div className='main-desc'>
                    <div className='info'>
                        <p>Timestamp</p>
                        <p>Active <span>today</span></p>
                        <p>Viewed <span>43 times</span> </p>
                    </div>
                </div>
                <div className='all-questions'>
                    <div className='all-questions-container'>
                        <div className='all-questions-left'>
                            <div className='all-options'>
                                <p className='arrow'>▲</p>
                                <p className='arrow'>0</p>
                                <p className='arrow'>▼</p>

                                <Bookmark />
                                <History />

                            </div>
                        </div>
                        <div className='question-answer'>
                            {ReactHtmlParser(truncate(ques.body, 200))}

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
                                                width: "100%"
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
                }} className='all-questions'>
                    <p style={{
                        marginBottom: "20px",
                        fontSize: "1.3rem",
                        fontWeight: "300",
                    }}>No of answers</p>

                    {allanswer.map((answer, index) => (

                        <div className='all-questions-container'>
                            <div className='all-questions-left'>
                                <div className='all-options'>

                                    <React.Fragment key={index}>
                                        <p className='arrow'>▲</p>
                                        <p className='arrow'>0</p>
                                        <p className='arrow'>▼</p>
                                    </React.Fragment>

                                    <Bookmark />
                                    <History />
                                </div>
                            </div>
                           
                            <div key={index} className='question-answer'>
                               
                                {ReactHtmlParser(truncate(answer.body, 200))}

                                <div className='author'>
                                    <small>{answer.created_at.split("T")[0]}</small>
                                    <div className='auth-details'>
                                        <Avatar />
                                        <p>{answer.user}</p>
                                    </div>
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
    )
}

export default MainQuestion