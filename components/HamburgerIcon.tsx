interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border border-[color:var(--mk-border)] bg-white transition-colors hover:bg-gray-50"
      aria-label={isOpen ? "Zatvori meni" : "Otvori meni"}
      aria-expanded={isOpen}
    >
      <span
        className={`block h-0.5 w-5 bg-[color:var(--mk-ink)] transition-all duration-300 ${
          isOpen ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-[color:var(--mk-ink)] transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-[color:var(--mk-ink)] transition-all duration-300 ${
          isOpen ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </button>
  );
}
