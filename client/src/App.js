import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import Footer from "./components/Footer";
import Payment from "./pages/Payment/Payment";
import Wishlist from "./pages/Wishlist/Wishlist";
// import SearchBar from "./components/SearchBar"
import Address from "./components/Address/Address";
// import Success from "./pages/Success/Success";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/Search" element={<SearchBar />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/wishlist" element={<Wishlist />} />
              {/* <Route path="/orders" element={<OrderHistory />} /> */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/address" element={<Address />} />
              {/* <Route path="/success" element={<Success />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
