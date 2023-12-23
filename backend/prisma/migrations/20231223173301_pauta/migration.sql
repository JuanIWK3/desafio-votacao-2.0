-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Pauta" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pauta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pauta" ADD CONSTRAINT "Pauta_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
