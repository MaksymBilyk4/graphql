const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


async function main () {
    const allLinks = await prisma.link.findMany();
    console.log("All found links -> ", allLinks);
}



main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect()
    });