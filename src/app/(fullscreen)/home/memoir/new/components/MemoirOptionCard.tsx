import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface Props {
  title: string;
  timeEstimate: string;
  features: string[];
  buttonVariants: 'primary' | 'yellow';
  badgeTextColor?: string;
  href?: string;
}

export default function MemoirOptionCard({
  title,
  timeEstimate,
  features,
  buttonVariants,
  badgeTextColor,
  href,
}: Props) {
  return (
    <div className="bg-foundation-box rounded-xl px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="typo-headline text-foundation-strong">{title}</h2>
        <Badge
          className={cn('bg-foundation-divider', badgeTextColor)}
          shape="minimal"
          size="xsmall"
        >
          {timeEstimate}
        </Badge>
      </div>

      <ul className="mb-6 list-disc pl-6">
        {features.map((feature, index) => (
          <li key={index} className="typo-body-02 text-foundation-primary mb-2">
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={buttonVariants} size="large" href={href}>
        작성하기
      </Button>
    </div>
  );
}
