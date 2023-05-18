import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
// import './App.css';
import Signup, {SignupProps} from './components/Signup';


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
  name: '',
  email: '',
  password: ''
}


  return (
    <ApolloProvider client={client}>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
      Hello MASH project 3 team!
      </p>
      <p className="text-gray-500 text-lg">
        Something should be shown here
      </p>
      <h1 className="text-3xl font-bold underline text-red-600">
      Simple React Typescript Tailwind Sample
    </h1>
    </div>
     <Signup {...signupProps}/>
    </ApolloProvider>
  );
}


export default App;
