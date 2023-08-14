import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const carol = await prisma.user.create({
    data: {
      name: 'Carol',
      email: 'carol@prisma.io',
      posts: {
        create: { title: 'Hello Prisma' },
      },
      profile: {
        create: { bio: 'I like Postgres' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  
  console.dir(allUsers, { depth: null })
  console.log({carol})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })