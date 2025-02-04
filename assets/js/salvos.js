document.addEventListener('DOMContentLoaded', () => {
    const resultado_atual = [1,2,4,5,8,10,11,12,13,16,19,21,22,24,25]
  
    const cards_salvos = JSON.parse(localStorage.getItem('jogo_salvo')) || [];
    

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

             if (resultado_atual.includes(Number(numero))) {
                dezena_gera.classList.add("cor-acerto");
            }
                
     
        });  
        card_jogo.appendChild(container_dezenas);
        
        const numeros_gerados = cardData.numeros.map(Number);
        const numeros_iguais = numeros_gerados.filter(numero => resultado_atual.includes(numero));
        const quantidade_de_acertos = numeros_iguais.length;

       
       

        const conferidos = document.createElement("div");
        conferidos.innerHTML = `<h2>${quantidade_de_acertos} </h2> <p>Acertos</p>`;
        conferidos.classList.add("acertos"); 
        card_jogo.appendChild(conferidos);

        console.log(numeros_iguais);
        
        document.getElementById('lista-jogos-salvos').appendChild(card_jogo);
              
       
    

   
        
     } );


    

    
});