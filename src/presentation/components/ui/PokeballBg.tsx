
import { useContext } from "react"
import { StyleProp, Image, ImageStyle } from "react-native"
import { ThemeContext } from "../../context/ThemeContext"

interface PokeballBgProps {
    style : StyleProp<ImageStyle>
}

export const PokeballBg = ({ style } : PokeballBgProps) => {
    const { isDark } = useContext(ThemeContext)
    const pokeballImg = isDark ? require('../../../assets/pokeball-light.png') : require('../../../assets/pokeball-dark.png')

  return (
    <Image
        source={pokeballImg}
        style={[
            { 
                width: 300,
                height: 300,
                opacity: 0.3
            },
            style
        ]}
    />
  )
}

