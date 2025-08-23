import DeleteIcon from '@/assets/icon/delete_icon.svg';
import ClockIcon from '@/assets/icon/clock_icon.svg';

export default function RecentSearch() {
  const recentKeywords = ['갈등', '실패했을 때', '장단점'];

  return (
    <div className="py-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="typo-subhead-long-03 text-foundation-primary">
          최근 검색
        </h2>
        <button
          type="button"
          className="typo-body-long-01 text-foundation-secondary cursor-pointer"
        >
          전체 삭제
        </button>
      </div>

      <ul className="space-y-2">
        {recentKeywords.length > 0 &&
          recentKeywords.map(keyword => (
            <li key={keyword} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockIcon />
                <span className="text-foundation-primary">{keyword}</span>
              </div>
              <button className="cursor-pointer">
                <DeleteIcon />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
