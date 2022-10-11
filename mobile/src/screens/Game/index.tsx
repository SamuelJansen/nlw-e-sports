import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { View, Image, FlatList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import logImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameRouteParams } from '../../@types/navigation';

import { THEME } from '../../theme';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import { API_BASE_URL } from '../../constant';
import { useEffect, useState } from 'react';


export interface AddApi {
  gameId: string,
  hourEnd: string,
  hourStart: string,
  id: string,    
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number,
}

export const Game = () => {

  const [duos, setDuos] = useState<AddApi[]>([])
  const route = useRoute()
  const navigator = useNavigation()
  const game = route.params as GameRouteParams

  const handleGoBack = () => {
    navigator.goBack()
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => {
        setDuos(data)
      })
  }, [])

  return (
    <Background>

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleGoBack()}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={THEME.ICONS.SIZE.DEFAULT}
            />
          </TouchableOpacity>    

          <Image
            source={logImg}
            style={styles.logo}
            resizeMode="cover"
          />

          <View style={styles.backIconHidder} />

        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comce a jogar"
        />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <DuoCard 
                data={item}
                onConnect={() => {}}
              />
            )
          }}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[0 < duos.length ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return(
              <Text style={styles.emptyAds} > 
                Não há anúncios publicados
              </Text>
            )
          }}
        />

      </SafeAreaView>

    </Background>
  );
}