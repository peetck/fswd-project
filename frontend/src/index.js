import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloLink, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "@apollo/client/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { UserContextProvider } from "./contexts/UserContext";

const defaultOptions = {
  query: {
    fetchPolicy: "network-only",
  },
  watchQuery: {
    fetchPolicy: "network-only",
  },
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
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
      uri: process.env.REACT_APP_BACKEND_URL,
    }),
  ]),
  defaultOptions: defaultOptions,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserContextProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover={false}
          draggable={false}
          style={{
            marginTop: "50px",
          }}
        />
      </UserContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
