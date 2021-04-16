import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const App = () => {
  const routes = (
    <Router>
      <Navbar />
      <Route path="/" component={HomePage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
    </Router>
  );

  return routes;
};

export default App;
