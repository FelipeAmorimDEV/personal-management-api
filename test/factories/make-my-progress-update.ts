import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import {
  MyProgres,
  MyProgressProps,
} from '@/domain/progress-tracking/enterprise/entities/my-progress'

export function makeMyProgressUpdate(
  override: Partial<MyProgressProps>,
  id?: UniqueEntityID,
) {
  const myProgressUpdate = MyProgres.create(
    {
      studentId: new UniqueEntityID('student-1'),
      comment: 'legal, continue assim',
      photo: 'student-1.jpg',
      ...override,
    },
    id,
  )

  return myProgressUpdate
}
