document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.guidi.dev.br/loteria/lotofacil/ultimo";

  let premio11 = 6;
  let premio12 = 12;
  let premio13 = 30;
  let premio11ComDezesseis = 30;
  let premio12ComDezesseis = 120;
  let premio13ComDezesseis = 246;
  let valorJogo;
  let retorno = [];
  let investimento = [];

  let cards_salvos = JSON.parse(localStorage.getItem("jogo_salvo")) || [];

  function fetchData() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let dezenas_sorteadas = data.listaDezenas;

        let resultado_atual = dezenas_sorteadas;

        let premio14 = data.listaRateioPremio[1].valorPremio;
        let premio15 = data.listaRateioPremio[0].valorPremio;

        let premio14ComDezesseis = premio14 * 2 + premio13 * 14;

        let premio15ComDezesseis = premio15 + premio14 * 15;

        console.log(resultado_atual);

        cards_salvos.forEach((cardData, index) => {
          valorJogo = cardData.numeros.length == 16 ? 48 : 3;
          investimento.push(valorJogo);
          const card_jogo = document.createElement("div");
          card_jogo.classList.add("container-jogo-salvo");

          const container_dezenas = document.createElement("div");
          container_dezenas.classList.add("dezenas");

          let dezena_gera;

          cardData.numeros.forEach((numero) => {
            dezena_gera = document.createElement("div");
            dezena_gera.classList.add("dezena-jogo-salvo");
            dezena_gera.innerHTML = numero;

            container_dezenas.appendChild(dezena_gera);

            if (resultado_atual.includes(numero.toString())) {
              dezena_gera.classList.add("cor-acerto");
            }
          });

          card_jogo.appendChild(container_dezenas);

          const numeros_gerados = cardData.numeros.map(String);
          const numeros_iguais = numeros_gerados.filter((numero) =>
            resultado_atual.includes(numero)
          );
          const quantidade_de_acertos = numeros_iguais.length;

          switch (quantidade_de_acertos) {
            case 11:
              card_jogo.classList.add("onze");
              cardData.numeros.length == 15
                ? retorno.push(premio11)
                : retorno.push(premio11ComDezesseis);
              break;
            case 12:
              card_jogo.classList.add("doze");
              cardData.numeros.length == 15
                ? retorno.push(premio12)
                : retorno.push(premio12ComDezesseis);
              break;
            case 13:
              card_jogo.classList.add("treze");
              cardData.numeros.length == 15
                ? retorno.push(premio13)
                : retorno.push(premio13ComDezesseis);
              break;
            case 14:
              card_jogo.classList.add("quatorze");
              cardData.numeros.length == 15
                ? retorno.push(premio14)
                : retorno.push(premio14ComDezesseis);
              break;
            case 15:
              card_jogo.classList.add("quinze");
              cardData.numeros.length == 15
                ? retorno.push(premio15)
                : retorno.push(premio15ComDezesseis);
              break;
          }

          const conferidos = document.createElement("div");
          conferidos.innerHTML = `
        <h6>${data.numero}</h6>
        <div class="conferir-acertos">
            <h2>${quantidade_de_acertos} </h2> <p>Acertos</p>
        </div> `;
          conferidos.classList.add("acertos");

          const botao_excluir = document.createElement("button");
          botao_excluir.type = "button";
          botao_excluir.innerHTML = '<i class="bx bx-trash bx-sm"></i>';
          botao_excluir.addEventListener("click", () =>
            excluir(card_jogo, index)
          );

          conferidos.appendChild(botao_excluir);
          card_jogo.appendChild(conferidos);
          console.log(numeros_iguais);

          document.getElementById("lista-jogos-salvos").appendChild(card_jogo);
          calcularPremiacao(cardData);
        });
      });
  }

  fetchData();

  function calcularPremiacao(jogo) {
    let valorInvestido = 0;
    let valorRetorno = 0;
    let texto_info = document.querySelector(".txt-info");
    let texto_ganho = document.getElementById("txt-ganho");
    let texto_valor_investido = document.getElementById("txt-valor-investido");
    let boxGanhos = document.querySelector(".faturamento");
    let valorMinhaPremiacao = document.getElementById("valor-retorno");

    //soma total de retorno com reduce
    valorRetorno = retorno.reduce((total, valor) => total + valor, 0);

    /*soma usando laco for 
    for(int i=0; i< retorno.length;i++){
        valorRetorno += retorno[i]}

   */

    valorInvestido = investimento.reduce((total, valor) => total + valor, 0);

    const valoresGanho = valorRetorno - valorInvestido;

    console.log(valorInvestido);
    console.log(valorRetorno.toLocaleString("pt-Br"));
    console.log(valoresGanho.toLocaleString("pt-br"));

    if (valoresGanho >= valorInvestido) {
      texto_info.style.display = "flex";
      texto_ganho.innerHTML = "lucro";
      texto_valor_investido.innerHTML = valorInvestido.toLocaleString("pt-BR");
      boxGanhos.classList.add("lucro");
      boxGanhos.classList.remove("prejuizo");
    } else if (valoresGanho < valorInvestido && valoresGanho != 0) {
      texto_info.style.display = "flex";
      texto_ganho.innerHTML = "prejuizo";
      texto_valor_investido.innerHTML = valorInvestido.toLocaleString("pt-BR");
      boxGanhos.classList.add("prejuizo");
      boxGanhos.classList.remove("lucro", "empate");
    } else if (valoresGanho == 0) {
      texto_info.style.display = "flex";
      texto_ganho.innerHTML = "empate";
      texto_valor_investido.innerHTML = valorInvestido.toLocaleString("pt-BR");
      boxGanhos.classList.add("empate");
      boxGanhos.classList.remove("lucro", "prejuizo");
    }

    valorMinhaPremiacao.innerHTML = valoresGanho.toLocaleString("pt-BR");
  }

  function excluir(card_jogo, index) {
    cards_salvos.splice(index, 1);
    localStorage.setItem("jogo_salvo", JSON.stringify(cards_salvos));
    card_jogo.remove(index);
    window.location.reload();
  }
});
