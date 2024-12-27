


const apiUrl = "https://api.guidi.dev.br/loteria/lotofacil/ultimo";



    let prox_concurso_numero = document.getElementById("numero-proximo-concurso");
    let prox_concurso_data= document.getElementById("data-proximo-concurso");
    let btn_aleatorio = document.getElementById('opcoes');
    let escolha_quantidade_gerar = document.getElementById("selecao-quantidade");
    let valor_selecionado = parseInt(escolha_quantidade_gerar.options[escolha_quantidade_gerar.selectedIndex].value);
    let selecao_repetidas_anterior = document.getElementById('repetidas');
    let selecao_repetidas = parseInt(selecao_repetidas_anterior.options[selecao_repetidas_anterior.selectedIndex].value);
   
    
    

    function fecthData(){    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        
        let dezenas_sorteadas = data.listaDezenas;
        
        
        let quadro = document.querySelector(".result_atual"); 
        let tabela = document.querySelector(".table")
        let numero_concurso = document.getElementById("concurso_atual");
        let valor_prox_concurso = document.getElementById("valor-proximo-concurso");
        quadro.innerHTML = '';
        
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
                                    <td>${data.listaRateioPremio[0].numeroDeGanhadores}</td>
                                    <td>${data.listaRateioPremio[0].valorPremio.toLocaleString('pt-BR')}</td>

                                </tr>
                                <tr class="segunda-faixa">
                                    <td>14</td>
                                    <td>${data.listaRateioPremio[1].numeroDeGanhadores}</td>
                                    <td>${data.listaRateioPremio[1].valorPremio.toLocaleString('pt-BR')}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>13</td>
                                    <td>${data.listaRateioPremio[2].numeroDeGanhadores}</td>
                                    <td>${data.listaRateioPremio[2].valorPremio.toFixed(2)}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>12</td>
                                    <td>${data.listaRateioPremio[3].numeroDeGanhadores}</td>
                                    <td>${data.listaRateioPremio[3].valorPremio.toFixed(2)}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>11</td>
                                    <td>${data.listaRateioPremio[4].numeroDeGanhadores}</td>
                                    <td>${data.listaRateioPremio[4].valorPremio.toFixed(2)}</td>
                                </tr>
                            </tbody>`    ; 
            
        }) ;
                 
                 numero_concurso.innerHTML = `${data.dataApuracao} - ${data.numero}`;
                 valor_prox_concurso.innerHTML = `${data.valorEstimadoProximoConcurso.toLocaleString('pt-BR')}` ;
                 prox_concurso_numero.innerHTML = `${data.numeroConcursoProximo}`
                 prox_concurso_data.innerHTML = `${data.dataProximoConcurso}`

            

            localStorage.setItem('dezenas_sorteadas', JSON.stringify(dezenas_sorteadas)); 
            localStorage.setItem('num_concurso', data.numero); 
            localStorage.setItem('data_concurso',JSON.stringify(data.dataApuracao));
            localStorage.setItem('premiacao',JSON.stringify(data.listaRateioPremio));
            localStorage.setItem('utlimaRequisicao', new Date().getTime()); 
            localStorage.setItem('valor_proximo_concurso',data.valorEstimadoProximoConcurso)
            localStorage.setItem('numero_proximo_concurso', data.numeroConcursoProximo);
            localStorage.setItem('data_proximo_concurso',JSON.stringify(data.dataProximoConcurso));
                 
                 
                  
                 
                }
                
                ).catch(error => console.error('Erro ao pegar o concurso',error));
                
                

                
   }

//funcao pra verficiar se ja foi carregada e buscar dados 
     function checarRequisicao() { 
    const ultimaRequisicao = localStorage.getItem('utlimaRequisicao'); 
    const horaAtual = new Date().getTime(); 
    const umaHora = 60 * 60 * 1000; 
    if (ultimaRequisicao && (horaAtual - ultimaRequisicao < umaHora)) {         
        // Se a última requisição foi feita há menos de 1 hora, 
        //usa os dados armazenados const dezenas_sorteadas = JSON.parse(localStorage.getItem('dezenas_sorteadas')); let quadro = document.querySelector(".result_atual"); quadro.innerHTML = ''; // Limpa o quadro antes de adicionar novos elementos dezenas_sorteadas.forEach((item) => { let dezena_result = document.createElement("div"); dezena_result.classList.add("dezena_resultado"); dezena_result.innerHTML = `${item}`; quadro.appendChild(dezena_result); }); } else { // Se a última requisição foi feita há mais de 1 hora, faz uma nova requisição fetchData(); } } // Chama a função para verificar e buscar os dados checkAndFetchData();

            const dezenas_sorteadas = JSON.parse(localStorage.getItem('dezenas_sorteadas'));
            const num_concurso = localStorage.getItem('num_concurso'); 
            const premiacao = JSON.parse(localStorage.getItem('premiacao'));
            const data_concurso = JSON.parse(localStorage.getItem('data_concurso')) ;
            const valor_proximo_concurso = JSON.parse(localStorage.getItem('valor_proximo_concurso'));
            const data_prox_concurso = JSON.parse(localStorage.getItem('data_proximo_concurso'));
            const numero_prox_concurso = localStorage.getItem('numero_proximo_concurso');
            let quadro = document.querySelector(".result_atual");
            let tabela = document.querySelector(".table");
            let num_concurso_atual = document.getElementById("concurso_atual");
            let valor_estimado = document.getElementById("valor-proximo-concurso");
            let prox_concurso_numero = document.getElementById("numero-proximo-concurso");
            let prox_concurso_data= document.getElementById("data-proximo-concurso");
            
             
            quadro.innerHTML ='';
            
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
                                    <td>${premiacao[0].valorPremio.toLocaleString('pt-BR')}</td>

                                </tr>
                                <tr class="segunda-faixa">
                                    <td>14</td>
                                    <td>${premiacao[1].numeroDeGanhadores}</td>
                                    <td>${premiacao[1].valorPremio.toLocaleString('pt-BR')}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>13</td>
                                    <td>${premiacao[2].numeroDeGanhadores}</td>
                                    <td>${premiacao[2].valorPremio.toFixed(2)}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>12</td>
                                    <td>${premiacao[3].numeroDeGanhadores}</td>
                                    <td>${premiacao[3].valorPremio.toFixed(2)}</td>
                                </tr>
                                <tr class="segunda-faixa">
                                    <td>11</td>
                                    <td>${premiacao[4].numeroDeGanhadores}</td>
                                    <td>${premiacao[4].valorPremio.toFixed(2)}</td>
                                </tr>
                            </tbody>`    ; 
            
        
                });
                 num_concurso_atual.innerHTML = `${data_concurso} - ${num_concurso}`;
                valor_estimado.innerHTML = `${valor_proximo_concurso.toLocaleString('pt-BR')}`;
                prox_concurso_numero.innerHTML = `${numero_prox_concurso}`;
                prox_concurso_data.innerHTML = `${data_prox_concurso}`;
                return dezenas_sorteadas;
               

    }else{
         fecthData(); 
        
    } 
   
   
   }

   checarRequisicao();
            
          
            
            
            function limpar(){
            let quadro_sorte = document.getElementById('container-gerados');
            quadro_sorte.innerHTML = "";
           
        }

            
            

     function gerar(){           
             limpar(); 
                const dezenas_do_sorteio = JSON.parse(localStorage.getItem('dezenas_sorteadas'));
                let escolha_quantidade_gerar = document.getElementById("selecao-quantidade");
                let valor_selecionado = parseInt(escolha_quantidade_gerar.options[escolha_quantidade_gerar.selectedIndex].value);
                let selecao_repetidas_anterior = document.getElementById('repetidas');
                let selecao_repetidas = parseInt(selecao_repetidas_anterior.options[selecao_repetidas_anterior.selectedIndex].value);             
               
                
                let quadro_sorte = document.getElementById("container-gerados");

               
                          

                for (let i = 0; i <valor_selecionado; i++){ 
                    let numeros = [];
                if(!btn_aleatorio.classList.contains("esconder-opcoes")){
                  numeros = filtrarParametros(dezenas_do_sorteio,selecao_repetidas);
                  console.log(numeros);
                    
                }else{
                    numeros = [];
                    while(numeros.length < 15){
                        let numeros_gerados = Math.floor(Math.random() * 25) + 1;
                        if(numeros.indexOf(numeros_gerados) === -1){
                            numeros.push(numeros_gerados);
                    }
                }      

                }   
                        numeros.sort((a, b) => a - b);
                    

                       

                        let card_jogo = document.createElement('div');
                        card_jogo.classList.add("jogos-gerados");
                            
                            
                            numeros.forEach((dezenas) => {
                          
                            let dezena_gera = document.createElement("div");
                            dezena_gera.classList.add("dezena_gerada");                                                       
                            dezena_gera.innerHTML = `${formatar_numero(dezenas)}`
                            card_jogo.appendChild(dezena_gera);            



                        });
                            card_jogo.addEventListener("click",() => {                                 
                                card_jogo.classList.contains("selecionada")?
                                card_jogo.classList.remove("selecionada") : card_jogo.classList.add("selecionada");                             
                            })
                            quadro_sorte.appendChild(card_jogo);
            
                   function formatar_numero(num){
                    num = parseInt(num,10);
                    return num < 10 ? '0' + num : num;
                       
                   }         
                   
                    }}
        

        function filtrarParametros(dezenas_do_sorteio, selecao_repetidas){
            let numeros = [];
            let repetidos = [];
            console.log(dezenas_do_sorteio)
                    while(repetidos.length < selecao_repetidas){
                    let numero_repetido = dezenas_do_sorteio[Math.floor(Math.random() * dezenas_do_sorteio.length)];
                    if(repetidos.indexOf(numero_repetido) === -1){
                        repetidos.push(numero_repetido);
                    }
        }
                    while(numeros.length < 15 - selecao_repetidas){
                    let numeros_gerados = Math.floor(Math.random( ) * 25) + 1;
                    if(numeros.indexOf(numeros_gerados) === -1 && repetidos.indexOf(numeros_gerados) === -1 && !dezenas_do_sorteio.map(Number).includes(numeros_gerados)){
                        numeros.push(numeros_gerados);
                    }
                }

                numeros = numeros.concat(repetidos);
                console.log(repetidos);
                
                
                return numeros;
        }

       
                                   
    function aleatoriedade(){
        let btn_aleatorio = document.getElementById('opcoes');
        let titulo_opcoes = document.getElementById('titulo_opcoes');
        let nome_botao = document.getElementById('botao_aleatorio');
        if(btn_aleatorio.classList.contains("esconder-opcoes")){
            btn_aleatorio.classList.remove("esconder-opcoes");
            titulo_opcoes.classList.remove("esconder-opcoes");
            nome_botao.innerHTML="Jogo Aleatório";
          

        }else{

        btn_aleatorio.classList.add("esconder-opcoes");
        titulo_opcoes.classList.add("esconder-opcoes");

        nome_botao.innerText="Escolher Parâmetros";
        }
    }       
                
                
                
              
                
            
            
                
            
    
   
        
    
    

