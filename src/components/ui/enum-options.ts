// src/components/ui/enum-options.ts
// Dropdown options for the pgEnum columns in src/db/schema.ts.
// The `value` is what gets written to the DB and must match the enum exactly —
// Postgres rejects anything else — so the value types are pulled from the schema
// with a type-only import (erased at build time, so no server code reaches the client).
// The `label` is only display text and can be reworded freely.

import type {
  budgetAmountEnum,
  hostLaborPortionEnum,
  ageBracketEnum,
  educationLevelEnum,
  dietaryRestrictionEnum,
  hireOutTasksEnum,
} from '@/db/schema';

export type EnumOption<T extends string> = { value: T; label: string };

type BudgetAmount = (typeof budgetAmountEnum)['enumValues'][number];
export const budgetAmountOptions: EnumOption<BudgetAmount>[] = [
  { value: '200', label: '$200' },
  { value: '500', label: '$500' },
  { value: '1000', label: '$1,000' },
  { value: '2500', label: '$2,500' },
  { value: '5000', label: '$5,000' },
  { value: '10000', label: '$10,000' },
  { value: '25000', label: '$25,000' },
  { value: '50000', label: '$50,000' },
  { value: '100000', label: '$100,000' },
  { value: '100000_plus', label: '$100,000+' },
];

type HostLaborPortion = (typeof hostLaborPortionEnum)['enumValues'][number];
export const hostLaborPortionOptions: EnumOption<HostLaborPortion>[] = [
  { value: '0', label: 'None of it — hire it all out' },
  { value: '25', label: 'About a quarter of it' },
  { value: '50', label: 'About half of it' },
  { value: '75', label: 'Most of it' },
  { value: '100', label: 'All of it' },
];

type AgeBracket = (typeof ageBracketEnum)['enumValues'][number];
export const ageBracketOptions: EnumOption<AgeBracket>[] = [
  { value: 'under_18', label: 'Under 18' },
  { value: '18_24', label: '18–24' },
  { value: '25_34', label: '25–34' },
  { value: '35_44', label: '35–44' },
  { value: '45_54', label: '45–54' },
  { value: '55_64', label: '55–64' },
  { value: '65_plus', label: '65 and over' },
];

type EducationLevel = (typeof educationLevelEnum)['enumValues'][number];
export const educationLevelOptions: EnumOption<EducationLevel>[] = [
  { value: 'less_than_high_school', label: 'Less than high school' },
  { value: 'high_school', label: 'High school' },
  { value: 'some_college', label: 'Some college' },
  { value: 'trade_school', label: 'Trade school' },
  { value: 'associates', label: "Associate's degree" },
  { value: 'bachelors', label: "Bachelor's degree" },
  { value: 'masters', label: "Master's degree" },
  { value: 'professional', label: 'Professional degree (JD, MD, …)' },
  { value: 'doctorate', label: 'Doctorate' },
];

type DietaryRestriction = (typeof dietaryRestrictionEnum)['enumValues'][number];
export const dietaryRestrictionOptions: EnumOption<DietaryRestriction>[] = [
  { value: 'none', label: 'None' },
  { value: 'gluten_free', label: 'Gluten-free' },
  { value: 'dairy_free', label: 'Dairy-free' },
  { value: 'nut_free', label: 'Nut-free' },
  { value: 'shellfish_free', label: 'Shellfish-free' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'halal', label: 'Halal' },
  { value: 'other', label: 'Other' },
];

type HireOutTask = (typeof hireOutTasksEnum)['enumValues'][number];
export const hireOutTasksOptions: EnumOption<HireOutTask>[] = [
  { value: 'none', label: 'None' },
  { value: 'catering', label: 'Catering' },
  { value: 'setup', label: 'Setup' },
  { value: 'pre-cleaning', label: 'Cleaning beforehand' },
  { value: 'post-cleaning', label: 'Cleaning afterward' },
];
