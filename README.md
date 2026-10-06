# Geriatric Care Assessment Form

One-page assessment form for a visiting nurse, built with React 19, TypeScript, Mantine and Zod 4.

**Live:** https://geriatric-assessment-vansh.netlify.app

## Run it

    yarn install
    yarn dev        # local dev server
    yarn test       # check (lint, format, types), stylelint, vitest, build

## How it works

- `schema.ts` is the given Zod schema, unchanged apart from formatting. All validation lives there.
- The form uses `@mantine/form` with `schemaResolver(assessmentSchema)`. There are no rules in the components.
- Form values are typed from `z.input` (empty text/number/date states are allowed while typing). On submit, `assessmentSchema.parse` produces the `Assessment` output, which is what gets saved and displayed.
- Mobility options are built from `MOBILITY`, so adding a value there adds it to the dropdown.
- Saving is faked with an 800ms delay.

## Decisions on ambiguous points

- `NumberInput` uses `clampBehavior="none"` so a typed score like 105 or 82 is rejected by the schema and never silently changed.
- Form values are typed from `z.input` of the schema, and the handler runs `assessmentSchema.parse` so the saved and displayed value is what Zod returned, not the raw form state.
- The "crutches" fixture case cannot be chosen in the dropdown because it only offers valid options, so invalid mobility values are covered at schema level only.
- After removing the unused template components there is no CSS left, so the `stylelint` script has `--allow-empty-input`. The stylelint config itself is unchanged.
- I removed the unused template components (Welcome, ColorSchemeToggle). The template's router is left as is.
- Deployment: Vercel's Corepack conflicts with `"type": "module"` when installing Yarn 4, so the site is built locally with `yarn build` and the `dist` folder is deployed to Netlify.

## Tests

1. Schema (`safeParse`): date of birth exactly 60 on the assessment date passes, one day short fails on `dateOfBirth`.
2. Rendered form: load the sample patient, submit, assert the save handler receives the parsed values.

## Time spent

Roughly 2 hours in total, within the suggested budget. Most of it went on wiring the form to the schema and checking every row of the fixture table by hand; the rest was setup, tests, the README and deployment.

## Unfinished / next steps

- Only the two required tests exist. With more time I would add schema tests for the polypharmacy rule, the follow-up date rule and consent, since each has its own boundary.
- No accessibility pass beyond what Mantine provides (for example moving focus to the first error on submit, or checking with a screen reader).
- The save is faked with an 800ms delay. A real version would call an API and handle failures, including showing an error state.
- "Today" for the assessment date's `maxDate` uses the browser's local date, so a nurse in a different timezone could see a different limit.

## Tooling note

The template uses Vite+ (`vp`) for lint, format and test, and Yarn 4 via Corepack. The build prints a chunk-size warning from Mantine, which I left as is.

I used AI tools while working on this and went through every file so I can explain the choices.