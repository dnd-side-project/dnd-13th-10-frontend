import { useEffect, useState } from 'react';
import { WheelPicker } from './Picker';
import { clamp, range } from './utils';

export const MERIDIEMS = ['오전', '오후'] as const;
export type Meridiem = (typeof MERIDIEMS)[number];

export type TimeValue = {
  meridiem: Meridiem;
  hour: number;
  minute: number;
};

export function TimePicker({
  open,
  onOpenChange,
  value,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  value?: TimeValue; // { meridiem: "오전"|"오후", hour:1..12, minute:0..59 }
  onConfirm: (v: TimeValue) => void;
  onCancel?: () => void;
}) {
  const init = value ?? { meridiem: '오전', hour: 10, minute: 30 };
  const [mer, setMer] = useState<'오전' | '오후'>(init.meridiem);
  const [h, setH] = useState<number>(init.hour);
  const [mi, setMi] = useState<number>(init.minute);

  useEffect(() => {
    if (!value) return;
    setMer(value.meridiem);
    setH(value.hour);
    setMi(value.minute);
  }, [value]);

  const mers = ['오전', '오후'];
  const hours = range(1, 12);
  const minutes = range(0, 59);

  const merIdx = mers.indexOf(mer);
  const hIdx = clamp(hours.indexOf(h), 0, hours.length - 1);
  const mIdx = clamp(minutes.indexOf(mi), 0, minutes.length - 1);

  const confirm = () => {
    onConfirm({ meridiem: mer, hour: h, minute: mi });
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
        className="relative w-full max-w-[560px] rounded-t-2xl rounded-b-none bg-neutral-900 p-6 shadow-2xl"
      >
        <div className="mb-4 text-center text-neutral-300">
          시간을 선택하세요
        </div>
        <WheelPicker
          columns={[
            {
              items: mers,
              selectedIndex: merIdx,
              onChangeIndex: i => setMer(mers[i] as Meridiem),
              format: s => String(s),
            },
            {
              items: hours,
              selectedIndex: hIdx,
              onChangeIndex: i => setH(hours[i]),
              format: n => `${n}`,
            },
            {
              items: minutes,
              selectedIndex: mIdx,
              onChangeIndex: i => setMi(minutes[i]),
              format: n => `${n}`,
            },
          ]}
          visibleCount={5}
          selectedHeight={52}
          rowHeight={34}
        />
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={cancel}
            className="h-12 rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
          >
            취소
          </button>
          <button
            onClick={confirm}
            className="h-12 rounded-xl bg-sky-500 font-semibold text-white hover:bg-sky-400"
          >
            설정
          </button>
        </div>
      </div>
    </div>
  );
}
