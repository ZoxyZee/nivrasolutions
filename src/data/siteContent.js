// Edit this file when the company's services, concepts, team, or process change.
export const contactEmail = "info.nivrasolutions@gmail.com";

// Add approved roles and LinkedIn profiles when available.
export const teamMembers = [
  {
    name: "Siddharth",
    role: "",
    linkedin: "",
    phone: "+91 8923816727",
    email: "sharma.ssiddharth17@gmail.com",
  },
  {
    name: "Ashutosh",
    role: "",
    linkedin: "",
    phone: "+91 6306345246",
    email: "ashutoshtiwari.azby@gmail.com",
  },
  {
    name: "Amit",
    role: "",
    linkedin: "",
    phone: "+91 8743845303",
    email: "amitsoni175@gmail.com",
  },
];

export const contactPeople = teamMembers.map(({ name, phone, email }) => ({
  name,
  phone,
  email,
}));

export const services = [
  {
    title: "Custom Software",
    description:
      "Purpose-built platforms and internal tools shaped around the way your business works.",
  },
  {
    title: "Web Applications",
    description:
      "Responsive portals, dashboards, and customer-facing products designed for real use.",
  },
  {
    title: "Automation & Integrations",
    description:
      "Connect existing systems, simplify handoffs, and reduce repetitive work.",
  },
  {
    title: "Product Engineering",
    description:
      "Turn an early product idea into a considered, maintainable digital experience.",
  },
];

// Keep public descriptions concise and avoid disclosing client or patient data.
export const projects = [
  {
    title: "Hospital Management System",
    category: "Healthcare operations · Full-stack platform",
    type: "hospital",
    status: "Deployed",
    featured: true,
    brief:
      "A live hospital platform connecting patient intake, reception workflows, records, and pharmacy operations in one system.",
    highlights: [
      "Patient registration, records, and queue management",
      "Pharmacy inventory, stock movement, and low-stock visibility",
      "Role-based controls for medicine pricing and issuing",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Docker"],
    screenshot: {
      src: "/images/projects/hms-dashboard-sanitized.png",
      alt: "ArogyaSuite hospital operations dashboard with private data hidden",
    },
  },
  {
    title: "AttendX",
    category: "Workforce attendance · Computer vision",
    type: "attendx",
    status: "Deployed",
    featured: true,
    brief:
      "A face-recognition attendance platform for employee enrolment, check-in/out, and reporting—designed to work with ordinary phones.",
    highlights: [
      "Face registration and real-time attendance",
      "Duplicate enrolment and repeat-punch checks",
      "JWT authentication and role-based access",
    ],
    stack: ["Python", "FastAPI", "MongoDB", "OpenCV", "JWT"],
    screenshot: {
      src: "/images/projects/attendx-overview.jpg",
      alt: "AttendXSuite admin overview showing hospital attendance controls and summary cards",
    },
    gallery: [
      {
        src: "/images/projects/attendx-mobile.jpg",
        alt: "AttendXSuite mobile face-registration navigation",
        caption: "Mobile face registration",
        portrait: true,
      },
    ],
  },
  {
    title: "ATS Testing Platform",
    category: "Industrial testing · Control software",
    type: "ats",
    status: "Built",
    brief:
      "An Automatic Transfer Switch testing workspace with SCADA-style monitoring, guided checks, and recorded test sessions.",
    highlights: [
      "Source and transfer-state overview in a demo-safe interface",
      "Guided manual checks and test-session records",
      "PLC connection and register-verification workflows",
    ],
    stack: [],
    screenshot: {
      src: "/images/projects/ats-overview.jpg",
      alt: "ATS Testing Platform SCADA overview in safe demonstration mode",
    },
    gallery: [
      {
        src: "/images/projects/ats-test-procedure.jpg",
        alt: "ATS Testing Platform guided test-procedure checklist",
        caption: "Guided test procedure",
      },
    ],
  },
  {
    title: "ERP System",
    category: "Business operations · ERP",
    type: "erp",
    status: "Built",
    brief:
      "An ERP project built to bring everyday business operations into a more connected workspace.",
    highlights: [],
    stack: [],
  },
  {
    title: "Servify",
    category: "Consumer services · Marketplace",
    type: "servify",
    status: "Built",
    brief:
      "A public-facing service platform for discovering and requesting everyday services from one place.",
    highlights: [
      "Service discovery and request flow",
      "Customer-facing experience for on-demand services",
    ],
    stack: [],
  },
];

export const values = [
  {
    title: "Clear thinking",
    description: "Understand the real problem before deciding what to build.",
  },
  {
    title: "Practical engineering",
    description:
      "Choose maintainable solutions over complexity for its own sake.",
  },
  {
    title: "Close collaboration",
    description:
      "Keep the people using and owning the software in the conversation.",
  },
];

export const processSteps = [
  {
    title: "Discover",
    description:
      "We map the users, workflows, constraints, and outcomes that matter.",
  },
  {
    title: "Architect",
    description:
      "We define the product scope, experience, and a sensible technical approach.",
  },
  {
    title: "Build",
    description:
      "We design, develop, and test in focused iterations with clear feedback.",
  },
  {
    title: "Evolve",
    description:
      "We launch carefully, document the work, and plan the next improvements.",
  },
];
