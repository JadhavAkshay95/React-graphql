import logo from './logo.svg';
import './App.css';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

import CustomerList from './component/CustomerList';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  }),
  credentials: "same-origin"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CustomerList />
      </div>
    </ApolloProvider>
  );
}

export default App;
