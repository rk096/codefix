import { Avatar } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import './css/allquestion.css';

function AllQuestions() {
    return (
        <div className='all-questions'>
            <div className='all-questions-container'>
                <div className='all-questions-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                            <p>0</p>
                            <span>Votes</span>
                        </div>

                        <div className='all-option'>
                            <p>0</p>
                            <span>Answers</span>
                        </div>

                        <div className='all-option'>
                            <small>0 Views</small>
                        </div>
                    </div>
                </div>
                <div className='question-answer'>
                    <Link to='/question'>title</Link>
                    <div style={{
                        width: "90%"
                    }}>
                        <div>answer</div>

                    </div>
                    <div style={{
                        display: "flex"
                    }}>
                        <span className='question-tag'>react</span>
                        <span className='question-tag'>antc</span>
                        <span className='question-tag'>frontend</span>

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

export default AllQuestions
