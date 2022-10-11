import express, { query } from "express"
import { PrismaClient } from '@prisma/client'
import { DateTimeUtil } from './utils/DateTimeUtil'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
const prisma = new PrismaClient({
    log: ['query']
})

app.get('/games', async (request: any, response: any) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return response.status(200).json([...games])
})

app.get('/games/:gameId/ads', async (request: any, response: any) => {
    const gameId = request.params.gameId
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            gameId: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response.status(200).json(ads.map( (ad) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: DateTimeUtil.fromMinutesToHoursColonMinutes(ad.hourStart),
            hourEnd: DateTimeUtil.fromMinutesToHoursColonMinutes(ad.hourEnd)
        }
    }))
})

app.get('/ads', async (request: any, response: any) => {
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            gameId: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
            discord: true
        }
    })
    return response.status(200).json(ads.map((ad) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: DateTimeUtil.fromMinutesToHoursColonMinutes(ad.hourStart),
            hourEnd: DateTimeUtil.fromMinutesToHoursColonMinutes(ad.hourEnd)
        }
    }))
})

app.post('/games/:gameId/ads', async (request: any, response: any) => {
    const gameId = request.params.gameId
    const body: any = request.body
    const ad = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            weekDays: body.weekDays.join(','),
            hourStart: DateTimeUtil.fromHoursColonMinutesToMinutes(body.hourStart),
            hourEnd: DateTimeUtil.fromHoursColonMinutesToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
            discord: body.discord
        }
    })
    return response.status(201).json({
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: DateTimeUtil.fromMinutesToHoursColonMinutes(ad.hourStart),
        hourEnd: DateTimeUtil.fromMinutesToHoursColonMinutes(ad.hourEnd)
    })
})

app.get('/ads/:adId/discord', async (request: any, response: any) => {
    const adId = request.params.adId
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId
        }
    })
    return response.status(200).json({...ad})
})

app.listen(3333) 
