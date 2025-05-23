const apiUrl = "https://api.guidi.dev.br/loteria/lotofacil/ultimo";

let prox_concurso_numero = document.getElementById("numero-proximo-concurso");
let prox_concurso_data = document.getElementById("data-proximo-concurso");
let btn_aleatorio = document.getElementById("opcoes");

function fecthData() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let dezenas_sorteadas = data.listaDezenas;

      let quadro = document.querySelector(".result_atual");
      let tabela = document.querySelector(".table");
      let numero_concurso = document.getElementById("concurso_atual");
      let valor_prox_concurso = document.getElementById(
        "valor-proximo-concurso"
      );
      quadro.innerHTML = "";

      dezenas_sorteadas.forEach((item) => {
        let dezena_result = document.createElement("div");
        dezena_result.classList.add("dezena_resultado");
        dezena_result.innerHTML = `${item}`;

        quadro.appendChild(dezena_result);

        tabela.innerHTML = `
                 <thead>
                                <tr>
                                    <th scope="col">Faixa</th>
                                    <th scope="col">Ganhadores</th>
                                    <th scope="col">Prêmio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="faixa-principal">
                                    <td class="faixa">15</td>
                                    <td>${
                                      data.listaRateioPremio[0]
                                        .numeroDeGanhadores
                                    }</td>
                                    <td>${data.listaRateioPremio[0].valorPremio.toLocaleString(
                                      "pt-BR"
                                    )}</td>

                                </tr>
                                <tr class="segunda-faixa">
                                    <td>14</td>
                                    <td>${
                                      data.listaRateioPremio[1]
                                        .numeroDeGanhadores
                                    }</td>
                                    <td>${data.listaRateioPremio[1].valorPremio.toLocaleString(
                                      "pt-BR"
                                    )}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>13</td>
                                    <td>${
                                      data.listaRateioPremio[2]
                                        .numeroDeGanhadores
                                    }</td>
                                    <td>${data.listaRateioPremio[2].valorPremio.toFixed(
                                      2
                                    )}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>12</td>
                                    <td>${
                                      data.listaRateioPremio[3]
                                        .numeroDeGanhadores
                                    }</td>
                                    <td>${data.listaRateioPremio[3].valorPremio.toFixed(
                                      2
                                    )}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>11</td>
                                    <td>${
                                      data.listaRateioPremio[4]
                                        .numeroDeGanhadores
                                    }</td>
                                    <td>${data.listaRateioPremio[4].valorPremio.toFixed(
                                      2
                                    )}</td>
                                </tr>
                            </tbody>`;
      });

      numero_concurso.innerHTML = `${data.dataApuracao} - ${data.numero}`;
      valor_prox_concurso.innerHTML = `${data.valorEstimadoProximoConcurso.toLocaleString(
        "pt-BR"
      )}`;
      prox_concurso_numero.innerHTML = `${data.numeroConcursoProximo}`;
      prox_concurso_data.innerHTML = `${data.dataProximoConcurso}`;

      localStorage.setItem(
        "dezenas_sorteadas",
        JSON.stringify(dezenas_sorteadas)
      );
      localStorage.setItem("num_concurso", data.numero);
      localStorage.setItem("data_concurso", JSON.stringify(data.dataApuracao));
      localStorage.setItem("premiacao", JSON.stringify(data.listaRateioPremio));
      localStorage.setItem("utlimaRequisicao", new Date().getTime());
      localStorage.setItem(
        "valor_proximo_concurso",
        data.valorEstimadoProximoConcurso
      );
      localStorage.setItem(
        "numero_proximo_concurso",
        data.numeroConcursoProximo
      );
      localStorage.setItem(
        "data_proximo_concurso",
        JSON.stringify(data.dataProximoConcurso)
      );
    })
    .catch((error) => console.error("Erro ao pegar o concurso", error));
}

