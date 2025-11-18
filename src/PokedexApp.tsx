
import { StackNavigator } from "./presentation/navigator/StackNavigator"
import { ThemeContextProvider } from "./presentation/context/ThemeContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryclient = new QueryClient()

export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryclient}>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}
