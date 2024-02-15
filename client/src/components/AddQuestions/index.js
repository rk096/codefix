import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import TagInput from './TagInput';
import {addquestion} from '../../utils/QuestionHelper';
import { useNavigate } from "react-router-dom";



const Index = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();


    const handleAddQuestion = () => {

        // console.log("title", title);
        // console.log("body", body);
        // console.log("tags", tags);

        const question = {title, body, tags};
        addquestion(question);
        navigate("/");

    }

    return (
        <div className='add-question'>
            <div className='add-question-container'>
                <div className='head-title'>
                    <h1>Ask a Public question</h1>
                </div>


                <div className='question-container'>
                    <div className='question-options'>
                        <div className='question-option'>
                            <div className='title'>
                                <h3>Title</h3>
                                <small>Be specific and imaging you're asking a question to another person.</small>
                                <input type='text' placeholder='Add question title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                        </div>
                        <div className='question-option'>

                            <div className='title'>
                                <h3>Body</h3>
                                <small>Include all the information someone would need to answer your
                                    question</small>
                                <ReactQuill className='react-quill' theme='snow' value={body} onChange={(e) => setBody(e)} />
                            </div>

                        </div>

                        <div className='question-option'>
                            <div className='title'>
                                <h3>Tags</h3>
                                <small>Add up to 5 tags to describe what your question is about.</small>
                                <TagInput setTags={setTags} tags={tags} />
                                {/* <TagsInput name='tags' placeHolder='press enter to add new tag' /> */}
                            </div>
                        </div>


                    </div>
                </div>
                <button className='button' onClick={handleAddQuestion}>Add your question</button>
            </div>
        </div>
    )
}


export default Index

