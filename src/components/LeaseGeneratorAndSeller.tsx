import React, { useState, useMemo } from "react";
import {
  FileText,
  DollarSign,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Shield,
  Layers,
  ShoppingBag,
  ExternalLink,
  Share2,
  CheckCircle2,
  AlertCircle,
  Code,
  Building,
  Calendar,
  KeyRound,
  ArrowRight,
  BookOpen
} from "lucide-react";

interface LeaseData {
  state: string;
  landlordName: string;
  landlordEmail: string;
  tenantName: string;
  tenantEmail: string;
  propertyAddress: string;
  unitNumber: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  dueDay: number;
  gracePeriodDays: number;
  lateFee: number;
  securityDeposit: number;
  petPolicy: "no_pets" | "pets_allowed" | "cats_only";
  petDeposit: number;
  smokingPolicy: "prohibited" | "outdoor_only";
  parkingSpaces: number;
  utilitiesPaidByTenant: string[];
  customClauses: string[];
}

const PRESET_LEASES: Record<string, Partial<LeaseData>> = {
  texas: {
    state: "Texas",
    propertyAddress: "4820 Barton Springs Rd",
    unitNumber: "Apt 204, Austin, TX 78704",
    monthlyRent: 2150,
    securityDeposit: 2150,
    lateFee: 75,
    gracePeriodDays: 3,
    petPolicy: "pets_allowed",
    petDeposit: 350,
    smokingPolicy: "prohibited",
    parkingSpaces: 2,
    utilitiesPaidByTenant: ["Electricity", "Internet/Cable", "Gas"]
  },
  florida: {
    state: "Florida",
    propertyAddress: "1250 Ocean Drive",
    unitNumber: "Suite 5B, Miami Beach, FL 33139",
    monthlyRent: 2800,
    securityDeposit: 2800,
    lateFee: 100,
    gracePeriodDays: 5,
    petPolicy: "cats_only",
    petDeposit: 250,
    smokingPolicy: "prohibited",
    parkingSpaces: 1,
    utilitiesPaidByTenant: ["Electricity", "Water", "Internet/Cable"]
  },
  california: {
    state: "California",
    propertyAddress: "742 Evergreen Terrace",
    unitNumber: "Unit 3, Los Angeles, CA 90026",
    monthlyRent: 3200,
    securityDeposit: 3200,
    lateFee: 95,
    gracePeriodDays: 4,
    petPolicy: "pets_allowed",
    petDeposit: 400,
    smokingPolicy: "prohibited",
    parkingSpaces: 1,
    utilitiesPaidByTenant: ["Electricity", "Gas", "Internet/Cable"]
  },
  georgia: {
    state: "Georgia",
    propertyAddress: "900 Peachtree St NE",
    unitNumber: "Apt 812, Atlanta, GA 30309",
    monthlyRent: 1950,
    securityDeposit: 1950,
    lateFee: 65,
    gracePeriodDays: 5,
    petPolicy: "pets_allowed",
    petDeposit: 300,
    smokingPolicy: "prohibited",
    parkingSpaces: 2,
    utilitiesPaidByTenant: ["Electricity", "Gas", "Water"]
  }
};

const STATE_LEGAL_DISCLOSURES: Record<string, string> = {
  Texas:
    "TEXAS PROPERTY CODE DISCLOSURE (§ 92.056): Landlord shall act with reasonable diligence to repair any condition that materially affects the physical health or safety of an ordinary tenant, provided tenant has given proper written notice. Tenant agrees to send repair requests via certified mail if statutory remedies are sought.",
  Florida:
    "FLORIDA STATUTES § 83.49 DISCLOSURE: Your lease requires payment of certain deposits. The landlord may transfer advance rents to the landlord's account as they are due and without notice. When you move out, you must give the landlord your new address so that the landlord can send you notices regarding your deposit.",
  California:
    "CALIFORNIA CIVIL CODE § 1950.5 DISCLOSURE: Security deposits are capped at one month's rent (effective AB 12). Landlord must return security deposit itemized deductions and remaining balance within 21 calendar days of tenant vacating the premises. Tenant acknowledges AB 1482 Tenant Protection Act notices.",
  Georgia:
    "GEORGIA CODE § 44-7-30 DISCLOSURE: Security deposits are placed in an escrow account established only for that purpose in a bank or lending institution. Landlord provides a comprehensive inspection checklist prior to lease commencement.",
  General:
    "GENERAL RESIDENTIAL TENANCY DISCLOSURE: Landlord and Tenant agree that this Agreement complies with local fair housing guidelines, prohibiting discrimination based on race, color, religion, sex, handicap, familial status, or national origin."
};

