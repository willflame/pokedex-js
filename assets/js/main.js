const offset = 0;
const limit = 10;
const baseUrl = "https://pokeapi.co/api/v2";
const url = `${baseUrl}/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToHtmlLi(pokemon) {
  return `
    <li class="pokemon-card">
        <span class="pokemon-card__number">#001</span>
        <span class="pokemon-card__name">${pokemon.name}</span>

        <div class="poemon-card__detail">
            <ol class="pokemon-card__type-list">
                <li class="pokemon-card__type">grass</li>
                <li class="pokemon-card__type">poison</li>
            </ol>

            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493-bug.png"
              alt="${pokemon.name}"
              class="pokemon-card__img"
            />
        </div>
    </li>
    `;
}

fetch(url)
  .then((response) => response.json())
  .then((jsonBody) => jsonBody.results)
  .then((pokemonList) => {
    const pokemonsListElement = document.getElementById("pokemon-list");

    if (pokemonList.length > 0) {
      pokemonList.map((pokemon) => {
        pokemonsListElement.innerHTML += convertPokemonToHtmlLi(pokemon);
      });
    }
  })
  .catch((error) => console.log({ error }));
