import react from "react";
import styles from "../stylesheets/topSellingCarousel.css";

function TopSellingCarousel() {
  

  return (
    <div>
      <div id="jquery-script-menu">
        <div class="jquery-script-center">
          <ul>
            <li>
              <a href="http://www.jqueryscript.net/angular-tree-dropdown-directive/">
                Download This Plugin
              </a>
            </li>
            <li>
              <a href="http://www.jqueryscript.net/">
                Back To jQueryScript.Net
              </a>
            </li>
          </ul>
          <div class="jquery-script-ads"></div>
          <div class="jquery-script-clear"></div>
        </div>
      </div>
      <div class="container">
        <h1>jQuery Multislider Demos</h1>
        <h2>Basic</h2>
        <div id="basicSlider">
          <div class="MS-content">
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
            <div class="item">
              {" "}
              <a href="http://www.google.com" target="_blank">
                {" "}
                <img src="http://placehold.it/125x26" alt="" />{" "}
              </a>{" "}
            </div>
          </div>
        </div>
        <h2>Mixed Content</h2>
        <div id="mixedSlider">
          <div class="MS-content">
            <div class="item">
              <div class="imgTitle">
                <h2 class="blogTitle">Animals</h2>
                <img src="https://placeimg.com/500/300/animals" alt="" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ac tellus ex. Integer eu fringilla nisi. Donec id
                dapibus mauris, eget dignissim turpis ...
              </p>
              <a href="#">Read More</a>
            </div>
            <div class="item">
              <div class="imgTitle">
                <h2 class="blogTitle">Arch</h2>
                <img src="https://placeimg.com/500/300/arch" alt="" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ac tellus ex. Integer eu fringilla nisi. Donec id
                dapibus mauris, eget dignissim turpis ...
              </p>
              <a href="#">Read More</a>
            </div>
            <div class="item">
              <div class="imgTitle">
                <h2 class="blogTitle">Nature</h2>
                <img src="https://placeimg.com/500/300/nature" alt="" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ac tellus ex. Integer eu fringilla nisi. Donec id
                dapibus mauris, eget dignissim turpis ...
              </p>
              <a href="#">Read More</a>
            </div>
            <div class="item">
              <div class="imgTitle">
                <h2 class="blogTitle">People</h2>
                <img src="https://placeimg.com/500/300/people" alt="" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ac tellus ex. Integer eu fringilla nisi. Donec id
                dapibus mauris, eget dignissim turpis ...
              </p>
              <a href="#">Read More</a>
            </div>
            <div class="item">
              <div class="imgTitle">
                <h2 class="blogTitle">Tech</h2>
                <img src="https://placeimg.com/500/300/tech" alt="" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum ac tellus ex. Integer eu fringilla nisi. Donec id
                dapibus mauris, eget dignissim turpis ...
              </p>
              <a href="#">Read More</a>
            </div>
          </div>
          <div class="MS-controls">
            <button class="MS-left">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </button>
            <button class="MS-right">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSellingCarousel;
