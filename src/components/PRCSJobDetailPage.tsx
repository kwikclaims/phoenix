import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Link as LinkIcon, FileText, ClipboardCheck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loadRowsBySheetName, type Row } from "../lib/sheetLoader";
import { GOOGLE_SHEET } from "../config/sheets";

interface PRCSJobDetailPageProps {
  jobId: string;
}

export const PRCSJobDetailPage: React.FC<PRCSJobDetailPageProps> = ({ jobId }) => {
  const [jobData, setJobData] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const fetchJobData = async () => {
    setLoading(true);
    setError("");
    try {
      const rows = await loadRowsBySheetName(GOOGLE_SHEET.SHEET_NAMES.PRCS_PROJECTS);
      console.log("[PRCSJobDetailPage] Raw rows:", rows);
      
      if (!rows.length) {
        throw new Error("No data found in PHOENIX DEALS sheet");
      }

      // Find the job by ID (extract index from prcs-project-X format)
      const jobIndex = parseInt(jobId.replace('prcs-project-', '')) - 1;
      const job = rows[jobIndex];
      
      if (!job) {
        throw new Error("PRCS project not found");
      }

      setJobData(job);
      
    } catch (err: any) {
      console.error("[PRCSJobDetailPage] Failed to load job:", err);
      setError(err.message || "Failed to load PRCS project details");
      toast.error("Failed to load PRCS project details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, [jobId]);

  const handleRefresh = async () => {
    try {
      await fetchJobData();
      toast.success("PRCS project details refreshed");
    } catch (error) {
      toast.error("Failed to refresh PRCS project details");
    }
  };

  const renderFieldValue = (value: any, fallback: string = 'Not provided') => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-500 italic">{fallback}</span>;
    }
    if (typeof value === 'boolean') {
      return <span className={value ? 'text-green-400' : 'text-gray-500'}>{value ? 'Yes' : 'No'}</span>;
    }
    
    const stringValue = String(value).trim();
    if (!stringValue) {
      return <span className="text-gray-500 italic">{fallback}</span>;
    }

    // Check if it's a URL
    if (stringValue.startsWith('http') || stringValue.startsWith('www.')) {
      return (
        <a
          href={stringValue.startsWith('http') ? stringValue : `https://${stringValue}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors underline break-all inline-flex items-center gap-1"
        >
          <LinkIcon className="w-4 h-4 flex-shrink-0" />
          {stringValue}
        </a>
      );
    }

    return <span className="text-white font-medium break-words">{stringValue}</span>;
  };

  const Field: React.FC<{ label: string; value: any; className?: string }> = ({ label, value, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-2xl border border-[#FF0000]/20 bg-black/60 backdrop-blur-xl p-4 hover:bg-black/80 hover:border-[#FF0000]/40 transition-all duration-300 ${className}`}
    >
      <div className="text-xs uppercase tracking-wide text-[#FF0000] mb-2">{label}</div>
      <div className="break-words whitespace-pre-wrap">
        {renderFieldValue(value)}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading PRCS project details...</p>
        </div>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">PRCS Project Not Found</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const customerName = `${jobData["First Name"] || ""} ${jobData["Last Name"] || ""}`.trim() || "Unknown Customer";
  const fullAddress = [jobData["Address"], jobData["City"], jobData["State"], jobData["ZIP Code"]]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{customerName}</h1>
          <p className="text-gray-400 mt-1">{fullAddress}</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-900/50 border border-gray-700 text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50 rounded-lg transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-[#FF0000]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#FF0000] mb-1">Current Stage</div>
              <div className="text-white font-medium">{jobData["Stage"] || "Not provided"}</div>
            </div>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#FF0000]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#FF0000] mb-1">Sub-Stage</div>
              <div className="text-white font-medium">{jobData["Sub-Stage"] || "Not provided"}</div>
            </div>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#FF0000]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#FF0000] mb-1">Date of Loss</div>
              <div className="text-white font-medium">{jobData["Date of Loss"] || "Not provided"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* All Job Details */}
      <div className="space-y-8">
        {/* Stage Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Stage Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Stage" value={jobData["Stage"]} />
            <Field label="Sub-Stage" value={jobData["Sub-Stage"]} />
          </div>
        </section>

        {/* Basic Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First Name" value={jobData["First Name"]} />
            <Field label="Last Name" value={jobData["Last Name"]} />
            <Field label="Email" value={jobData["Email"]} />
            <Field label="Phone" value={jobData["Phone"]} />
            <Field label="Address" value={jobData["Address"]} />
            <Field label="City" value={jobData["City"]} />
            <Field label="State" value={jobData["State"]} />
            <Field label="ZIP Code" value={jobData["ZIP Code"]} />
            <Field label="Insurance Company" value={jobData["Insurance Company"]} />
          </div>
        </section>

        {/* Roof Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Roof Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Roof Age (years)" value={jobData["Roof Age"]} />
            <Field label="Last Roof Access" value={jobData["When was the last time you had someone on your roof?"]} />
            <Field label="Years with Insurer" value={jobData["How many years have you been with them?"]} />
            <Field label="Roof Type" value={jobData["Roof Type"]} />
            <Field label="Number of Stories" value={jobData["How many stories?"]} />
            <Field label="Roofing Layers" value={jobData["How many layers?"]} />
          </div>
        </section>

        {/* Claim History */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Claim History</h2>
          <div className="grid grid-cols-1 gap-4">
            <Field label="Previous Claims" value={jobData["Have you ever called in a claim before?"]} />
            <Field label="Out-of-Pocket Repairs" value={jobData["Have you ever had to pay out-of-pocket for repairs?"]} />
            <Field label="Interior Damage/Leaks" value={jobData["Are there any Interior damage, leaks or water stains? And if so which rooms?"]} />
          </div>
        </section>

        {/* Damage Assessment */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Damage Assessment</h2>
          <div className="grid grid-cols-1 gap-4">
            <Field label="Window/Siding/Gutter Damage" value={jobData["Is there Damage on the windows, Siding, Gutters?"]} />
            <Field label="Tree Damage" value={jobData["Any Tree Damage?"]} />
            <Field label="HVAC Damage" value={jobData["Any HVAC Damage?"]} />
          </div>
        </section>

        {/* Representatives */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Representatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#FF0000] mb-4">Primary Representative</h3>
              <div className="space-y-4">
                <Field label="Name" value={jobData["Representative 1 Name"]} />
                <Field label="Phone" value={jobData["Representative 1 Phone"]} />
                <Field label="Email" value={jobData["Representative 1 Email"]} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#FF0000] mb-4">Secondary Representative</h3>
              <div className="space-y-4">
                <Field label="Name" value={jobData["Representative 2 Name"]} />
                <Field label="Phone" value={jobData["Representative 2 Phone"]} />
                <Field label="Email" value={jobData["Representative 2 Email"]} />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Field label="Additional Notes" value={jobData["Additional Notes"]} />
          </div>
        </section>

        {/* Loss Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Loss Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Date of Loss" value={jobData["Date of Loss"]} />
            <Field label="Storm Description" value={jobData["Storm Description"]} />
          </div>
        </section>

        {/* Claim Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Claim Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Claim Number" value={jobData["Claim Number"]} />
            <Field label="Adjuster Meeting" value={jobData["Adjuster Meeting"]} />
            <Field label="Adjuster Name" value={jobData["Adjuster Name"]} />
            <Field label="Adjuster Phone" value={jobData["Adjuster Phone"]} />
            <Field label="Adjuster Extension" value={jobData["Adjuster Ext."]} />
            <Field label="Adjuster Email" value={jobData["Adjuster Email"]} />
            <Field label="Ladder Assist Phone" value={jobData["Ladder Assist Phone Number"]} />
            <Field label="Insurance Email" value={jobData["Insurance Email"]} />
          </div>
          <div className="mt-4">
            <Field label="Insurance File Upload/Portal Link" value={jobData["Insurance File Upload/Portal Link"]} />
          </div>
        </section>

        {/* Documentation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Cover Letter Notes" value={jobData["Cover Letter Notes"]} />
            <Field label="Photo Packet Link" value={jobData["Photo Packet Link"]} />
            <Field label="Repairability Test Link" value={jobData["Repairablity Test Link"]} />
            <Field label="Cover Letter" value={jobData["Cover Letter"]} />
          </div>
        </section>

        {/* Material Tests */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Material Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Material Test Link 1" value={jobData["Material Test Link 1"]} />
            <Field label="Material Test Link 2" value={jobData["Material Test Link 2"]} />
            <Field label="Material Test Link 3" value={jobData["Material Test Link 3"]} />
            <Field label="Material Test Link 4" value={jobData["Material Test Link 4"]} />
          </div>
        </section>

        {/* Measurements */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Measurements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Measurement Upload 1" value={jobData["Measurement Upload 1"]} />
            <Field label="Measurement Upload 2" value={jobData["Measurement Upload 2"]} />
            <Field label="Measurement Upload 3" value={jobData["Measurement Upload 3"]} />
            <Field label="Measurement Upload 4" value={jobData["Measurement Upload 4"]} />
          </div>
        </section>

        {/* Documents */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Estimate" value={jobData["Estimate"]} />
            <Field label="Contract" value={jobData["Contract"]} />
            <Field label="Certificate of Completion" value={jobData["Coc"]} />
            <Field label="Receipt" value={jobData["Receipt"]} />
            <Field label="Warranty" value={jobData["Warranty"]} />
          </div>
        </section>

        {/* Financial Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Financial Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Total Amount Customer Paying" value={jobData["Total Amount Customer is Paying ($)"]} />
            <Field label="Exterior Total" value={jobData["Exterior Total ($)"]} />
            <Field label="Interior Total" value={jobData["Interior Total ($)"]} />
          </div>
        </section>

        {/* Supplement Photo Packets */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Supplement Photo Packets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Supplement Photo Packet 1" value={jobData["Supplement Photo Packet 1"]} />
            <Field label="Supplement Photo Packet 2" value={jobData["Supplement Photo Packet 2"]} />
            <Field label="Supplement Photo Packet 3" value={jobData["Supplement Photo Packet 3"]} />
            <Field label="Supplement Photo Packet 4" value={jobData["Supplement Photo Packet 4"]} />
          </div>
        </section>

        {/* Supplement Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Supplement Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Supplement Cost" value={jobData["Supplement Cost ($)"]} />
            <Field label="Supplement Charge" value={jobData["Supplement Charge ($)"]} />
            <Field label="Supplement Items" value={jobData["Supplement Items"]} />
            <Field label="Client Extra Cost Cost ($)" value={jobData["Client Extra Cost Cost ($)"]} />
            <Field label="Client Extra Cost Charge ($)" value={jobData["Client Extra Cost Charge ($)"]} />
            <Field label="Extra Cost Items" value={jobData["Extra Cost Items"]} />
          </div>
        </section>

        {/* Payments */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Payments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="1st Payment" value={jobData["1st Payment"]} />
            <Field label="2nd Payment" value={jobData["2nd Payment"]} />
            <Field label="3rd Payment" value={jobData["3rd Payment"]} />
            <Field label="4th Payment" value={jobData["4th Payment"]} />
            <Field label="Payment Proof 1" value={jobData["Payment Proof 1"]} />
            <Field label="Payment Proof 2" value={jobData["Payment Proof 2"]} />
            <Field label="Payment Proof 3" value={jobData["Payment Proof 3"]} />
            <Field label="Payment Proof 4" value={jobData["Payment Proof 4"]} />
          </div>
        </section>

        {/* Profit & Loss */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Profit & Loss</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Company Loss" value={jobData["Company Loss ($)"]} />
            <Field label="Loss Explanation" value={jobData["Loss Explanation"]} />
            <Field label="Customer Balance" value={jobData["Customer Balance"]} />
            <Field label="Profit" value={jobData["Profit ($)"]} />
            <Field label="Company Profit" value={jobData["Company Profit"]} />
            <Field label="Leo Profit" value={jobData["Leo Profit"]} />
            <Field label="Zach Profit" value={jobData["Zach Profit"]} />
          </div>
        </section>
      </div>
    </div>
  );
};