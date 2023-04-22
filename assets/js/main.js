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

pokeApi
  .getPokemons()
  .then((pokemons = []) => {
    const pokemonList = document.getElementById("pokemon-list");

    pokemonList.innerHTML += pokemons.map(convertPokemonToHtmlLi).join("");
  })
  .catch((error) => console.log({ error }));
