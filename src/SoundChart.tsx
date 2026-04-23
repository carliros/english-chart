import './SoundChart.css'

const consonants: string[][] = [
  ['/p/', '/t/', '/k/', '/f/', '/s/', '/θ/', '/ʃ/', '/tʃ/'],
  ['/b/', '/d/', '/g/', '/v/', '/z/', '/ð/', '/ʒ/', '/dʒ/'],
  ['/h/', '/l/', '/r/', '/w/', '/m/', '/n/', '/ŋ/', '/j/'],
]

const vowels: string[][] = [
  ['/iː/', '/ɪ/', '/e/', '/æ/', '/ɑː/', '/ɒ/', '/ɔː/'],
  ['/ʊ/', '/uː/', '/ʌ/', '/ɜː/', '/ə/', '/eɪ/', '/aɪ/'],
  ['/ɔɪ/', '/aʊ/', '/əʊ/', '/ɪə/', '/eə/', '/ʊə/'],
]

function ChartSection({ rows }: { rows: string[][] }) {
  return (
    <table className="chart-table">
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((symbol, ci) => (
              <td key={ci} className="chart-cell">
                {symbol}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function SoundChart() {
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <div className="chart-logo">
          <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <polygon points="4,4 36,20 4,36" fill="#333" />
          </svg>
        </div>
        <h1 className="chart-title">Sound symbol chart</h1>
      </div>

      <div className="chart-body">
        <ChartSection rows={consonants} />
        <div className="chart-divider" />
        <ChartSection rows={vowels} />
      </div>
    </div>
  )
}
