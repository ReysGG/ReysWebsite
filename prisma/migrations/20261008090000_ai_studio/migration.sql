-- CreateEnum
CREATE TYPE "AiProviderType" AS ENUM ('OPENAI', 'ANTHROPIC', 'GOOGLE', 'OPENROUTER', 'OPENAI_COMPATIBLE');

-- CreateEnum
CREATE TYPE "AiScheduleMode" AS ENUM ('DRAFT', 'PUBLISH', 'SCHEDULE');

-- CreateEnum
CREATE TYPE "AiRunStatus" AS ENUM ('RUNNING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coverImageCredit" TEXT,
ADD COLUMN     "scheduledAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "AiProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AiProviderType" NOT NULL,
    "baseUrl" TEXT,
    "apiKeyEnc" TEXT NOT NULL,
    "models" TEXT[],
    "defaultModel" TEXT NOT NULL,
    "imageModel" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "lastError" TEXT,
    "lastErrorAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiSchedule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cron" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Jakarta',
    "topics" TEXT[],
    "category" TEXT,
    "instructions" TEXT,
    "mode" "AiScheduleMode" NOT NULL DEFAULT 'DRAFT',
    "publishDelayHours" INTEGER NOT NULL DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "nextRunAt" TIMESTAMP(3),
    "lastRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiRun" (
    "id" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "topic" TEXT,
    "scheduleId" TEXT,
    "status" "AiRunStatus" NOT NULL DEFAULT 'RUNNING',
    "postId" TEXT,
    "providerName" TEXT,
    "model" TEXT,
    "steps" JSONB,
    "summary" TEXT,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "AiRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiChatSession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiProvider_enabled_priority_idx" ON "AiProvider"("enabled", "priority");

-- CreateIndex
CREATE INDEX "AiSchedule_enabled_nextRunAt_idx" ON "AiSchedule"("enabled", "nextRunAt");

-- CreateIndex
CREATE INDEX "AiRun_createdAt_idx" ON "AiRun"("createdAt");

-- CreateIndex
CREATE INDEX "AiRun_scheduleId_idx" ON "AiRun"("scheduleId");

-- CreateIndex
CREATE INDEX "AiChatSession_adminId_updatedAt_idx" ON "AiChatSession"("adminId", "updatedAt");

-- CreateIndex
CREATE INDEX "Post_published_scheduledAt_idx" ON "Post"("published", "scheduledAt");

-- AddForeignKey
ALTER TABLE "AiRun" ADD CONSTRAINT "AiRun_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "AiSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

