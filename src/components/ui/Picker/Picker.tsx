'use client';

import React, { useEffect, useRef, useState } from 'react';
import { clamp } from './utils';

const VISIBLE = 5;
const H_SEL = 52; // 선택 행 높이
const H_ROW = 34; // 그 외 행 높이
const CONTAINER_H = H_SEL + (VISIBLE - 1) * H_ROW;
const STEP_H = H_ROW; // 드래그 1스텝 픽셀

export type WheelColumnConfig<T = unknown> = {
  items: T[];
  selectedIndex: number;
  onChangeIndex: (idx: number) => void;
  format: (item: T) => string;
  ariaLabel?: string;
};

export type WheelPickerProps = {
  columns: WheelColumnConfig[];
};

function Column<T>({
  label,
  items,
  format,
  index,
  onChange,
}: {
  label?: string;
  items: T[];
  format: (item: T) => string;
  index: number;
  onChange: (idx: number) => void;
  selectedHeight?: number;
}) {
  const [preview, setPreview] = useState(index);
  const centerOffset = CONTAINER_H / 2 - H_SEL / 2;
  const translateY = centerOffset - preview * H_ROW;

  useEffect(() => setPreview(index), [index]);

  const dragging = useRef(false);
  const lastY = useRef(0);
  const baseIdx = useRef(index);
  const accum = useRef(0);

  useEffect(() => {
    baseIdx.current = index;
  }, [index]);

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = e => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    lastY.current = e.clientY;
    baseIdx.current = preview;
    accum.current = 0;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = e => {
    if (!dragging.current) return;
    const dy = e.clientY - lastY.current;
    lastY.current = e.clientY;
    accum.current -= dy;

    let idx = baseIdx.current;
    while (accum.current >= STEP_H && idx < items.length - 1) {
      idx += 1;
      accum.current -= STEP_H;
    }
    while (accum.current <= -STEP_H && idx > 0) {
      idx -= 1;
      accum.current += STEP_H;
    }
    if (idx !== preview) {
      setPreview(idx);
      baseIdx.current = idx;
    }
  };

  const endDrag = () => {
    dragging.current = false;
    accum.current = 0;
    if (preview !== index) onChange(preview);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(clamp(index - 1, 0, items.length - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(clamp(index + 1, 0, items.length - 1));
    }
  };

  const onClickZone: React.MouseEventHandler<HTMLDivElement> = e => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    if (e.clientY < mid) onChange(clamp(index - 1, 0, items.length - 1));
    else onChange(clamp(index + 1, 0, items.length - 1));
  };

  return (
    <div className="relative w-full select-none">
      <div
        role="listbox"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        onClick={onClickZone}
        className="cursor-grab touch-none overflow-hidden px-2 active:cursor-grabbing"
        style={{ height: CONTAINER_H }}
      >
        <div
          className="transition-transform duration-100 will-change-transform"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {items.map((it, i) => {
            const dist = Math.abs(i - preview);
            const isCenter = i === preview;
            const h = isCenter ? H_SEL : H_ROW;
            let opacityClass = 'opacity-100';
            if (dist === 1) opacityClass = 'opacity-30';
            else if (dist >= 2) opacityClass = 'opacity-10';
            return (
              <div
                key={i}
                role="option"
                aria-selected={isCenter}
                className={`flex items-center justify-center text-base ${opacityClass} ${
                  isCenter
                    ? 'text-foundation-strong typo-headline text-[20px] font-semibold'
                    : 'text-foundation-primary typo-body-01 text-[18px]'
                }`}
                style={{ height: h, lineHeight: `${h}px` }}
              >
                {format(it)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function WheelPicker({ columns }: WheelPickerProps) {
  return (
    <div className="relative" style={{ height: CONTAINER_H }}>
      {/* 중앙 하이라이트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 left-0 z-20 h-13 -translate-y-1/2 rounded-xl bg-white/20"
        style={{ height: H_SEL }}
      />
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col, idx) => (
          <Column
            key={idx}
            label={col.ariaLabel}
            items={col.items}
            format={col.format}
            index={col.selectedIndex}
            onChange={col.onChangeIndex}
          />
        ))}
      </div>
      <div aria-hidden className="invisible" style={{ height: CONTAINER_H }} />
    </div>
  );
}
