import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Pokemon from './Pokemon';
import { fullWidth } from '../utils';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=40&offset=1'
    );

    const parsedResponse = await response.json();

    const pokemons = parsedResponse.results;

    const pokemonsPromiseList = [];

    pokemons.forEach(async ({ url }) => {
      pokemonsPromiseList.push(fetch(url).then((response) => response.json()));
    });

    Promise.all(pokemonsPromiseList).then((pokemons) => {
      setPokemons(pokemons);
    });
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <ScrollView
      style={{}}
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 4,
        width: fullWidth,
      }}
    >
      {pokemons.map((pokemon) => (
        <View
          key={pokemon.name}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            width: '50%',
            padding: 4,
          }}
        >
          <Pokemon pokemonData={pokemon} />
        </View>
      ))}
    </ScrollView>
  );
};

export default PokemonList;
