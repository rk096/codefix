import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import TagInput from './TagInput';
import { Link, useNavigate } from "react-router-dom";
import { addblog } from '../../utils/BlogHelper';


function Index() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const handleBlog = () => {

        // console.log("title", title);
        // console.log("body", body);
        // console.log("tags", tags);
        if (title && body && tags && title.trim() !== '' && body.trim() !== '' && tags.length > 0) {
            const blog = { title, body, tags };
            console.log(blog);
            addblog(blog);
            navigate("/blogs");
        } else {
            console.error('Insufficient details to add question.');
            alert("please fill all fields")
        }



    }

    const handleCancle = () => {
        navigate("/");
    }

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 80) {
            setTitle(inputValue);
        } else {

            setTitle(inputValue.slice(0, 80));
            alert('You can only add up to 80 characters.');
        }
    };


    return (
        <div className='add-blog'>
            <div className='add-blog-container'>
                <div className='head-title'>
                    <h1>Add a Blog</h1>
                </div>

                <div className='blog-container'>
                    <div className='blog-options'>
                        <div className='blog-option'>
                            <div className='title'>
                                <h3>Title</h3>
                                <small>Let your creativity shine! Enter a title that inspires and captivates your readers.</small>
                                <input type='text' placeholder='Add blog title' value={title} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='blog-option'>

                            <div className='title'>
                                <h3>Body</h3>
                                <small>Compose the main content of your blog. Make it informative, engaging, and true to your voice.</small>
                                <ReactQuill className='react-quill' theme='snow' value={body} onChange={(e) => setBody(e)} />
                            </div>

                        </div>

                        <div className='blog-option'>
                            <div className='title'>
                                <h3>Tags</h3>
                                <small>Add up to 5 tags to describe what your blog is about.</small>
                                <TagInput setTags={setTags} tags={tags} />

                            </div>
                        </div>


                    </div>
                </div>
                <div className='button-container'>
                    <button className='button' onClick={handleBlog}>Add your Blog</button>
                    <button className='button' onClick={handleCancle}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default Index

