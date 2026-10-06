import { MOBILITY } from './schema';

const toLabel = (value: string) => {
  const text = value.replace(/_/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const mobilityOptions = MOBILITY.map((value) => ({ value, label: toLabel(value) }));
