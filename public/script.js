Login = () => {
  let signUp = document.querySelector("#form");
  let logIn = document.querySelector(".login");
  signUp.classList.add("active");
  logIn.classList.remove("active");
};

signUp = () => {
  let signUp = document.querySelector("#form");
  let logIn = document.querySelector(".login");
  signUp.classList.remove("active");
  logIn.classList.add("active");
};

let URL = "http://localhost:3000/api/user";

let Name = document.getElementById("name");
let userName = document.getElementById("userN");
let Password = document.getElementById("passW");
let email = document.getElementById("confirmpassword");
let username = document.getElementById("username");
let password = document.getElementById("password");

//Post
const postUser = async () => {
  try {
    let response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          name: Name.value,
          username: userName.value,
          password: Password.value,
          email: email.value,
        },
      ]),
    });
  } catch (error) {
    console.error(error);
  }

  // console.log(Name.value, userName.value, Password.value);
};

//Get/Edit
let dataLi = document.getElementById("data");
let userId;
let userIds = [];
const getUser = async () => {
  try {
    let response = await fetch(URL);
    let data = await response.json();
    Name.innerHTML = "";
    userName.innerHTML = "";
    Password.innerHTML = "";
    email.innerHTML = "";
    data.forEach((element) => {
      let userDiv = document.createElement("p");
      userDiv.innerText = element.name;
      let userDiv2 = document.createElement("p");
      userDiv2.innerText = element.username;

      let delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.className = "delete";
      delBtn.addEventListener("click", () => {
        userIds.push(element._id);
        deleteUser(userIds);
      });

      let editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.className = "edit";
      editBtn.addEventListener("click", () => {
        Name.value = element.name;
        userName.value = element.username;
        userId = element._id;
      });

      dataLi.appendChild(userDiv);
      dataLi.appendChild(userDiv2);
      dataLi.appendChild(editBtn);
      dataLi.appendChild(delBtn);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

//Patch
const patchUser = async () => {
  try {
    let response = await fetch(`${URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: Name.value,
          password: Password.value,
          username: userName.value,
          email: email.value,
        },
      ]),
    });
  } catch (error) {
    console.error(error);
  }
};

//Put
const putUser = async () => {
  try {
    let response = await fetch(`${URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: Name.value,
          password: Password.value,
          username: userName.value,
          email: email.value,
        },
      ]),
    });
  } catch (error) {
    console.error(error);
  }
};

//Delete User
const deleteUser = async (userIds) => {
  try {
    let response = await fetch(`${URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: userIds,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

// LogIn User
const loginUser = async () => {
  try {
    let response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

Name.value = "";
Password.value = "";
userName.value = "";
email.value = "";
getUser();
