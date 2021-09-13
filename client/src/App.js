import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Gallery from "./pages/gallery/Gallery";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
