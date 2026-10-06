import { AssessmentForm } from '../features/assessment/AssessmentForm';
import { saveAssessment } from '../features/assessment/save-assessment';

export function HomePage() {
  return <AssessmentForm onSave={saveAssessment} />;
}
