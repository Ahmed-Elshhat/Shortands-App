// Import All Element
let admin = document.querySelector(".admin");
let user = document.querySelector(".user");
let btn_admin = document.querySelector(".btn-admin");
let btn_user = document.querySelector(".btn-user");
let inp_sh = document.querySelector(".inp-sh");
let inp_shv = document.querySelector(".inp-shv");
let btn_add = document.querySelector(".btn-add");
let clear = document.querySelector(".clear");
let inp_tvsh = document.querySelector(".inp-tvsh");
let valid = document.getElementById("valid");
let not_valid = document.getElementById("not_valid");
let btn_go = document.querySelector(".btn-go");
let btn_check_m = document.querySelector(".btn-check-m");
let tbody = document.querySelector("tbody");
let the_shorthand_h2 = document.querySelector(".shorthand-h2");

// The Mode App
btn_admin.addEventListener("click", () => {
  user.style.display = "none";
  admin.style.display = "block";
  clear.style.display = "block";
});

btn_user.addEventListener("click", () => {
  user.style.display = "block";
  admin.style.display = "none";
  clear.style.display = "none";
});

//                                        Admin                                        //
// Handel Inputs
inp_sh.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    inp_shv.focus();
  }
});

inp_shv.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    Add();
    inp_sh.focus();
  }
});

// Get The Shorthands From Input and add in localStorage
let theShorthands;
if (localStorage.theShorthands != null) {
  theShorthands = JSON.parse(localStorage.theShorthands);
  showData();
} else {
  theShorthands = [];
}

// Mode The Add button
let Mode = "add";
let index;

btn_add.addEventListener("click", () => {
  if (Mode === "add") {
    Add();
  } else if (Mode === "update") {
    update();
  }
});

// Add
function Add() {
  if (inp_sh.value !== "" && inp_shv.value !== "") {
    let theShorthand = {
      inp_sh: inp_sh.value.toUpperCase(),
      inp_shv: inp_shv.value,
    };

    let fiend = theShorthands.filter((e, i) => {
      return e.inp_sh.includes(theShorthand.inp_sh);
    });

    if (fiend[0] === undefined) {
      theShorthands.push(theShorthand);
    }
    localStorage.setItem("theShorthands", JSON.stringify(theShorthands));
    showData();
    inp_sh.value = "";
    inp_shv.value = "";
    inp_sh.classList.remove("error");
    inp_shv.classList.remove("error");
  } else {
    inp_sh.classList.add("error");
    inp_shv.classList.add("error");
  }
}

// Update Element
function updateElement(i) {
  window.scrollTo({
    behavior: "smooth",
    top: 0,
  });
  Mode = "update";
  btn_add.innerHTML = `update`;
  inp_sh.value = theShorthands[i].inp_sh;
  inp_shv.value = theShorthands[i].inp_shv;
  index = i;
}

function update() {
  if (inp_sh.value !== "" && inp_shv.value !== "") {
    theShorthands[index].inp_sh = inp_sh.value;
    theShorthands[index].inp_shv = inp_shv.value;
    btn_add.innerHTML = `Add`;
    Mode = "add";
    inp_sh.value = "";
    inp_shv.value = "";
    localStorage.setItem("theShorthands", JSON.stringify(theShorthands));
    showData();
    inp_sh.classList.remove("error");
    inp_shv.classList.remove("error");
  } else {
    inp_sh.classList.add("error");
    inp_shv.classList.add("error");
  }
}

// Show Data
function showData() {
  tbody.innerHTML = "";
  if (localStorage.theShorthands != null) {
    theShorthands.map((e, i) => {
      tbody.innerHTML += `
      <tr>
        <td>#${i + 1}</td>
        <td>${e.inp_sh}</td>
        <td>${e.inp_shv}</td>
        <td><button onclick="deleteElement(${i})">Delete</button></td>
        <td><button onclick="updateElement(${i})">Update</button></td>
      </tr>
      `;
    });
  } else {
    tbody.innerHTML = "";
  }
}

// Delete Element
function deleteElement(i) {
  theShorthands.splice(i, 1);
  localStorage.setItem("theShorthands", JSON.stringify(theShorthands));
  showData();
}

// Clear Data
clear.addEventListener("click", () => {
  localStorage.clear();
  showData();
});

//                                        User                                        //
// Function GO Random
let theDoneElements = [];
let randoms = 0;
let repeat = false;

btn_go.addEventListener("click", GO);

function GO() {
  randomFunction();
  filterElements();
  inp_tvsh.value = "";
  valid.style.display = "none";
  not_valid.style.display = "none";
}

function randomFunction() {
  if (theDoneElements.length < theShorthands.length) {
    randoms = Math.floor(Math.random() * theShorthands.length);
    if (repeat) {
      filterElements();
    }
  }
}

function filterElements() {
  if (theDoneElements.indexOf(randoms) === -1) {
    theDoneElements.push(randoms);
    repeat = false;
  } else {
    repeat = true;
    randomFunction();
  }

  if (theDoneElements.length === theShorthands.length) {
    theDoneElements = [];
  }

  the_shorthand_h2.innerHTML = `${theShorthands[randoms].inp_sh}`;
}

// Check
let counters = 0;

btn_check_m.addEventListener("click", Check);

// Handel Inputs
inp_tvsh.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (inp_tvsh.value !== "") {
      if (the_shorthand_h2.innerHTML === "Go") {
        GO();
      } else {
        if (
          theShorthands[randoms].inp_shv.toUpperCase() ===
          inp_tvsh.value.toUpperCase()
        ) {
          valid.style.display = "block";
          not_valid.style.display = "none";
          counters += 1;
        } else {
          valid.style.display = "none";
          not_valid.style.display = "block";
          counters -= 1;
        }

        if (counters === 2) {
          GO();
          counters = 0;
        } else if (counters < 0) {
          counters = 0;
        }
      }
      inp_tvsh.classList.remove("error");
    } else {
      inp_tvsh.classList.add("error");
    }
  }
});

function Check() {
  if (inp_tvsh.value !== "") {
    if (
      theShorthands[randoms].inp_shv.toUpperCase() ===
      inp_tvsh.value.toUpperCase()
    ) {
      valid.style.display = "block";
      not_valid.style.display = "none";
    } else {
      valid.style.display = "none";
      not_valid.style.display = "block";
    }
    inp_tvsh.classList.remove("error");
  } else {
    inp_tvsh.classList.add("error");
  }
}
