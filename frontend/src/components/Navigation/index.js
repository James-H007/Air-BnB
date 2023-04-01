// frontend/src/components/Navigation/index.js
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);
//     const dispatch = useDispatch();

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <li>
//                 <ProfileButton user={sessionUser} />
//                 <button onClick={logout}>Log Out</button>
//             </li>
//         );
//     } else {
//         sessionLinks = (
//             <li>
//                 <NavLink to="/login">Log In</NavLink>
//                 <NavLink to="/signup">Sign Up</NavLink>
//             </li>
//         );
//     }

//     return (
//         <ul>
//             <li>
//                 <NavLink exact to="/">Home</NavLink>
//             </li>
//             {isLoaded && sessionLinks}
//         </ul>
//     );
// }

// export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li className='session-link'>
                <ProfileButton user={sessionUser} />
            </li>
        );
    } else {
        sessionLinks = (
            <li className='no-session-link'>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        );
    }

    return (
        <>
            <ul className="navBar">
                <li className='home-link'>
                    {/* <NavLink exact to="/">Home</NavLink> */}
                    <NavLink exact to="/"><img className='logo' src={logo} alt="logo" /></NavLink>
                </li>
                {isLoaded && sessionLinks}
            </ul>
        </>
    );
}

export default Navigation;


//============= Newer Modal introduction (has problems)
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);

//     return (
//         <ul>
//             <li>
//                 <NavLink exact to="/">Home</NavLink>
//             </li>
//             {isLoaded && (
//                 <li>
//                     <ProfileButton user={sessionUser} />
//                 </li>
//             )}
//         </ul>
//     );
// }

// export default Navigation;
