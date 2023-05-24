import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
// import './App.css';
import Signup, {SignupProps} from './components/Signup';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import How from './pages/How';
import Home, {HomeProps} from './pages/Home';
import Start from './pages/Start';
import Login from './components/Login';


// GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
const signupProps: SignupProps = {
  username: '',
  email: '',
  password: ''
}

const homeProps: HomeProps ={
  handleSubmit: (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
}
}

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navbar />
          <div className="container">
            {/* Wrap Route elements in a Routes component */}
            <Routes>
              {/* Define routes using the Route component to render different page components at different paths */}
              {/* Path to show the Landing Start Page */}
              <Route 
                path="/" 
                element={<Start />} 
              />
              {/* Path to the MASH Game */}
              <Route 
                path="/home" 
                element={<Home {...homeProps} />} 
              />
              {/* Path to How to Play Game */}
              <Route 
                path="/how" 
                element={<How />} 
              />
              <Route path='/login'
              element={<Login />} />
              {/* Path to Signup */}
              <Route 
                path="/signup" 
                element={<Signup {...signupProps} />} 
              />
              {/*Path to Profile for Logged In User */}
              <Route 
                path="/profiles/:profileId" 
                element={<Profile />} 
              />
              <Route path="*" element={<h2> Page Cannot Be Found </h2>} />
            </Routes>
          </div>

        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;
