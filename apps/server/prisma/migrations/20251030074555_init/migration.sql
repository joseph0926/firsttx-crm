/*
  Warnings:

  - Made the column `dueDate` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ContactPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('LEAD', 'ACTIVE', 'INACTIVE', 'LOST');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "lastContactedAt" TIMESTAMP(3),
ADD COLUMN     "priority" "ContactPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "status" "ContactStatus" NOT NULL DEFAULT 'LEAD';

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
ALTER COLUMN "dueDate" SET NOT NULL;

-- CreateIndex
CREATE INDEX "contacts_lastContactedAt_idx" ON "contacts"("lastContactedAt");

-- CreateIndex
CREATE INDEX "contacts_status_idx" ON "contacts"("status");

-- CreateIndex
CREATE INDEX "tasks_priority_idx" ON "tasks"("priority");
