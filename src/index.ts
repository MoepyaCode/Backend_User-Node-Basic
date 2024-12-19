import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import morgan = require("morgan")

const PORT = 3000

function handleError(error: any, request: Request, response: Response, next: Function) {
    response.status(error?.statusCode || 500).send({ message: error.message })
}

AppDataSource.initialize().then(async () => {
    
    const app = express()

    app.use(morgan('tiny'))
    app.use(bodyParser.json())

    /**
     * Routes register
     */
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result)
            } catch (error) {
                next(error)
            }
        })
    })

    /**
     * Middleware
     */
    app.use(handleError)

    /**
     * Start listening for requests
     */
    app.listen(PORT)

    console.log(`Running on http://localhost:${PORT}`)

}).catch(error => console.log(error))