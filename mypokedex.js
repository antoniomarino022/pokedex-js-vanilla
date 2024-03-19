
// CREO UNA FUNZIONE PER GENERARE NUMERI CASUALI CON DEI PARAMETRI
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// PUNTO I SEGUENTI ID
let input = document.getElementById('inputPoke');
let btnSearch = document.getElementById('search');


// FUNZIONE ASYNCRONA, IL PARAMETRO HA DI DEFAUL 'NULL'
async function pokemon(pokemonName = null) {

    // INSERISCO NEL TRY UN BLOCCO DI CODICE CHE POTREBBE GENERARE ERRORI
    try {

        // PUNTO I SEGUENTI ID
        const ctn = document.getElementById('container');
        const pokeCard = document.getElementById('card');

        // PULISCO LA CARD
        pokeCard.innerHTML = ''; 

        // CREO UNA VARIABILE A CUI INSERISCO L'API
        let url = "https://pokeapi.co/api/v2/pokemon/";

        // se pokemonName è valido prenderemo il pokemon inserendo il suo nome
        // altrimenti generiamo un pokemon random
        if (pokemonName) {
            url = url + pokemonName.toLowerCase();
        } else {
            let pokeRandom = random(1, 151);
            url = url + pokeRandom;
        }
       
        // CHIAMATA API
        const response = await fetch(url);

        // TRASFORMO LA CHIAMATA IN UN FILE JSON
        const data = await response.json();

        // CREO UN ELEMENTO DIV PER CONTENERE L'IMMAGINE E LE INFORMAZIONI DEL POKEMON
        const div = document.createElement('div');
        div.classList.add('bg-white', 'w-[400px]', 'h-[250px]', 'rounded-[20px]', 'flex',
         'justify-center', 'items-center', 'shadow-lg', 'shadow-blue-700');



        // CREO GLI ELEMENTI PER L'IMMAGINE E LE INFORMAZIONI DEL POKEMON
        const img = document.createElement('img');
        const pokeId = document.createElement('p');
        const pokeName = document.createElement('p');

        // INSERISCO I DATI DEI POKEMON AI RISPETTIVI ELEMENTI
        img.src = data.sprites.front_default;
        img.alt = data.name;
        pokeId.textContent = 'ID: ' + data.id;
        pokeName.textContent = 'NAME: ' + data.name;

        pokeId.classList.add('absolute','top-[180px]')
        pokeName.classList.add('absolute','top-[20px]')

        // APPENDO GLI ELEMENTI ALL'ELEMENTO DIV
        div.appendChild(img);
        div.appendChild(pokeId);
        div.appendChild(pokeName);

        // APPENDO L'ELEMENTO DIV ALLA VARIABILE POKECARD
        pokeCard.appendChild(div);


        // APPENDO IL CTN A POKECARD
        ctn.appendChild(pokeCard);
       
        
        // MESSAGGIO IN CASO DI ERRORE
    } catch (error) {
        alert('error');
    }
}


// trim si usa per rimuovere eventuali spazi bianchi
btnSearch.addEventListener('click', function() {
    const pokemonName = input.value.trim();
    if (pokemonName !== '') {
        pokemon(pokemonName);
    }
});