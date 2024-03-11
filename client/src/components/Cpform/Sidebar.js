import { Home, People, Article, Apps } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import React from 'react';
import './css/sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-options'>
                    <div className='sidebar-option'>
                    
                  
                    <Link to='/' className='link'>
                            <Home className='icon' />
                            <span>Home</span>
                        </Link>
                    
                    </div>
                    <div className='sidebar-option'>
                   
                        <Link to='/users' className='link'>
                            <People className='icon' />
                            <span>Users</span>
                        </Link>
                    </div>

                    <div className='sidebar-option'>
                  
                        <Link to='/blogs' className='link'>
                            <Article className='icon' />
                            <span>Blog</span>
                        </Link>
                    </div>

                    <div className='sidebar-option'>
                    
                        <p className='link-platform'>
                            <Apps className='icon' />
                            Platforms
                        </p>
                        <div className='link'>
                            <div className='link-tag'>
                                <Link>Explore Collectives</Link>              
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Sidebar
