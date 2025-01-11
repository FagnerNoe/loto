

document.addEventListener('DOMContentLoaded',function(){

let valor_premio = document.getElementById("valor-premio");
const box_resultados = document.querySelector(".valor-calculos");    
let valor_investimento = document.getElementById('valor-investido');
let quantidade_de_membros = document.getElementById('quantidade-membros');
let taxa_de_juros = document.getElementById('taxa-de-juros');
let um_mes = document.getElementById('um-mes');
let seis_meses = document.getElementById('seis-meses');
let um_ano = document.getElementById('um-ano');
let dois_anos = document.getElementById('dois-anos');
    


valor_premio.addEventListener('input',(e) => {     
    let valor = e.target.value.replace(/\D/g, '');//Remover caracteres não numericos 
    valor = (valor/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});    
    e.target.value = valor;
    quantidade_de_membros.value == "" ? quantidade_de_membros.value = 3 : quantidade_de_membros.value;  
    let premio = parseFloat(e.target.value.replace(/[^\d,-]/g, '').replace(',', '.'));  
    const total = premio / quantidade_de_membros.value;
    let valor_por_membro = document.getElementById('valor-premio-dividido');
    box_resultados.classList.add('show');    
    valor_por_membro.innerHTML= total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});    
   valor_investimento.value= total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    console.log(valor);
    console.log(quantidade_de_membros.value);

    taxa_de_juros.value == '' ? taxa_anual = 6 : taxa_anual = taxa_de_juros.value;
    converterJuros(taxa_anual);

    
     
});

quantidade_de_membros.addEventListener('input',(e) => { 
    let membros = e.target.value ;
    membros=="" ? membros = 1 : membros.value; 

    const premio = parseFloat(valor_premio.value.replace(/[^\d,-]/g, '').replace(',', '.')); 
    
    

    const total = premio/membros; 
    console.log(valor_premio.value);
    console.log(membros);
    let valor_por_membro = document.getElementById('valor-premio-dividido');      
    valor_por_membro.innerHTML= total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
     valor_investimento.value= total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

       taxa_de_juros.value == '' ? taxa_anual = 6 : taxa_anual = taxa_de_juros.value;
    converterJuros(taxa_anual);

    });

 valor_investimento.addEventListener('input',(e) => {
         let valor = e.target.value.replace(/\D/g, '');//Remover caracteres não numericos 
    valor = (valor/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});    
    e.target.value = valor;

       taxa_de_juros.value == '' ? taxa_anual = 6 : taxa_anual = taxa_de_juros.value;
    converterJuros(taxa_anual);

 });   

 taxa_de_juros.addEventListener('input',(e) => {
              let valor = e.target.value;//Remover caracteres não numericos 
       
    

       taxa_de_juros.value == '' ? taxa_anual = 6 : taxa_anual = taxa_de_juros.value;
    converterJuros(taxa_anual);

 });



    function converterJuros(taxa_anual){
        //Converte em decimal
        let taxa_anualDecimal = taxa_anual/100;

        //Aplica a formula para encontrar a taxa mensal
        let taxa_mensal_decimal = Math.pow(1+taxa_anualDecimal,1/12)-1;

        //Converte para porcentagem
        let taxa_mensal = taxa_mensal_decimal*100;
        console.log(taxa_anual);
        console.log(taxa_mensal);

        let valor_investido = parseFloat(valor_investimento.value.replace(/[^\d,-]/g, '').replace(',', '.'));
        console.log(valor_investido);
        let rendimento = valor_investido * (taxa_mensal_decimal);
        
        rendimento_formatado = rendimento.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        let rendimento_6_meses = (rendimento *6).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        let rendimento_12_meses = (rendimento *12).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        let rendimento_24_meses = (rendimento *24).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

        um_mes.innerHTML = rendimento_formatado;
        seis_meses.innerHTML = rendimento_6_meses; ;
        um_ano.innerHTML = rendimento_12_meses;
        dois_anos.innerHTML = rendimento_24_meses;
        

        console.log(rendimento.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));

    }

    document.querySelector(".botao-zerar").addEventListener('click',(e) =>{
        e.preventDefault();
        valor_premio.value = "";
        quantidade_de_membros.value = "";
        valor_investimento.value = "";
        taxa_de_juros.value = "";
        um_mes.innerHTML = "";
        seis_meses.innerHTML = "";
        um_ano.innerHTML = "";
        dois_anos.innerHTML = "";
        box_resultados.classList.remove('show');

    });

    





});









