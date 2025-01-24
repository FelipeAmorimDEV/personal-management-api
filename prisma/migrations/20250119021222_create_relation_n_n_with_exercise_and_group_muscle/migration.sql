-- CreateTable
CREATE TABLE "_ExerciseMuscleGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseMuscleGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseMuscleGroups_B_index" ON "_ExerciseMuscleGroups"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseMuscleGroups" ADD CONSTRAINT "_ExerciseMuscleGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseMuscleGroups" ADD CONSTRAINT "_ExerciseMuscleGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "group_muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
