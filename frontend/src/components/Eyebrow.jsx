// Le petit texte en majuscules précédé d'un trait bleu
export default function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-9 bg-sky" />
      <span
        className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
          light ? 'text-white/80' : 'text-forest/70'
        }`}
      >
        {children}
      </span>
    </div>
  )
}