//funcao pra verficiar se ja foi carregada e buscar dados
function checarRequisicao() {
  const ultimaRequisicao = localStorage.getItem("utlimaRequisicao");
  const horaAtual = new Date().getTime();
  const umaHora = 60 * 60 * 1000;
  if (ultimaRequisicao && horaAtual - ultimaRequisicao < umaHora) {
    // Se a última requisição foi feita há menos de 1 hora,
    //usa os dados armazenados const dezenas_sorteadas = JSON.parse(localStorage.getItem('dezenas_sorteadas')); let quadro = document.querySelector(".result_atual"); quadro.innerHTML = ''; // Limpa o quadro antes de adicionar novos elementos dezenas_sorteadas.forEach((item) => { let dezena_result = document.createElement("div"); dezena_result.classList.add("dezena_resultado"); dezena_result.innerHTML = `${item}`; quadro.appendChild(dezena_result); }); } else { // Se a última requisição foi feita há mais de 1 hora, faz uma nova requisição fetchData(); } } // Chama a função para verificar e buscar os dados checkAndFetchData();

    const dezenas_sorteadas = JSON.parse(
      localStorage.getItem("dezenas_sorteadas")
    );
    const num_concurso = localStorage.getItem("num_concurso");
    const premiacao = JSON.parse(localStorage.getItem("premiacao"));
    const data_concurso = JSON.parse(localStorage.getItem("data_concurso"));
    const valor_proximo_concurso = JSON.parse(
      localStorage.getItem("valor_proximo_concurso")
    );
    const data_prox_concurso = JSON.parse(
      localStorage.getItem("data_proximo_concurso")
    );
    const numero_prox_concurso = localStorage.getItem(
      "numero_proximo_concurso"
    );
    let quadro = document.querySelector(".result_atual");
    let tabela = document.querySelector(".table");
    let num_concurso_atual = document.getElementById("concurso_atual");
    let valor_estimado = document.getElementById("valor-proximo-concurso");
    let prox_concurso_numero = document.getElementById(
      "numero-proximo-concurso"
    );
    let prox_concurso_data = document.getElementById("data-proximo-concurso");

    quadro.innerHTML = "";

    dezenas_sorteadas.forEach((item) => {
      let dezena_result = document.createElement("div");
      dezena_result.classList.add("dezena_resultado");
      dezena_result.innerHTML = `${item}`;

      quadro.appendChild(dezena_result);

      tabela.innerHTML = `
                 <thead>
                                <tr>
                                    <th scope="col">Faixa</th>
                                    <th scope="col">Ganhadores</th>
                                    <th scope="col">Prêmio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="faixa-principal">
                                    <td class="faixa">15</td>
                                    <td>${premiacao[0].numeroDeGanhadores}</td>
                                    <td>${premiacao[0].valorPremio.toLocaleString(
                                      "pt-BR"
                                    )}</td>

                                </tr>
                                <tr class="segunda-faixa">
                                    <td>14</td>
                                    <td>${premiacao[1].numeroDeGanhadores}</td>
                                    <td>${premiacao[1].valorPremio.toLocaleString(
                                      "pt-BR"
                                    )}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>13</td>
                                    <td>${premiacao[2].numeroDeGanhadores}</td>
                                    <td>${premiacao[2].valorPremio.toFixed(
                                      2
                                    )}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>12</td>
                                    <td>${premiacao[3].numeroDeGanhadores}</td>
                                    <td>${premiacao[3].valorPremio.toFixed(
                                      2
                                    )}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>11</td>
                                    <td>${premiacao[4].numeroDeGanhadores}</td>
                                    <td>${premiacao[4].valorPremio.toFixed(
                                      2
                                    )}</td>
                                </tr>
                            </tbody>`;
    });
    num_concurso_atual.innerHTML = `${data_concurso} - ${num_concurso}`;
    valor_estimado.innerHTML = `${valor_proximo_concurso.toLocaleString(
      "pt-BR"
    )}`;
    prox_concurso_numero.innerHTML = `${numero_prox_concurso}`;
    prox_concurso_data.innerHTML = `${data_prox_concurso}`;
    return dezenas_sorteadas;
  } else {
    fecthData();
  }
}

checarRequisicao();

function limpar() {
  let quadro_sorte = document.getElementById("container-gerados");
  quadro_sorte.innerHTML = "";
}

let check_exclusao = document.getElementById("excluir-dezenas");
let selecao_dezenas_excluir = document.querySelector(
  ".selecao-dezenas-excluir"
);
let dezenas_excluidas = [];

document.getElementById("excluir-dezenas").addEventListener("click", () => {
  if (check_exclusao.checked) {
    selecao_dezenas_excluir.style.display = "flex";
  } else {
    selecao_dezenas_excluir.style.display = "none";
  }

  const lista_dezenas = document.getElementById("lista-dezenas");
  const dezenas_selecionada_input =
    document.getElementById("dezenas-excluidas");

  // Criar a lista de 25 números
  for (let i = 1; i <= 25; i++) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = i;

    listItem.addEventListener("click", () => {
      const numero = listItem.textContent;
      const index = dezenas_excluidas.indexOf(numero);

      if (index === -1) {
        // Selecionar a dezena
        if (dezenas_excluidas.length < 4) {
          dezenas_excluidas.push(numero);

          listItem.classList.add("selected");
          console.log(dezenas_excluidas);
        } else {
          alert("Você pode selecionar até 4 dezenas !");
        }
      } else {
        // Remover a dezena da seleção
        dezenas_excluidas.splice(index, 1);
        listItem.classList.remove("selected");
      }

      // Atualizar o campo de dezenas selecionadas
      dezenas_excluidas = dezenas_excluidas.sort((a, b) => a - b);
      dezenas_selecionada_input.value = dezenas_excluidas.join(", ");
    });

    lista_dezenas.appendChild(listItem);
  }
});

