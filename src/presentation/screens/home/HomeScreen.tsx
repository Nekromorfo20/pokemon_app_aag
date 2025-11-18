
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { View, StyleSheet, FlatList } from "react-native"
import { getPokemons } from "../../../actions/pokemons"
import { PokeballBg } from "../../components/ui/PokeballBg"
import { FAB, Text, useTheme } from "react-native-paper"
import { globalTheme } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PokemonCard } from "../../components/pokemons/PokemonCard"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigator/StackNavigator"

interface HomeScreenProps extends StackScreenProps<RootStackParams, 'HomeScreen'>{}

export const HomeScreen = ({ navigation } : HomeScreenProps) => {
  const { top } = useSafeAreaInsets()
  const queryclient = useQueryClient()
  const theme = useTheme()

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam)
      pokemons.forEach(pokemon => {
        queryclient.setQueryData(['pokemon', pokemon.id], pokemon)
      })
      return pokemons
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, // 60 min
  })

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemons, index) => `${pokemons.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => (
          <Text variant='displayMedium' >Pókedex</Text>
        )}
        renderItem={({ item }) => ( <PokemonCard pokemon={item}/> )}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        label="Buscar"
        style={[globalTheme.fab, { backgroundColor: theme.colors.primary }]}
        mode="elevated"
        onPress={() => navigation.push('SearchScreen')}
        color={theme.dark ? 'black' : 'white'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100
  }
})