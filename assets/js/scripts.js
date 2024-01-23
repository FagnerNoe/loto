const apiUrl = "https://api.guidi.dev.br/loteria/lotofacil/ultimo";


   
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        
         let dezenas_sorteadas = data.listaDezenas;
        
        
        let quadro = document.querySelector(".result_atual"); 
        
        dezenas_sorteadas.forEach((item) => {            
            let dezena_result = document.createElement("div");
            dezena_result.classList.add("dezena_resultado");
            dezena_result.innerHTML = `${item}`;
            
            quadro.appendChild(dezena_result);            
            
        })        
                 let num_concurso = document.getElementById("concurso");
                 num_concurso.innerHTML = `${data.dataApuracao} - ${data.numero}`;
                    
                 
                 
                 console.log(dezenas_sorteadas);
                });

                


            
    
          
            
            
            function limpar(){
            let quadro_sorte = document.querySelector('.sua_sorte');
            quadro_sorte.innerHTML = "";
        }

            
            

        function gerar(dezenas_sorteadas){
                limpar();
                let numeros = [];
                let quadro_sorte = document.querySelector('.sua_sorte');
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

let installPrompt = null;
const installButton = document.querySelector('#install');
          

   

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        installPrompt = e.target;
        installButton.removeAttribute('hidden');
    });
       
    installButton.addEventListener("click", async () => {
        if (!installPrompt){
            return;
        }
        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        disableInAppInstallPrompt();
    });

    function disableInAppInstallPrompt() {
        installPrompt = null;
        installButton.setAttribute("hidden", "");
    }

    window.addEventListener("appinstalled", () => {
        disableInAppInstallPrompt();
    });

   
            
                                   
                
                
                
                
              
                
            
            
                
            
    
   
        
    
    