function gerar() {
  limpar();

  const dezenas_do_sorteio = JSON.parse(
    localStorage.getItem("dezenas_sorteadas")
  );
  let escolha_quantidade_gerar = document.getElementById("selecao-quantidade");
  let valor_selecionado = parseInt(
    escolha_quantidade_gerar.options[escolha_quantidade_gerar.selectedIndex]
      .value
  );
  let selecao_repetidas_anterior = document.getElementById("repetidas");
  let selecao_repetidas = parseInt(
    selecao_repetidas_anterior.options[selecao_repetidas_anterior.selectedIndex]
      .value
  );
  let impares = document.getElementById("impares");
  let selecao_impares = parseInt(impares.options[impares.selectedIndex].value);
  let primos = document.getElementById("primos");
  let selecao_primos = parseInt(primos.options[primos.selectedIndex].value);
  let fibonacci = document.getElementById("fibonacci");
  let selecao_fibonacci = parseInt(
    fibonacci.options[fibonacci.selectedIndex].value
  );
  let moldura = document.getElementById("moldura");
  let selecao_moldura = parseInt(moldura.options[moldura.selectedIndex].value);
  let quantidade_bilhete = document.getElementById("numeros-bilhete");
  let selecao_quantidade_bilhetes = parseInt(
    quantidade_bilhete.options[quantidade_bilhete.selectedIndex].value
  );
  let excluidas = dezenas_excluidas;

  let quadro_sorte = document.getElementById("container-gerados");

  for (let i = 0; i < valor_selecionado; i++) {
    let numeros = [];

    if (!btn_aleatorio.classList.contains("esconder-opcoes")) {
      numeros = filtrarParametros(
        dezenas_do_sorteio,
        selecao_quantidade_bilhetes,
        excluidas,
        selecao_repetidas,
        selecao_impares,
        selecao_primos,
        selecao_fibonacci,
        selecao_moldura
      );

      console.log(numeros);
    } else {
      numeros = [];
      while (numeros.length < selecao_quantidade_bilhetes) {
        let numeros_gerados = Math.floor(Math.random() * 25) + 1;
        if (numeros.indexOf(numeros_gerados) === -1) {
          numeros.push(numeros_gerados);
        }
      }
    }
    numeros.sort((a, b) => a - b);

    let card_jogo = document.createElement("div");
    card_jogo.classList.add("jogos-gerados");

    numeros.forEach((dezenas) => {
      let dezena_gera = document.createElement("div");
      dezena_gera.classList.add("dezena_gerada");
      dezena_gera.innerHTML = `${formatar_numero(dezenas)}`;
      card_jogo.appendChild(dezena_gera);
    });
    card_jogo.addEventListener("click", () => {
      card_jogo.classList.contains("selecionada")
        ? card_jogo.classList.remove("selecionada")
        : card_jogo.classList.add("selecionada");

      let card_jogo_salvo =
        JSON.parse(localStorage.getItem("jogo_salvo")) || [];

      const card_salvo = {
        numeros: Array.from(card_jogo.querySelectorAll(".dezena_gerada")).map(
          (dezena) => dezena.innerHTML
        ),
        selecionada: card_jogo.classList.contains("selecionada"),
      };
      card_salvo.selecionada
        ? card_jogo_salvo.push(card_salvo)
        : card_salvo.toString;

      if (card_jogo_salvo.length > 100) {
        card_jogo_salvo.shift(); //remover primeiro card
      }

      localStorage.setItem("jogo_salvo", JSON.stringify(card_jogo_salvo));
    });

    quadro_sorte.appendChild(card_jogo);

    function formatar_numero(num) {
      num = parseInt(num, 10);
      return num < 10 ? "0" + num : num;
    }
  }

  document.querySelector(".obs").classList.add("opcoes_jogo");
}

