import React, { Component } from "react";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import data from "../data/data.json";

export function SearchHeader() {
  return <section></section>;
}

export function Search() {
  var dataType = null;
  var optionCount = 0;
  var searchFocused = false;
  var dropdownFocused = false;

  const search = () => {
    const dataId = auth.currentUser.uid;
    const docRef = doc(db, dataId, "search");
    const data = {
      id: localStorage.getItem("id"),
    };
    setDoc(docRef, data);
    alert("done");
  };

  const setSearchFocus = () => {
    searchFocused = true;
    document.getElementById("user").style.border = "2px solid black";
    document.getElementById("dType").style.borderTop = "2px solid black";
    document.getElementById("dType").style.borderBottom = "2px solid black";
    document.getElementById("dType").style.borderRight = "2px solid black";

    displaySearchDropdown();
  };

  const setSearchBlur = () => {
    if (!dropdownFocused) {
      searchFocused = false;
      document.getElementById("user").style.border = "1px solid black";
      document.getElementById("dType").style.borderTop = "1px solid black";
      document.getElementById("dType").style.borderBottom = "1px solid black";
      document.getElementById("dType").style.borderRight = "1px solid black";

      displaySearchDropdown();
    }
  };

  const setDropdownFocus = () => {
    dropdownFocused = true;
  };

  const setDropdownBlur = () => {
    dropdownFocused = false;
  };

  const dropdown = () => {
    document.getElementById("dropdown-menu").style.display = "block";
  };

  const dropdownErase = () => {
    document.getElementById("dropdown-menu").style.display = "none";
  };

  const setDataType = (sport) => {
    let id = sport + "-data-type";

    dataType = document.getElementById(id).innerHTML;
    document.getElementById("dType").innerHTML = dataType;
    document.getElementById("dropdown-menu").style.display = "none";
  };

  const displaySearchDropdown = () => {
    let current_search = document.getElementById("user").value;
    const dropdown = document.getElementById("searchDropdown");
    const search_length = current_search.length;

    for (let iter = 0; iter < optionCount; ++iter) {
      const id = "option" + iter;
      const element = document.getElementById(id);
      element.remove();
    }

    optionCount = 0;

    if (searchFocused) {
      for (let i = 0; i < data.length; ++i) {
        const player = data[i].Name;
        const position = data[i].Position;
        const number = data[i].Number;
        const team = data[i].Team;
        const id = data[i].ID;

        if (
          current_search.toLowerCase() ==
            player.slice(0, search_length).toLowerCase() &&
          search_length > 0 &&
          current_search != player
        ) {
          let newOption = document.createElement("a");
          const optionId = "option" + optionCount;
          newOption.setAttribute("id", optionId);
          let text;
          if (number == "" && team == "") {
            text = player + ", " + position;
          } else if (number == "" && team != "") {
            text = player + ", " + position + " on " + team;
          } else {
            text = player + ", " + position + " on " + team + " " + number;
          }
          newOption.innerHTML = text;
          newOption.onclick = function () {
            document.getElementById("user").value = player;
            localStorage.setItem("id", id);
            dropdownFocused = false;
            displaySearchDropdown();
          };
          dropdown.appendChild(newOption);
          ++optionCount;
        }
      }
    }

    if (optionCount != 0) {
      dropdown.style.borderBottom = "2px solid black";
      dropdown.style.borderRight = "2px solid black";
      dropdown.style.borderLeft = "2px solid black";
    } else {
      dropdown.style.borderBottom = null;
      dropdown.style.borderRight = null;
      dropdown.style.borderLeft = null;
    }
  };

  return (
    <section class="section info-search-section">
      <div class="info-header-div">
        <h2 class="info-title">Search Stats</h2>
      </div>
      <div class="search-container">
        <div class="search-nav info-searchbar">
          <input
            class="info-searchbar-input"
            type="text"
            placeholder="Enter player/team..."
            id="user"
            autoComplete="off"
            onInput={displaySearchDropdown}
            onMouseEnter={setSearchFocus}
            onFocus={setSearchFocus}
            onBlur={setSearchBlur}
          />
          <div
            className="search-dropdown-options"
            id="searchDropdown"
            onMouseEnter={setDropdownFocus}
            onMouseLeave={setDropdownBlur}
          ></div>
        </div>
        <div
          class="search-nav data-type-dropdown"
          onMouseOver={dropdown}
          onMouseLeave={dropdownErase}
        >
          <button class="data-type-button" id="dType">
            Sport
          </button>
          <div class="data-type-dropdown-menu" id="dropdown-menu">
            <a id="nfl-data-type" onClick={() => setDataType("nfl")}>
              NFL
            </a>
            <a id="ncaaf-data-type" onClick={() => setDataType("ncaaf")}>
              NCAAF
            </a>
          </div>
        </div>
        <a href="data">
          <button type="button" class="button search-button" onClick={search}>
            Search
          </button>
        </a>
      </div>
    </section>
  );
}
