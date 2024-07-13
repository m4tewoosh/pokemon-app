import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="pokemonList"
        options={{ headerShown: false, title: 'Pokemon list' }}
      />
      <Tabs.Screen
        name="favourite"
        options={{ headerShown: false, title: 'Favourite pokemons' }}
      />
    </Tabs>
  );
};
