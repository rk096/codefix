import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import TagInput from './TagInput';
import { Link, useNavigate } from "react-router-dom";
import { updateQuestion, getQuestionById } from '../../utils/QuestionHelper';

const Index = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            const question = await getQuestionById(id);
            setTitle(question.title);
            setBody(question.body);
            setTags(question.tags);
        }
        fetchQuestion();
    }, [id]);

    const handleUpdateQuestion = async () => {
        if (title && body && tags && title.trim() !== '' && body.trim() !== '' && tags.length > 0) {
            const ques = {title, body, tags};
            await updateQuestion(id, ques);
            navigate(`/question/${id}`);
        } else {
            console.error('Insufficient details to update question.');
            alert("please fill all fields")
        }
    }

    return (
        <div className='add-question'>
            <div className='add-question-container'>
                <div className='head-title'>
                    <h1>Edit Question</h1>
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
                <button className='button' onClick={handleUpdateQuestion}>Edit question</button>
                <Link to={`/question/${id}`}>Cancel</Link>
            </div>
           
        </div>
    )
}


export default Index