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
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <>
//             <button onClick={openMenu}>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className={ulClassName} ref={ulRef}>
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


// frontend/src/components/Navigation/ProfileButton.js
// frontend/src/components/Navigation/ProfileButton.js
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <>
//             <button onClick={openMenu}>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className={ulClassName} ref={ulRef}>
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


//========Old Rendition 4/1/2023, still works properly though
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import './ProfileButton.css'

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <>
//             <button onClick={openMenu}>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className={ulClassName} ref={ulRef}>
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


//===========Use Modal ProfileButton ================ Step 1
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import './ProfileButton.css'

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <>
//             <button onClick={openMenu}>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className={ulClassName} ref={ulRef}>
//                 {user ? (
//                     <>
//                         <li>{user.username}</li>
//                         <li>{user.firstName} {user.lastName}</li>
//                         <li>{user.email}</li>
//                         <li>
//                             <button onClick={logout}>Log Out</button>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li>
//                             <OpenModalButton
//                                 buttonText="Log In"
//                                 modalComponent={<LoginFormModal />}
//                             />
//                         </li>
//                         <li>
//                             <OpenModalButton
//                                 buttonText="Sign Up"
//                                 modalComponent={<SignupFormModal />}
//                             />
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </>
//     );
// }

// export default ProfileButton;

//OPTIONAL: CloseDropDown Menu when login or signup modals open/logout Step 2 =======================
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import './ProfileButton.css'

// function ProfileButton({ user }) {
//     const dispatch = useDispatch();
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const closeMenu = () => setShowMenu(false);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//         closeMenu();
//     };

//     const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//     return (
//         <>
//             <button onClick={openMenu}>
//                 <i className="fas fa-user-circle" />
//             </button>
//             <ul className={ulClassName} ref={ulRef}>
//                 {user ? (
//                     <>
//                         <li>{user.username}</li>
//                         <li>{user.firstName} {user.lastName}</li>
//                         <li>{user.email}</li>
//                         <li>
//                             <button onClick={logout}>Log Out</button>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li>
//                             <OpenModalButton
//                                 buttonText="Log In"
//                                 onButtonClick={closeMenu}
//                                 modalComponent={<LoginFormModal />}
//                             />
//                         </li>
//                         <li>
//                             <OpenModalButton
//                                 buttonText="Sign Up"
//                                 onButtonClick={closeMenu}
//                                 modalComponent={<SignupFormModal />}
//                             />
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </>
//     );
// }

// export default ProfileButton;


//OPTIONAL: OpenModalMenuItem =====================
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { fetchSpots } from "../../store/spots";


import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const [hasSpot, setHasSpot] = useState(false)
    const ulRef = useRef(); //Referes
    const spots = useSelector(state => state.spot.spots)

    // console.log(spots)
    // console.log(user)


    const checkSpot = () => {

        if (spots && user) {
            const spotOwners = spots.map(spots => spots.ownerId)
            if (spotOwners.includes(user.id)) {

                setHasSpot(true)

            }
            else {
                setHasSpot(false)
            }
        }

    }


    useEffect(() => {
        dispatch(fetchSpots())

    }, [dispatch])

    useEffect(() => {
        checkSpot()
    }, [user, spots])


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

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>

            <button onClick={openMenu} className="profile-button">
                <i className="fas fa-id-card" />
            </button>

            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li className="user-info">Hello {user.firstName}</li>
                        {/* <li className="user-info">Hello {user.firstName} {user.lastName}</li> */}
                        <li className="user-info">{user.email}</li>
                        {hasSpot && <NavLink to="/spots/manage"><li className="user-create"> Manage Spots</li></NavLink>}
                        {!hasSpot && <NavLink to="/spots/create"><li className="user-create">Create a New Spot</li></NavLink>}
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
