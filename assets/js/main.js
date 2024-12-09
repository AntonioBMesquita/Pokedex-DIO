const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 12;
let offset = 0;
const maxRecords = 151;

function convertPokemonTypestoLi(pokemonTypes) {
  return pokemonTypes.map(
    (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
  );
}

function convertPokemonToLi(pokemon) {
  return ` <li class="pokemon ${pokemon.type}"><span class="number">#${pokemon.number}</span> 
  <span class="name"> ${pokemon.name}</span> 
  <div class="details hidden"> 
  <p>Altura: ${pokemon.height}</p> 
  <p>Peso: ${pokemon.weight} KG</p> 
  <p>HP: ${pokemon.hp}</p> 
  <p>Habilidades: ${pokemon.abilities.join(', ')}</p> 
  </div>
  <ol class="types"> ${pokemon.types.map((type) => 
    `<li class="type ${type}">${type}</li>`).join("")} </ol> 
    <img src="${pokemon.photo}" alt="${pokemon.name}"> 
    </div> 
    </li> `;
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
    const pokemonItems = document.querySelectorAll(".pokemon");
    pokemonItems.forEach((item) => {
      item.addEventListener("click", () => {
        const details = item.querySelector(".details");
        details.classList.toggle("hidden");
      });
    });
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
