const fromHoursColonMinutesToMinutes = (hoursColonMinutesAsString: string) => {
    const [hour, minute] = hoursColonMinutesAsString.split(':').map(Number)
    return hour * 60 + minute
}

const fromMinutesToHoursColonMinutes = (minutes: number) => {
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String((minutes % 60)).padStart(2, '0')}`
}



export const DateTimeUtil = {
    fromHoursColonMinutesToMinutes,
    fromMinutesToHoursColonMinutes
}