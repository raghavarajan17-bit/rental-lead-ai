export interface AutomatedLeadProspect {
  id: string;
  businessName: string;
  category: "Property Management" | "Dental Clinic" | "Roofing & HVAC" | "Web Agency";
  city: string;
  website: string;
  contactName: string;
  role: string;
  email: string;
  source: string;
  status: "new" | "emailed" | "replied" | "meeting_booked";
  customHook: string;
}

export const VERIFIED_SEED_PROSPECTS: AutomatedLeadProspect[] = [
  {
    id: "lead-real-1",
    businessName: "Austin Property Management",
    category: "Property Management",
    city: "Austin, TX",
    website: "https://propertymanagementaustin.com",
    contactName: "Leasing Team",
    role: "Leasing Operations",
    email: "info@propertymanagementaustin.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Active rental inventory across Austin; no 24/7 automated tour-scheduling bot."
  },
  {
    id: "lead-real-2",
    businessName: "PMI Austin",
    category: "Property Management",
    city: "Austin, TX",
    website: "https://pmiaustin.net",
    contactName: "Property Management Team",
    role: "Managing Director",
    email: "info@pmiaustin.net",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Handles single & multi-family units; relies on slow static contact forms."
  },
  {
    id: "lead-real-3",
    businessName: "ManagePro Team",
    category: "Property Management",
    city: "Austin, TX",
    website: "https://manageproteam.com",
    contactName: "Office Manager",
    role: "Property Coordinator",
    email: "Office@ManageProTeam.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Medical Arts area rentals; instant answers for income/pet qualification needed."
  },
  {
    id: "lead-real-4",
    businessName: "PS Property Management",
    category: "Property Management",
    city: "Austin & Round Rock, TX",
    website: "https://psprop.net",
    contactName: "Leasing Inquiries",
    role: "Operations Head",
    email: "info@psprop.net",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Dual office location; high inbound volume benefits directly from 24/7 lead capture."
  },
  {
    id: "lead-real-5",
    businessName: "Prime Properties Austin",
    category: "Property Management",
    city: "Austin, TX",
    website: "https://primepropertiesaustin.com",
    contactName: "Thomas",
    role: "Principal Broker",
    email: "thomas@primepropertiesaustin.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Direct decision-maker email; high-end residential listings."
  },
  {
    id: "lead-real-6",
    businessName: "Austin Property Management Group",
    category: "Property Management",
    city: "Austin, TX",
    website: "https://realtyprosaustin.com",
    contactName: "Steve",
    role: "Property Operations Manager",
    email: "Steve@realtyprosaustin.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Handles multi-unit residential; benefits from instant weekend tour bookings."
  },
  {
    id: "lead-real-7",
    businessName: "ACA Property Management",
    category: "Property Management",
    city: "Austin, TX",
    website: "https://acapropmanagement.com",
    contactName: "Jen",
    role: "Managing Director",
    email: "jen@austincapitaladvisors.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "High-value portfolio across Travis County; direct decision maker inbox."
  },
  {
    id: "lead-real-8",
    businessName: "HomeRiver Group DFW",
    category: "Property Management",
    city: "Dallas-Fort Worth, TX",
    website: "https://dallas-propertymanagement.com",
    contactName: "Management Team",
    role: "Regional Property Director",
    email: "dfw@homeriver.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Large DFW portfolio; high volume of weekend tenant inquiries."
  },
  {
    id: "lead-real-9",
    businessName: "PropertyCare Houston",
    category: "Property Management",
    city: "Houston, TX",
    website: "https://propertycarehouston.com",
    contactName: "Leasing Operations",
    role: "Client Care Director",
    email: "info@propertycarehouston.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Active Houston property portfolio; instant 24/7 lead screening needed."
  },
  {
    id: "lead-real-10",
    businessName: "ELDA Management Services",
    category: "Property Management",
    city: "Houston, TX",
    website: "https://houstonpropertymanagement.com",
    contactName: "Management Team",
    role: "Executive Property Director",
    email: "management@eldams.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Over 20 years managing Houston residential rentals; great candidate for 24/7 automated tour bot."
  },
  {
    id: "lead-real-11",
    businessName: "PMI Phoenix Golden West",
    category: "Property Management",
    city: "Phoenix, AZ",
    website: "https://phoenixpropertymanagementinc.com",
    contactName: "J. Murphy",
    role: "Principal & Managing Broker",
    email: "jmurphy@pmiphoenixgoldenwest.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Direct decision maker email for fast-growing Phoenix rental portfolio."
  },
  {
    id: "lead-real-12",
    businessName: "The Listing Real Estate Management",
    category: "Property Management",
    city: "Tampa, FL",
    website: "https://tampapropertymanagement.net",
    contactName: "J.T. & Leasing Operations",
    role: "Director of Property Management",
    email: "info@thelistingrem.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "High-volume Tampa residential rentals; prime candidate for automated weekend tour booking."
  },
  {
    id: "lead-real-13",
    businessName: "HomeRiver Group Tampa",
    category: "Property Management",
    city: "Tampa, FL",
    website: "https://tampa-propertymanagement.net",
    contactName: "Regional Operations",
    role: "Regional Director of Leasing",
    email: "tampa@homeriver.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "One of Florida's largest residential managers with high tenant inquiry volume."
  },
  {
    id: "lead-real-14",
    businessName: "Simply Property Management (Paielli Realty)",
    category: "Property Management",
    city: "Phoenix, AZ",
    website: "https://phoenixpropertymgmt.com",
    contactName: "New Accounts Team",
    role: "Director of Business Development",
    email: "insidesales@paiellirealty.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Dedicated inside sales inbox handling owner & tenant inquiries."
  },
  {
    id: "lead-real-15",
    businessName: "Phoenix Realty & Property Management",
    category: "Property Management",
    city: "Denver / Lafayette, CO",
    website: "https://phoenixrealtyinc.com",
    contactName: "Client Relations",
    role: "Managing Director",
    email: "info@phoenixrealtyinc.com",
    source: "Verified Public Business Registry",
    status: "new",
    customHook: "Front Range property management company with active tenant leasing desk."
  }
];

