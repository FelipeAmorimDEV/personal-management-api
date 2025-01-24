-- CreateTable
CREATE TABLE "group_muscle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "group_muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TrainingMuscleGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TrainingMuscleGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TrainingMuscleGroups_B_index" ON "_TrainingMuscleGroups"("B");

-- AddForeignKey
ALTER TABLE "_TrainingMuscleGroups" ADD CONSTRAINT "_TrainingMuscleGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "group_muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingMuscleGroups" ADD CONSTRAINT "_TrainingMuscleGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
