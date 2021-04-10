import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";

const App = () => {
  const routes = (
    <Router>
      <Route path="/">
        <Home />
      </Route>
    </Router>
  );

  return routes;
};

export default App;
