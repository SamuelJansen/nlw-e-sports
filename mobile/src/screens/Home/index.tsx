import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { API_BASE_URL } from '../../constant';

import { styles } from './styles';

interface Props {
    children: React.ReactNode;
}

export const Home = () => {

  const [games, setGames] = useState<GameCardProps[]>([]) 
  const navigation = useNavigation()

  const handleOpenGame = ({ id, title, bannerUrl}: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl})
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <Background>

      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />
        <Heading
          title='Encontre seu duo'
          subtitle='Selecione o game que deseja jogar'
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
      
    </Background>
  );
}