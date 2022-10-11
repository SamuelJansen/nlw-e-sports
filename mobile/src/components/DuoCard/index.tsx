import { View, TouchableOpacity, Text } from 'react-native';
import { AddApi } from '../../screens/Game';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native';

import { styles } from './styles';


interface Props {
  data: AddApi,
  onConnect: () => void
}

export const DuoCard = ({ data, onConnect }: Props) => {

  return (
    <View style={styles.container}>

      <DuoInfo
        label="Nome"
        value={data.name}
      />

      <DuoInfo
        label="Tempo de Jogo"
        value={`${data.yearsPlaying} anos`}
      />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de audio"
        value={`${data.useVoiceChannel ? "Sim" : "Não"}`}
        colorValue={`${data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}` }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => onConnect()}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={THEME.ICONS.SIZE.DEFAULT}
        />        
        <Text style={styles.buttonTitle} > 
          Conectar
        </Text>
      </TouchableOpacity>

    </View>
  );
}