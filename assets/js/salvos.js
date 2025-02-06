document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://api.guidi.dev.br/loteria/lotofacil/ultimo";
    
    
    const cards_salvos = JSON.parse(localStorage.getItem('jogo_salvo')) || [];
    


    function fecthData(){    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        
         let dezenas_sorteadas = data.listaDezenas;
         
         let resultado_atual = dezenas_sorteadas;
        
         console.log(resultado_atual);

         
    cards_salvos.forEach((cardData) => {    
        const card_jogo = document.createElement("div");
        card_jogo.classList.add("container-jogo-salvo");
        
        const container_dezenas = document.createElement("div");
        container_dezenas.classList.add("dezenas");


        let dezena_gera;
        
            cardData.numeros.forEach(numero => {
            
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
        const numeros_iguais = numeros_gerados.filter(numero => resultado_atual.includes(numero));
        const quantidade_de_acertos = numeros_iguais.length;

       switch(quantidade_de_acertos){
        case 11:
            card_jogo.classList.add("onze");
            break;
        case 12:
            card_jogo.classList.add("doze");
            break;
        case 13:
            card_jogo.classList.add("treze");
            break;
        case 14:
            card_jogo.classList.add("quatorze");
            break;
        case 15:
            card_jogo.classList.add("quinze");
            break;
      
       }
       

        const conferidos = document.createElement("div");
        conferidos.innerHTML = `<h2>${quantidade_de_acertos} </h2> <p>Acertos</p>`;
        conferidos.classList.add("acertos"); 
        card_jogo.appendChild(conferidos);

        console.log(numeros_iguais);
        
        document.getElementById('lista-jogos-salvos').appendChild(card_jogo);
              
       
    

   
        
     } );

    });
    }

    
   fecthData();



    

    
});