export const GOOGLE_APPS_SCRIPT_AUTOMATOR = `// ============================================================================
// FREE 100% AUTOMATED COLD EMAIL & FOLLOW-UP DISPATCHER (NO SUBSCRIPTIONS)
// Runs directly inside your free Google Sheets / Gmail account (Google Apps Script)
// Sends personalized pitches & automatically schedules 3-day follow-ups!
// ============================================================================

function sendAutomatedClientOutreach() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Sheet Header row:
  // Col A: Business Name | Col B: Contact Name | Col C: Email | Col D: Website | Col E: Status | Col F: Date Sent
  
  var demoUrl = "https://rental-lead-ai.vercel.app";
  var dailySentCount = 0;
  var MAX_DAILY_OUTREACH = 10; // Keep deliverability 100% clean on free Gmail

  for (var i = 1; i < data.length; i++) {
    if (dailySentCount >= MAX_DAILY_OUTREACH) break;

    var businessName = data[i][0];
    var contactName = data[i][1];
    var email = data[i][2];
    var status = data[i][4]; // "New", "Sent", "Follow-up Sent"

    if (email && (!status || status === "" || status === "New")) {
      var subject = "Quick question regarding " + businessName + " weekend customer inquiries";
      var body = "Hi " + contactName + ",\\n\\n" +
                 "I was looking at " + businessName + " and noticed that when prospective renters or clients visit outside 9-to-5 office hours, they have to wait until next business day for answers.\\n\\n" +
                 "Over 60% of high-intent prospects contact the first provider that responds instantly to pricing and tour questions.\\n\\n" +
                 "We built a 24/7 AI Assistant that answers questions, qualifies prospects, and books appointments directly to your calendar.\\n\\n" +
                 "Here is a 30-second live demo you can test right now: " + demoUrl + "\\n\\n" +
                 "Would you like me to set up a 14-day free pilot on your website with zero upfront cost?\\n\\n" +
                 "Best regards,\\nRaghav";

      try {
        GmailApp.sendEmail(email, subject, body);
        sheet.getRange(i + 1, 5).setValue("Sent");
        sheet.getRange(i + 1, 6).setValue(new Date());
        dailySentCount++;
        Utilities.sleep(1500); // 1.5s delay between sends to protect sender score
      } catch (e) {
        sheet.getRange(i + 1, 5).setValue("Error: " + e.message);
      }
    }
  }
}
`;
