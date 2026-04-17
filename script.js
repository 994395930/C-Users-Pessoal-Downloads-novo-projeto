let perguntasSelecionadas = [];

// embaralhar (profissional)
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// carregar quiz
function carregarQuiz() {

  fetch("perguntas.json")
  .then(res => res.json())
  .then(dados => {

    let dadosEmbaralhados = embaralhar(dados);

    perguntasSelecionadas = dadosEmbaralhados.slice(0, 5);

    const quiz = document.getElementById("quiz");
    quiz.innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    perguntasSelecionadas.forEach((p, i) => {

      let div = document.createElement("div");
      div.className = "pergunta";

      div.innerHTML = `
        <p><b>${i+1}) ${p.pergunta}</b></p>

        ${p.imagem ? `<img src="${p.imagem}" width="200">` : ""}

        ${p.opcoes.map((op, j) => `
          <label>
            <input type="radio" name="q${i}" value="${j}">
            ${op}
          </label><br>
        `).join("")}
      `;

      quiz.appendChild(div);
    });

  })
  .catch(() => {
    alert("Erro ao carregar perguntas!");
  });

}

// corrigir
function corrigir() {

  let pontos = 0;
  let resultado = "<h2>Resultado:</h2>";

  perguntasSelecionadas.forEach((p, i) => {

    let opcoes = document.getElementsByName("q" + i);
    let respondeu = false;

    Array.from(opcoes).forEach(op => {

      if (op.checked) {
        respondeu = true;

        if (parseInt(op.value) === p.correta) {
          pontos++;
          resultado += `<p style="color:green">✔ ${p.explicacao}</p>`;
        } else {
          resultado += `<p style="color:red">
            ❌ Correta: ${p.opcoes[p.correta]}<br>
            ${p.explicacao}
          </p>`;
        }
      }

    });

    if (!respondeu) {
      resultado += `<p style="color:orange">⚠ Não respondeu</p>`;
    }

  });

  resultado += `<hr><h3>Acertos: ${pontos} / ${perguntasSelecionadas.length}</h3>`;

  document.getElementById("resultado").innerHTML = resultado;
}

// novo quiz
function novoQuiz() {
  carregarQuiz();
}

// iniciar
carregarQuiz();