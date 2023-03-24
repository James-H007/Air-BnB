// import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     const ulClassName = "profile-dropdown";

//     return (
//         <>
//             <button>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className="profile-dropdown">
//                 <li>{user.username}</li>
//                 <li>{user.firstName} {user.lastName}</li>
//                 <li>{user.email}</li>
//                 <li>
//                     <button onClick={logout}>Log Out</button>
//                 </li>
//             </ul>
//         </>
//     );
// }

// export default ProfileButton;

// import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <>
//             <button onClick={() => setShowMenu(!showMenu)}>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className={ulClassName}>
//                 <li>{user.username}</li>
//                 <li>{user.firstName} {user.lastName}</li>
//                 <li>{user.email}</li>
//                 <li>
//                     <button onClick={logout}>Log Out</button>
//                 </li>
//             </ul>
//         </>
//     );
// }

// export default ProfileButton;

// import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { useEffect } from "react";
// import * as sessionActions from '../../store/session';

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     useEffect(() => {
//         const closeMenu = (e) => {
//             setShowMenu(false);
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, []);

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             setShowMenu(false);
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <>
//             <button onClick={openMenu}>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className={ulClassName}>
//                 <li>{user.username}</li>
//                 <li>{user.firstName} {user.lastName}</li>
//                 <li>{user.email}</li>
//                 <li>
//                     <button onClick={logout}>Log Out</button>
//                 </li>
//             </ul>
//         </>
//     );
// }

// export default ProfileButton;
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </>
    );
}

export default ProfileButton;
