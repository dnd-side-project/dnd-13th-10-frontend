import { Badge } from '@/components/ui/Badge';
import { MEMOIR_TYPES } from '@/constants/code';
import { MEMOIR_TYPE_LABELS, POSITION_LABELS } from '@/constants/labels';
import type { Memoir } from '@/types/memoirTypes';

interface Props {
  memoir: Memoir;
  hideBadge?: boolean;
}

export default function MemoirItem({ memoir, hideBadge = false }: Props) {
  const badgeText =
    MEMOIR_TYPE_LABELS[memoir.type as keyof typeof MEMOIR_TYPE_LABELS];
  const badgeTextColor =
    memoir.type === MEMOIR_TYPES.QUICK
      ? 'text-secondary-btn'
      : 'text-primary-btn';

  return (
    <>
      <article className="bg-foundation-box cursor-pointer rounded-lg p-3">
        <div className="flex items-center gap-3">
          {!hideBadge && (
            <Badge className={badgeTextColor} shape="minimal" size="xsmall">
              {badgeText}
            </Badge>
          )}
          <div className="flex items-center gap-[6px]">
            <h3 className="typo-subhead-long-03 text-foundation-primary">
              {memoir.companyName}
            </h3>
            <span className="typo-subhead-02 text-foundation-disabled">|</span>
            <p className="typo-subhead-long-03 text-foundation-primary">
              {POSITION_LABELS[memoir.position as keyof typeof POSITION_LABELS]}
            </p>
          </div>
        </div>

        <p className="typo-caption text-foundation-disabled mt-1">
          작성일 : {memoir.createdAt.replaceAll('-', '.')}
        </p>
      </article>
    </>
  );
}