window.filtrarParametros = function (
  dezenas_do_sorteio,
  selecao_quantidade_bilhetes,
  excluidas,
  selecao_repetidas,
  selecao_impares,
  selecao_primos,
  selecao_fibonacci,
  selecao_moldura
) {
  let numeros = [];
  let repetidos = [];
  let impares = [];
  let primos = [];
  let moldura = [];
  let jogo_valido = false;

  let todos_numeros = Array.from({ length: 25 }, (_, i) => i + 1);
  console.log(todos_numeros);

  todos_numeros = todos_numeros.filter(
    (num) => !excluidas.includes(num.toString())
  );
  console.log(todos_numeros);

  dezenas_do_sorteio = dezenas_do_sorteio.map(Number);
  dezenas_do_sorteio = dezenas_do_sorteio.filter(
    (num) => !excluidas.includes(num.toString())
  );
  console.log(dezenas_do_sorteio);

  while (!jogo_valido) {
    numeros = [];
    repetidos = [];
    impares = [];
    fibonacci = [];
    moldura = [];

    while (repetidos.length < selecao_repetidas) {
      let numero_repetido;
      do {
        numero_repetido =
          dezenas_do_sorteio[
            Math.floor(Math.random() * dezenas_do_sorteio.length)
          ];
      } while (
        excluidas.includes(numero_repetido.toString()) ||
        repetidos.includes(numero_repetido)
      );

      repetidos.push(parseInt(numero_repetido));
    }

    /* while(impares.length < selecao_impares){
                    let numeros_impares = Math.floor(Math.random() * 25) + 1;
                    if(numeros_impares% 2 !== 0 && impares.indexOf(numeros_impares) === -1){                         
                            impares.push(numeros_impares);                    
                    }
                    }
                               
                    const numeros_fibonacci = [1,2,3,5,8,13,21]; 
                    while(fibonacci.length < selecao_fibonacci){
                        let numero_fibonacci = numeros_fibonacci[Math.floor(Math.random() * numeros_fibonacci.length)];
                        if (fibonacci.indexOf(numero_fibonacci) === -1){
                            fibonacci.push(numero_fibonacci);
                        }          
                    }

                    const numeros_moldura = [1,2,3,4,5,6,10,11,15,16,20,21,22,23,24,25]; 
                    while(moldura.length < selecao_moldura){
                         let numero_moldura = numeros_moldura[Math.floor(Math.random() * numeros_moldura.length)];
                        if (moldura.indexOf(numero_moldura) === -1 ){ 
                                moldura.push(numero_moldura);
                        }          
                    }*/

    while (numeros.length < selecao_quantidade_bilhetes - selecao_repetidas) {
      let numeros_gerados =
        todos_numeros[Math.floor(Math.random() * todos_numeros.length)];
      if (
        numeros.indexOf(numeros_gerados) === -1 &&
        repetidos.indexOf(numeros_gerados) === -1 &&
        !dezenas_do_sorteio.map(Number).includes(numeros_gerados)
      ) {
        {
          numeros.push(numeros_gerados);
        }
      }
    }
    numeros = numeros.concat(repetidos);

    const contarImpares = (arr) => arr.filter((num) => num % 2 !== 0).length;
    const contarPrimos = (arr) =>
      arr.filter((num) => [2, 3, 5, 7, 11, 13, 17, 19, 23].includes(num))
        .length;
    const contarFibonacci = (arr) =>
      arr.filter((num) => [1, 2, 3, 5, 8, 13, 21].includes(num)).length;
    const contarMoldura = (arr) =>
      arr.filter((num) =>
        [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25].includes(num)
      ).length;

    console.log(repetidos);
    console.log(impares);
    console.log(contarPrimos(numeros));
    console.log(contarFibonacci(numeros));
    console.log(moldura);

    //verificar se o jogo atende as selecoes
    if (
      numeros.length === selecao_quantidade_bilhetes &&
      contarImpares(numeros) === selecao_impares &&
      contarPrimos(numeros) === selecao_primos &&
      contarFibonacci(numeros) === selecao_fibonacci &&
      contarMoldura(numeros) === selecao_moldura
    ) {
      jogo_valido = true;
    }
  }
  return numeros;
};

function aleatoriedade() {
  let btn_aleatorio = document.getElementById("opcoes");
  let titulo_opcoes = document.getElementById("titulo_opcoes");
  let nome_botao = document.getElementById("botao_aleatorio");
  if (btn_aleatorio.classList.contains("esconder-opcoes")) {
    btn_aleatorio.classList.remove("esconder-opcoes");
    titulo_opcoes.classList.remove("esconder-opcoes");
    nome_botao.innerHTML = "Jogo Aleatório";
  } else {
    btn_aleatorio.classList.add("esconder-opcoes");
    titulo_opcoes.classList.add("esconder-opcoes");

    nome_botao.innerText = "Escolher Parâmetros";
  }
}
