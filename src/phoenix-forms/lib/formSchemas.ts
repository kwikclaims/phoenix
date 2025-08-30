import { z } from 'zod';

// A helper for phone/zip (tune as you like)
const phone = z.string().min(7, "Phone is required");
const zip = z.string().min(3, "ZIP is required");

// Base schema with common required fields
const baseSchema = z.object({
  homeownerName: z.string().min(1, 'Homeowner name is required'),
  insuranceCompany: z.string().min(1, 'Insurance company is required'),
  address1: z.string().min(1, 'Street address is required'),
  address2: z.string().min(1, 'City, state, zip is required'),
  contractDate: z.string().min(1, 'Contract date is required'),
  certificateDate: z.string().min(1, 'Certificate date is required'),
  claimNumber: z.string().min(1, 'Claim number is required'),
  signature: z.string().min(1, 'Signature is required'),
});

// Depreciation schema - adds recoverable depreciation
export const depreciationSchema = baseSchema.extend({
  recoverableDep: z.number().min(0, 'Recoverable depreciation must be 0 or greater'),
});

// Job cost + depreciation schema - adds both money fields
export const jobCostDepSchema = baseSchema.extend({
  totalJobCost: z.number().min(0, 'Total job cost must be 0 or greater'),
  depreciationAmount: z.number().min(0, 'Depreciation amount must be 0 or greater'),
});

// Standard schema - no additional money fields
export const standardSchema = baseSchema;

// Job total only schema - adds just job total cost
export const jobTotalOnlySchema = baseSchema.extend({
  jobTotal: z.number().min(0, 'Job total must be 0 or greater'),
});

// Estimate schema - rep info and context only
export const estimateSchema = z.object({
  repName: z.string().min(1, 'Rep name is required'),
  repPhone: z.string().min(1, 'Rep phone is required'),
  repEmail: z.string().email('Valid email is required'),
  context: z.string().min(1, 'Context is required'),
});

// Invoice schema - identical to estimate schema
export const invoiceSchema = z.object({
  repName: z.string().min(1, 'Rep name is required'),
  repPhone: z.string().min(1, 'Rep phone is required'),
  repEmail: z.string().email('Valid email is required'),
  context: z.string().min(1, 'Context is required'),
});

// Contracts schema - identical to estimate schema
export const contractsSchema = z.object({
  repName: z.string().min(1, 'Rep name is required'),
  repPhone: z.string().min(1, 'Rep phone is required'),
  repEmail: z.string().email('Valid email is required'),
  context: z.string().min(1, 'Context is required'),
});

// Warranty schema - warranty-specific fields plus signature
export const warrantySchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  installationDate: z.string().min(1, 'Installation date is required'),
  shingleColor: z.string().min(1, 'Shingle/color is required'),
  customerAddress: z.string().min(1, 'Customer address is required'),
  amountPaid: z.number().min(0, 'Amount paid must be 0 or greater'),
  signature: z.string().min(1, 'Signature is required'),
});

// Receipt schema
export const receiptSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerAddress: z.string().min(1, 'Customer address is required'),
  paymentAmount: z.number().min(0, 'Payment amount must be 0 or greater'),
  receiptDate: z.string().min(1, 'Receipt date is required'),
  signature: z.string().min(1, 'Signature is required'),
});

export const insurancePaymentAuthSchema = z.object({
  homeownerNames: z.string().min(1, "Name(s) required"),
  propertyAddress: z.string().min(1, "Property address required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  zip: zip,
  phone: phone,
  email: z.string().email("Valid email required"),
  insuranceCarrier: z.string().min(1, "Insurance carrier required"),
  claimNumber: z.string().min(1, "Claim number required"),
  mortgageCompany: z.string().min(1, "Mortgage company/lender required"),
  loanNumber: z.string().min(1, "Loan number required"),

  contractorRepName: z.string().min(1, "Contractor rep name required"),
  contractorRepTitle: z.string().min(1, "Contractor rep title required"),

  // Signatures + dates + printed names (2 homeowners supported)
  homeowner1PrintedName: z.string().min(1, "Printed name required"),
  homeowner1Date: z.string().min(1, "Date required"),
  homeowner1SignatureDataURL: z.string().optional(),

  homeowner2PrintedName: z.string().optional(),
  homeowner2Date: z.string().optional(),
  homeowner2SignatureDataURL: z.string().optional(),

  contractorDate: z.string().min(1, "Date required"),
  contractorSignatureDataURL: z.string().optional(),
});

export type InsurancePaymentAuthFormData = z.infer<typeof insurancePaymentAuthSchema>;

// Export type definitions
export type DepreciationFormData = z.infer<typeof depreciationSchema>;
export type JobCostDepFormData = z.infer<typeof jobCostDepSchema>;
export type StandardFormData = z.infer<typeof standardSchema>;
export type JobTotalOnlyFormData = z.infer<typeof jobTotalOnlySchema>;
export type EstimateFormData = z.infer<typeof estimateSchema>;
export type InvoiceFormData = z.infer<typeof invoiceSchema>;
export type ContractsFormData = z.infer<typeof contractsSchema>;
export type WarrantyFormData = z.infer<typeof warrantySchema>;
export type ReceiptFormData = z.infer<typeof receiptSchema>;

export type FormData = DepreciationFormData | JobCostDepFormData | StandardFormData | JobTotalOnlyFormData | EstimateFormData | InvoiceFormData | WarrantyFormData | ReceiptFormData | ContractsFormData | InsurancePaymentAuthFormData;

// Schema mapping
export const getSchemaForType = (type: string) => {
  switch (type) {
    case 'depreciation':
      return depreciationSchema;
    case 'job-cost-dep':
      return jobCostDepSchema;
    case 'standard':
      return standardSchema;
    case 'job-total-only':
      return jobTotalOnlySchema;
    case 'estimate':
      return estimateSchema;
    case 'invoice':
      return invoiceSchema;
    case 'contracts':
      return contractsSchema;
    case 'warranty':
      return warrantySchema;
    case 'receipt':
      return receiptSchema;
    case 'insurancePaymentAuth':
      return insurancePaymentAuthSchema;
    default:
      throw new Error(`Unknown form type: ${type}`);
  }
};