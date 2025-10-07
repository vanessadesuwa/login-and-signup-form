const signupButton = document.querySelector(".to-signup");
const loginButton = document.querySelector(".to-login");
const login = document.querySelector(".login");
const register = document.querySelector(".register");

loginButton.addEventListener("click", () => {
  register.classList.add("hide");
  login.classList.add("show");
});

signupButton.addEventListener("click", () => {
  login.classList.remove("show");
  register.classList.remove("hide");
  console.log("register");
});
