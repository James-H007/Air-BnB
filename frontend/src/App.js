import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots"
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots";
import SpotDetails from "./components/SpotDetails";
import './app.css'

// function App() {
//   return (
//     <Switch>
//       <Route path="/login">
//         <LoginFormPage />
//       </Route>
//     </Switch>
//   );
// }

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return isLoaded && (
//     <>
//       <div>Hello from App</div>
//       <Switch>
//         <Route path="/login">
//           <LoginFormPage />
//         </Route>
//       </Switch>
//     </>
//   );
// }

// export default App;

//This isLoaded is a problem

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return isLoaded && (
//     <>
//       <div>LaLaLa</div>
//       <Switch>
//         <Route path="/login">
//           <LoginFormPage />
//         </Route>
//         <Route path="/signup">
//           <SignupFormPage />
//         </Route>
//       </Switch>
//     </>
//   );
// }

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    setIsLoaded(true)
  }, [dispatch])

  return (
    <>
      <div className="website">
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/">
              <SpotList />
            </Route>
            <Route path="/spots/:id">
              <SpotDetails />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
// import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && (
//         <Switch>
//           <Route path="/login">
//             <LoginFormPage />
//           </Route>
//           <Route path="/signup">
//             <SignupFormPage />
//           </Route>
//         </Switch>
//       )}
//     </>
//   );
// }

export default App;
