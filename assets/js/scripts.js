const apiUrl = "https://api.guidi.dev.br/loteria/lotofacil/ultimo";




   
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        
         let dezenas_sorteadas = data.listaDezenas;
        
        
        let quadro = document.querySelector(".result_atual"); 
        let tabela = document.querySelector(".table")
        
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
                                    <td>15</td>
                                    <td>${data.listaRateioPremio[0].numeroDeGanhadores}</td>
                                    <td>${data.listaRateioPremio[0].valorPremio}</td>

                                </tr>
                                <tr class="segunda-faixa">
                                    <td>14</td>
                                    <td>${data.listaRateioPremio[1].numeroDeGanhadores}</td>
                                    <td>${data.listaRateioPremio[1].valorPremio}</td>
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
            
        })        
                 let num_concurso = document.getElementById("concurso_atual");
                 num_concurso.innerHTML = `${data.dataApuracao} - ${data.numero}`;
                    
                 
                 
                 console.log(dezenas_sorteadas);
                });

                


            
    
          
            
            
            function limpar(){
            let quadro_sorte = document.querySelector('.jogos_gerados');
            quadro_sorte.innerHTML = "";
        }

            
            

        function gerar(dezenas_sorteadas){
                limpar();
                let numeros = [];
                let quadro_sorte = document.querySelector(".jogos_gerados");
                while(numeros.length < 15){
                    let numeros_gerados = Math.floor(Math.random( ) * 25) + 1;
                    if(numeros.indexOf(numeros_gerados) === -1){
                        numeros.push(numeros_gerados);
                    }
                }
                        numeros.sort((a, b) => a - b);

                        /*let repetidos = dezenas_sorteadas.filter(valor => numeros.includes(valor));
                        if(repetidos.length == 9)*/
                            numeros.forEach((dezenas) => {
                            let dezena_gera = document.createElement("div");
                            dezena_gera.classList.add("dezena_gerada");                            
                            dezena_gera.innerHTML = `${formatar_numero(dezenas)}`
    
                            quadro_sorte.appendChild(dezena_gera);                             


                        });
                    } 
                        
                   function formatar_numero(num){
                        return num < 10 ? '0' + num : num

                   }

                                   
    function aleatoriedade(){
        let btn_aleatorio = document.getElementById('opcoes');
        if(btn_aleatorio.classList.contains("esconder-opcoes")){
            btn_aleatorio.classList.remove("esconder-opcoes");
        }else{

        btn_aleatorio.classList.add("esconder-opcoes");
        }
    }       
                
                
                
              
                
            
            
                
            
    
   
        
    
    

