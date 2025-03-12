import bcrypt from 'bcrypt'

class HashService {
    async hashPassword (password: string){
        const jump = 10
        return await bcrypt.hash(password, jump)
    }
    async compare (password: string, hashPassword: string){
        return await bcrypt.compare(password, hashPassword)
    }
}
export const hashService = new HashService()