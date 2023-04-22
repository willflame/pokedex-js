const pokemonList = document.getElementById("pokemon-list");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonTypesToLi(types) {
  return types.map(
    (type) => `<li class="pokemon-card__type ${type}">${type}</li>`
  );
}

function convertPokemonToHtmlLi(pokemon) {
  return `
    <li class="pokemon-card ${pokemon.type}">
        <span class="pokemon-card__number">#${pokemon.number}</span>
        <span class="pokemon-card__name">${pokemon.name}</span>

        <div class="poemon-card__detail">
            <ol class="pokemon-card__type-list">
                ${convertPokemonTypesToLi(pokemon.types).join("")}
            </ol>

            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
              class="pokemon-card__img"
            />
        </div>
    </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      pokemonList.innerHTML += pokemons.map(convertPokemonToHtmlLi).join("");
    })
    .catch((error) => console.log({ error }));
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsNextPage = offset + limit;

  if (qtdRecordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
