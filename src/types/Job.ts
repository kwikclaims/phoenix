export interface HomeownerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  insuranceCompany: string;
  roofAge: string;
  lastRoofAccess: string;
  yearsWithInsurer: string;
  previousClaims: boolean;
  previousClaimsDetails: string;
  paidOutOfPocket: boolean;
  paidOutOfPocketDetails: string;
  activeLeaks: boolean;
  leakRooms: string;
}

export interface RepresentativeInfo {
  roofType: string;
  numberOfStories: string;
  roofingLayers: string;
  hailDamage: boolean;
  hailDamageDetails: string;
  treeDamage: boolean;
  treeDamageDetails: string;
  hvacDamage: boolean;
  hvacDamageDetails: string;
  primaryRepName: string;
  primaryRepEmail: string;
  primaryRepPhone: string;
  secondRepName: string;
  secondRepEmail: string;
  secondRepPhone: string;
  additionalNotes: string;
}

export interface FinancialInfo {
  totalAmountCustomerPaying: number;
  exteriorTotal: number;
  interiorTotal: number;
  supplement: number;
  supplementItems: string;
  clientExtraCost: number;
  extraCostItems: string;
  firstPayment: number;
  secondPayment: number;
  thirdPayment: number;
  fourthPayment: number;
  companyLossesTotal: number;
  lossExplanation: string;
}

export interface PhotoWithArrow {
  id: string;
  filename: string;
  url: string;
  storagePath?: string; // Path in Supabase Storage for deletion
  uploadedAt: string;
  size: number;
  category?: 'exterior' | 'interior';
  arrow?: {
    x: number;
    y: number;
    rotation: number;
    scale: number;
  };
}

export interface JobProgress {
  id: string;
  userId: string;
  createdAt: string;
  lastSaved: string;
  stage?: string;              // e.g. "🟩 Stage 1 – Claim Setup"
  subStage?: string;           // e.g. "Overview Inspection"
  currentStep: number;
  currentSubStage?: string;    // legacy substage name (keep populated)
  homeownerInfo: Partial<HomeownerInfo>;
  representativeInfo: Partial<RepresentativeInfo>;
  claimInfo?: any;
  contractorName?: string;
  mortgageCompany?: string;
  mortgageAuthFile?: { filename: string; url: string; storagePath?: string };
  stormDate: string;
  stormDescription?: string;
  callRecording?: {
    audioUrl: string;
    storagePath?: string;
    transcription: string;
  };
  policyFile?: {
    filename: string;
    url: string;
    storagePath?: string;
  };
  representativeSignature?: string;
  representativeSignaturePath?: string;
  paymentSignature?: string;
  paymentSignaturePath?: string;
  photos: PhotoWithArrow[];
  coverLetter: string;
  repairabilityTestLink: string;
  itelTestFile?: {
    filename: string;
    url: string;
    storagePath?: string;
  };
  itelTestFiles?: Array<{ filename: string; url: string; storagePath?: string }>;
  hoverFiles?: Array<{ filename: string; url: string; storagePath?: string }>;
  roomScanFiles?: Array<{ filename: string; url: string; storagePath?: string }>;
  polycamFiles?: Array<{ filename: string; url: string; storagePath?: string }>;
  miscFiles?: Array<{ filename: string; url: string; storagePath?: string }>;
  estimateFiles?: Array<{
    filename: string;
    url: string;
    storagePath?: string;
  }>;
  financial?: Partial<FinancialInfo>;
  isComplete: boolean;
  reportGenerated: boolean;
}

export interface CompletedJob extends JobProgress {
  isComplete: true;
  reportGenerated: true;
  completedAt: string;
  reportUrl: string;
}

export type Job = JobProgress | CompletedJob;