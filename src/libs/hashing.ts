import * as bcryptjs from 'bcryptjs'

export const hashPassword = async (password: string) => {
  const saltOrRounds = 10
  const salt = await bcryptjs.genSalt(saltOrRounds)
  return await bcryptjs.hash(password, salt)
}