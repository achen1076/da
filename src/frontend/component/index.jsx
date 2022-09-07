import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

var currSlide = 1;

export function nextSlide() {
  const a = "slide" + currSlide;
  const c = "dot" + currSlide;

  if (currSlide >= 5) {
    currSlide = 0;
    var b = "slide" + (currSlide + 1);
    var d = "dot" + (currSlide + 1);
  } else {
    var b = "slide" + (currSlide + 1);
    var d = "dot" + (currSlide + 1);
  }
  document.getElementById(a).style.display = "none";
  document.getElementById(b).style.display = "block";
  document.getElementById(c).style.backgroundColor = "black";
  document.getElementById(d).style.backgroundColor = "#717171";
  currSlide += 1;
}

export function lastSlide() {
  const a = "slide" + currSlide;
  const c = "dot" + currSlide;

  if (currSlide <= 1) {
    currSlide = 6;
    var b = "slide" + (currSlide - 1);
    var d = "dot" + (currSlide - 1);
  } else {
    var b = "slide" + (currSlide - 1);
    var d = "dot" + (currSlide - 1);
  }
  document.getElementById(a).style.display = "none";
  document.getElementById(b).style.display = "block";
  document.getElementById(c).style.backgroundColor = "black";
  document.getElementById(d).style.backgroundColor = "#717171";
  currSlide -= 1;
}

export function changeSlide(n) {
  const a = "slide" + currSlide;
  const b = "slide" + n;
  const c = "dot" + currSlide;
  const d = "dot" + n;

  document.getElementById(a).style.display = "none";
  document.getElementById(b).style.display = "block";
  document.getElementById(c).style.backgroundColor = "black";
  document.getElementById(d).style.backgroundColor = "#717171";

  currSlide = n;
}

function timedSwitch() {}

export function IndexTitleContainer() {
  let navigate = useNavigate();

  const switchTab = (newTab) => {
    navigate(newTab);
  };

  return (
    <React.Fragment>
      <h1 class="company-name company-name-header">Bajamas</h1>
      <h3 class="sub-header-text">
        Connecting People Around the World
      </h3>
      <button
        type="button"
        class="button find-button"
        onClick={() => switchTab("/find")}
      >
        Find a Profile
      </button>
      <button
        type="button"
        class="button more-info-button"
        onClick={() => switchTab("/create")}
      >
        Create Your Profile
      </button>
    </React.Fragment>
  );
}

export class IndexBarContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     apple: true,
  //   };
  //   this.test = this.test.bind(this);
  // }

  render() {
    return (
      <React.Fragment>
        <div
          class="slideshow-container"
          onMouseOver={timedSwitch}
          onLoad={() => changeSlide(1)}
        >
          <div id="slide1" class="mySlides slide1 fade">
            <div class="numbertext">1 / 5</div>
            <img className="slide-img" src={"./media_public/slide1.png"} />
            <div class="text"></div>
          </div>
          <div id="slide2" class="mySlides slide2 fade">
            <div class="numbertext">2 / 5</div>
            <img className="slide-img" src={"./media_public/slide2.png"} />
            <div class="text"></div>
          </div>
          <div id="slide3" class="mySlides slide3 fade">
            <div class="numbertext">3 / 5</div>
            <img className="slide-img" src={"./media_public/slide3.png"} />
            <div class="text"></div>
          </div>
          <div id="slide4" class="mySlides slide3 fade">
            <div class="numbertext">4 / 5</div>
            <img className="slide-img" src={"./media_public/slide4.png"} />
            <div class="text"></div>
          </div>
          <div id="slide5" class="mySlides slide3 fade">
            <div class="numbertext">5 / 5</div>
            <img className="slide-img" src={"./media_public/slide5.png"} />
            <div class="text"></div>
          </div>
          <a class="prev" onClick={lastSlide}>
            &#10094;
          </a>
          <a class="next" onClick={nextSlide}>
            &#10095;
          </a>
        </div>
        <br />
        <div class="dots">
          <span
            id="dot1"
            class="dot dot1"
            onClick={() => changeSlide(1)}
          ></span>
          <span id="dot2" class="dot" onClick={() => changeSlide(2)}></span>
          <span id="dot3" class="dot" onClick={() => changeSlide(3)}></span>
          <span id="dot4" class="dot" onClick={() => changeSlide(4)}></span>
          <span id="dot5" class="dot" onClick={() => changeSlide(5)}></span>
        </div>
      </React.Fragment>
    );
  }
}

export class IndexDataContainter extends Component {
  state = {};
  render() {
    return (
      <section className="index-data-container">
        <div>
          <h1>Did You Know?</h1>
        </div>
      </section>
    );
  }
}
