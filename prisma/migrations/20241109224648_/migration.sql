/*
  Warnings:

  - You are about to drop the column `postedAt` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postedAt";

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
