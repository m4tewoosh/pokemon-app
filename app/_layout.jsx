import { createContext, useState } from 'react';
import { Stack } from 'expo-router';

export const FavouritesContext = createContext(null);

const RootLayout = () => {
  const [favourites, setFavourites] = useState([]);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerTitle: 'Pokédex' }} />
      </Stack>
    </FavouritesContext.Provider>
  );
};

export default RootLayout;
