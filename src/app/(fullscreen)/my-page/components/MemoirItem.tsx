import { Badge } from '@/components/ui/Badge';
import { formatDateToYYMMDD } from '@/utils/date';
import type { Memoir } from '@/types/memoirTypes';

interface Props {
  memoir: Memoir;
  hideBadge?: boolean;
}

export default function MemoirItem({ memoir, hideBadge = false }: Props) {
  const badgeTextColor =
    memoir.type === '퀵 회고' ? 'text-secondary-btn' : 'text-primary-btn';

  return (
    <>
      <article className="bg-foundation-box cursor-pointer rounded-lg p-3">
        <div className="flex items-center gap-3">
          {!hideBadge && (
            <Badge className={badgeTextColor} shape="minimal" size="xsmall">
              {memoir.type}
            </Badge>
          )}
          <div className="flex items-center gap-[6px]">
            <h3 className="typo-subhead-long-03 text-foundation-primary">
              {memoir.companyName}
            </h3>
            <span className="typo-subhead-02 text-foundation-disabled">|</span>
            <p className="typo-subhead-long-03 text-foundation-primary">
              {memoir.position}
            </p>
          </div>
        </div>

        <p className="typo-caption text-foundation-disabled mt-1">
          작성일 : {formatDateToYYMMDD(memoir.createdAt)}
        </p>
      </article>
    </>
  );
}
