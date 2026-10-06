import { render, screen, userEvent, waitFor } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { AssessmentForm } from './AssessmentForm';
import { sampleAssessment } from './fixtures';
import type { Assessment } from './schema';

describe('AssessmentForm', () => {
  it('saves the sample patient with the values Zod parsed', async () => {
    const onSave = vi.fn<(values: Assessment) => Promise<void>>().mockResolvedValue(undefined);
    render(<AssessmentForm onSave={onSave} />);

    await userEvent.click(screen.getByRole('button', { name: 'Load sample patient' }));
    await userEvent.click(screen.getByRole('button', { name: 'Save assessment' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave).toHaveBeenCalledWith(sampleAssessment);
  });
});
