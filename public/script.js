const URL = "http://localhost:3000/api/user";
let email = document.getElementById("email");
let password = document.getElementById("password");

const postEmail = async () => {
  try {
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
  } catch (error) {
    console.error(error);
  }

  console.log(password.value);
  console.log(email.value);
};
let emailLi = document.getElementById("data");
let userId;
const getUser = async () => {
  try {
    let response = await fetch(URL);
    let data = await response.json();
    email.innerHTML = "";
    data.forEach((element) => {
      let userDiv = document.createElement("p");
      userDiv.innerText = element.email;
      userDiv.id = "txtemail";

      let editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.className = "edit";
      editBtn.addEventListener("click", () => {
      email.value = element.email;
      userId = element._id
      });
      emailLi.appendChild(userDiv);
      emailLi.appendChild(editBtn);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

let URL2 = "http://localhost:3000/api/user";

const patchEmail = async () => {
  try {
    let response = await fetch(URL2, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userId,
        email:email.value, 
        password: password.value
      }),

    });
  } catch (error) {
    console.error(error);
  }
};
