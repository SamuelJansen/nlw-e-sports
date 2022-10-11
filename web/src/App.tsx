import * as Dialog from '@radix-ui/react-dialog'

import logoImg from './assets/logo-image.svg'

import { useEffect, useState } from 'react'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreatAdBanner'
import { API_BASE_URL } from './constant'
import { CreateAdModal } from './components/CreateAdModal'

import './styles/main.css'

interface GameApi {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

const App = () => {

  const [games, setGames] = useState<GameApi[]>([]) 
  useEffect(() => {
    fetch(`${API_BASE_URL}/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
      <div className='max-w-[1344px] mx-auto flex flex-col items-center m-20'>
        <img src={logoImg} alt=""/>
        
        <h1 className='text-6xl text-white font-black mt-20'>
          Seu <span className='text-transparent bg-nlw-title-grad bg-clip-text'>duo</span> está aqui
        </h1>

        <div className='grid grid-cols-6 gap-6 mt-16'>
          {
            games.map((game, index) => {
              return (
                <GameBanner
                  key={game.id}
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCound={game._count.ads}
                />
              )
            })
          }
        </div>

        <Dialog.Root>

          <CreateAdBanner/>

          <CreateAdModal/>
          
        </Dialog.Root>
      </div>
  )
}

export default App
