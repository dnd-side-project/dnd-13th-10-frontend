import { useEffect, useMemo, useState } from 'react';
import { clamp, daysInMonth, range } from './utils';
import { WheelPicker } from './Picker';
import { Button } from '../Button';

interface DatePickerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  value?: Date;
  onConfirm: (d: Date) => void;
  onCancel?: () => void;
  min?: Date;
  max?: Date;
  yearRange?: [number, number];
}

export function DatePicker({
  open,
  onOpenChange,
  value,
  onConfirm,
  onCancel,
  min,
  max,
  yearRange,
}: DatePickerProps) {
  const now = useMemo(() => new Date(), []);
  const initial = value ?? now;
  const [y, setY] = useState(initial.getFullYear());
  const [m, setM] = useState(initial.getMonth() + 1);
  const [d, setD] = useState(initial.getDate());

  useEffect(() => {
    if (!value) return;
    setY(value.getFullYear());
    setM(value.getMonth() + 1);
    setD(value.getDate());
  }, [value]);

  const [yMin, yMax] = useMemo(() => {
    if (yearRange) {
      const [a, b] = yearRange;
      return [Math.min(a, b), Math.max(a, b)] as [number, number];
    }
    const a = min ? min.getFullYear() : now.getFullYear() - 5;
    const b = max ? max.getFullYear() : now.getFullYear() + 5;
    return [Math.min(a, b), Math.max(a, b)] as [number, number];
  }, [yearRange, min, max, now]);

  useEffect(() => {
    if (y < yMin) setY(yMin);
    else if (y > yMax) setY(yMax);
  }, [y, yMin, yMax]);

  const years = useMemo(() => range(yMin, yMax), [yMin, yMax]);
  const months = useMemo(() => range(1, 12), []);
  const days = useMemo(() => range(1, daysInMonth(y, m)), [y, m]);

  useEffect(() => {
    const md = daysInMonth(y, m);
    if (d > md) setD(md);
  }, [y, m, d]);

  const yIdx = Math.max(0, years.indexOf(y));
  const mIdx = m - 1;
  const dIdx = clamp(d - 1, 0, days.length - 1);

  const columns = [
    {
      items: years,
      selectedIndex: yIdx,
      onChangeIndex: (i: number) => setY(years[i]),
      format: (yy: number) => `${yy}년`,
    },
    {
      items: months,
      selectedIndex: mIdx,
      onChangeIndex: (i: number) => setM(i + 1),
      format: (mm: number) => `${mm}월`,
    },
    {
      items: days,
      selectedIndex: dIdx,
      onChangeIndex: (i: number) => setD(i + 1),
      format: (dd: number) => `${dd}일`,
    },
  ];

  const confirm = () => {
    const picked = new Date(y, m - 1, d);
    const lo = min
      ? new Date(min.getFullYear(), min.getMonth(), min.getDate())
      : null;
    const hi = max
      ? new Date(max.getFullYear(), max.getMonth(), max.getDate())
      : null;
    if (lo && picked < lo) onConfirm(lo);
    else if (hi && picked > hi) onConfirm(hi);
    else onConfirm(picked);
    onOpenChange(false);
  };

  const cancel = () => {
    onCancel?.();
    onOpenChange(false);
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="bg-foundation-bg relative w-full max-w-[560px] rounded-t-2xl rounded-b-none p-6 shadow-2xl"
      >
        <WheelPicker columns={columns} />
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            size="large"
            onClick={cancel}
          >
            취소
          </Button>
          <Button type="button" size="large" onClick={confirm}>
            설정
          </Button>
        </div>
      </div>
    </div>
  );
}
