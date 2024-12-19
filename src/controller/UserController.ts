import { NextFunction, Request, Response } from "express"
import { UserControllerI, UserServiceI } from "../models"
import { UserService } from "../services"

export class UserController implements UserControllerI {
    private userService: UserServiceI

    constructor() {
        this.userService = new UserService()
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userService.all()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        return this.userService.one(id)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { body } = request
        return this.userService.save(body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        return this.userService.remove(id)
    }

}