import { NextFunction, Request, Response } from "express"


export interface UserServiceI {
    all: () => Promise<any>
    one: (id: number) => Promise<any>
    save: (newUser: any) => Promise<any>
    remove: (id: number) => Promise<any>
}

type RequestHandler = (request: Request, response: Response, next: NextFunction) => Promise<any>

export interface UserControllerI {
    all: RequestHandler
    one: RequestHandler
    save: RequestHandler
    remove: RequestHandler
}