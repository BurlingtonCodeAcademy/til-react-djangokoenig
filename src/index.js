import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FactList from './FactList'
import SingleFact from "./SingleFact.js";
import ShowFact from './ShowFact';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Link, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Router exact path="/" component={App} />
      </div>
      <div>
        <Route exact path="/facts" component={FactList} />
      </div>
      <div>
        <Route 
          exact 
          path="/singlefact/:_id?"
          render={({ match }) => {
            return <SingleFact id={match.params._id} />;
          }}
        />
      </div>
    </BrowserRouter>
  );
};

// const route = (currentPath) => {
//   const paths = {
//     '/': <App />,
//     '/path': <FactList />
//   }

//   return paths[currentPath];
// }
//CODE BELOW --- FOR REFERENCE
// let component;
// if (document.location.pathname === '/') {
//   component = <App />
// } else if (document.location.pathname === '/facts') {
//   component = <FactList />
// }

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();