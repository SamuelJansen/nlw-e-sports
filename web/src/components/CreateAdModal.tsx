import axios from 'axios'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'

import { Check, GameController } from 'phosphor-react'
import { InpuSelectProps, Input, Inputs, InputSelect } from './Form/Input'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { API_BASE_URL } from '../constant'

const ELEMENT_SPACING = '1/7'

interface GameTitleApi {
    id: string,
    title: string
}
      
const DAYS: InpuSelectProps[] = [
    {
        id:'0',
        title: 'Domingo',
        label: 'D',
        width: ELEMENT_SPACING,
        type: 'button',
        isSelected: false
    },
    {
        id:'1',
        title: 'Segunda',
        label: 'S',
        width: ELEMENT_SPACING,
        type: 'button',
        isSelected: false
    },
    {
        id:'2',
        title: 'Terça',
        label: 'T',
        width: ELEMENT_SPACING,
        type: 'button',
        isSelected: false
    },
    {
        id:'3',
        title: 'Quarta',
        label: 'Q',
        width: ELEMENT_SPACING,
        type: 'button',
        isSelected: false
    },
    {
        id:'4',
        title: 'Quinta',
        label: 'Q',
        width: ELEMENT_SPACING,
        type: 'button',
        isSelected: false
    },
    {
        id:'5',
        title: 'Sexta',
        label: 'S',
        width: ELEMENT_SPACING,
        type: 'button',
        isSelected: false
    },
    {
        id:'6',
        title: 'Sábado',
        label: 'S',
        width: ELEMENT_SPACING,
        type: 'button',
        isSelected: false
    }
]
const HOURS = [
    {
        id:'hourStart',
        name:'hourStart',
        type:'time',
        placeholder:'De',
        width: '1/2'
    },
    {
        id:'hourEnd',
        name:'hourEnd',
        type:'time',
        placeholder:'Até',
        width: '1/2'
    }
]

// export interface AdApi {
//   gameId: string,
//   hourEnd: string,
//   hourStart: string,
//   id: string,    
//   name: string,
//   useVoiceChannel: boolean,
//   weekDays: string[],
//   yearsPlaying: number,
// }

// const [duos, setDuos] = useState<AdApi[]>([])

// useEffect(() => {
//   fetch(`${API_BASE_URL}/games/${game.id}/ads`)
//     .then(response => response.json())
//     .then(data => {
//       setDuos(data)
//     })
// }, [])

export const CreateAdModal = () => {
    
    const [, updateSelectedDays] = useState<any>();
    const forceUpdate = useCallback(() => updateSelectedDays({}), []);

    const toggleSelectInput = (selectInput: InpuSelectProps) => {
        days.filter((day) => day.id === selectInput.id).forEach((day) => {
            day.isSelected = !day.isSelected
        })
        setDays(days)
        forceUpdate()
    }  
      
    const [days, setDays] = useState<InpuSelectProps[]>(() => {
            DAYS.forEach((day) => { 
                day.onSelect = toggleSelectInput
            })
            return DAYS
        }
    )
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    const [hours, setHours] = useState(HOURS)

    const [games, setGames] = useState<GameTitleApi[]>([]) 
    useEffect(() => {
      fetch(`${API_BASE_URL}/games`)
        .then(response => response.json())
        .then(data => {
          setGames(data)
        })
    }, [])

    const handleCreateAd = async (event: FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        const payload = {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            weekDays: days.filter((day) => day.isSelected).map((day) => Number(day.id)),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel,
            discord: data.discord
        }
        console.log(payload)
        try{
            await axios.post(`${API_BASE_URL}/games/${data.gameId}/ads`, payload)
            alert('Anúncio criado com sucesso')
        } catch (err) {
            console.log(err)
            alert('Erro ao criar o anúncio')
        }
    }

    return (
        <Dialog.Portal>
                
                <Dialog.Overlay className='bg-black/30 inset-0 fixed'/>
                
                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                    <Dialog.Title className="text-3xl font-black">
                        Publique um anúncio
                    </Dialog.Title>
                    <form onSubmit={(event) => handleCreateAd(event)} className='mt-8 flex flex-col gap-4'>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor='game' className='font-semibold'>Qual o game</label>
                            <select 
                                id='game' 
                                name='gameId'
                                className='w-full h-full flex space-x-0 bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                                defaultValue=''
                            >
                                <option disabled value='' className='flex space-between text-zinc-500'>
                                    Selecione o game que deseja jogar
                                </option>
                                {games.map((game) => {
                                    return (
                                        <option key={game.id} value={game.id}>{game.title}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <Input
                            id='name' 
                            name='name'
                            type='text'
                            label='Seu nome (ou nickname)' 
                            placeholder='Como de chamam dentro do game?'
                        />
                        <div className='flex gap-4'>
                            <Input
                                id='yearsPlaying' 
                                name='yearsPlaying'
                                type='number'
                                label='Joga a quantos anos' 
                                placeholder='Tudo bem ser 0'
                            />
                            <Input
                                id='discord' 
                                name='discord'
                                type='text'
                                label='Qual seu discord' 
                                placeholder='Usuário#0000'
                            />
                        </div>
                        <div className='flex gap-4 w-full'>
                            <InputSelect
                                label='Quando costuma jogar' 
                                width='1/2'
                                elements={days}
                            />
                            <Inputs
                                label='Qual horário do dia'
                                width='1/2'
                                inputs={hours}
                            />
                        </div>
                        <label className='mt-2 flex items-center gap-2 text-sm'>
                            <Checkbox.Root 
                                className='w-6 h-6 rounded bg-zinc-900 flex justify-center items-center'
                                onCheckedChange={(checked) => {
                                        setUseVoiceChannel(checked === true)
                                    }
                                }
                            >
                                <Checkbox.Indicator>
                                    <Check className='w-4 h-4 text-emerald-400'/>
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Constume me conectar no chat de vox
                        </label>
                        <footer className='mt4 flex justify-end gap-4'>
                            <Dialog.Close 
                                className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                            >
                                Cancelar
                            </Dialog.Close>
                            <button 
                                type='submit' 
                                onSubmit={() => {}}
                                className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                            >
                                <GameController className='w-6 h-6' />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                    {/* <Dialog.Description />
                    <Dialog.Close /> */}
                </Dialog.Content>
            
            </Dialog.Portal>
    )
}
