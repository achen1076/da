import React, { Component } from "react";

export function CreateHeader() {
  return (
    <section className="section create-header-section">
      <div className="create-header-container">
        <h3 className="create-header-text">Create Your Profile</h3>
        <hr className="create-header-line"></hr>
      </div>
    </section>
  );
}

export function CreateBody() {
  var currentPageNumber = 1;
  var hobbyCount = 1;
  var interestCount = 1;
  var experienceCount = 1;

  const nextPage = () => {
    let currPage = "profileCreateContainer" + currentPageNumber;
    let nextPage = "profileCreateContainer" + (currentPageNumber + 1);
    document.getElementById(nextPage).style.display = "grid";
    document.getElementById(currPage).style.display = "none";
    currentPageNumber += 1;
  };

  const prevPage = () => {
    let currPage = "profileCreateContainer" + currentPageNumber;
    let lastPage = "profileCreateContainer" + (currentPageNumber - 1);
    document.getElementById(lastPage).style.display = "grid";
    document.getElementById(currPage).style.display = "none";
    currentPageNumber -= 1;
  };

  const hobbySplitByComma = () => {
    let hobby = document.getElementById("hobbies").value;
    let ul = document.getElementById("hobbyList");
    let li = document.createElement("li");

    if (hobby[hobby.length - 1] == ",") {
      hobby = hobby.trim();
      let hobbyLiClassName = "about-list-element";
      let currListElementClassName = "hbli" + hobbyCount;
      let hobbyListClassName =
        hobbyLiClassName + " " + currListElementClassName;

      let deleteHobbyButton = document.createElement("button");
      deleteHobbyButton.onclick = function () {
        document.getElementById(currListElementClassName).remove();
      };

      li.setAttribute("class", hobbyListClassName);
      li.setAttribute("id", currListElementClassName);
      deleteHobbyButton.setAttribute("class", "delete-item-button");
      let listInner = document.createElement("p");
      listInner.innerHTML = hobby.slice(0, hobby.length - 1);
      listInner.setAttribute("class", "list-inner-text");
      let hobbyListContainer = document.createElement("div");
      hobbyListContainer.setAttribute("class", "about-list-container");
      hobbyListContainer.appendChild(listInner);
      hobbyListContainer.appendChild(deleteHobbyButton);
      li.appendChild(hobbyListContainer);
      ul.appendChild(li);

      document.getElementById("hobbies").value = "";
      hobbyCount += 1;
    }
  };

  const interestSplitByComma = () => {
    let interest = document.getElementById("interest").value;
    let ul = document.getElementById("interestList");
    let li = document.createElement("li");

    if (interest[interest.length - 1] == ",") {
      interest = interest.trim();
      let interestLiClassName = "about-list-element";
      let currListElementClassName = "inli" + interestCount;
      let interestListClassName =
        interestLiClassName + " " + currListElementClassName;

      let deleteInterestButton = document.createElement("button");
      deleteInterestButton.onclick = function () {
        document.getElementById(currListElementClassName).remove();
      };
      li.setAttribute("class", interestListClassName);
      li.setAttribute("id", currListElementClassName);
      deleteInterestButton.setAttribute("class", "delete-item-button");
      let listInner = document.createElement("p");
      listInner.innerHTML = interest.slice(0, interest.length - 1);
      listInner.setAttribute("class", "list-inner-text");
      let interestListContainer = document.createElement("div");
      interestListContainer.setAttribute("class", "about-list-container");
      interestListContainer.appendChild(listInner);
      interestListContainer.appendChild(deleteInterestButton);
      li.appendChild(interestListContainer);
      ul.appendChild(li);

      document.getElementById("interest").value = "";
      interestCount += 1;
    }
  };

  const skillsSplitByComma = () => {
    let skills = document.getElementById("skills").value;
    let ul = document.getElementById("skillsList");
    let li = document.createElement("li");

    if (skills[skills.length - 1] == ",") {
      skills = skills.trim();
      let skillsLiClassName = "about-list-element";
      let currListElementClassName = "skli" + interestCount;
      let skillsListClassName =
        skillsLiClassName + " " + currListElementClassName;

      let deleteSkillButton = document.createElement("button");
      deleteSkillButton.onclick = function () {
        document.getElementById(currListElementClassName).remove();
      };
      li.setAttribute("class", skillsListClassName);
      li.setAttribute("id", currListElementClassName);
      deleteSkillButton.setAttribute("class", "delete-item-button");
      let listInner = document.createElement("p");
      listInner.innerHTML = skills.slice(0, skills.length - 1);
      listInner.setAttribute("class", "list-inner-text");
      let skillListContainer = document.createElement("div");
      skillListContainer.setAttribute("class", "about-list-container");
      skillListContainer.appendChild(listInner);
      skillListContainer.appendChild(deleteSkillButton);
      li.appendChild(skillListContainer);
      ul.appendChild(li);

      document.getElementById("skills").value = "";
      interestCount += 1;
    }
  };

  const clearEmptyField = (n) => {
    let inputIdName = "experience" + n;
    let currInput = document.getElementById(inputIdName).value;
    if (currInput == "") {
      document.getElementById("experienceTextbox" + n).remove();
      document.getElementById("experienceContainer" + n).remove();
      if (n == experienceCount) {
        document.getElementById("experienceTitle" + (n + 1)).remove();
      } else {
        document.getElementById("experienceTitle" + n).remove();
      }
    }
  };

  const createTextBox = (n) => {
    let section = document.getElementById("experienceSection");
    let newContainer = document.createElement("div");
    let textBox = document.createElement("textarea");

    newContainer.setAttribute("class", "experience-container");
    newContainer.setAttribute("id", "experienceContainer" + n);
    textBox.setAttribute("class", "experience-textbox");
    textBox.setAttribute("id", "experienceTextbox" + n);
    textBox.setAttribute("placeholder", "Description of experience...");
    textBox.setAttribute("rows", 10);
    newContainer.appendChild(textBox);
    section.appendChild(newContainer);

    experienceCount += 1;
  };

  const experienceList = (n) => {
    if (n == experienceCount) {
      createTextBox(n);
      n += 1;
      let section = document.getElementById("experienceSection");
      let newInputContainer = document.createElement("div");
      let label = document.createElement("label");
      let input = document.createElement("input");
      let profileLabelSpan = document.createElement("span");
      let profilePlaceholderSpan = document.createElement("span");
      newInputContainer.setAttribute("class", "field profile-input-box");
      newInputContainer.setAttribute("id", "experienceTitle" + n);
      label.setAttribute("for", "experience" + n);
      label.setAttribute("class", "ha-screen-reader");
      input.setAttribute("id", "experience" + n);
      input.setAttribute("class", "profile-user-input");
      input.setAttribute("placeholder", "List your experiences...");
      input.setAttribute("autoComplete", "none");
      input.onclick = function () {
        experienceList(n);
      };
      input.onblur = function () {
        clearEmptyField(n);
      };
      profileLabelSpan.setAttribute("class", "profile-field-label");
      profileLabelSpan.setAttribute("aria-hidden", "true");
      profilePlaceholderSpan.setAttribute("class", "profile-field-placeholder");
      profilePlaceholderSpan.innerHTML = "Experiences";

      profileLabelSpan.appendChild(profilePlaceholderSpan);
      newInputContainer.appendChild(label);
      newInputContainer.appendChild(input);
      newInputContainer.appendChild(profileLabelSpan);
      section.appendChild(newInputContainer);
    }
  };

  const clearHobbyField = () => {
    document.getElementById("hobbies").value = "";
  };

  const clearInterestField = () => {
    document.getElementById("interest").value = "";
  };

  const clearSkillsField = () => {
    document.getElementById("skills").value = "";
  };

  return (
    <section className="section create-body-section">
      <div className="create-profile-container" id="profileCreateContainer1">
        <h1 className="basic-info-header">Basic Information</h1>
        <br />
        <div className="field profile-input-box autocomplete-blocker">
          <label for="phone-number" className="ha-screen-reader">
            Phone number
          </label>
          <input
            id="phone-number"
            className="profile-user-input"
            placeholder="e.g. 123-456-7890"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Phone number</span>
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
          <label for="middle-name" className="ha-screen-reader">
            Middle name
          </label>
          <input
            id="Middle-name"
            className="profile-user-input"
            placeholder="e.g. Nathan (optional)"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Middle name</span>
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
            />
            <span className="profile-field-label" aria-hidden="true">
              <span className="profile-field-placeholder">Year</span>
            </span>
          </div>
        </div>
        <div className="field profile-input-box">
          <label for="country" className="ha-screen-reader">
            Country/Region
          </label>
          <input
            id="country"
            className="profile-user-input"
            placeholder="e.g. United States"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Country/Region</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="city" className="ha-screen-reader">
            City
          </label>
          <input
            id="city"
            className="profile-user-input"
            placeholder="e.g. Detroit"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">City</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="state" className="ha-screen-reader">
            State
          </label>
          <input
            id="state"
            className="profile-user-input"
            placeholder="e.g. Michigan"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">State/Province</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="zipcode" className="ha-screen-reader">
            ZIP Code
          </label>
          <input
            id="zipcode"
            className="profile-user-input"
            placeholder="e.g. 90210"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">ZIP Code</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="phone-number" className="ha-screen-reader">
            Phone number
          </label>
          <input
            id="phone-number"
            className="profile-user-input"
            placeholder="e.g. 123-456-7890"
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Phone number</span>
          </span>
        </div>
        <button
          className="button basic-info-continue-button"
          onClick={nextPage}
        >
          Continue
        </button>
      </div>
      {/* Social Media */}
      <div className="create-profile-container-2" id="profileCreateContainer2">
        <h1 className="basic-info-header">Social Media Info</h1>
        <p className="social-media-warning">
          If you do not have or do not want to display one of the social media
          platform information, just leave it blank.
        </p>
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
        <div className="field profile-input-box">
          <label for="instagram" className="ha-screen-reader">
            Instagram
          </label>
          <input
            id="instagram"
            className="profile-user-input"
            placeholder="Enter your Instagram username..."
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Instagram</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="twitter" className="ha-screen-reader">
            Twitter
          </label>
          <input
            id="twitter"
            className="profile-user-input"
            placeholder="Enter your Twitter username..."
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Twitter</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="fb" className="ha-screen-reader">
            Facebook
          </label>
          <input
            id="fb"
            className="profile-user-input"
            placeholder="Enter your Facebook username..."
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Facebook</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="linkedin" className="ha-screen-reader">
            LinkedIn
          </label>
          <input
            id="linkedin"
            className="profile-user-input"
            placeholder="Enter your LinkedIn username..."
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">LinkedIn</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="tiktok" className="ha-screen-reader">
            TikTok
          </label>
          <input
            id="tiktok"
            className="profile-user-input"
            placeholder="Enter your TikTok username..."
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">TikTok</span>
          </span>
        </div>
        <div className="field profile-input-box">
          <label for="discord" className="ha-screen-reader">
            Discord
          </label>
          <input
            id="discord"
            className="profile-user-input"
            placeholder="Enter your Discord username..."
            autoComplete="none"
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Discord</span>
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
      </div>
      <div className="create-profile-container-3" id="profileCreateContainer3">
        <h1 className="basic-info-header">Hobbies and Interests</h1>
        <p className="create-profile-subtext">
          A little bit about yourself to help others get to know you!
        </p>
        <br />
        <div className="field profile-input-box">
          <label for="hobbies" className="ha-screen-reader">
            Hobbies
          </label>
          <input
            id="hobbies"
            className="profile-user-input"
            placeholder="List your hobbies seperated by commas"
            autoComplete="none"
            onKeyUp={hobbySplitByComma}
            onBlur={clearHobbyField}
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Hobbies</span>
          </span>
        </div>
        <ul className="hobby-list" id="hobbyList" />
        <div className="field profile-input-box">
          <label for="interest" className="ha-screen-reader">
            Interests
          </label>
          <input
            id="interest"
            className="profile-user-input"
            placeholder="List your interests seperated by commas"
            autoComplete="none"
            onKeyUp={interestSplitByComma}
            onBlur={clearInterestField}
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Interests</span>
          </span>
        </div>
        <ul className="interest-list" id="interestList" />

        <div className="create-profile-button-container">
          <button className="button profile-back-button" onClick={prevPage}>
            Back
          </button>
          <button className="button profile-continue-button" onClick={nextPage}>
            Continue
          </button>
        </div>
      </div>
      <div className="create-profile-container-4" id="profileCreateContainer4">
        <h1 className="basic-info-header">Skills and Experience</h1>
        <p className=""></p>
        <br />
        <div className="field profile-input-box">
          <label for="skills" className="ha-screen-reader">
            Skills
          </label>
          <input
            id="skills"
            className="profile-user-input"
            placeholder="List your skills seperated by commas"
            autoComplete="none"
            onKeyUp={skillsSplitByComma}
            onBlur={clearSkillsField}
          />
          <span className="profile-field-label" aria-hidden="true">
            <span className="profile-field-placeholder">Skills</span>
          </span>
        </div>
        <ul className="skills-list" id="skillsList" />
        <div className="experience-section" id="experienceSection">
          <div className="field profile-input-box" id="experienceTitle1">
            <label for="experience1" className="ha-screen-reader">
              Experiences
            </label>
            <input
              id="experience1"
              className="profile-user-input"
              placeholder="List your experiences..."
              autoComplete="none"
              onClick={() => experienceList(1)}
              onBlur={() => clearEmptyField(1)}
            />
            <span className="profile-field-label" aria-hidden="true">
              <span className="profile-field-placeholder">Experiences</span>
            </span>
          </div>
        </div>
        <div className="create-profile-button-container">
          <button className="button profile-back-button" onClick={prevPage}>
            Back
          </button>
          <button className="button profile-continue-button" onClick={nextPage}>
            Continue
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
