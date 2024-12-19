import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserServiceI } from "../models";


export class UserService implements UserServiceI {
    private userRepository = AppDataSource.getRepository(User)

    all = async (): Promise<any> => {
        return this.userRepository.find()
    }

    one = async (id: number): Promise<any> => {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) throw new Error("unregistered user")
        return user
    }

    save = async (newUser: User): Promise<any> => {
        const user = Object.assign(new User(), newUser)
        return this.userRepository.save(user)
    }

    remove = async (id: number): Promise<any> => {
        const  userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) throw new Error('this user not exist')

        await this.userRepository.remove(userToRemove)
        return "user has been removed"
    }


}