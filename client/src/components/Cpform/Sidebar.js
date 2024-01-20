import { Public, Stars } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import React from 'react';
import './css/sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-options'>
                    <div className='sidebar-option'>
                        <Link>Home</Link>

                    </div>
                    <div className='sidebar-option'>
                        <Link>Users</Link>
                    </div>

                    <div className='sidebar-option'>
                        <Link>Blog</Link>
                    </div>

                    <div className='sidebar-option'>
                        <p>Platforms</p>
                        <div className='link'>
                            <div className='link-tag'>
                                <Link>Explore Collectives</Link>              </div>
                        </div>
                    </div>

                    {/* <div className='sidebar-option'>
                        <p>Find a Job</p>
                        <div className='link'>
                            <div className='link-tag'>
                                <Link>Question</Link>              </div>
                        </div>

                    </div> */}
{/* 
                     <div className='sidebar-option'>
                        <p>Teams</p>
                        <div className='link-tag'>
                           
                            <Link>Companies</Link>              
                            </div>
                    </div> 
                     */}

                </div>
            </div>

        </div>
    )
}

export default Sidebar
