export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only-focusable meta fixed top-2 left-2 z-[60] bg-paper px-4 py-3 text-void"
    >
      {label}
    </a>
  );
}
