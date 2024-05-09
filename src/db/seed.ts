import { PrismaClient } from '@prisma/client'
import  bcrypt  from 'bcrypt'

const prisma = new PrismaClient()
const identify = process.env.USER_ID;
const plainPassword = process.env.PASSWORD;
const saltRounds = 10;

async function main() {
  if (identify && plainPassword) {
    try {
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(plainPassword, salt, async function(err, hash) {
          const admin = await prisma.user.upsert({
            create: {
              identify: identify,
              password: hash
            },
            where: {id : 1},
            update: {}
          })
          console.log({ admin })
        })
      })
    } catch (err) {
      console.log(err)
    }
  }  
}

main().then(async() => {
  await prisma.$disconnect() 
})
.catch(async(e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})