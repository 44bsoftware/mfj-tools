// Federal tax data for U.S. couples filing jointly (and the alternative statuses we compare against).
// Sources: IRS Rev. Proc. 2024-40 (2025 figures), IRS Rev. Proc. 2025-32 (2026 figures), and the
// One Big Beautiful Bill Act (OBBBA, 2025) for the standard-deduction and Child Tax Credit changes.

export type Bracket = { rate: number; upTo: number }

export type Source = {
  label: string
  url: string
  note?: string
}

export type TaxYearData = {
  year: number
  brackets: {
    mfj: Bracket[]
    single: Bracket[]
    mfs: Bracket[]
  }
  ltcgBrackets: {
    mfj: Bracket[]
  }
  standardDeduction: {
    mfj: number
    single: number
    mfs: number
  }
  ctc: {
    perChild: number
    phaseoutStart: {
      mfj: number
      single: number
      mfs: number
    }
  }
  sources: Source[]
}

// Sentinel used for the top (no-upper-bound) bracket. JSON-safe, unlike Infinity.
const TOP = Number.MAX_SAFE_INTEGER

const data2025: TaxYearData = {
  year: 2025,
  brackets: {
    mfj: [
      { rate: 0.10, upTo: 23850 },
      { rate: 0.12, upTo: 96950 },
      { rate: 0.22, upTo: 206700 },
      { rate: 0.24, upTo: 394600 },
      { rate: 0.32, upTo: 501050 },
      { rate: 0.35, upTo: 751600 },
      { rate: 0.37, upTo: TOP },
    ],
    single: [
      { rate: 0.10, upTo: 11925 },
      { rate: 0.12, upTo: 48475 },
      { rate: 0.22, upTo: 103350 },
      { rate: 0.24, upTo: 197300 },
      { rate: 0.32, upTo: 250525 },
      { rate: 0.35, upTo: 626350 },
      { rate: 0.37, upTo: TOP },
    ],
    mfs: [
      { rate: 0.10, upTo: 11925 },
      { rate: 0.12, upTo: 48475 },
      { rate: 0.22, upTo: 103350 },
      { rate: 0.24, upTo: 197300 },
      { rate: 0.32, upTo: 250525 },
      { rate: 0.35, upTo: 375800 },
      { rate: 0.37, upTo: TOP },
    ],
  },
  ltcgBrackets: {
    mfj: [
      { rate: 0.00, upTo: 96700 },
      { rate: 0.15, upTo: 600050 },
      { rate: 0.20, upTo: TOP },
    ],
  },
  // OBBBA raised 2025 standard deductions above the original Rev Proc 2024-40 figures
  // ($30,000 MFJ / $15,000 Single+MFS).
  standardDeduction: {
    mfj: 31500,
    single: 15750,
    mfs: 15750,
  },
  // OBBBA raised the maximum CTC from $2,000 to $2,200 per qualifying child, effective 2025.
  ctc: {
    perChild: 2200,
    phaseoutStart: {
      mfj: 400000,
      single: 200000,
      mfs: 200000,
    },
  },
  sources: [
    {
      label: 'IRS Rev. Proc. 2024-40',
      url: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf',
      note: 'Original 2025 inflation-adjusted brackets, LTCG thresholds, and CTC phaseouts.',
    },
    {
      label: 'IRS — One Big Beautiful Bill provisions (Individuals and workers)',
      url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions-individuals-and-workers',
      note: 'OBBBA (2025) raised the 2025 standard deduction to $31,500 MFJ / $15,750 Single+MFS and the Child Tax Credit to $2,200 per child.',
    },
  ],
}

const data2026: TaxYearData = {
  year: 2026,
  brackets: {
    mfj: [
      { rate: 0.10, upTo: 24800 },
      { rate: 0.12, upTo: 100800 },
      { rate: 0.22, upTo: 211400 },
      { rate: 0.24, upTo: 403550 },
      { rate: 0.32, upTo: 512450 },
      { rate: 0.35, upTo: 768700 },
      { rate: 0.37, upTo: TOP },
    ],
    single: [
      { rate: 0.10, upTo: 12400 },
      { rate: 0.12, upTo: 50400 },
      { rate: 0.22, upTo: 105700 },
      { rate: 0.24, upTo: 201775 },
      { rate: 0.32, upTo: 256225 },
      { rate: 0.35, upTo: 640600 },
      { rate: 0.37, upTo: TOP },
    ],
    mfs: [
      { rate: 0.10, upTo: 12400 },
      { rate: 0.12, upTo: 50400 },
      { rate: 0.22, upTo: 105700 },
      { rate: 0.24, upTo: 201775 },
      { rate: 0.32, upTo: 256225 },
      { rate: 0.35, upTo: 384350 },
      { rate: 0.37, upTo: TOP },
    ],
  },
  ltcgBrackets: {
    mfj: [
      { rate: 0.00, upTo: 98900 },
      { rate: 0.15, upTo: 613700 },
      { rate: 0.20, upTo: TOP },
    ],
  },
  standardDeduction: {
    mfj: 32200,
    single: 16100,
    mfs: 16100,
  },
  ctc: {
    perChild: 2200,
    phaseoutStart: {
      mfj: 400000,
      single: 200000,
      mfs: 200000,
    },
  },
  sources: [
    {
      label: 'IRS Rev. Proc. 2025-32',
      url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf',
      note: '2026 inflation-adjusted brackets, LTCG thresholds, standard deductions, and CTC phaseouts (incorporates OBBBA amendments).',
    },
    {
      label: 'IRS — Tax inflation adjustments for tax year 2026',
      url: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill',
      note: 'Plain-English summary of the 2026 figures and OBBBA changes.',
    },
  ],
}

export const TAX_YEARS: Record<string, TaxYearData> = {
  '2025': data2025,
  '2026': data2026,
}

export const SUPPORTED_YEARS = Object.keys(TAX_YEARS).sort()

// The canonical "current" year for the calculators.
// Flip this on January 1 each year (or earlier, once the IRS publishes the next year's Rev. Proc.,
// typically late October — and once any mid-year tax-law changes are finalized).
export const CURRENT_TAX_YEAR = '2026'
