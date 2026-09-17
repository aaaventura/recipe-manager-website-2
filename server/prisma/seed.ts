// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']

  for (const category_name of categories) {
    await prisma.category.upsert({
      where: { id: category_name },
      update: {},
      create: { category_name },
    })
  }

  const all = await prisma.category.findMany()
  console.log(all)
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