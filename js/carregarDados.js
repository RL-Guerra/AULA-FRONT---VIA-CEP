import { dadosCep } from "./dados.js"

//receber botão pesquisar no JS
const botaoPesquisar = document.getElementById('pesquisar')

//Função tradicional
function validadarDados() {
    let caixaCep = String(document.getElementById('input-cep').value)
    let status = false

    //Validação da caixa em branco 
    if (caixaCep == '') {
        alert('Não foi possivel realizar a busca, pois a caixa esta vazia ')
        status = true
        //validação da quantidade 
    } else if (caixaCep.length != 9) {
        alert('É obrigatorio a entrada de 9 digitos para cep')
        status = true
    }
    return status
}

//Função anonima
//Manipula dados local
const getDadosCep =  function () {
/*     let contador = 0
    while(contador < dadosCep.dados.length){
        console.log(dadosCep.dados[0].cep)
        contador++
    } */
   //ForEach é um metodo de um array que percorre o array e retorna atraves de uma função de call back, cada elemento do array

   let status = false
   let caixaCep = document.getElementById('input-cep').value

   dadosCep.dados.forEach(function(item){
    //\vslidação para buscar o cep digitado dentro do array
    if(caixaCep == item.cep){
        status = true
        setDadosForm(item)
    }
   })
   return status
}
//Função anonima
//Manipula dados da API ViaCep
const getDadosCepAPI = async function(){
    let caixaCep = document.getElementById('input-cep').value
    let url = `https://viacep.com.br/ws/${caixaCep}/json/`
    
    //Realiza a requisição na API e aguarda o retorno dos dados
    let res = await fetch(url)

    //Converte o retorno dos dados em formato JSON
    let dados = await res.json()

    setDadosForm(dados)
}

//Arrow Function
const setDadosForm = (dados) => {
    //Coloca no formulário os dados do Array
    document.getElementById('logradouro').value = dados.logradouro
    document.getElementById('complemento').value = dados.complemento
    document.getElementById('bairro').value = dados.bairro
    document.getElementById('cidade').value = dados.localidade
    document.getElementById('estado').value = dados.uf
}


//evento de escuta, espera um evento(clique) no HTML dentro do botão 
botaoPesquisar.addEventListener('click', function () {
})
//grande parte dos eventos trabalham com função de callback chama, e da retorno pela função

botaoPesquisar.addEventListener('click', function () {
    if (!validadarDados()) {
        if(!getDadosCepAPI()){
            alert('CEP não encontrado!')
        }
    }
})