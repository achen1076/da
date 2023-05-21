import React, { Component } from "react";
import data from "../data/data.json";
import teams from "../data/teams.json";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, provider, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

//Create Account Page

export function CreateHeader() {
  return (
    <section className="section create-header-section">
      <div className="create-header-container">
        <h3 className="create-header-text">Create Your Account</h3>
        <div className="line"></div>
      </div>
    </section>
  );
}

export function CreateBody() {
  let navigate = useNavigate();
  var currentPageNumber = 1;
  var teamCount = 1;
  var playerCount = 1;

  const validateInformation = () => {
    let valid = true;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const day = document.getElementById("day").value;
    const phone = document.getElementById("phone-number").value;

    if (
      firstName == "" ||
      lastName == "" ||
      month == "" ||
      day == "" ||
      year == "" ||
      phone == ""
    ) {
      valid = false;
    }

    if (phone.length != 10) {
      valid = false;
    }

    for (let index in phone) {
      const number = phone[index];
      if (number >= "0" && number <= "9") {
      } else {
        valid = false;
      }
    }
    console.log(valid);
    return valid;
  };

  const createAccount = () => {
    let valid = false;
    const auth = getAuth();
    const accountError = document.getElementById("accountError");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const name = firstName + " " + lastName;
    const dob =
      document.getElementById("month").value +
      "/" +
      document.getElementById("day").value +
      "/" +
      document.getElementById("year").value;

    const phone = document.getElementById("phone-number").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        user.displayName = name;
        user.email = email;
        localStorage.setItem("IsAuth", true);
        const dataId = auth.currentUser.uid;
        const docRef = doc(db, dataId, "user");
        setDoc(docRef, {
          name: name,
          email: email,
          phone: phone,
          dob: dob,
        });
        accountError.innerHTML = "";
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          accountError.innerHTML =
            "Password too weak, please enter atleast 6 characters";
        } else if (errorCode == "auth/email-already-in-use") {
          accountError.innerHTML = "Email already in use";
        } else if (errorCode == "auth/invalid-email") {
          accountError.innerHTML = "Invalid email";
        }
      });
  };

  const nextPage = () => {
    const infoError = document.getElementById("infoError");

    if (validateInformation()) {
      infoError.style.display = "none";
      infoError.innerHTML = "";
      let currPage = "profileCreateContainer" + currentPageNumber;
      let nextPage = "profileCreateContainer" + (currentPageNumber + 1);
      document.getElementById(nextPage).style.display = "grid";
      document.getElementById(currPage).style.display = "none";
      currentPageNumber += 1;
    } else {
      infoError.style.display = "flex";
      infoError.innerHTML = "Please fix missing or incorrect entries";
    }
  };

  const prevPage = () => {
    let currPage = "profileCreateContainer" + currentPageNumber;
    let lastPage = "profileCreateContainer" + (currentPageNumber - 1);
    document.getElementById(lastPage).style.display = "grid";
    document.getElementById(currPage).style.display = "none";
    currentPageNumber -= 1;
  };

  const teamSplitByComma = () => {
    let team = document.getElementById("teams").value;

    if (team[team.length - 1] == ",") {
      let allowed = false;
      const element = team.slice(0, team.length - 1);
      if (teams.includes(element)) {
        allowed = true;
      }

      if (allowed) {
        let ul = document.getElementById("teamList");
        let li = document.createElement("li");
        team = team.trim();
        let teamLiClassName = "about-list-element";
        let currListElementClassName = "teamli" + teamCount;
        let teamListClassName =
          teamLiClassName + " " + currListElementClassName;

        let deleteteamButton = document.createElement("button");
        deleteteamButton.onclick = function () {
          document.getElementById(currListElementClassName).remove();
        };

        li.setAttribute("class", teamListClassName);
        li.setAttribute("id", currListElementClassName);
        deleteteamButton.setAttribute("class", "delete-item-button");
        let listInner = document.createElement("p");
        listInner.innerHTML = team.slice(0, team.length - 1);
        listInner.setAttribute("class", "list-inner-text");
        let teamListContainer = document.createElement("div");
        teamListContainer.setAttribute("class", "about-list-container");
        teamListContainer.appendChild(listInner);
        teamListContainer.appendChild(deleteteamButton);
        li.appendChild(teamListContainer);
        ul.appendChild(li);

        document.getElementById("teams").value = "";
        teamCount += 1;
      }
    }
  };

  const playerSplitByComma = () => {
    let player = document.getElementById("player").value;
    if (player[player.length - 1] == ",") {
      let allowed = false;
      const element = player.slice(0, player.length - 1).toLowerCase();
      for (let i = 0; i < data.length; ++i) {
        const name = data[i].Name.toLowerCase();
        if (name == element) {
          allowed = true;
          player = data[i].Name;
          break;
        }
      }

      if (allowed) {
        let ul = document.getElementById("playerList");
        let li = document.createElement("li");
        let playerLiClassName = "about-list-element";
        let currListElementClassName = "playerli" + playerCount;
        let playerListClassName =
          playerLiClassName + " " + currListElementClassName;

        let deleteplayerButton = document.createElement("button");
        deleteplayerButton.onclick = function () {
          document.getElementById(currListElementClassName).remove();
        };
        li.setAttribute("class", playerListClassName);
        li.setAttribute("id", currListElementClassName);
        deleteplayerButton.setAttribute("class", "delete-item-button");
        let listInner = document.createElement("p");
        listInner.innerHTML = player;
        listInner.setAttribute("class", "list-inner-text");
        let playerListContainer = document.createElement("div");
        playerListContainer.setAttribute("class", "about-list-container");
        playerListContainer.appendChild(listInner);
        playerListContainer.appendChild(deleteplayerButton);
        li.appendChild(playerListContainer);
        ul.appendChild(li);

        document.getElementById("player").value = "";
        playerCount += 1;
      }
    }
  };

  const confirmPassword = () => {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const error = document.getElementById("passwordError");

    error.style.display = "none";

    if (password != confirm && confirm != "") {
      error.style.display = "block";
    }
  };

  const clearTeamsField = () => {
    document.getElementById("teams").value = "";
  };

  const clearPlayerField = () => {
    document.getElementById("player").value = "";
  };

  return (
    <section className="section create-body-section">
      <div className="create-profile-container" id="profileCreateContainer1">
        <h1 className="basic-info-header">Basic Information</h1>
        <div className="field profile-input-box autocomplete-blocker">
          <label for="phone" className="ha-screen-reader">
            hi
          </label>
          <input
            id="phone"
            className="profile-user-input"
            placeholder="e.g. 123-456-7890"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">hi</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="first-name" className="ha-screen-reader">
            First name
          </label>
          <input
            id="first-name"
            className="profile-user-input"
            placeholder="e.g. Andrew"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">First name</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="last-name" className="ha-screen-reader">
            Last name
          </label>
          <input
            id="last-name"
            className="profile-user-input"
            placeholder="e.g. Chen"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Last name</span>
          </span>
        </div>
        <p className="dob-title">Date of Birth</p>

        <div className="field profile-input-box">
          <div className="month-input">
            <label for="month" className="ha-screen-reader">
              Month
            </label>
            <input
              id="month"
              className="profile-user-input"
              placeholder="e.g. 03"
              autoComplete="none"
            />
            <span className="profile-field-label" aria-hidden="true">
              <span className="profile-field-placeholder">Month</span>
            </span>
          </div>
          <div className="day-input">
            <label for="day" className="ha-screen-reader">
              Day
            </label>
            <input
              id="day"
              className="profile-user-input"
              placeholder="e.g. 12"
              autoComplete="none"
            />
            <span className="profile-field-label" aria-hidden="true">
              <span className="profile-field-placeholder">Day</span>
            </span>
          </div>
          <div className="year-input">
            <label for="year" className="ha-screen-reader">
              Year
            </label>
            <input
              id="year"
              className="profile-user-input"
              placeholder="e.g. 2003"
              autoComplete="none"
            />
            <span className="profile-field-label" aria-hidden="true">
              <span className="profile-field-placeholder">Year</span>
            </span>
          </div>
        </div>
        <div className="field profile-input-box">
          <label for="phone-number" className="ha-screen-reader">
            Phone number
          </label>
          <input
            id="phone-number"
            className="profile-user-input"
            placeholder="e.g. 1234567890"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Phone number</span>
          </span>
        </div>
        <p className="information-error" id="infoError"></p>
        <button
          className="button basic-info-continue-button"
          onClick={nextPage}
        >
          Continue
        </button>
      </div>
      <div className="create-profile-container-2" id="profileCreateContainer2">
        <h1 className="basic-info-header">Personalization</h1>
        <p className="create-profile-subtext">
          List your favorite teams and/or players!
        </p>
        <br />
        <div className="field profile-input-box">
          <label for="teams" className="ha-screen-reader">
            Teams
          </label>
          <input
            id="teams"
            className="profile-user-input"
            placeholder="List your teams seperated by commas (e.g San Francisco 49ers)"
            autoComplete="none"
            onKeyUp={teamSplitByComma}
            onBlur={clearTeamsField}
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Teams</span>
          </span>
        </div>
        <ul className="team-list" id="teamList" />
        <div className="field profile-input-box">
          <label for="player" className="ha-screen-reader">
            Players
          </label>
          <input
            id="player"
            className="profile-user-input"
            placeholder="List your player seperated by commas (e.g T.J. Hockenson)"
            autoComplete="none"
            onKeyUp={playerSplitByComma}
            onBlur={clearPlayerField}
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Players</span>
          </span>
        </div>
        <ul className="player-list" id="playerList" />

        <div className="create-profile-button-container">
          <button className="button profile-back-button" onClick={prevPage}>
            Back
          </button>
          <button className="button profile-continue-button" onClick={nextPage}>
            Continue
          </button>
        </div>
      </div>
      <div className="create-profile-container-3" id="profileCreateContainer3">
        <h1 className="basic-info-header">Email and Password</h1>
        <div className="field profile-input-box">
          <label for="email" className="ha-screen-reader">
            E-mail
          </label>
          <input
            id="email"
            className="profile-user-input"
            placeholder="e.g. andrewchen@gmail.com"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">E-mail</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="password" className="ha-screen-reader">
            Password
          </label>
          <input
            id="password"
            className="profile-user-input"
            placeholder=" "
            autoComplete="none"
            type="password"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Password</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="confirm" className="ha-screen-reader">
            Confirm Password
          </label>
          <input
            id="confirm"
            className="profile-user-input"
            placeholder=" "
            autoComplete="none"
            type="password"
            onKeyUp={confirmPassword}
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Confirm Password</span>
          </span>
        </div>
        <p className="password-error-message" id="passwordError">
          Passwords do not match
        </p>
        <p className="error-message" id="accountError"></p>
        <div className="create-profile-button-container">
          <button className="button profile-back-button" onClick={prevPage}>
            Back
          </button>
          <button
            className="button profile-done-button"
            onClick={createAccount}
          >
            Done
          </button>
        </div>
      </div>
    </section>
  );
}

// Form Blueprint

{
  /* <div className="create-profile-container-4" id="profileCreateContainer4">
  <h1 className="basic-info-header"></h1>
  <p className=""></p>
  <br />
  <div className="field profile-input-box">
    <label for="snap" className="ha-screen-reader">
      Snapchat
    </label>
    <input
      id="snap"
      className="profile-user-input"
      placeholder="Enter your Snapchat username..."
      autoComplete="none"
    />
    <span className="profile-field-label" aria-hidden="true">
      <span className="profile-field-placeholder">Snapchat</span>
    </span>
  </div>
  <div className="create-profile-button-container">
    <button className="button profile-back-button" onClick={prevPage}>
      Back
    </button>
    <button className="button profile-continue-button" onClick={nextPage}>
      Continue
    </button>
  </div>
</div>; */
}
