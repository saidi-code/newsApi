/*
  Warnings:

  - Changed the type of `postedAt` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postedAt",
ADD COLUMN     "postedAt" TIMESTAMPTZ(3) NOT NULL;
