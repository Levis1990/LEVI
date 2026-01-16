console.log("JavaScript Funcionando!");

// =====================
// 1) CONTADOR COMPLETO
// =====================
const daysEl = document.getElementById("daysCount");
const hoursEl = document.getElementById("hoursCount");
const minutesEl = document.getElementById("minutesCount");
const secondsEl = document.getElementById("secondsCount");

// 18/05/2024 00:00:00 (mês no JS é 0-11, então maio = 4)
const startDate = new Date(2024, 4, 18, 0, 0, 0);

function pad2(n) {
  return String(n).padStart(2, "0");
}

function atualizarContador() {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();

  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24)) + 1;
  const rest = totalSeconds % (60 * 60 * 24);

  const hours = Math.floor(rest / (60 * 60));
  const rest2 = rest % (60 * 60);

  const minutes = Math.floor(rest2 / 60);
  const seconds = rest2 % 60;

  if (daysEl) daysEl.textContent = String(days);
  if (hoursEl) hoursEl.textContent = pad2(hours);
  if (minutesEl) minutesEl.textContent = pad2(minutes);
  if (secondsEl) secondsEl.textContent = pad2(seconds);
}

atualizarContador();
setInterval(atualizarContador, 1000);

// =====================
// 2) EFEITOS (FLORES + CORAÇÕES)
// =====================
const effectsLayer = document.getElementById("effects-layer");
const flores = ["🌸", "🌺", "🌷", "💐", "🌹"];
const coracoes = ["❤️", "💖", "💘", "💞", "💕"];

function soltarFlores(qtd = 18) {
  if (!effectsLayer) return;

  for (let n = 0; n < qtd; n++) {
    const el = document.createElement("div");
    el.className = "flower";
    el.textContent = flores[Math.floor(Math.random() * flores.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${18 + Math.random() * 22}px`;
    el.style.animationDelay = `${Math.random() * 0.25}s`;

    effectsLayer.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }
}

function subirCoracoes(qtd = 24) {
  if (!effectsLayer) return;

  for (let n = 0; n < qtd; n++) {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = coracoes[Math.floor(Math.random() * coracoes.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${18 + Math.random() * 26}px`;
    el.style.animationDelay = `${Math.random() * 0.25}s`;

    effectsLayer.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }
}

// =====================
// 3) DIGITAÇÃO (MENSAGENS)
// =====================
const botao = document.getElementById("meuBotao");
const titulo = document.getElementById("tituloMensagem");
const texto = document.getElementById("textoMensagem");

const mensagens = [
  "Yasmin, você é a melhor parte do meu dia 💛",
  "Eu escolho você — hoje e sempre 💞",
  "Seu sorriso é meu lugar favorito 🌷",
  "Com você, tudo fica mais bonito ✨",
  "Você é meu coração todinho ❤️",
  "Se eu pudesse, eu te daria o mundo… mas fiz um site 😍",
];

let idx = 0;
let typingLock = false;

function digitar(elemento, mensagem, velocidade = 22) {
  typingLock = true;
  elemento.textContent = "";
  let i = 0;

  const timer = setInterval(() => {
    elemento.textContent += mensagem[i];
    i++;

    if (i >= mensagem.length) {
      clearInterval(timer);
      typingLock = false;
    }
  }, velocidade);
}

function trocarMensagem() {
  if (typingLock) return;

  idx = (idx + 1) % mensagens.length;
  digitar(titulo, mensagens[idx], 22);
  texto.textContent = "Clica de novo pra ver outra mensagem 💌";
}

// =====================
// 4) ABERTURA + TRANSIÇÃO
// =====================
const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const page = document.getElementById("page");

function abrirSite() {
  if (intro) {
    intro.classList.add("intro--hide");
    intro.setAttribute("aria-hidden", "true");
  }

  if (page) {
    page.classList.remove("page--hidden");
  }

  // efeito inicial ao entrar
  subirCoracoes(28);
  soltarFlores(18);

  // rola para o começo
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (enterBtn) {
  enterBtn.addEventListener("click", abrirSite);
}

// =====================
// 5) FINAL (SIM / NÃO)
// =====================
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");
const finalMsg = document.getElementById("finalMsg");

if (btnNao) {
  btnNao.addEventListener("click", () => {
    if (finalMsg)
      finalMsg.textContent = "Opa 😅 esse botão não vale! Tenta o SIM 💖";
    subirCoracoes(18);
  });
}

if (btnSim) {
  btnSim.addEventListener("click", () => {
    if (finalMsg)
      finalMsg.textContent =
        "AAAAA 💍💛 Eu te amo, Yasmin! Obrigado por dizer SIM! 😍";
    subirCoracoes(60);
    soltarFlores(45);
  });
}

// =====================
// 6) CLIQUE NA MENSAGEM
// =====================
if (botao) {
  botao.addEventListener("click", () => {
    trocarMensagem();
    soltarFlores(20);
    subirCoracoes(28);
  });
}

// Mensagem inicial com digitação (fica lindo)
if (titulo) {
  digitar(titulo, "Oi, meu amor Yasmin 💛", 25);
}
