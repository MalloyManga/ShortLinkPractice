-- CreateTable
CREATE TABLE "public"."Users" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Links" (
    "id" BIGSERIAL NOT NULL,
    "origin_lInk" TEXT NOT NULL,
    "short_link" TEXT NOT NULL,
    "hostId" BIGINT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "public"."Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "public"."Users"("password");

-- AddForeignKey
ALTER TABLE "public"."Links" ADD CONSTRAINT "Links_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
