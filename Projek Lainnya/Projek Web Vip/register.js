const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!username || !password || !confirmPassword) {
    showMessage("Semua kolom wajib diisi.", "#ff6f91");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Password tidak cocok.", "#ff6f91");
    return;
  }

  const existingUser = JSON.parse(localStorage.getItem("userData"));

  if (existingUser && existingUser.username === username) {
    showMessage("Anda sebelumnya sudah terdaftar. Mengalihkan ke login...", "#ffae42");
    setTimeout(() => {
      window.location.href = "Practice.html";
    }, 2000);
    return;
  }

  const userData = { username, password };
  localStorage.setItem("userData", JSON.stringify(userData));

  showMessage("Akun berhasil dibuat! Mengalihkan ke login...", "#a0ffba");
  setTimeout(() => {
    window.location.href = "Practice.html";
  }, 2000);
});

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}