import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import TagInput from './TagInput';

function index() {
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
                                <input type='text' placeholder='Add blog title' />
                            </div>
                        </div>
                        <div className='blog-option'>

                            <div className='title'>
                                <h3>Body</h3>
                                <small>Compose the main content of your blog. Make it informative, engaging, and true to your voice.</small>
                                <ReactQuill className='react-quill' theme='snow' />
                            </div>

                        </div>

                        <div className='blog-option'>
                            <div className='title'>
                                <h3>Tags</h3>
                                <small>Add up to 5 tags to describe what your blog is about.</small>
                                <TagInput />
                                {/* <TagsInput name='tags' placeHolder='press enter to add new tag' /> */}
                            </div>
                        </div>


                    </div>
                </div>
                <button className='button'>Add your blog</button>
            </div>
        </div>
    )
}


export default index

