// Titre sur deux lignes : la 1re en blanc ou marine, la 2e en bleu italique
export default function Title({ white, blue, dark = false, className = '' }) {
  return (
    <h2
      className={`font-display font-bold uppercase leading-[0.95] ${
        className || 'text-[clamp(2.5rem,4.2vw,4.75rem)]'
      }`}
    >
      <span className={dark ? 'text-navy' : 'text-white'}>{white}</span>
      <br />
      <span className="italic text-sky">{blue}</span>
    </h2>
  )
}
