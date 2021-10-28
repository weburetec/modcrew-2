import react from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import 'antd/dist/antd.css'; 

import home from "./components/home.js";
import productPage from "./components/productPage.js";
import about from "./components/about.js";
import login from "./components/login.js";
import signup from "./components/signup.js";
import forgotPassword from "./components/forgotPassword.js";
import contact from "./components/contact.js";
import cart from "./components/cart.js";
import profile from "./components/profile.js";
import orderSummary from "./components/orderSummary.js";
import adminPanel from "./components/adminPanel.js";

import topSellingCarousel from "./components/topSellingCarousel.js";
import VerticalCarousel from "./components/verticalCarousel.js";

function App() {
  return (
    <div>
      <Router> 
        <Switch>
        
          <Route exact path="/" component={home} />
          <Route path="/productPage/:productId" component={productPage} />
          <Route path="/about" component={about} />
          <Route path="/login" component={login} />
          <Route path="/signup" component={signup} />
          <Route path="/forgotPassword" component={forgotPassword} />
          <Route path="/contact" component={contact} />
          <Route path="/cart" component={cart} />
          <Route path="/profile" component={profile} />
          <Route path="/orderSummary" component={orderSummary} />
          <Route path="/admin" component={adminPanel} />

          <Route path="/topSellingCarousel" component={topSellingCarousel} />
          <Route path="/verticalCarousel" component={VerticalCarousel} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
