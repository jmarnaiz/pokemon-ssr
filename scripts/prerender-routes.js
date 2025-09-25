const TOTAL_POKEMON = 10;
const TOTAL_PAGES = 5;

function generateFile(path, total) {
  return Array.from({ length: total }, (_, i) => `${path}/${i + 1}`).join("\n");
}

(async () => {
  const fs = require("fs");
  const filePokemonContent = generateFile("/pokemon", TOTAL_PAGES);
  const filePokemonPagesContent = generateFile("/pokemon/page", TOTAL_POKEMON);

  let fileContent = filePokemonContent
    .concat("\n")
    .concat(filePokemonPagesContent);

  // By pokemon name
  const pokemonNamesList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`
  ).then((res) => res.json());

  fileContent += "\n";

  fileContent += pokemonNamesList.results
    .map((pokemon) => `/pokemon/${pokemon.name}`)
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent);

  // const pokemonIds = Array.from({ length: TOTAL_POKEMON }, (_, i) => i + 1);
  // const pokemonPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  // let filePokemonContent = pokemonIds.map((id) => `pokemon/${id}`).join("\n");
  // let filePokemonPagesContent = pokemonIds
  //   .map((id) => `pokemon/page/${id}`)
  //   .join("\n");

  // fs.writeFileSync(
  //   "routes.txt",
  //   filePokemonContent.concat("\n").concat(filePokemonPagesContent)
  // );
  console.log("Routes succesfully generated");
})();
