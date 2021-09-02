import { colours } from "./colours";

export const mainConfig = {
    apps: [
        {
            name: 'backend-mysql',
            port: 8888,
            db: {
                type: 'mysql',
                protocol: 'http://',
                host: 'localhost',
                port: '3306'
            }
        },
        {
            name: 'backend-mongodb',
            port: 8889,
            db: {
                type: 'mongodb',
                protocol: 'http://',
                host: 'localhost',
                port: '27017'
            }
        },
    ],

    errMsg: [
        {
            name: 'Error log',
            value: colours.fg.red+'%s'+colours.reset + 'ERROR:'
        }
    ]
}