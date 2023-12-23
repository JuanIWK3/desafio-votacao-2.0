-- DropForeignKey
ALTER TABLE "Pauta" DROP CONSTRAINT "Pauta_createdById_fkey";

-- AddForeignKey
ALTER TABLE "Pauta" ADD CONSTRAINT "Pauta_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
