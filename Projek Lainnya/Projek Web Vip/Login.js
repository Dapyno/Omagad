const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("rememberMe");

function showPopup(message) {
  const popup = document.getElementById("popupError");
  popup.textContent = message;
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
  setTimeout(() => {
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
  }, 3000);
}

usernameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const enteredUsername = usernameInput.value.trim();

    if (storedData && enteredUsername === storedData.username) {
      passwordInput.focus();
    } else {
      showPopup("Username salah atau belum terdaftar.");
    }
  }
});

passwordInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    form.requestSubmit();
  }
});

window.addEventListener("load", () => {
  const remembered = JSON.parse(localStorage.getItem("rememberedUser"));
  if (remembered) {
    usernameInput.value = remembered.username;
    passwordInput.value = remembered.password;
    rememberMeCheckbox.checked = true;
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const storedData = JSON.parse(localStorage.getItem("userData"));

  if (storedData && username === storedData.username && password === storedData.password) {
    if (rememberMeCheckbox.checked) {
      localStorage.setItem("rememberedUser", JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem("rememberedUser");
    }
    window.location.href = "Selamat_Datang_Para_VIP.html";
  } else {
    showPopup("Username atau password salah.");
  }
});

document.getElementById("forgotPassword").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "ResetPassword.html";
});