// ===== BELGILAR =====
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS   = "0123456789";
const SYMBOLS   = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// ===== ELEMENTLAR =====
const passwordEl   = document.getElementById("password");
const copyBtn      = document.getElementById("copy-btn");
const copyIcon     = document.getElementById("copy-icon");
const generateBtn  = document.getElementById("generate-btn");
const lengthInput  = document.getElementById("length");
const lengthValue  = document.getElementById("length-value");
const uppercaseEl  = document.getElementById("uppercase");
const lowercaseEl  = document.getElementById("lowercase");
const numbersEl    = document.getElementById("numbers");
const symbolsEl    = document.getElementById("symbols");
const strengthText = document.getElementById("strength-text");
const bars         = [
  document.getElementById("bar1"),
  document.getElementById("bar2"),
  document.getElementById("bar3"),
  document.getElementById("bar4"),
];

// ===== PAROL YARATISH =====
function generatePassword() {
  let charset = "";

  if (uppercaseEl.checked) charset += UPPERCASE;
  if (lowercaseEl.checked) charset += LOWERCASE;
  if (numbersEl.checked)   charset += NUMBERS;
  if (symbolsEl.checked)   charset += SYMBOLS;

  if (charset === "") {
    alert("Kamida bitta variant tanlang!");
    return;
  }

  const length = parseInt(lengthInput.value);
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  passwordEl.textContent = password;
  updateStrength(password);
}

// ===== KUCHLILIKNI HISOBLASH =====
function updateStrength(password) {
  let score = 0;

  if (password.length >= 8)  score++;
  if (password.length >= 14) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let level = 0;
  let label = "—";
  let color = "transparent";

  if (score <= 1) {
    level = 1; label = "Zaif"; color = "#f87171";
  } else if (score === 2) {
    level = 2; label = "O'rtacha"; color = "#fb923c";
  } else if (score === 3) {
    level = 3; label = "Yaxshi"; color = "#facc15";
  } else {
    level = 4; label = "Kuchli"; color = "#4ade80";
  }

  bars.forEach(function(bar, i) {
    bar.style.background = i < level ? color : "var(--surface2)";
  });

  strengthText.textContent = label;
  strengthText.style.color = color;
}

// ===== NUSXALASH =====
function copyPassword() {
  const text = passwordEl.textContent;
  if (text === "Parol yaratish uchun bosing") return;

  navigator.clipboard.writeText(text).then(function() {
    copyIcon.textContent = "✅";
    setTimeout(function() {
      copyIcon.textContent = "📋";
    }, 1500);
  });
}

// ===== UZUNLIK SLIDER =====
lengthInput.addEventListener("input", function() {
  lengthValue.textContent = lengthInput.value;
  generatePassword();
});

// ===== EVENT LISTENERS =====
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

uppercaseEl.addEventListener("change", generatePassword);
lowercaseEl.addEventListener("change", generatePassword);
numbersEl.addEventListener("change", generatePassword);
symbolsEl.addEventListener("change", generatePassword);

// ===== BOSHLANG'ICHDA PAROL YARATISH =====
generatePassword();
