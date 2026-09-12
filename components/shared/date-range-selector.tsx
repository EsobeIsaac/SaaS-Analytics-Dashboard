'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { DateRange } from '@/lib/types';
import { dateRangeLabels } from '@/lib/mock-data';

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as DateRange)}>
      <SelectTrigger className="h-9 w-[150px] text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(dateRangeLabels) as DateRange[]).map((key) => (
          <SelectItem key={key} value={key}>
            {dateRangeLabels[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
