interface Props {
  text: string;
}

function EmptyState({ text }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <ul className="flex items-center justify-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            className="bg-foundation-secondary h-2 w-2 rounded-full"
            key={index}
          />
        ))}
      </ul>

      <span className="typo-headline text-foundation-secondary text-center">
        {text}
      </span>
    </div>
  );
}

export { EmptyState };
