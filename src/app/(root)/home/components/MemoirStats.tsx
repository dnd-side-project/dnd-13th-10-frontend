import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';

export default function MemoirStats() {
  return (
    <section className="bg-foundation-box flex flex-col gap-4 rounded-xl p-5">
      <div className="typo-subhead-03 flex items-center justify-between">
        <span className="text-foundation-strong">지금까지 기록한 회고</span>
        <p>
          <span className="text-primary-btn">12</span>
          <span className="text-foundation-strong">개</span>
        </p>
      </div>
      <Button size="large" variant="yellow" href={PATH.MEMOIR.CREATE.path}>
        {PATH.MEMOIR.CREATE.label}
      </Button>
    </section>
  );
}
