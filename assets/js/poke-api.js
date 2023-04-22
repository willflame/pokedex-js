const baseUrl = "https://pokeapi.co/api/v2";
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokemonDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokemonDetail.order;
  pokemon.name = pokemonDetail.name;
  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.type = type;
  pokemon.types = types;

  return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
  return await fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
  const url = `${baseUrl}/pokemon?offset=${offset}&limit=${limit}`;

  return await fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then(async (detailsRequests) => await Promise.all(detailsRequests));
};
