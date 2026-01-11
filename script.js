// ================= DADOS =================
const total = 50000;
// Ler valores guardados ou usar default
let ocupado = Number(localStorage.getItem("ocupado")) || 32000;
let livre = total - ocupado;

// ================= DASHBOARD =================
const canvas = document.getElementById("ocupacaoChart");
let ctx = null;

if (canvas) {
    ctx = canvas.getContext("2d");
    atualizarDashboard();
}



function atualizarDashboard() {
    if (!canvas) return;

    const percentagem = Math.round((ocupado / total) * 100);

    document.getElementById("ocupadoText").innerText = ocupado + " posições";
    document.getElementById("livreText").innerText = livre + " posições";
    document.getElementById("percentagem").innerText = percentagem + "%";

    desenharGrafico();
}

function desenharGrafico() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 110;
    const lineWidth = 20;

    ctx.lineWidth = lineWidth;

    // Livre
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#1e90ff";
    ctx.stroke();

    // Ocupado
    ctx.beginPath();
    ctx.arc(
        centerX,
        centerY,
        radius,
        -Math.PI / 2,
        (2 * Math.PI * ocupado) / total - Math.PI / 2
    );
    ctx.strokeStyle = "#ff3b3b";
    ctx.stroke();
}

// ================= MODAL ENCOMENDA =================
function abrirEncomenda(tipo) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("tipoPalete").value = tipo;
}

function confirmarEncomenda() {
    const quantidade = Number(document.getElementById("quantidade").value);

    if (quantidade <= 0 || quantidade > livre) {
        return;
    }

    ocupado += quantidade;
    livre -= quantidade;

    // 👉 GUARDAR NO BROWSER
    localStorage.setItem("ocupado", ocupado);

    

    fecharEncomenda();

    window.location.href = "index.html";
}



function fecharEncomenda() {
    document.getElementById("modal").style.display = "none";
}


// Inicialização
atualizarDashboard();


