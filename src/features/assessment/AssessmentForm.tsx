import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
  Group,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { sampleAssessment } from './fixtures';
import { emptyAssessment, type AssessmentFormValues } from './form-values';
import { mobilityOptions } from './mobility-options';
import { assessmentSchema, type Assessment } from './schema';

type AssessmentFormProps = {
  onSave: (values: Assessment) => Promise<void>;
};

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<Assessment | null>(null);

  const form = useForm<AssessmentFormValues>({
    initialValues: emptyAssessment,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  const today = dayjs().format('YYYY-MM-DD');

  // onSubmit only calls this once the resolver found no errors, so parse cannot throw here.
  const handleSubmit = async (values: AssessmentFormValues) => {
    const parsed = assessmentSchema.parse(values);
    setSaved(null);
    setSaving(true);
    try {
      await onSave(parsed);
      setSaved(parsed);
    } finally {
      setSaving(false);
    }
  };

  const loadSamplePatient = () => {
    form.setValues(sampleAssessment);
    form.clearErrors();
    setSaved(null);
  };

  return (
    <Container size="sm" my="xl">
      <Paper withBorder shadow="sm" p="lg" radius="md">
        <Title order={2} mb="md">
          Geriatric Care Assessment
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack>
            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              {...form.getInputProps('mrn')}
            />
            <TextInput label="Patient name" {...form.getInputProps('patientName')} />
            <DateInput
              label="Date of birth"
              valueFormat="DD MMM YYYY"
              defaultLevel="decade"
              {...form.getInputProps('dateOfBirth')}
            />
            <DateInput
              label="Assessment date"
              valueFormat="DD MMM YYYY"
              maxDate={today}
              {...form.getInputProps('assessmentDate')}
            />
            <Select
              label="Mobility"
              placeholder="Select a mobility status"
              data={mobilityOptions}
              {...form.getInputProps('mobility')}
            />
            <NumberInput
              label="Barthel Index"
              step={5}
              min={0}
              max={100}
              clampBehavior="none"
              {...form.getInputProps('barthelIndex')}
            />
            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              clampBehavior="none"
              {...form.getInputProps('medicationCount')}
            />
            <Checkbox
              label="Pharmacist review requested"
              {...form.getInputProps('pharmacistReviewRequested', {
                type: 'checkbox',
              })}
            />
            <DateInput
              label="Next review date"
              valueFormat="DD MMM YYYY"
              {...form.getInputProps('followUpDate')}
            />
            <Checkbox
              label="Patient or representative has given consent"
              {...form.getInputProps('consentObtained', { type: 'checkbox' })}
            />
            <Group justify="space-between">
              <Button type="button" variant="default" onClick={loadSamplePatient}>
                Load sample patient
              </Button>
              <Button type="submit" loading={saving} disabled={saving}>
                Save assessment
              </Button>
            </Group>
          </Stack>
        </form>
        {saved && (
          <Alert color="green" title="Assessment saved" mt="md">
            <Code block>{JSON.stringify(saved, null, 2)}</Code>
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
