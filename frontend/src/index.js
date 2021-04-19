import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloLink, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "@apollo/client/react";

import { UserContextProvider } from "./contexts/UserContext";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  link: from([
    new ApolloLink((op, fw) => {
      const customHeaders = op.getContext().hasOwnProperty("headers")
        ? op.getContext().headers
        : {};
      op.setContext({ headers: { ...customHeaders } });
      return fw(op);
    }),
    createUploadLink({
      uri: "http://localhost:3001/graphql",
    }),
  ]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
