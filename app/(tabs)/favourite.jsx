import { useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { fullWidth } from '../utils';
import { FavouritesContext } from '../_layout';
import Pokemon from '../components/Pokemon';

export default () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <>
      {favourites.length ? (
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
          {favourites.map((favourite) => (
            <View
              key={favourite.name}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '50%',
                padding: 4,
              }}
            >
              <Pokemon pokemonData={favourite} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={{ textAlign: 'center' }}>
          Add some pokemons to favourites
        </Text>
      )}
    </>
  );
};
