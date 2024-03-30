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
                        

                        
                        <div className='sidebar-option'>
                            <div className='link-tag'>
                                <Link to='https://www.codechef.com/' target='_blank' className='link'> 
                                <img src='../../codechef.png' className='icon' />
                                <span>CodeChef</span>
                                </Link>
                            </div>
                        </div>



                        <div className='sidebar-option'>
                            <div className='link-tag'>
                                <Link to='https://leetcode.com/' target='_blank' className='link'> 
                                <img src='../../leetcode.png' className='icon' />
                                <span>LeetCode</span>
                                </Link>
                            </div>
                        </div>

                        <div className='sidebar-option'>
                            <div className='link-tag'>
                                <Link to='https://www.hackerrank.com/' target='_blank' className='link'> 
                                <img src='../../hackerrank.png' className='icon' />
                                <span>HackerRank</span>
                                </Link>
                            </div>
                        </div>

                        <div className='sidebar-option'>
                            <div className='link-tag'>
                                <Link to='https://codeforces.com/' target='_blank' className='link'> 
                                <img src='../../codeforces.png' className='icon' />
                                <span>Codeforces</span>
                                </Link>
                            </div>
                        </div>

                        <div className='sidebar-option'>
                            <div className='link-tag'>
                                <Link to='https://www.topcoder.com/' target='_blank' className='link'> 
                                <img src='../../topcoders.png' className='icon' />
                                <span>TopCoder</span>
                                </Link>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

        </div>
    )
}

export default Sidebar
