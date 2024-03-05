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
                        <Link to='/'>Home</Link>

                    </div>
                    <div className='sidebar-option'>
                        <Link to='/users'>Users</Link>
                    </div>

                    <div className='sidebar-option'>
                        <Link to='/blogs'>Blog</Link>
                    </div>

                    <div className='sidebar-option'>
                        <p>Platforms</p>
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
