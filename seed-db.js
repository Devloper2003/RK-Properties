const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  // Seed testimonials
  const testimonials = [
    { name: "Dr. Mukund Sharma (FRCS)", role: "Senior Consultant Cardiologist, London", quote: "As an NRI residing in the UK, safety of investment was my single largest nightmare. RK Properties verified every single document list, provided official MVDA clearances, and successfully executed my registry without me booking a single flight.", category: "NRI Investor", initials: "MS", projectBought: "Krishna Radhika Enclave (250 Sq. Yards)", appreciationObserved: "+44% over 18 Months", featured: true, sortOrder: 1 },
    { name: "Sanjay Singhal", role: "Owner, Singhal Steel Group, Delhi-NCR", quote: "I wanted to diversify corporate reserve cash. The team at RK properties matched me with high-potential highway plots at Chhatikara. Their financial modeling spreadsheet predicted exactly how the zone appreciated.", category: "Business Owner", initials: "SS", projectBought: "Chhatikara Prime Meadows (500 Sq. Yards, Commercial)", appreciationObserved: "2.1X Value in 24 Months", featured: true, sortOrder: 2 },
    { name: "Anasuya Devidasi", role: "Retired Spiritual Educator, California", quote: "Settling down permanently in old age requires serene silence yet absolute physical security. Living in the Yamuna Devotee heights community feels incredibly divine.", category: "Retired Professional", initials: "AD", projectBought: "Yamuna Devotee Gated Heights (180 Sq. Yards)", appreciationObserved: "+28% over 12 Months", featured: false, sortOrder: 3 },
    { name: "Rajesh Mehta", role: "NRI Tech Executive, San Francisco Bay Area", quote: "I evaluated 7 different property advisors across Mathura and Vrindavan. RK Properties was the only firm that provided certified MVDA approval documents upfront.", category: "NRI Investor", initials: "RM", projectBought: "Chhatikara Prime Meadows (200 Sq. Yards)", appreciationObserved: "+52% over 20 Months", featured: true, sortOrder: 4 },
    { name: "Dr. Priya Agarwal (MD, OBGYN)", role: "Consultant Gynecologist, Mumbai", quote: "My family wanted a peaceful second home near the temples for our retirement years. RK Properties understood our spiritual and practical needs perfectly.", category: "High-Caliber Professional", initials: "PA", projectBought: "Krishna Radhika Enclave (180 Sq. Yards)", appreciationObserved: "+31% over 14 Months", featured: false, sortOrder: 5 },
    { name: "Vikram Joshi (CA, IIM-A)", role: "CFO, Joshi Logistics Pvt. Ltd.", quote: "As a Chartered Accountant, I audited RK Properties' documentation myself before investing. Every title deed, every MVDA clearance was flawless.", category: "Business Owner", initials: "VJ", projectBought: "Govardhan Heritage Meadows (300 Sq. Yards)", appreciationObserved: "+22% over 10 Months", featured: true, sortOrder: 6 }
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.initials.toLowerCase() + "_seed" },
      update: {},
      create: { id: t.initials.toLowerCase() + "_seed", ...t }
    });
  }

  // Seed FAQs
  const faqs = [
    { question: "What does 'MVDA Approved' mean?", answer: "MVDA stands for Mathura Vrindavan Development Authority. MVDA approval guarantees 100% compliance with government zoning laws, masterplan roads, green reserves, and standard utility guidelines.", category: "Project Approvals", sortOrder: 1 },
    { question: "How does RK Properties prevent unauthorized encroachment?", answer: "Every community is walled with high-grade masonry boundary. 24/7 security patrols, biometric gated barriers, and continuous live drone CCTV monitoring.", category: "Legal/Registry", sortOrder: 2 },
    { question: "What are the historical appreciation rates for Vrindavan land?", answer: "Vrindavan has seen 18% to 24% annual appreciation, driven by 20M+ religious tourism visits, Chandrodaya Temple, expressway corridors, and UP government infrastructure push.", category: "Vrindavan Growth", sortOrder: 3 },
    { question: "How does the registration process work for NRIs?", answer: "Through certified Power of Attorney processes validated by your local embassy, or online video-assisted registry bookings. Our corporate legal desk handles 100% of approvals.", category: "Legal/Registry", sortOrder: 4 },
    { question: "What financing options are available for NRIs?", answer: "SBI NRI Home Loans, HDFC NRI Housing Finance with up to 80% LTV. Interest rates 8.35% to 9.15% per annum. Complete loan application assistance provided.", category: "Investment", sortOrder: 5 },
    { question: "Is Vrindavan real estate good for generational wealth?", answer: "Absolutely. 18-24% historical CAGR outperforms FDs and gold. Inherited property enjoys stepped-up cost basis under Indian succession law, minimizing capital gains tax.", category: "Vrindavan Growth", sortOrder: 6 },
    { question: "What infrastructure developments are upcoming?", answer: "70-story Chandrodaya Temple, Delhi-Mathura semi-highspeed rail (₹12,000 crore), Yamuna Expressway expansion, and ₹2.8 lakh crore in Master Plan 2031 allocations.", category: "Project Approvals", sortOrder: 7 }
  ];

  for (const f of faqs) {
    await prisma.fAQ.upsert({
      where: { id: "faq_" + f.sortOrder + "_seed" },
      update: {},
      create: { id: "faq_" + f.sortOrder + "_seed", ...f, published: true }
    });
  }

  // Seed default settings
  const settings = {
    siteName: "RK Properties",
    siteDescription: "Vrindavan's Premier Luxury Real Estate",
    siteUrl: "https://rkproperties.in",
    phone: "+91 98765 43210",
    email: "info@rkproperties.in",
    whatsapp: "919876543210",
    address: "Chhatikara, Vrindavan, Mathura, Uttar Pradesh, India",
    heroTitle: "Discover Sacred Luxury Living in Vrindavan",
    heroSubtitle: "Premium MVDA-Approved Township Plots with 18-24% Annual Appreciation | Trusted by NRIs Worldwide",
    heroCtaText: "Explore Projects",
    heroCtaLink: "#projects",
    heroVideoUrl: "",
    facebook: "https://facebook.com/rkproperties",
    instagram: "https://instagram.com/rkproperties",
    youtube: "",
    twitter: "",
    linkedin: "",
    googleAnalyticsId: "",
    facebookPixelId: "",
    googleTagManagerId: ""
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { id: "setting_" + key, key, value }
    });
  }

  console.log("All seed data populated successfully");
  await prisma.$disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
