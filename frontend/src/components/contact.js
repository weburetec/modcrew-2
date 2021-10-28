import react, { useState } from "react";
import styles from "../stylesheets/contact.css";

import Navbar from "./navbar.js";
import ThirdNavbar from "./ThirdNavbar.js";
import Admiration from "./admiration.js";
import Carousel from "./carousel.js";
import Footer from "./footer.js";

import offer from "../stylesheets/images/offer.jpg";
import coupon1 from "../stylesheets/images/coupon1.jpg";
import coupon2 from "../stylesheets/images/coupon2.jpg";

import mail from "../icons/mail.svg";
import call from "../icons/call.svg";
import location from "../icons/location.svg";
import { Row, Col } from "antd";

function Contact() {
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  return (
    <div>
      <Navbar />
      <ThirdNavbar />
      <h1 style={{ color: "red", marginLeft: "2%", marginTop: "4%" }}>
        Help Centre
      </h1>
      <hr className="rule" />
      <div className="row contact-us-div">
        <div className="col-xs-10 col-sm-6 contact-div">
          <div className="form-div">
            <h3 style={{ textAlign: "center" }}>Connect with us</h3>
            <form>
              <input
                onChange={(e) => {
                  setFName(e.target.value);
                }}
                className="contact-input-name"
                style={{ marginRight: "4%" }}
                type="text"
                placeholder="First Name"
              ></input>
              <input
                onChange={(e) => {
                  setSName(e.target.value);
                }}
                className="contact-input-name"
                type="text"
                placeholder="Last Name"
              ></input>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="contact-input"
                type="email"
                placeholder="E-mail Id"
              ></input>
              <input
                onChange={(e) => {
                  setReason(e.target.value);
                }}
                className="contact-input"
                type="text"
                placeholder="Reason"
              ></input>
              <textarea
                onChange={(e) => {
                  setAdditionalDetails(e.target.value);
                }}
                className="contact-input"
                type="text"
                placeholder="Additional Details"
                rows="5"
                cols="50"
              ></textarea>
              <br />
              <br />
              {/* onClick={(e)=>{onSubmitLoginForm(e)}} */}
              <button className="send-message" type="submit">
                Send Message{" "}
              </button>
            </form>
          </div>
        </div>
        <div className="col-xs-10 col-sm-6 how-can-we-help">
          <div>
            <h3>How can we help?</h3>
            <p>
              Please select the topic below related to your inquire. If you
              
              don’t find what you need, fill out our contact form.
            </p>
          </div>
          <div class="dropdown" style={{ marginTop: "5%" }}>
            <a
              style={{ width: "80%" }}
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Order
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown" style={{ marginTop: "5%" }}>
            <a
              style={{ width: "80%" }}
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Payment
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown" style={{ marginTop: "5%" }}>
            <a
              style={{ width: "80%" }}
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Offers
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown" style={{ marginTop: "5%" }}>
            <a
              style={{ width: "80%" }}
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Others
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "5%" }}>
        <div className="col-lg-4" style={{ textAlign: "center" }}>
          <img className="contact-us-icons" src={call} />
          <h6>
            +91 1234567890 (IN)
            <br />
            +1-3456789012 (USA)
          </h6>
        </div>
        <div className="col-lg-4" style={{ textAlign: "center" }}>
          <img className="contact-us-icons" src={location} />
          <h6>
            Bangalore, Karnataka,
            <br />
            INDIA
          </h6>
        </div>
        <div className="col-lg-4" style={{ textAlign: "center" }}>
          <img className="contact-us-icons" src={mail} />
          <h6>Connect@Modcrew.com</h6>
        </div>
      </div>
      <h2 className="top-selling" style={{ textAlign: "center" }}>
        Check us out on Social Media:
      </h2>
      <p style={{ textAlign: "center" }}>
        Official Company Instagram: @Modcrew <br />
        Official FaceBook Page: @Modcrew_FB
      </p>
      <hr />
      <Carousel id={2} img1={offer} img2={coupon1} img3={coupon2} />
      <Admiration />
      <Footer />
    </div>
  );
}

export default Contact;
