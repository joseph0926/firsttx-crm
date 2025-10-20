-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('CALL', 'EMAIL', 'MEETING', 'NOTE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magic_links" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "magic_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "position" TEXT,
    "notes" TEXT,
    "tags" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interactions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "InteractionType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "dueDate" TIMESTAMP(3),
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "contactId" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "magic_links_token_key" ON "magic_links"("token");

-- CreateIndex
CREATE INDEX "magic_links_token_idx" ON "magic_links"("token");

-- CreateIndex
CREATE INDEX "magic_links_email_idx" ON "magic_links"("email");

-- CreateIndex
CREATE INDEX "magic_links_expiresAt_idx" ON "magic_links"("expiresAt");

-- CreateIndex
CREATE INDEX "contacts_userId_idx" ON "contacts"("userId");

-- CreateIndex
CREATE INDEX "contacts_email_idx" ON "contacts"("email");

-- CreateIndex
CREATE INDEX "contacts_updatedAt_idx" ON "contacts"("updatedAt");

-- CreateIndex
CREATE INDEX "interactions_userId_idx" ON "interactions"("userId");

-- CreateIndex
CREATE INDEX "interactions_contactId_idx" ON "interactions"("contactId");

-- CreateIndex
CREATE INDEX "interactions_date_idx" ON "interactions"("date");

-- CreateIndex
CREATE INDEX "tasks_userId_idx" ON "tasks"("userId");

-- CreateIndex
CREATE INDEX "tasks_contactId_idx" ON "tasks"("contactId");

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "tasks"("dueDate");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
