interface GameBannersProps {
    title: string,
    bannerUrl: string,
    adsCound: number,
}

export const GameBanner = (props: GameBannersProps) => {
    return (
        <a href='' className='relative rounded-lg overflow-hidden'>
            <img src={props.bannerUrl} alt=""/>
            <div className='absolute bottom-0 left-0 w-full pt-16 pb-4 px-4 bg-nlw-grad'>
            <strong className='font-bold text-white block'>{props.title}</strong>
            <span className='text-zinc-300 text-sm  mt-1 block'>{`${props.adsCound} anúncio${props.adsCound && 1==props.adsCound ? '' : 's'}`}</span>
        </div>
    </a>
    )
}