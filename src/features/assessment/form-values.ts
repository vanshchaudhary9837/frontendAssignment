import type { z } from 'zod';
import type { assessmentSchema } from './schema';

type AssessmentInput = z.input<typeof assessmentSchema>;

// Every field may be empty while the nurse is typing ('' for text and numbers,
// null for dates and the select). Booleans are plain checkboxes.
export type AssessmentFormValues = {
  [K in keyof AssessmentInput]: AssessmentInput[K] extends boolean
    ? boolean
    : AssessmentInput[K] | '' | null;
};

export const emptyAssessment: AssessmentFormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: null,
  assessmentDate: null,
  mobility: null,
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: null,
  consentObtained: false,
};
