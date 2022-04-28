const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonPromises = []
    for (let i=1; i<=150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()) )  
        // Versão moderna para se fazer requisições AJAX no browser. Esse método fetch retorna uma promise. O método then recebe a resposta de sucesso da promise. Essa resposta é passada como parâmetro da função de callback do then.
    }
     //Método estático do construtor Promise. Não preciso do new. Recebe um array de promises. Quando todas as promises estiverem resolvidas, esse método retorna uma promise também.
     Promise.all(pokemonPromises).then( pokemons  => { //Aqui gera um array de 150 objetos.
            const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{ // Para transformar o array em um string, usa-se o reduce.
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                    <li class = 'card' ${types[0]}>
                    <img class='card-image ' alt = '${pokemon.name}' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png'/>
                        <h2 class= 'card-title'>${pokemon.id}. ${pokemon.name}</h2>
                        <p class= 'card-subtitle'> ${types.join(' | ')}</p>
                    </li>` 
                return accumulator
            },'')

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = lisPokemons
        })
}
fetchPokemon()