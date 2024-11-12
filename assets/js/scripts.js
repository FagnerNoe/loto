


const apiUrl = "https://api.guidi.dev.br/loteria/lotofacil/ultimo";




   function fecthData(){
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        
         let dezenas_sorteadas = data.listaDezenas;
        
        
        let quadro = document.querySelector(".result_atual"); 
        let tabela = document.querySelector(".table")
        let num_concurso = document.getElementById("concurso_atual");
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
                 
                 num_concurso.innerHTML = `${data.dataApuracao} - ${data.numero}`;
                    

            localStorage.setItem('dezenas_sorteadas', JSON.stringify(dezenas_sorteadas)); 
            localStorage.setItem('num_concurso', data.numero); 
            localStorage.setItem('premiacao',JSON.stringify(data.listaRateioPremio));
            localStorage.setItem('utlimaRequisicao', new Date().getTime());  
                 
                 
                  
                 
                }).catch(error => console.error('Erro ao pegar o concurso',error));

                
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
            let quadro = document.querySelector(".result_atual");
            let tabela = document.querySelector(".table");
            let num_concurso_atual = document.querySelector("concurso_atual");
            quadro.innerHTML ='';
            
                dezenas_sorteadas.forEach((item) => { 
                    let dezena_result = document.createElement("div"); 
                    dezena_result.classList.add("dezena_resultado"); 
                dezena_result.innerHTML = `${item}`; 
                
                quadro.appendChild(dezena_result); });

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
            
        
                 
                 num_concurso_atual.innerHTML = `${num_concurso}`;
                
    }else{
        fecthData();
    }
   }

   checarRequisicao();
            
          
            
            
            function limpar(){
            let quadro_sorte = document.getElementById('container-gerados');
            quadro_sorte.innerHTML = "";
        }

            
            

        function gerar(dezenas_sorteadas){
                limpar();
                let escolha_quantidade_gerar = document.getElementById("selecao-quantidade");
                let valor_selecionado = parseInt(escolha_quantidade_gerar.options[escolha_quantidade_gerar.selectedIndex].value);
                console.log(valor_selecionado);
                let quadro_sorte = document.getElementById("container-gerados");
                


                for (let i = 0; i <valor_selecionado; i++){
                let numeros = [];

                while(numeros.length < 15){
                    let numeros_gerados = Math.floor(Math.random( ) * 25) + 1;
                    if(numeros.indexOf(numeros_gerados) === -1){
                        numeros.push(numeros_gerados);
                    }
                }
                        numeros.sort((a, b) => a - b);

                        /*let repetidos = dezenas_sorteadas.filter(valor => numeros.includes(valor));
                        if(repetidos.length == 9)*/

                        let card_jogo = document.createElement('div');
                        card_jogo.classList.add("jogos-gerados");
                       
                            numeros.forEach((dezenas) => {
                            let dezena_gera = document.createElement("div");
                            dezena_gera.classList.add("dezena_gerada");                            
                            dezena_gera.innerHTML = `${formatar_numero(dezenas)}`

                            card_jogo.appendChild(dezena_gera);            



                        });
                     
                            quadro_sorte.appendChild(card_jogo);
            
                   function formatar_numero(num){
                        return num < 10 ? '0' + num : num

                   }
        }

            scroll.apply

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
        nome_botao.innerText="Escolher Paramêtros";
        }
    }       
                
                
                
              
                
            
            
                
            
    
   
        
    
    

