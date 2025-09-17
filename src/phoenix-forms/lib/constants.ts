export const CERT_TYPES = ['estimate','invoice','warranty','receipt','insurancePaymentAuth','depreciation','job-cost-dep','standard','job-total-only'] as const;

export const LABELS = {
  depreciation: 'CoC – Depreciation',
  'job-cost-dep': 'CoC – Job Total Cost & Depreciation',
  standard: 'CoC – Standard',
  'job-total-only': 'CoC – Job Total Cost Only',
  estimate: 'Estimate',
  invoice: 'Invoice',
  warranty: 'Warranty Certificate',
  receipt: 'Receipt',
  insurancePaymentAuth: 'Insurance Claim Payment & Representation Authorization',
} as const;

export const SUBS = {
  depreciation: 'Form with Depreciation amount',
  'job-cost-dep': 'Form with Job Total Cost & Depreciation amount',
  standard: 'Standard form without job total cost or depreciation amounts',
  'job-total-only': 'Form with Job Total Cost only',
  estimate: 'Construction invoice with Xactimate pricing',
  invoice: 'Construction invoice with Xactimate pricing',
  warranty: 'Professional roofing warranty certificate',
  receipt: 'Payment receipt document',
  insurancePaymentAuth: 'Direction of Pay, Assignment, Representation & Trust Fund declaration',
} as const;

export const BASE_FIELDS = {
  homeownerName: 'Homeowner Name',
  insuranceCompany: 'Insurance Company',
  address1: 'Street Address',
  address2: 'City, State, ZIP',
  contractDate: 'Contract Date',
  certificateDate: 'Certificate Date',
  claimNumber: 'Claim Number',
} as const;