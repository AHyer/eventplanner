// components/ui/calendar.tsx

"use client";

import { DayPicker, getDefaultClassNames, type DayPickerProps  } from "react-day-picker";

export function Calendar(props: DayPickerProps) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      {...props}  //accepts everything DayPicker itself accepts (mode, selected, onSelect, className, style, etc.)
       style={{
        '--rdp-accent-color': 'purple', //
        '--rdp-accent-background-color': 'dark pink', //
        '--rdp-today-color': 'pink', //today's date text
        '--rdp-today-border': 'green', //today's date text
        '--rdp-day': 'green',
        '--rdp-day-width': '12rem',
        '--rdp-day-height': '8rem',
        '--rdp-day_button-width': '3.25rem',
        '--rdp-day_button-height': '3.25rem',
        '--rdp-caption_label': '3.25rem',

        ...props.style,
      } as React.CSSProperties}
      // classNames={{
      //   today: `border-green-500`, // Add a border to today's date
      //   selected: `bg-pink-500 border-green-500 text-white`, // Highlight the selected day
      //   root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
      //   chevron: `${defaultClassNames.chevron} fill-white-500`, // Change the color of the chevron
      // }}
    />
  );
}

//TODO allow clicking on calendar date opens events for that date
