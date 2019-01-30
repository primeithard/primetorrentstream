import { readFile } from 'fs'
import { promisify } from 'util'

const readFilePromise = promisify(readFile)

export interface Config {
    port: number
    logging: {
        transports: Array<{
            type: 'console'
        } | {
            type: 'loggly'
            subdomain: string
            token: true
            tags?: string[]
        }>
        level: 'debug' | 'info' | 'warn' | 'error'
    },
    torrents: {
        path: string
    }
}

const defaultConfig: Config = {
    port: 3000,
    logging: {
        transports: [
            {
                type: 'console'
            }
        ],
        level: 'info'
    },
    torrents: {
        path: '/tmp'
    }
}

export async function readConfig(path: string | undefined): Promise<Config> {
    try {
        return path ? JSON.parse(await promisify(readFile)(path, { encoding: 'utf8' })) : defaultConfig
    } catch (error) {
        throw Error(`Failed to read config from ${path} - ${error}`)
    }
}
