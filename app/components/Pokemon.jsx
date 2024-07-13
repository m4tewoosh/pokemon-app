import { useContext, useEffect, useState } from 'react';
import { View, Image, Button } from 'react-native';
import { Link } from 'expo-router';
import { colors, pad } from '../utils';
import { FavouritesContext } from '../_layout';

const spriteUri =
  'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images';

const Pokemon = ({ pokemonData, isFavouritesList }) => {
  const [species, setSpecies] = useState({});

  const {
    name,
    species: { url: speciesUrl },
  } = pokemonData;

  const fetchSpecies = async () => {
    const response = await fetch(speciesUrl);

    const species = await response.json();

    setSpecies(species);
  };

  const { favourites, setFavourites } = useContext(FavouritesContext);

  const handleRemoveFromFavourites = () =>
    setFavourites([
      ...favourites.filter((favourite) => favourite?.id !== pokemonData.id),
    ]);

  useEffect(() => {
    fetchSpecies();
  }, []);

  return (
    <View
      style={{
        height: 120,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors[species?.color?.name] || 'white',
        borderRadius: 10,
        gap: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Image
          style={{
            width: 80,
            height: 80,
          }}
          source={{ uri: `${spriteUri}/${pad(pokemonData.id, 3)}.png` }}
        />
        <Link
          href={`/pokemons/${pokemonData.id}`}
          style={{
            textTransform: 'capitalize',
            fontSize: 20,
            fontWeight: 300,
          }}
        >
          {name}
        </Link>
      </View>
      {isFavouritesList && (
        <Button
          onPress={handleRemoveFromFavourites}
          title="Remove from favourites"
        />
      )}
    </View>
  );
};

export default Pokemon;
