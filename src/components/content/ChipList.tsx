export function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm border border-border bg-background-alt px-4 py-2 text-sm font-medium text-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}