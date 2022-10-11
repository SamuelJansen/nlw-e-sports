import { ActivityIndicator, View } from 'react-native';
import { THEME } from "../../theme"
import { styles } from './styles';

interface Props {
    children: React.ReactNode;
}

export const Loading = () => {
  return (
    <View
        style={styles.container}
    >
        <ActivityIndicator
            color={THEME.COLORS.PRIMARY}
        />

    </View>
  );
}