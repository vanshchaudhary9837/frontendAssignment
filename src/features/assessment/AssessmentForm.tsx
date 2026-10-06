import dayjs from 'dayjs';
import {
  Button,
  Checkbox,
  Container,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { emptyAssessment, type AssessmentFormValues } from './form-values';
import { mobilityOptions } from './mobility-options';
import { assessmentSchema } from './schema';

export function AssessmentForm() {
  const form = useForm<AssessmentFormValues>({
    initialValues: emptyAssessment,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  const today = dayjs().format('YYYY-MM-DD');

  return (
    <Container size="sm" my="xl">
      <Paper withBorder shadow="sm" p="lg" radius="md">
        <Title order={2} mb="md">
          Geriatric Care Assessment
        </Title>
        {/* Placeholder submit handler, replaced in the next step */}
        <form onSubmit={form.onSubmit(() => undefined)} noValidate>
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
              {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
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
            <Button type="submit">Save assessment</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
