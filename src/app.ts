import * as express from 'express'
import * as cors from 'cors'
import { colours } from './shared/utils/colours'
import { Application, Request, Response } from 'express'
import { Connection, createConnection } from 'typeorm'
import { Product } from './entity/product'
import { mainConfig } from './shared/utils/config'

const APP_NAME = mainConfig.apps[0].name
const errLog = mainConfig.errMsg[0].value

let DBconn: Connection

(async () => {
    try {
        DBconn = await createConnection()

        DBconn && console.log(colours.fg.cyan + '%s' + colours.reset, `${APP_NAME} backend connected to Database on ${DBopts.PROTOCOL}${DBopts.HOST}:${DBopts.PORT}`)

        // init Repository
        const productRepository = DBconn.getRepository(Product)


        // ******************************* ROUTES ******************************* //

        // GET ALL PRODUCTS
        app.get('/api/products', async (req: Request, res: Response) => {
            const products = await productRepository.find()
            res.json(products)
        })

        // CREATE PRODUCT
        app.post('/api/products', async (req: Request, res: Response) => {
            const product = await productRepository.create(req.body);

            const result = await productRepository.save(product)

            return res.send(result)
        })

        // GET ONE
        app.get('/api/products/:id', async (req: Request, res: Response) => {
            const product = await productRepository.findOne(req.params.id);
            return res.send(product)
        })

        // UPDATE ONE
        app.put('/api/products/:id', async (req: Request, res: Response) => {
            const product = await productRepository.findOne(req.params.id);
            productRepository.merge(product, req.body)

            const result = await productRepository.save(product)
            return res.send(result)
        })

        // DELETE ONE
        app.delete('/api/products/:id', async (req: Request, res: Response) => {
            const result = await productRepository.delete(req.params.id)
            return res.send(result)
        })

        // LIKE ONE
        app.post('/api/products/:id/like', async (req: Request, res: Response) => {
            const product = await productRepository.findOne(req.params.id)
            product.likes++
            const result = await productRepository.save(product)
            return res.send(result)
        })


        // ********************************************************************** //

    } catch (error) {
        console.log(errLog, error);
    }
})()

const DBopts = {
    PROTOCOL: mainConfig.apps[0].db.protocol,
    HOST: mainConfig.apps[0].db.host,
    PORT: mainConfig.apps[0].db.port,
    TYPE: mainConfig.apps[0].db.type
}

const app: Application = express()
const PORT: number = 8888

app.use(cors({
    origins: ['http://localhost:3000', 'http://localhost:8080']
}))

app.use(express.json())


app.listen(PORT, () => {
    console.log(colours.fg.yellow + '%s' + colours.reset, `${APP_NAME} Server started on port :${PORT}`);
}).on('error', e => {
    console.log(errLog, e.message)
})
