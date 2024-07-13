import { useContext, useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { colors, pad } from '../utils';
import { FavouritesContext } from '../_layout';

const spriteUri =
  'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images';

const StatText = ({ name, stat }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          textTransform: 'capitalize',
          fontWeight: 600,
        }}
      >
        {name}:
      </Text>
      <View
        style={{
          backgroundColor: stat < 50 ? colors['red'] : colors['green'],
          borderRadius: 10,
          padding: 8,
        }}
      >
        <Text
          style={{
            color: stat < 50 ? colors['darkRed'] : 'green',
            fontWeight: 700,
          }}
        >
          {stat}
        </Text>
      </View>
    </View>
  );
};

const PokemonDetails = () => {
  const { id } = useLocalSearchParams();

  const [pokemon, setPokemon] = useState();
  const [species, setSpecies] = useState();

  const { favourites, setFavourites } = useContext(FavouritesContext);

  let isPokemonInFavourites = false;

  isPokemonInFavourites =
    favourites?.findIndex((favourite) => favourite?.id === pokemon?.id) !== -1
      ? true
      : false;

  const { name: pokemonName, height, weight, abilities, stats } = pokemon || {};

  const { color } = species || {};

  const fetchPokemonDetails = async (id) => {
    const detailsResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    const pokemonDetails = await detailsResponse.json();

    setPokemon(pokemonDetails);

    const {
      species: { url: speciesUrl },
    } = pokemonDetails;

    const speciesResponse = await fetch(speciesUrl);
    const speciesDetails = await speciesResponse.json();

    setSpecies(speciesDetails);
  };

  useEffect(() => {
    fetchPokemonDetails(id);
  }, [id]);

  const handleAddToFavourites = () => setFavourites([...favourites, pokemon]);

  const handleRemoveFromFavourites = () =>
    setFavourites([
      ...favourites.filter((favourite) => favourite?.id !== pokemon.id),
    ]);

  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Stack.Screen options={{ headerTitle: `Pokemon #${id}` }} />
      {pokemon && species ? (
        <>
          <View
            style={{
              flex: 2,
              backgroundColor: colors[color.name] || 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            }}
          >
            <Text
              style={{
                color: color.name === 'white' ? 'black' : 'white',
                textTransform: 'capitalize',
                fontSize: 30,
                fontWeight: '300',
                textAlign: 'left',
              }}
            >
              {pokemonName}
            </Text>
            <Image
              style={{
                width: 200,
                height: 200,
              }}
              source={{ uri: `${spriteUri}/${pad(id, 3)}.png` }}
            />
          </View>
          <View style={{ flex: 4, paddingTop: 30, paddingHorizontal: 50 }}>
            <TouchableOpacity
              style={{
                height: 30,
                width: 200,
                backgroundColor: isPokemonInFavourites
                  ? colors['red']
                  : '#87ceeb',
                borderRadius: 10,
                alignSelf: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              title={
                isPokemonInFavourites
                  ? 'Delete from favourites'
                  : 'Add to favourites'
              }
              onPress={() => {
                isPokemonInFavourites
                  ? handleRemoveFromFavourites()
                  : handleAddToFavourites();
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                  color: 'white',
                }}
              >
                {isPokemonInFavourites
                  ? 'Delete from favourites'
                  : 'Add to favourites'}
              </Text>
            </TouchableOpacity>
            <Text style={{ paddingTop: 30, paddingBottom: 10 }}>
              Height: {height * 10} cm
            </Text>
            <Text style={{ paddingVertical: 10 }}>
              Weight: {weight / 10} kg
            </Text>
            <Text style={{ paddingVertical: 10 }}>
              Abilities:{' '}
              {abilities.map(({ ability: { name } }) => (
                <Text
                  style={{
                    textTransform: 'capitalize',
                  }}
                  key={name}
                >
                  {name}{' '}
                </Text>
              ))}
            </Text>
            <Text style={{ fontWeight: 400, marginTop: 16, marginBottom: 16 }}>
              Stats:
            </Text>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {stats.map(({ base_stat, stat: { name } }) => (
                <StatText key={name} name={name} stat={base_stat} />
              ))}
            </View>
          </View>
        </>
      ) : (
        <Text>loading</Text>
      )}
    </ScrollView>
  );
};

export default PokemonDetails;
