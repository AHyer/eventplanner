// src/components/ui/enum-select.tsx
// One labeled <select> for an enum column. Shared so every enum dropdown in the app
// renders the same markup and the same blank "unanswered" option — the actions turn
// that empty string back into undefined, which leaves the column null.

'use client';

import type { EnumOption } from './enum-options';

export function EnumSelect<T extends string>({
  name,
  label,
  options,
  defaultValue,
  placeholder = '— Select —',
  className = 'mb-4',
}: {
  name: string; //must match the formData.get(...) key in the server action
  label: string;
  options: EnumOption<T>[];
  defaultValue?: string | null; //pre-fills the field on edit forms; the user can still change it
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ''}
        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
