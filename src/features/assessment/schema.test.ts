import { describe, expect, it } from 'vitest';
import { sampleAssessment } from './fixtures';
import { assessmentSchema } from './schema';

describe('assessmentSchema', () => {
  it('accepts a patient turning 60 on the assessment date and rejects one a day short', () => {
    const exactly60 = assessmentSchema.safeParse({
      ...sampleAssessment,
      dateOfBirth: '1966-08-07',
    });
    expect(exactly60.success).toBe(true);

    const oneDayShort = assessmentSchema.safeParse({
      ...sampleAssessment,
      dateOfBirth: '1966-08-08',
    });
    expect(oneDayShort.success).toBe(false);
    expect(oneDayShort.error?.issues).toMatchObject([
      {
        path: ['dateOfBirth'],
        message: 'This pathway is for patients aged 60 and over',
      },
    ]);
  });
});
