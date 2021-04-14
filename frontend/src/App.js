import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const routes = (
    <Router>
      <Navbar />
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
    </Router>
  );

  return routes;
};

export default App;
