import { 
  Text,
  TouchableOpacity, 
  TouchableOpacityProps, 
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from "../../theme"
import { styles } from './styles';

export interface GameCardProps {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps
}

export const GameCard = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}
      onAccessibilityAction={() => {
        console.log(`did hit ${data.title} onAccessibilityAction`)
      }}
      onAccessibilityTap={() => {
        console.log(`did hit ${data.title} onAccessibilityTap`)
      }}
      onPressIn={() => {
        console.log(`did hit ${data.title} onPressIn`)
      }}
    >
      <ImageBackground
        style={styles.cover}
        source={{uri: data.bannerUrl}}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>
          <Text style={styles.ads}>
            {data._count.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}