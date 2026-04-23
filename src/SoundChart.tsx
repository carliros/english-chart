import { useRef } from 'react'
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

// Derive IPA letter → public audio URL from filenames (e.g. sound_01_p.mp3 → { p: '.../sound_01_p.mp3' })
const soundFileNames = [
  'sound_01_p.mp3', 'sound_02_b.mp3', 'sound_03_t.mp3', 'sound_04_d.mp3',
  'sound_05_k.mp3', 'sound_06_g.mp3', 'sound_07_f.mp3', 'sound_08_v.mp3',
  'sound_09_s.mp3', 'sound_10_z.mp3', 'sound_11_h.mp3', 'sound_12_l.mp3',
  'sound_13_r.mp3', 'sound_14_m.mp3', 'sound_15_n.mp3', 'sound_16_w.mp3',
]

const soundMap: Record<string, string> = {}
for (const filename of soundFileNames) {
  const match = filename.match(/sound_\d+_(.+)\.mp3$/)
  if (match) {
    soundMap[match[1]] = `${import.meta.env.BASE_URL}sounds/${filename}`
  }
}

function getAudioUrl(symbol: string): string | undefined {
  const letter = symbol.replace(/\//g, '').trim()
  return soundMap[letter]
}

function ChartSection({ rows, onPlay }: { rows: string[][], onPlay: (symbol: string) => void }) {
  return (
    <table className="chart-table">
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((symbol, ci) => {
              const hasAudio = !!getAudioUrl(symbol)
              return (
                <td
                  key={ci}
                  className={`chart-cell${hasAudio ? ' chart-cell--playable' : ''}`}
                  onClick={() => hasAudio && onPlay(symbol)}
                  title={hasAudio ? `Play ${symbol}` : undefined}
                >
                  {symbol}
                  {hasAudio && <span className="play-icon">▶</span>}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function SoundChart() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function playSound(symbol: string) {
    const url = getAudioUrl(symbol)
    if (!url) return
    if (audioRef.current) {
      audioRef.current.pause()
    }
    const audio = new Audio(url)
    audioRef.current = audio
    audio.play()
  }

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
        <ChartSection rows={consonants} onPlay={playSound} />
        <div className="chart-divider" />
        <ChartSection rows={vowels} onPlay={playSound} />
      </div>
    </div>
  )
}
