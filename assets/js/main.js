//*obtem a data e hora atual
var data = new Date();
const hora = data.getHours();

//* Função para saudar o usuário com base na hora
const saudarUsuario = () => {
    if(hora >= 5 &&  hora < 12){
        return 'Bom Dia!';
    }else if(hora >= 12 && hora < 18){
        return 'Boa Tarde!';
    }else{
        return 'Boa Noite!';
    }
}

//*saudação
const saudacao = `<strong class="saudacao">${saudarUsuario()}</strong><br> Bem-vindo ao App Search Countries! `;

//* mensagem de boas vindas ao usuário-------------------
const mensagem = sessionStorage.getItem('exibido');

if(!mensagem){

    Swal.fire({
        imageUrl: 'assets/img/icon.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'logo',
        position: 'center',
        title: saudacao,
        html: '<p class="texto">Explore informações detalhadas sobre países de todo o mundo. Pesquise por nomes de países para descobrir dados como capital, população, moeda, bandeira, brasão e muito mais. Divirta-se explorando!</p>',
        showConfirmButton: true,
        confirmButtonText: "Vamos lá!!",
        confirmButtonColor: "#84b082",
        background: 'rgba(13,44,84,0.98)',
        customClass: {
            title: 'custom-title', 
            confirmButton: 'custom-button'
        }      
    });

   //sessionStorage.setItem('exibido', true);
}
//*-------------------------------------------------------

//* Seleciona o formulario
const form = document.getElementById('form');


//* Seleciona as divs para mostrar os resultados na tela
const result = document.getElementById('divResult');
const flag = document.getElementById('divFlag');
const brasao = document.getElementById('divBrasao');
const rowDiv = document.querySelector('.row');

//* Evita que o formulário seja enviado e a página recarregada automaticamente
form.addEventListener('submit', function(event){

    event.preventDefault();
});

//* Função para buscar informações de um País
function getDataCountry(){

    //* Seleciona o input
    const country = document.getElementById('country').value;
    

    //* Solicitação HTTP para a API REST Countries
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {

            //* Extrai os dados retornados do respectivo País pesquisado
            const population = data[0].population;
            const name = data[0].name.common;
            const capital = data[0].capital[0];
            const region = data[0].region;
            const continent = data[0].continents;
            const flagUrl = data[0].flags.png;
            const brasaoUrl = data[0].coatOfArms.png;  


            //* Limpa o conteudo anterior da div resultado
            result.innerHTML = '';

            //*Cria uma nova div para os resultados
            const divResult = document.createElement('div');
            divResult.id = 'divResult';


            //*Cria um novo elemento html para o titulo
            const title = document.createElement('span');
            title.textContent = '';
            divResult.appendChild(title);
                        
            
            //*|| Itera pelas chaves do objeto 'nativeName' ||
            let languageData;                            
            let officialName;
            let nativeName; 

            for (const languageCode in data[0].name['nativeName'] ) {
                languageData = languageCode;
                officialName = data[0].name['nativeName'][languageCode].official;
                nativeName = data[0].name['nativeName'][languageCode].common;
                break;                
           } 

           //*|| Itera pelas chaves do objeto currencies ||
           let currency;
           let currencyCode;
           let currencySymbol;

            for(const code in data[0].currencies){

                currencyCode = code;
                currency = data[0].currencies[code].name;
                currencySymbol = data[0].currencies[code].symbol;
                break;
            }  

            //* Verifica se os dados são válidos e imprime na tela
            if(name){
                result.innerHTML += '<p><span>Nome País: </span>' + name + '</p>';
                rowDiv.classList.add('background-white');
            }else{
                result.innerHTML += '<p><span>Nome País: </span> Sem informações!</p>';
            }

            if(capital){
                result.innerHTML += '<p><span>Capital: </span>' + capital + '</p>';
            }else{
                result.innerHTML += '<p><span>Capital: </span> Sem informações!</p>';
            }

            if(officialName){
                result.innerHTML += '<p><span> Nome Oficial: </span>' + officialName + '</p>';
            }else{
                result.innerHTML += '<p><span>Nome Oficial: </span> Sem informações!</p>';
            }

            if(nativeName){
                result.innerHTML += '<p><span>Nome Nativo: </span>' + nativeName + '</p>';
            }else{
                result.innerHTML += '<p><span>Nome Nativo: </span> Sem informações!</p>';
            }

            if(population){
                result.innerHTML += '<p><span>População: </span>' + population + '</p>';
            }else{
                result.innerHTML += '<p><span>População: </span> Sem informações!</p>';
            }

            if(continent){
                result.innerHTML += '<p><span>Continente: </span>' + continent + '</p>';
            }else{
                result.innerHTML += '<p><span>Continente: </span> Sem informações!</p>';
            }

            if(region){
                result.innerHTML += '<p><span>Região: </span>' + region + '</p>';
            }else{
                result.innerHTML += '<p><span>Região: </span> Sem informações!</p>';
            }

            if(currency){
                result.innerHTML += '<p><span>Moeda: </span>' + currency + '</p>';
            }else{
                result.innerHTML += '<p><span>Moeda: </span> Sem informações!</p>';
            }

            if(currencySymbol){
                result.innerHTML += '<p><span>Símbolo Moeda: </span>' + currencySymbol + '</p>';
            }else{
                result.innerHTML += '<p><span>Símbolo Moeda: </span> Sem informações!</p>';
            }

            if(currencyCode){
                result.innerHTML += '<p><span>Código Moeda: </span>' + currencyCode + '</p>';
            }else{
                result.innerHTML += '<p><span>Código Moeda: </span> Sem informações!</p>';
            }

            if(flagUrl){
                flag.innerHTML = `<p><span>Bandeira: </span></p><img class="flag" src="${flagUrl}">`; 
            }

            if(brasaoUrl){
                brasao.innerHTML = `<p><span>Brasão: </span></p><img class="brasao" src="${brasaoUrl}">`;  
            }                 
                                           
        })
        .catch(error => {
            console.error('Nada encontrado'+error);          

        });
}

//* Chamada da função para a requisição http
getDataCountry();


//* Chamada do arquivo JSON com a lista de países
fetch('assets/json/paises.json')
    .then(response => response.json())
    .then(data => {

        const countrySelect = document.getElementById('country');

        //* Loop no array de paises
        data.forEach(pais => {

            const option = document.createElement('option');
            option.value = pais.nameEnglish;
            option.textContent = pais.namePT;
            countrySelect.appendChild(option);
            
        });


    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo JSON: ' + error)
    });



