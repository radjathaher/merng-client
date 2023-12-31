import React from 'react';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloProvider
    } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';   

const httpLink = createHttpLink({
    uri: 'https://merng-server-sigma.vercel.app/'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const MyApolloProvider = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default MyApolloProvider;
