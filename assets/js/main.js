const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById('loadMoreButton')

const limit =12
let offset = 0
const maxRecords = 151


function convertPokemonTypestoLi(pokemonTypes){
return pokemonTypes.map((typeSlot)=>`<li class="type">${typeSlot.type.name}</li>`)
}


function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}"><span class="number">#${pokemon.number}</span> <span class="name"> ${pokemon.name}</span>${pokemon.height} ${pokemon.abilities}
            <div class="details">
                <ol class="types">
  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol> <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
`;
}

function loadPokemonItems(offset, limit){
pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
  const newHtml = pokemons.map(convertPokemonToLi).join("");
  pokemonList.innerHTML += newHtml;
})
}

loadPokemonItems(offset,limit)


loadMoreButton.addEventListener('click', ()=>{
offset += limit
const qtdRecordsWithNexPage = offset + limit

if(qtdRecordsWithNexPage>= maxRecords){
  const newLimit = maxRecords - offset
  loadPokemonItems(offset, newLimit)

  loadMoreButton.parentElement.removeChild(loadMoreButton)
}else{
  loadPokemonItems(offset, limit)
}

})