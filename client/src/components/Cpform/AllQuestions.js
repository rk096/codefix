import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './css/allquestion.css';
import ReactHtmlParser from "react-html-parser";
import { getUser } from '../../utils/UserHelper';
import { fetchAllAnswers } from '../../utils/AnswerHelper';

function AllQuestions({ data }) {

    const [user, setUser] = useState('');
    const [allanswer, setAllanswer] = useState([]);
    const [like, setLike] = useState('0');

    useEffect(() => {
        const fetchusername = async () => {
            try {
                const user = await getUser(data.user);
                const answer = await fetchAllAnswers(data._id);
                let len = data.upvote.length - data.downvote.length;
                setLike(len);
                setUser(user.username);
                setAllanswer(answer.answers);
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
        <div className='all-questions'>
            <div className='all-questions-container'>
                <div className='all-questions-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                            <p>{like}</p>
                            <span>Votes</span>
                        </div>

                        <div className='all-option'>
                            <p>{allanswer.length}</p>
                            <span>Answers</span>
                        </div>


                    </div>
                </div>
                <div className='question-answer'>
                    <Link to={`/question/${data._id}`}>{data.title}</Link>
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

export default AllQuestions
