import React, { useState, useMemo } from "react";
import {
  DollarSign,
  Calculator,
  TrendingUp,
  Percent,
  Download,
  Building,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  BarChart3,
  Coins,
  ArrowRight,
  Info
} from "lucide-react";

export default function FinancialCalculator() {
  // Input parameters
  const [purchasePrice, setPurchasePrice] = useState<number>(385000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.75);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [monthlyRent, setMonthlyRent] = useState<number>(2850);
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(4200);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1500);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(0);
  const [maintenanceRate, setMaintenanceRate] = useState<number>(6); // % of rent
  const [managementRate, setManagementRate] = useState<number>(8); // % of rent
  const [annualAppreciationRate, setAnnualAppreciationRate] = useState<number>(3.5);

  const [activeTab, setActiveTab] = useState<"calculator" | "adsense_truth" | "pdf_preview">("calculator");

  // Calculations
  const downPaymentAmount = useMemo(() => {
    return (purchasePrice * downPaymentPercent) / 100;
  }, [purchasePrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return purchasePrice - downPaymentAmount;
  }, [purchasePrice, downPaymentAmount]);

  const monthlyMortgagePI = useMemo(() => {
    if (loanAmount <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return loanAmount / totalPayments;
    const payment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return payment;
  }, [loanAmount, interestRate, loanTermYears]);

  const monthlyTax = useMemo(() => annualPropertyTax / 12, [annualPropertyTax]);
  const monthlyInsurance = useMemo(() => annualInsurance / 12, [annualInsurance]);
  const monthlyMaintenance = useMemo(() => (monthlyRent * maintenanceRate) / 100, [monthlyRent, maintenanceRate]);
  const monthlyManagement = useMemo(() => (monthlyRent * managementRate) / 100, [monthlyRent, managementRate]);

  const totalMonthlyExpenses = useMemo(() => {
    return monthlyMortgagePI + monthlyTax + monthlyInsurance + monthlyHoa + monthlyMaintenance + monthlyManagement;
  }, [monthlyMortgagePI, monthlyTax, monthlyInsurance, monthlyHoa, monthlyMaintenance, monthlyManagement]);

  const netMonthlyCashFlow = useMemo(() => {
    return monthlyRent - totalMonthlyExpenses;
  }, [monthlyRent, totalMonthlyExpenses]);

  const netAnnualCashFlow = useMemo(() => {
    return netMonthlyCashFlow * 12;
  }, [netMonthlyCashFlow]);

  // Net Operating Income (NOI) = Gross Rental Income - Operating Expenses (excluding Mortgage PI)
  const annualOperatingExpenses = useMemo(() => {
    return (monthlyTax + monthlyInsurance + monthlyHoa + monthlyMaintenance + monthlyManagement) * 12;
  }, [monthlyTax, monthlyInsurance, monthlyHoa, monthlyMaintenance, monthlyManagement]);

  const annualNOI = useMemo(() => {
    return monthlyRent * 12 - annualOperatingExpenses;
  }, [monthlyRent, annualOperatingExpenses]);

  const capRate = useMemo(() => {
    if (purchasePrice <= 0) return 0;
    return (annualNOI / purchasePrice) * 100;
  }, [annualNOI, purchasePrice]);

  const totalCashInvested = useMemo(() => {
    // Down payment + estimated 2% closing costs
    return downPaymentAmount + purchasePrice * 0.02;
  }, [downPaymentAmount, purchasePrice]);

  const cashOnCashROI = useMemo(() => {
    if (totalCashInvested <= 0) return 0;
    return (netAnnualCashFlow / totalCashInvested) * 100;
  }, [netAnnualCashFlow, totalCashInvested]);

  const estimated5YearAppreciation = useMemo(() => {
    return purchasePrice * Math.pow(1 + annualAppreciationRate / 100, 5) - purchasePrice;
  }, [purchasePrice, annualAppreciationRate]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60 uppercase tracking-wider">
                US Financial Utility Model
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-800/60 flex items-center gap-1">
                <Coins className="w-3 h-3" /> US AdSense RPM: $18 - $45
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Mortgage & Rental Property ROI Calculator
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Calculates cash flow, Cap Rate, Cash-on-Cash ROI, and debt service for US real estate investors.
              Below is the analysis on how this monetizes, whether you need a domain, and realistic timelines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === "calculator"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Live Calculator
            </button>
            <button
              onClick={() => setActiveTab("adsense_truth")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === "adsense_truth"
                  ? "bg-amber-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              Domain & Income Truth
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* AD SENSE TRUTH & REALITY BANNER */}
      {activeTab === "adsense_truth" ? (
        <div className="space-y-4">
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-5 text-amber-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  Honest Truth: Will This Calculator Work Without Money for a Domain?
                </h3>
                <div className="space-y-3 text-xs leading-relaxed text-amber-200/90">
                  <div className="p-3 bg-black/40 rounded-lg border border-amber-900/50">
                    <p className="font-semibold text-amber-300 mb-1">
                      1. Do you need a domain for Google AdSense?
                    </p>
                    <p>
                      <strong className="text-white">YES, 100%.</strong> Google AdSense policy requires a top-level domain (like{" "}
                      <code className="text-amber-300 bg-amber-950/80 px-1 py-0.5 rounded">.com</code> or{" "}
                      <code className="text-amber-300 bg-amber-950/80 px-1 py-0.5 rounded">.org</code>). Google's automated review system will{" "}
                      <strong>instantly reject</strong> free subdomains like{" "}
                      <code className="text-red-300">.vercel.app</code> or{" "}
                      <code className="text-red-300">.github.io</code>. A `.com` domain costs around $10 to $12 per year.
                    </p>
                  </div>

                  <div className="p-3 bg-black/40 rounded-lg border border-amber-900/50">
                    <p className="font-semibold text-amber-300 mb-1">
                      2. Will it solve urgent house rent or loan repayments this month?
                    </p>
                    <p>
                      <strong className="text-rose-300">NO, it cannot solve urgent bills this month.</strong> To earn money from AdSense, you need organic Google search traffic. Ranking a new website for keywords like "mortgage calculator" takes{" "}
                      <strong>4 to 6 months of SEO</strong> because you are competing against giants like Zillow and Bankrate. If you have house rent and loan EMIs due now, relying on ad clicks will cause extreme stress.
                    </p>
                  </div>

                  <div className="p-3 bg-black/40 rounded-lg border border-emerald-900/50">
                    <p className="font-semibold text-emerald-300 mb-1">
                      3. What is the guaranteed $0 path that can pay rent in the next 7 to 14 days?
                    </p>
                    <p className="text-emerald-200">
                      <strong>Direct B2B Client Outreach (The 5 daily emails).</strong> You don't need a domain. You already have a free live demo running, you have free Gmail, and you have real property manager inboxes. If just <strong>1 property manager</strong> hires your 24/7 AI assistant for <strong>$250/month</strong>, that money goes directly into your pocket in days — no domain cost, no waiting 6 months for Google AdSense.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              The Long-Term Value: Why We Still Built This Calculator For You
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/60">
                <div className="font-semibold text-white mb-1">Use as a B2B Lead Magnet</div>
                <p className="text-slate-400">
                  Send this calculator link to property managers and real estate agents. It proves you build high-end software tools for landlords!
                </p>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/60">
                <div className="font-semibold text-white mb-1">High-RPM Evergreen Asset</div>
                <p className="text-slate-400">
                  Once your first B2B client pays you $250, you can spend $10 on a `.com` domain and publish this exact tool on Google.
                </p>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/60">
                <div className="font-semibold text-white mb-1">100% Free Forever Here</div>
                <p className="text-slate-400">
                  This calculator runs inside your application right now with zero fees or monthly server charges.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* SIMULATED HIGH-RPM LEADERBOARD AD (For illustration of how AdSense displays on US traffic) */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center relative overflow-hidden">
        <div className="absolute top-1.5 right-2 text-[9px] uppercase tracking-wider text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
          Simulated AdSense Slot (728x90) • US Mortgage Niche
        </div>
        <div className="py-2.5 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-900/30 rounded-lg">
          <div className="text-left">
            <span className="text-[10px] text-blue-400 font-bold tracking-wider uppercase">Sponsored US Bank Partner</span>
            <h4 className="text-xs sm:text-sm font-semibold text-white">Compare 30-Year Fixed Mortgage Rates Today - As Low As 6.25% APR</h4>
            <p className="text-[11px] text-slate-400">Check pre-approval status in 2 minutes without affecting credit score.</p>
          </div>
          <button className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded shadow-sm shrink-0">
            View Rates →
          </button>
        </div>
        <div className="text-[10px] text-slate-400 mt-1.5 flex items-center justify-center gap-1">
          <span>Why this matters: In the US, mortgage lenders pay up to</span>
          <span className="text-emerald-400 font-medium">$12 to $35 per single click</span>
          <span>on financial calculator sites.</span>
        </div>
      </div>

      {/* MAIN CALCULATOR INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                1. Property & Loan Structure
              </h2>
              <span className="text-[11px] text-slate-400">US Standard Mortgage Model</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Purchase Price ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Down Payment ({downPaymentPercent}% = ${downPaymentAmount.toLocaleString()})
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <span className="text-xs text-slate-300 w-12 font-mono text-right">{downPaymentPercent}%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Interest Rate (% APR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-400">%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Loan Term (Years)
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={30}>30 Years (Standard Conventional)</option>
                  <option value={15}>15 Years (Faster Equity)</option>
                  <option value={20}>20 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Calculated Loan Balance:</span>
                <span className="font-mono text-white font-semibold">${loanAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Rental Income & Operating Expenses */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                2. Monthly Rental Revenue & Operating Costs
              </h2>
              <span className="text-[11px] text-slate-400">Cash Flow Variables</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Expected Monthly Rent ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Annual Property Tax ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={annualPropertyTax}
                    onChange={(e) => setAnnualPropertyTax(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Annual Homeowners Insurance ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Monthly HOA Fees ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={monthlyHoa}
                    onChange={(e) => setMonthlyHoa(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Maintenance & Vacancy Reserve ({maintenanceRate}%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={maintenanceRate}
                    onChange={(e) => setMaintenanceRate(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <span className="text-xs text-slate-300 w-12 font-mono text-right">${Math.round(monthlyMaintenance)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Property Management Fee ({managementRate}%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={managementRate}
                    onChange={(e) => setManagementRate(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <span className="text-xs text-slate-300 w-12 font-mono text-right">${Math.round(monthlyManagement)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Metrics & Financial Verdict (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Cash Flow Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Monthly Net Cash Flow
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-extrabold tracking-tight ${
                  netMonthlyCashFlow >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                ${Math.round(netMonthlyCashFlow).toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Annual Profit:{" "}
              <strong className={netAnnualCashFlow >= 0 ? "text-emerald-300" : "text-rose-300"}>
                ${Math.round(netAnnualCashFlow).toLocaleString()} / year
              </strong>
            </p>

            {/* Core Investment Multiples */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Cap Rate</div>
                <div className="text-lg font-bold text-white mt-0.5">{capRate.toFixed(2)}%</div>
                <div className="text-[10px] text-slate-400">Unleveraged return</div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Cash on Cash ROI</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">{cashOnCashROI.toFixed(2)}%</div>
                <div className="text-[10px] text-slate-400">On invested capital</div>
              </div>
            </div>

            {/* Monthly Expense Breakdown */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Mortgage Principal & Interest:</span>
                <span className="font-mono text-white">${Math.round(monthlyMortgagePI).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Property Taxes:</span>
                <span className="font-mono text-white">${Math.round(monthlyTax).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Homeowners Insurance:</span>
                <span className="font-mono text-white">${Math.round(monthlyInsurance).toLocaleString()}</span>
              </div>
              {monthlyHoa > 0 && (
                <div className="flex items-center justify-between text-slate-400">
                  <span>HOA Dues:</span>
                  <span className="font-mono text-white">${monthlyHoa}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-400">
                <span>Maintenance & CapEx Reserve:</span>
                <span className="font-mono text-white">${Math.round(monthlyMaintenance)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Property Management ({managementRate}%):</span>
                <span className="font-mono text-white">${Math.round(monthlyManagement)}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-slate-800/60 text-slate-200">
                <span>Total Monthly Expenses:</span>
                <span className="font-mono text-rose-300">${Math.round(totalMonthlyExpenses).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 5-Year Equity Projection */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              5-Year Wealth & Appreciation Estimate
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Est. Property Value (in 5 yrs @ {annualAppreciationRate}%):</span>
                <span className="font-mono text-white">
                  ${Math.round(purchasePrice + estimated5YearAppreciation).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Appreciation Gain:</span>
                <span className="font-mono text-emerald-400">
                  +${Math.round(estimated5YearAppreciation).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Total 5-Year Cash Flow:</span>
                <span className="font-mono text-emerald-400">
                  +${Math.round(netAnnualCashFlow * 5).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
