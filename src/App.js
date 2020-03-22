import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import NavBar from "./components/NavBar/NavBar";
import Table from "./components/Table/Table";
import Country from "./components/Table/Country/Country";
import Form from "./containers/Form";


import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: `https://countries.trevorblades.com/`
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container maxWidth="md">
        <Router>
          <NavBar />
          <Route exact path="/" component={Table} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/country/:countryCode" component={Country} />
        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