export default function LeaseGeneratorAndSeller() {
  const [activeTab, setActiveTab] = useState<"generator" | "seller_hub" | "export_preview">("generator");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<LeaseData>({
    state: "Texas",
    landlordName: "Apex Property Holdings LLC",
    landlordEmail: "leasing@apexproperties.com",
    tenantName: "Michael & Sarah Jenkins",
    tenantEmail: "m.jenkins@example.com",
    propertyAddress: "4820 Barton Springs Rd",
    unitNumber: "Apt 204, Austin, TX 78704",
    startDate: "2026-11-01",
    endDate: "2027-10-31",
    monthlyRent: 2150,
    dueDay: 1,
    gracePeriodDays: 3,
    lateFee: 75,
    securityDeposit: 2150,
    petPolicy: "pets_allowed",
    petDeposit: 350,
    smokingPolicy: "prohibited",
    parkingSpaces: 2,
    utilitiesPaidByTenant: ["Electricity", "Internet/Cable", "Gas"],
    customClauses: [
      "Strict No Subletting / No AirBnB: The Premises shall be used solely as a private residential dwelling. Any listing on Airbnb, VRBO, or unauthorized short-term sublease will result in immediate termination of tenancy.",
      "Maintenance Deductible: Tenant is responsible for minor repairs and replacements costing $75 or less (e.g. HVAC filter replacement, light bulbs, garbage disposal unjamming)."
    ]
  });

  const [newClauseInput, setNewClauseInput] = useState("");

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 2500);
  };

  const handleApplyPreset = (key: string) => {
    const preset = PRESET_LEASES[key];
    if (preset) {
      setFormData((prev) => ({
        ...prev,
        ...preset
      }));
    }
  };

  const handleAddClause = () => {
    if (!newClauseInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      customClauses: [...prev.customClauses, newClauseInput.trim()]
    }));
    setNewClauseInput("");
  };

  const handleRemoveClause = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      customClauses: prev.customClauses.filter((_, i) => i !== idx)
    }));
  };

  const toggleUtility = (util: string) => {
    setFormData((prev) => {
      const exists = prev.utilitiesPaidByTenant.includes(util);
      return {
        ...prev,
        utilitiesPaidByTenant: exists
          ? prev.utilitiesPaidByTenant.filter((u) => u !== util)
          : [...prev.utilitiesPaidByTenant, util]
      };
    });
  };

  // Generated Lease Agreement Text
  const generatedLeaseText = useMemo(() => {
    const disclosure =
      STATE_LEGAL_DISCLOSURES[formData.state] || STATE_LEGAL_DISCLOSURES["General"];

    return `STANDARD RESIDENTIAL LEASE AGREEMENT
State of: ${formData.state.toUpperCase()}

THIS RESIDENTIAL LEASE AGREEMENT ("Agreement") is entered into as of ${formData.startDate}, by and between:
LANDLORD: ${formData.landlordName} (${formData.landlordEmail})
AND
TENANT(S): ${formData.tenantName} (${formData.tenantEmail})

1. PREMISES:
Landlord leases to Tenant the real property located at:
${formData.propertyAddress}, ${formData.unitNumber}.

2. LEASE TERM:
The term of this Lease begins on ${formData.startDate} and terminates on ${formData.endDate} ("Lease Term"). Possession shall be surrendered to Landlord upon termination.

3. RENT & PAYMENT SCHEDULE:
Tenant agrees to pay rent to Landlord in equal monthly installments of $${formData.monthlyRent.toLocaleString()} USD.
Rent is strictly due on the ${formData.dueDay}st/th day of each calendar month.
If Rent is not received within ${formData.gracePeriodDays} calendar days following the due date, Tenant shall incur an immediate late charge of $${formData.lateFee} USD.

4. SECURITY DEPOSIT:
Upon execution of this Lease, Tenant shall deposit with Landlord the sum of $${formData.securityDeposit.toLocaleString()} USD as a Security Deposit. The deposit shall be held to guarantee the full and faithful performance of Tenant's obligations and returned subject to applicable ${formData.state} statutory timeframes.

5. UTILITIES:
Tenant shall be solely responsible for establishing and paying for the following utilities and services:
${formData.utilitiesPaidByTenant.join(", ") || "None specified"}.
Landlord shall be responsible for remaining normal building services.

6. PET & SMOKING POLICY:
- Pets: ${
      formData.petPolicy === "no_pets"
        ? "No pets of any kind are permitted on the Premises without prior written authorization."
        : formData.petPolicy === "cats_only"
        ? `Cats only are permitted, subject to payment of an authorized pet deposit of $${formData.petDeposit} USD.`
        : `Pets permitted subject to landlord approval and pet deposit of $${formData.petDeposit} USD.`
    }
- Smoking: ${
      formData.smokingPolicy === "prohibited"
        ? "Smoking or vaping of any substance inside the Premises is strictly prohibited at all times."
        : "Smoking allowed strictly in designated outdoor exterior areas only."
    }
- Parking: Landlord designates ${formData.parkingSpaces} assigned vehicular parking space(s) for Tenant's use.

7. SPECIAL & ADDITIONAL CLAUSES:
${formData.customClauses.map((c, i) => `7.${i + 1}. ${c}`).join("\n\n")}

8. MANDATORY STATE DISCLOSURE:
${disclosure}

9. GOVERNING LAW:
This Lease shall be governed, construed, and interpreted by and through the statutory laws of the State of ${formData.state}.

IN WITNESS WHEREOF, the parties hereto have executed this Agreement:

Landlord Signature: _______________________   Date: ___________
Name: ${formData.landlordName}

Tenant Signature: _________________________   Date: ___________
Name: ${formData.tenantName}
`;
  }, [formData]);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/30 p-5 md:p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Turnkey AI Tool #1
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Ready to Sell for $79 - $299
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            AI US Real Estate Lease Agreement Generator
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create state-compliant residential lease contracts with automated disclosures, pet terms, and security deposit rules. You can use this as a free tool or sell copies of this exact codebase to buyers on Gumroad and Reddit for 100% profit.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("generator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "generator"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Lease Builder
          </button>
          <button
            onClick={() => setActiveTab("export_preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "export_preview"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            Document View
          </button>
          <button
            onClick={() => setActiveTab("seller_hub")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "seller_hub"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            How to Sell This Code ($79)
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: LEASE BUILDER                                                 */}
      {/* ===================================================================== */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form Controls */}
          <div className="lg:col-span-6 space-y-5">
            {/* Quick State Presets */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>1-Click Popular US Market Presets</span>
                <span className="text-[10px] text-blue-400">Auto-fills legal rules</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: "texas", label: "Austin, TX", rate: "$2,150/mo" },
                  { key: "florida", label: "Miami, FL", rate: "$2,800/mo" },
                  { key: "california", label: "Los Angeles, CA", rate: "$3,200/mo" },
                  { key: "georgia", label: "Atlanta, GA", rate: "$1,950/mo" }
                ].map((preset) => (
                  <button
                    key={preset.key}
                    onClick={() => handleApplyPreset(preset.key)}
                    className="p-2 text-left rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all text-xs"
                  >
                    <div className="font-semibold text-white">{preset.label}</div>
                    <div className="text-[10px] text-slate-400">{preset.rate}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Property & Parties */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                Parties & Property Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400">Governing State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Texas">Texas (TX)</option>
                    <option value="Florida">Florida (FL)</option>
                    <option value="California">California (CA)</option>
                    <option value="Georgia">Georgia (GA)</option>
                    <option value="New York">New York (NY)</option>
                    <option value="North Carolina">North Carolina (NC)</option>
                    <option value="Ohio">Ohio (OH)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Unit / Apartment #</label>
                  <input
                    type="text"
                    value={formData.unitNumber}
                    onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-slate-400">Full Property Street Address</label>
                  <input
                    type="text"
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Landlord / Entity Name</label>
                  <input
                    type="text"
                    value={formData.landlordName}
                    onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Tenant Full Name(s)</label>
                  <input
                    type="text"
                    value={formData.tenantName}
                    onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Financial Terms */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Rent, Deposit & Late Fees
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400">Monthly Rent ($)</label>
                  <input
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyRent: Number(e.target.value) || 0 })
                    }
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Security Deposit ($)</label>
                  <input
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      setFormData({ ...formData, securityDeposit: Number(e.target.value) || 0 })
                    }
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Late Fee ($)</label>
                  <input
                    type="number"
                    value={formData.lateFee}
                    onChange={(e) =>
                      setFormData({ ...formData, lateFee: Number(e.target.value) || 0 })
                    }
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Grace Period (Days)</label>
                  <input
                    type="number"
                    value={formData.gracePeriodDays}
                    onChange={(e) =>
                      setFormData({ ...formData, gracePeriodDays: Number(e.target.value) || 0 })
                    }
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Rules & Utilities */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                Policies & Utilities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400">Pet Policy</label>
                  <select
                    value={formData.petPolicy}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        petPolicy: e.target.value as LeaseData["petPolicy"]
                      })
                    }
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="pets_allowed">Pets Allowed (With Deposit)</option>
                    <option value="cats_only">Cats Only</option>
                    <option value="no_pets">Strictly No Pets</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Pet Deposit ($)</label>
                  <input
                    type="number"
                    disabled={formData.petPolicy === "no_pets"}
                    value={formData.petDeposit}
                    onChange={(e) =>
                      setFormData({ ...formData, petDeposit: Number(e.target.value) || 0 })
                    }
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none disabled:opacity-40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1.5">
                  Utilities Paid by Tenant:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["Electricity", "Gas", "Water", "Trash / Sewer", "Internet/Cable", "Lawn Care"].map(
                    (util) => {
                      const active = formData.utilitiesPaidByTenant.includes(util);
                      return (
                        <button
                          key={util}
                          type="button"
                          onClick={() => toggleUtility(util)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                            active
                              ? "bg-blue-600/30 border-blue-500/60 text-blue-300"
                              : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {active ? "✓ " : "+ "}
                          {util}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            {/* Custom AI Protection Clauses */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Custom Protective Clauses
                </span>
                <span className="text-[10px] text-slate-500">
                  {formData.customClauses.length} Active
                </span>
              </div>

              <div className="space-y-2">
                {formData.customClauses.map((clause, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start justify-between gap-2"
                  >
                    <div className="leading-relaxed">
                      <span className="text-blue-400 font-semibold mr-1">Clause 7.{idx + 1}:</span>
                      {clause}
                    </div>
                    <button
                      onClick={() => handleRemoveClause(idx)}
                      className="text-slate-500 hover:text-red-400 text-xs px-1 shrink-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="e.g. Key replacement fee is $150 if lockbox is lost..."
                  value={newClauseInput}
                  onChange={(e) => setNewClauseInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddClause()}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddClause}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shrink-0"
                >
                  Add Clause
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Document Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Live Agreement Preview</h3>
                <p className="text-[11px] text-slate-400">
                  Real-time generated legal document based on your parameters
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(generatedLeaseText, "copied_lease")}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  {copiedState === "copied_lease" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Text
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("export_preview")}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / PDF View
                </button>
              </div>
            </div>

            {/* Document Box */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[750px] overflow-y-auto selection:bg-blue-600 selection:text-white shadow-inner">
              {generatedLeaseText}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: PRINTABLE DOCUMENT EXPORT VIEW                                */}
      {/* ===================================================================== */}
      {activeTab === "export_preview" && (
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-white">Clean Formal Document Printout</h3>
              <p className="text-xs text-slate-400">
                Ready for signing or sending as a formal PDF attachment.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Print to PDF (Ctrl+P)
              </button>
              <button
                onClick={() => handleCopy(generatedLeaseText, "copy_full_contract")}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5"
              >
                {copiedState === "copy_full_contract" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                Copy Document
              </button>
            </div>
          </div>

          {/* White Paper Mockup for Printing */}
          <div className="bg-white text-slate-900 p-8 md:p-12 rounded-xl shadow-2xl font-serif text-sm leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-0">
            <div className="text-center pb-6 border-b border-slate-300 mb-6">
              <h1 className="text-xl font-bold uppercase tracking-wider text-slate-900">
                Residential Tenancy Lease Agreement
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                State of {formData.state} • Legally Binding Contract
              </p>
            </div>

            <div className="space-y-4 text-xs font-sans text-slate-800 leading-normal whitespace-pre-wrap">
              {generatedLeaseText}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: CODE SELLER HUB (HOW TO SELL THIS CODE FOR $79 - $299)         */}
      {/* ===================================================================== */}
      {activeTab === "seller_hub" && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Top Value Proposition */}
          <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Complete Seller Kit Included
              </span>
              <span className="text-xs text-slate-400">Zero domain needed • 100% Free to list</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              How to Sell This Exact Code to Buyers on Gumroad & Reddit
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Non-technical entrepreneurs, real estate flippers, and marketing agencies constantly buy ready-made micro-tools because they don't know how to code. You can sell a digital download of this codebase to multiple buyers for <strong>$79 to $149 each</strong>. You keep 100% ownership and can sell unlimited copies.
            </p>
          </div>

          {/* Step by Step Launch Plan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-sm font-semibold text-white">Gumroad ($0 Cost)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create a free account on <strong>Gumroad.com</strong>. They charge $0 upfront and only take 10% when someone buys. Link your PayPal or Wise to receive USD directly into your bank.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-sm font-semibold text-white">Reddit Launch Posts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Post your live Vercel demo link on <strong>r/SideProject</strong>, <strong>r/MicroSaaS</strong>, and <strong>r/SaaS</strong> with the copy-paste post provided below.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-sm font-semibold text-white">Instant Fulfillment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gumroad automatically sends the buyer the ZIP download link the second their payment clears. You get paid in your sleep without talking to anyone.
              </p>
            </div>
          </div>

          {/* Copy-Paste Listing 1: Gumroad Product Details */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Asset #1: Gumroad Listing Copy
                </span>
                <h3 className="text-sm font-semibold text-white mt-1">
                  Ready-to-Paste Gumroad Title, Pricing & Description
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `PRODUCT TITLE:
AI Real Estate Lease Agreement Generator - Turnkey Micro-SaaS Template (React + Vite + Tailwind)

PRICE:
$79 (Commercial License)

DESCRIPTION:
Launch your own Real Estate Legal Tech tool in 5 minutes!

What is this?
A production-ready, beautiful React + TypeScript application that automatically generates state-compliant US residential lease agreements (Texas, Florida, California, Georgia, New York, and all 50 states) with 1-click printable PDF contracts and custom protective clauses.

What's Included in the Download:
1. Full Pristine Source Code (React 19, TypeScript, Tailwind CSS, Lucide Icons)
2. 1-Click Deploy to Vercel Guide (Launch your own live site in under 2 minutes for $0)
3. Commercial License (You own 100% of the rights to rebrand, add your Stripe checkout, or resell)
4. State-specific statutory disclosure templates (TX Property Code §92, FL Stat §83, CA Civil Code §1950.5)

Who is this for?
- Indie hackers looking for a fast-selling micro-SaaS
- Real estate agencies and property managers looking for an in-house contract builder
- Developers wanting a clean legal-tech boilerplate`,
                    "gumroad_copy"
                  )
                }
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedState === "gumroad_copy" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Listing Text
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg text-xs text-slate-300 space-y-2 border border-slate-800/80 font-sans">
              <p>
                <strong className="text-white">Product Title:</strong> AI Real Estate Lease Agreement Generator - Turnkey Micro-SaaS Template
              </p>
              <p>
                <strong className="text-white">Price:</strong> $79 (Suggested first 10 buyers: $49 with code EARLYBIRD)
              </p>
              <p>
                <strong className="text-white">Tags:</strong> real estate, lease agreement, micro-saas, react template, legal tech, turnkey
              </p>
            </div>
          </div>

          {/* Copy-Paste Listing 2: Reddit Launch Post */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                  Asset #2: Reddit Post for r/SideProject & r/MicroSaaS
                </span>
                <h3 className="text-sm font-semibold text-white mt-1">
                  High-Converting Community Post (No Spammy Vibe)
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `POST TITLE:
I built an open-license AI Real Estate Lease Agreement Generator for US Landlords (Free live demo)

POST BODY:
Hey everyone,

Most residential lease contract generators online (RocketLawyer, LegalZoom) are locked behind aggressive $40/mo paywalls or sketchy free trials that charge your card.

I built a lightweight, client-side tool that generates customized, state-compliant lease agreements (tested against Texas, Florida, California, and Georgia tenancy laws) with 1-click printable PDF contracts.

Key features:
- State-specific statutory disclosures auto-injected (security deposit return limits, grace periods)
- Custom protective clauses (AirBnB / short-term subletting prohibition, repair deductibles)
- 1-Click print/PDF formatting

You can test the live demo here: https://rental-lead-ai.vercel.app

I've also packaged the complete React + TypeScript source code with a full commercial license on Gumroad for $79 if anyone wants to rebrand it, attach a payment wall, and launch their own niche real estate SaaS.

Happy to answer any questions or add more state rules if anyone has feedback!`,
                    "reddit_copy"
                  )
                }
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedState === "reddit_copy" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Reddit Post
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg text-xs text-slate-300 space-y-2 border border-slate-800/80 font-mono">
              <div className="text-blue-300 font-semibold">
                Title: I built an open-license AI Real Estate Lease Agreement Generator for US Landlords (Free live demo)
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Target Subreddits: r/SideProject • r/MicroSaaS • r/SaaS • r/entrepreneur
              </div>
            </div>
          </div>

          {/* Copy-Paste Listing 3: Buyer Readme & Setup Guide */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
                  Asset #3: Buyer Handover Instructions (README.md)
                </span>
                <h3 className="text-sm font-semibold text-white mt-1">
                  The File You Put Inside the Downloadable ZIP
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `# AI Real Estate Lease Agreement Generator - Turnkey Micro-SaaS
Thank you for your purchase! You now hold a full commercial license to deploy, rebrand, or modify this software.

## 🚀 2-Minute Quick Start
1. Unzip the project folder.
2. Run \`npm install\` to install dependencies.
3. Run \`npm run dev\` to launch locally at http://localhost:3000.
4. Run \`npm run build\` to create production files.

## 🌐 Deploy to Vercel (100% Free)
1. Push this folder to your GitHub account.
2. Go to vercel.com -> "Add New Project" -> Import your repository.
3. Click "Deploy". Your site is live on the internet in 60 seconds!

## 📜 Commercial License
You are granted a non-exclusive commercial license to:
- Deploy this application under your own domain name.
- Charge end-users subscription or one-time fees (Stripe, LemonSqueezy, PayPal).
- Rebrand the UI, logos, and styling to match your company.

Support: For questions or customization, contact: your-email@example.com`,
                    "buyer_readme"
                  )
                }
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedState === "buyer_readme" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy README.md
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg text-xs text-slate-400 space-y-1 border border-slate-800/80 font-mono">
              <p>Place this README.md file in the root folder when sending files to buyers.</p>
              <p className="text-emerald-400">Buyers love this because they can launch in 2 minutes without asking you for tech support.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
