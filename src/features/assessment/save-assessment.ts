const FAKE_SAVE_DELAY_MS = 800;

// Stands in for a backend call: resolves after a short delay.
export const saveAssessment = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, FAKE_SAVE_DELAY_MS);
  });
