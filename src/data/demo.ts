import type {
  ActivityEvent,
  Appointment,
  Condition,
  Customer,
  Expense,
  Estimate,
  GarageDocument,
  Inspection,
  Invoice,
  Location,
  Mechanic,
  MessageThread,
  Notification,
  Part,
  Payment,
  PurchaseOrder,
  Service,
  Supplier,
  User,
  Vehicle,
  WorkOrder,
} from "@/types/domain";
export const demoDate = "2026-10-05";
export const locations: Location[] = [
  {
    id: "LOC-01",
    name: "Downtown Workshop",
    address: "123 Industrial Ave, San Francisco, CA 94103",
    manager: "Alex Morgan",
    phone: "(415) 555-0100",
    bays: 8,
    status: "active",
  },
  {
    id: "LOC-02",
    name: "Westside Service Center",
    address: "452 West Road, Oakland, CA 94607",
    manager: "Riley Scott",
    phone: "(510) 555-0142",
    bays: 5,
    status: "active",
  },
  {
    id: "LOC-03",
    name: "Airport Branch",
    address: "88 Airport Commerce Way, San Francisco, CA 94128",
    manager: "Jordan Price",
    phone: "(650) 555-0188",
    bays: 6,
    status: "active",
  },
];
const names = [
  "James Wilson",
  "Olivia Bennett",
  "Noah Thompson",
  "Sophia Martinez",
  "Daniel Kim",
  "Emily Clark",
  "Ethan Walker",
  "Maya Patel",
  "Liam Anderson",
  "Chloe Martin",
  "Daniel Garcia",
  "Amelia Reed",
  "Lucas Brown",
  "Isabella Nguyen",
  "Henry Davis",
  "Ella Johnson",
  "Northstar Logistics",
  "Aiden Murphy",
  "Grace Chen",
  "Jack Robinson",
  "Aria Lopez",
  "Owen Taylor",
  "Harper Wright",
  "Logan Patel",
  "Charlotte Lee",
  "Benjamin Young",
  "Evelyn Adams",
  "Alexander Cruz",
  "Abigail Baker",
  "Samuel Rivera",
  "Stella Cook",
  "Matthew Hall",
  "Lily Campbell",
  "David Scott",
  "Victoria Hill",
  "Joseph Green",
  "Aurora Mitchell",
  "Gabriel Turner",
  "Nora Parker",
  "Leo Evans",
  "Camila Collins",
  "Wyatt Edwards",
  "Luna Stewart",
  "Mason Morris",
  "Ivy Rogers",
  "Julian Reed",
  "Hazel Cook",
  "Oliver Bell",
  "Sophie Ward",
  "Miles Phillips",
];
export const customers: Customer[] = names.map((name, i) => ({
  id: `CUS-${String(101 + i).padStart(4, "0")}`,
  name,
  type: i === 16 ? "fleet" : "individual",
  company: i === 16 ? "Northstar Logistics" : undefined,
  phone: `(${i % 2 ? "510" : "415"}) 555-${String(1010 + i).padStart(4, "0")}`,
  email:
    i === 16
      ? "fleet@northstar.example.com"
      : `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
  address: `${100 + i * 7} ${["Market Street", "Oak Avenue", "Mission Road", "Pine Street"][i % 4]}, San Francisco, CA 9410${i % 10}`,
  since: `202${(i % 3) + 3}-0${(i % 8) + 1}-${String((i % 27) + 1).padStart(2, "0")}`,
  preferredContact: i % 3 === 0 ? "Email" : i % 3 === 1 ? "SMS" : "Phone",
  tags: [
    i === 0
      ? "VIP"
      : i === 16
        ? "Fleet"
        : i % 7 === 0
          ? "Returning Customer"
          : i % 5 === 0
            ? "New Customer"
            : "Regular",
  ],
  status: i % 11 === 0 ? "new" : "active",
}));
const vehicleSpecs: [
  string,
  string,
  string,
  number,
  string,
  string,
  string,
  string,
  string,
][] = [
  [
    "BMW",
    "M4 Competition",
    "Competition",
    2024,
    "3.0L Twin-Turbo I6",
    "Automatic",
    "Petrol",
    "RWD",
    "Isle of Man Green",
  ],
  [
    "Audi",
    "Q5",
    "Premium Plus",
    2022,
    "2.0L Turbo I4",
    "Automatic",
    "Petrol",
    "AWD",
    "Glacier White",
  ],
  [
    "Toyota",
    "RAV4",
    "XLE",
    2023,
    "2.5L Hybrid",
    "Automatic",
    "Hybrid",
    "AWD",
    "Silver Sky",
  ],
  [
    "Ford",
    "Ranger",
    "XLT",
    2021,
    "2.3L EcoBoost I4",
    "Automatic",
    "Petrol",
    "4WD",
    "Carbonized Gray",
  ],
  [
    "Porsche",
    "Macan",
    "S",
    2024,
    "2.9L Twin-Turbo V6",
    "Automatic",
    "Petrol",
    "AWD",
    "Carrara White",
  ],
  [
    "Honda",
    "Civic",
    "Sport Touring",
    2022,
    "1.5L Turbo I4",
    "CVT",
    "Petrol",
    "FWD",
    "Crystal Black",
  ],
  [
    "Volkswagen",
    "Golf",
    "GTI SE",
    2021,
    "2.0L Turbo I4",
    "DSG",
    "Petrol",
    "FWD",
    "Moonstone Gray",
  ],
  [
    "Tesla",
    "Model 3",
    "Long Range",
    2023,
    "Dual Motor Electric",
    "Automatic",
    "Electric",
    "AWD",
    "Pearl White",
  ],
  [
    "Volvo",
    "XC60",
    "B5 Plus",
    2023,
    "2.0L Mild Hybrid",
    "Automatic",
    "Hybrid",
    "AWD",
    "Denim Blue",
  ],
  [
    "Mercedes-Benz",
    "C300",
    "4MATIC",
    2024,
    "2.0L Turbo I4",
    "Automatic",
    "Petrol",
    "AWD",
    "Obsidian Black",
  ],
  [
    "Mazda",
    "CX-5",
    "Touring",
    2020,
    "2.5L I4",
    "Automatic",
    "Petrol",
    "AWD",
    "Deep Crystal Blue",
  ],
  [
    "Land Rover",
    "Defender",
    "110 SE",
    2022,
    "3.0L Turbo I6",
    "Automatic",
    "Petrol",
    "4WD",
    "Pangea Green",
  ],
  [
    "Chevrolet",
    "Silverado 1500",
    "LT",
    2021,
    "5.3L V8",
    "Automatic",
    "Petrol",
    "4WD",
    "Summit White",
  ],
  [
    "Subaru",
    "Outback",
    "Premium",
    2023,
    "2.5L Boxer",
    "CVT",
    "Petrol",
    "AWD",
    "Autumn Green",
  ],
  [
    "Nissan",
    "Rogue",
    "SV",
    2022,
    "1.5L Turbo I3",
    "CVT",
    "Petrol",
    "AWD",
    "Gun Metallic",
  ],
  [
    "Hyundai",
    "Tucson",
    "Hybrid SEL",
    2024,
    "1.6L Hybrid",
    "Automatic",
    "Hybrid",
    "AWD",
    "Amazon Gray",
  ],
  [
    "Ford",
    "Transit",
    "250 Medium Roof",
    2023,
    "3.5L V6",
    "Automatic",
    "Petrol",
    "RWD",
    "Oxford White",
  ],
  [
    "Jeep",
    "Grand Cherokee",
    "Limited",
    2021,
    "3.6L V6",
    "Automatic",
    "Petrol",
    "4WD",
    "Baltic Gray",
  ],
];
export const vehicles: Vehicle[] = Array.from({ length: 54 }, (_, i) => {
  const [
    make,
    model,
    trim,
    year,
    engine,
    transmission,
    fuel,
    drivetrain,
    color,
  ] = vehicleSpecs[i % vehicleSpecs.length];
  const fleet = i === 16 || i % 17 === 16;
  return {
    id: `VEH-${String(501 + i).padStart(4, "0")}`,
    customerId: fleet
      ? "CUS-0117"
      : `CUS-${String(101 + (i % 16)).padStart(4, "0")}`,
    make,
    model,
    trim,
    year: Math.max(year - (i % 4), 2018),
    plate:
      i === 0
        ? "CA-34928"
        : `${["CA", "CA", "CA", "OR", "NV"][i % 5]}-${String(20000 + i * 137)}`,
    vin:
      i === 0
        ? "WBS3R9C05RF123847"
        : `WBA${String(i).padStart(2, "0")}7${"JKLMNPRSTUVWXYZ"[i % 15]}${"ABCDEFGHJKLMNPRSTUVWXYZ"[i % 23]}${String(300000 + i * 1709).padStart(6, "0")}${String((i % 90) + 10).padStart(3, "0")}`,
    mileage: i === 0 ? 48230 : 18700 + i * 1163,
    engine,
    transmission,
    fuel,
    drivetrain,
    color,
    lastService:
      i === 0
        ? "2026-09-28"
        : `2026-0${(i % 8) + 1}-${String((i % 27) + 1).padStart(2, "0")}`,
    nextServiceKm: i === 0 ? 52000 : 30000 + i * 2000,
    status: i % 12 === 0 ? "in-service" : "active",
    photo: ["vehicle-bmw", "vehicle-suv", "vehicle-utility", "vehicle-truck"][
      i % 4
    ],
  };
});
export const mechanics: Mechanic[] = [
  {
    id: "MEC-001",
    name: "Michael Roberts",
    role: "Senior Technician",
    specialty: ["Brakes", "Engine", "Diagnostics"],
    certification: "ASE Certified",
    email: "michael.roberts@example.com",
    phone: "(415) 555-0201",
    locationId: "LOC-01",
    status: "working",
    activeJobs: 4,
    bookedHours: 6.5,
    availableHours: 1.5,
    efficiency: 91,
    revenue: 18420,
    color: "amber",
  },
  {
    id: "MEC-002",
    name: "Sofia Alvarez",
    role: "Diagnostic Specialist",
    specialty: ["Diagnostics", "Electrical"],
    certification: "ASE Master Technician",
    email: "sofia.alvarez@example.com",
    phone: "(415) 555-0202",
    locationId: "LOC-01",
    status: "working",
    activeJobs: 3,
    bookedHours: 7,
    availableHours: 1,
    efficiency: 96,
    revenue: 21260,
    color: "blue",
  },
  {
    id: "MEC-003",
    name: "Chris Patel",
    role: "Lead Technician",
    specialty: ["Transmission", "Suspension", "Engine"],
    certification: "ASE L1 Advanced",
    email: "chris.patel@example.com",
    phone: "(415) 555-0203",
    locationId: "LOC-01",
    status: "working",
    activeJobs: 5,
    bookedHours: 7.5,
    availableHours: 0.5,
    efficiency: 88,
    revenue: 17680,
    color: "green",
  },
  {
    id: "MEC-004",
    name: "Jordan Blake",
    role: "Service Technician",
    specialty: ["Tires", "Maintenance", "Brakes"],
    certification: "ASE Brakes Certified",
    email: "jordan.blake@example.com",
    phone: "(415) 555-0204",
    locationId: "LOC-01",
    status: "available",
    activeJobs: 2,
    bookedHours: 5.5,
    availableHours: 2.5,
    efficiency: 87,
    revenue: 14920,
    color: "violet",
  },
  {
    id: "MEC-005",
    name: "Taylor Brooks",
    role: "General Technician",
    specialty: ["Maintenance", "Tires", "Inspections"],
    certification: "ASE Certified",
    email: "taylor.brooks@example.com",
    phone: "(415) 555-0205",
    locationId: "LOC-01",
    status: "break",
    activeJobs: 2,
    bookedHours: 6,
    availableHours: 2,
    efficiency: 84,
    revenue: 12870,
    color: "rose",
  },
  {
    id: "MEC-006",
    name: "Riley Chen",
    role: "Technician",
    specialty: ["Electrical", "Diagnostics"],
    certification: "ASE Electrical Certified",
    email: "riley.chen@example.com",
    phone: "(415) 555-0206",
    locationId: "LOC-02",
    status: "working",
    activeJobs: 3,
    bookedHours: 6.5,
    availableHours: 1.5,
    efficiency: 93,
    revenue: 16240,
    color: "teal",
  },
  {
    id: "MEC-007",
    name: "Alex Morgan",
    role: "Service Advisor",
    specialty: ["Customer Care", "Estimates"],
    certification: "Service Advisor Certified",
    email: "alex.morgan@example.com",
    phone: "(415) 555-0200",
    locationId: "LOC-01",
    status: "available",
    activeJobs: 0,
    bookedHours: 0,
    availableHours: 8,
    efficiency: 100,
    revenue: 0,
    color: "slate",
  },
  {
    id: "MEC-008",
    name: "Casey Bennett",
    role: "Parts Manager",
    specialty: ["Inventory", "Procurement"],
    certification: "Automotive Parts Professional",
    email: "casey.bennett@example.com",
    phone: "(415) 555-0207",
    locationId: "LOC-01",
    status: "available",
    activeJobs: 0,
    bookedHours: 0,
    availableHours: 8,
    efficiency: 100,
    revenue: 0,
    color: "orange",
  },
];
const serviceRows = [
  ["Oil & Filter Change", "Maintenance", 45, 90, 125],
  ["Brake Pad Replacement", "Brakes", 120, 90, 240],
  ["Brake Rotor Replacement", "Brakes", 150, 90, 380],
  ["Engine Diagnostic", "Diagnostics", 90, 120, 180],
  ["Tire Rotation", "Tires", 35, 80, 65],
  ["Wheel Alignment", "Suspension", 60, 90, 125],
  ["Battery Test & Replace", "Electrical", 60, 95, 210],
  ["Air Filter Replacement", "Maintenance", 30, 85, 75],
  ["Transmission Service", "Transmission", 150, 110, 390],
  ["Spark Plug Replacement", "Engine", 120, 95, 320],
  ["Cooling System Flush", "Maintenance", 75, 90, 195],
  ["AC Performance Check", "Air Conditioning", 75, 100, 145],
  ["Pre-Purchase Inspection", "Inspection", 90, 110, 175],
  ["Serpentine Belt Replacement", "Engine", 90, 95, 225],
  ["Tire Replacement", "Tires", 60, 85, 190],
  ["Suspension Inspection", "Suspension", 60, 95, 130],
  ["Engine Oil Leak Repair", "Engine", 180, 120, 460],
  ["Alternator Replacement", "Electrical", 120, 100, 385],
  ["Fuel System Cleaning", "Maintenance", 90, 95, 210],
  ["Four Wheel Brake Service", "Brakes", 180, 100, 445],
  ["Headlight Restoration", "Electrical", 60, 80, 120],
  ["Power Steering Flush", "Maintenance", 60, 90, 155],
  ["Cabin Air Filter", "Maintenance", 25, 80, 58],
  ["Road Test & Safety Check", "Inspection", 40, 85, 85],
  ["Exhaust System Inspection", "Inspection", 50, 95, 105],
  ["Timing Belt Service", "Engine", 300, 115, 890],
  ["Windshield Wiper Replacement", "Maintenance", 15, 75, 38],
  ["Tire Pressure & TPMS Service", "Tires", 30, 90, 95],
  ["Coolant Leak Diagnosis", "Diagnostics", 90, 120, 175],
  ["Diesel Particulate Filter", "Engine", 180, 125, 480],
] as [string, string, number, number, number][];
export const services: Service[] = serviceRows.map(
  ([name, category, duration, laborRate, basePrice], i) => ({
    id: `SRV-${String(i + 1).padStart(3, "0")}`,
    name,
    category,
    duration,
    laborRate,
    basePrice,
    taxable: true,
    description: `A professional ${name.toLowerCase()} performed to manufacturer specifications by our certified technicians.`,
  }),
);
export const suppliers: Supplier[] = Array.from({ length: 12 }, (_, i) => ({
  id: `SUP-${String(11 + i).padStart(3, "0")}`,
  name: [
    "Brembo North America",
    "Bosch Automotive",
    "NAPA Auto Parts",
    "Worldpac",
    "AutoZone Pro",
    "Genuine Parts Company",
    "Continental Automotive",
    "Dorman Products",
    "LKQ Corporation",
    "O’Reilly First Call",
    "Mann+Hummel",
    "ACDelco Parts",
  ][i],
  contact: ["Elena Morris", "David Foster", "Miguel Santos", "Rachel Kim"][
    i % 4
  ],
  email: `orders${i + 1}@${["brembo.example.com", "bosch.example.com", "napa.example.com", "worldpac.example.com"][i % 4]}`,
  phone: `(800) 555-${String(1000 + i * 13)}`,
  address: `${1200 + i * 3} Commerce Boulevard, California`,
  parts: 18 + i * 3,
  leadTime: [1, 2, 1, 3, 2, 4][i % 6],
  status: "active",
  openOrders: i % 4,
  balance: [0, 1280, 420, 0, 620, 2150, 0, 380, 0, 950, 240, 0][i],
}));
const partNames = [
  "Brembo Front Brake Pads",
  "Bosch Oil Filter",
  "Mann Cabin Air Filter",
  "Continental All-Season Tire",
  "Duralast AGM Battery",
  "NGK Iridium Spark Plugs",
  "ACDelco Engine Oil 5W-30",
  "PowerStop Brake Rotors",
  "Bosch Air Filter",
  "Gates Serpentine Belt",
  "Denso Oxygen Sensor",
  "Castrol EDGE Full Synthetic 5W-30",
  "Michelin CrossClimate2",
  "Moog Control Arm",
  "Bosch Ignition Coil",
  "Mobil 1 Oil Filter",
  "ACDelco Coolant",
  "Dorman Wheel Hub",
  "Continental TPMS Sensor",
  "Mahle Oil Filter",
  "Bendix Ceramic Brake Pads",
  "Gates Water Pump",
  "Lemforder Tie Rod End",
  "K&N Engine Air Filter",
  "Bosch Alternator",
  "Sachs Shock Absorber",
  "Motorcraft Battery",
  "Hella Headlight Bulb",
  "Liqui Moly Gear Oil",
  "Wagner Brake Caliper",
  "Fel-Pro Head Gasket",
  "Delphi Fuel Injector",
  "KYB Strut Assembly",
  "ACDelco Starter Motor",
  "Denso Cabin Filter",
  "Cooper Discoverer Tire",
  "Cardone Axle Assembly",
  "ACDelco Mass Airflow Sensor",
  "Exide Premium Battery",
  "Fel-Pro Valve Cover Gasket",
  "K&N Oil Filter",
  "Hawk Performance Brake Pads",
  "Dayco Timing Belt Kit",
  "Bosch Wiper Blade",
  "Peak Long Life Antifreeze",
  "Mann Fuel Filter",
  "Monroe Quick-Strut",
  "Wix Heavy Duty Air Filter",
  "SKF Wheel Bearing",
  "PowerStop Ceramic Brake Pads",
  "Denso Radiator",
  "Hengst Fuel Filter",
  "Continental Accessory Belt",
  "Timken Hub Bearing",
];
export const parts: Part[] = partNames.map((name, i) => {
  const low = i === 0 || i === 1 || i === 7 || i === 10 || i === 16,
    out = i === 12,
    onOrder = i === 13;
  const onHand = out
    ? 0
    : low
      ? 3 + (i % 2)
      : onOrder
        ? 0
        : 15 + ((i * 7) % 48);
  return {
    id: `PRT-${String(2101 + i).padStart(4, "0")}`,
    name,
    sku: ["BRM-P06059", "BOS-OF145", "MHF-CU29003", "CNT-2256017"][
      i % 4
    ].replace(/(\d+)$/, String(i + 1).padStart(2, "0")),
    category: [
      "Brakes",
      "Filters",
      "Tires",
      "Engine",
      "Electrical",
      "Fluids",
      "Suspension",
    ][i % 7],
    manufacturer: name.split(" ")[0],
    supplierId: `SUP-${String(11 + (i % 12)).padStart(3, "0")}`,
    locationId: i % 4 === 0 ? "LOC-02" : "LOC-01",
    onHand,
    reserved: (i * 3) % Math.min(onHand + 1, 6),
    minimum: low ? 5 : 8 + (i % 5),
    reorderQty: low ? 20 : 12,
    cost: 22 + ((i * 37) % 210),
    retail: 45 + ((i * 61) % 350),
    bin: `${String.fromCharCode(65 + (i % 8))}-${String((i % 12) + 1).padStart(2, "0")}`,
    compatibleVehicles: [
      `${vehicleSpecs[i % vehicleSpecs.length][0]} ${vehicleSpecs[i % vehicleSpecs.length][1]}`,
    ],
  };
});
const flagshipServices = [
  {
    id: "WOS-001",
    serviceId: "SRV-002",
    technicianId: "MEC-001",
    hours: 2,
    rate: 90,
    amount: 180,
    status: "in-progress" as const,
  },
  {
    id: "WOS-002",
    serviceId: "SRV-001",
    technicianId: "MEC-001",
    hours: 1.72,
    rate: 90,
    amount: 155,
    status: "pending" as const,
  },
];
const flagshipParts = [
  {
    id: "WOP-001",
    partId: "PRT-2101",
    quantity: 1,
    cost: 126,
    price: 180,
    status: "reserved" as const,
  },
  {
    id: "WOP-002",
    partId: "PRT-2102",
    quantity: 1,
    cost: 67,
    price: 97,
    status: "reserved" as const,
  },
];
const woStatuses: import("@/types/domain").WorkOrderStatus[] = [
  "in-progress",
  "waiting",
  "inspection",
  "awaiting-approval",
  "approved",
  "in-progress",
  "waiting-parts",
  "quality-check",
  "ready",
  "completed",
  "in-progress",
  "waiting",
  "inspection",
  "approved",
  "completed",
  "ready",
  "awaiting-approval",
  "in-progress",
  "waiting-parts",
  "completed",
  "inspection",
  "quality-check",
  "approved",
  "waiting",
  "completed",
  "in-progress",
  "ready",
  "waiting",
  "inspection",
  "in-progress",
  "completed",
  "approved",
];
export const workOrders: WorkOrder[] = Array.from({ length: 42 }, (_, i) => {
  const status =
    i === 0 ? "in-progress" : woStatuses[(i - 1) % woStatuses.length];
  const vehicle = vehicles[i % vehicles.length];
  const customer = customers.find((c) => c.id === vehicle.customerId)!;
  const svc = services[(i * 3 + 1) % services.length];
  const isMain = i === 0;
  const day = String(Math.max(1, 5 - (i % 8))).padStart(2, "0");
  const serviceIds = isMain
    ? [...flagshipServices]
    : [
        {
          id: `WOS-${String(i + 10).padStart(3, "0")}`,
          serviceId: svc.id,
          technicianId: `MEC-00${(i % 6) + 1}`,
          hours: 1.2,
          rate: svc.laborRate,
          amount: Math.round(svc.laborRate * 1.2),
          status:
            status === "completed" || status === "ready"
              ? ("completed" as const)
              : status === "in-progress"
                ? ("in-progress" as const)
                : ("pending" as const),
        },
      ];
  const assignedTech = isMain ? "MEC-001" : `MEC-00${(i % 6) + 1}`;
  const assignedVehicle = isMain ? "VEH-0501" : vehicle.id;
  const assignedCustomer = isMain ? "CUS-0101" : customer.id;
  const relatedParts = isMain
    ? [...flagshipParts]
    : i % 3 === 0
      ? [
          {
            id: `WOP-${i + 10}`,
            partId: parts[(i + 4) % parts.length].id,
            quantity: 1,
            cost: parts[(i + 4) % parts.length].cost,
            price: parts[(i + 4) % parts.length].retail,
            status:
              status === "waiting-parts"
                ? ("on-order" as const)
                : ("reserved" as const),
          },
        ]
      : [];
  return {
    id: `WO-2026-${String(291 + i).padStart(4, "0")}`,
    customerId: assignedCustomer,
    vehicleId: assignedVehicle,
    technicianId: assignedTech,
    locationId: i % 9 === 0 ? "LOC-02" : "LOC-01",
    inspectionId:
      i < 34 ? `INS-2026-${String(84 + i).padStart(4, "0")}` : undefined,
    estimateId:
      i === 0
        ? "EST-2026-0214"
        : i < 32
          ? `EST-2026-${String(214 + i).padStart(4, "0")}`
          : undefined,
    invoiceId: isMain
      ? "INV-2026-0188"
      : `INV-2026-${String(188 + i).padStart(4, "0")}`,
    complaint: isMain
      ? "Brake vibration when slowing down; customer also requested routine service."
      : [
          "Engine hesitation under acceleration",
          "Scheduled 50,000 km service",
          "Grinding noise from front left wheel",
          "Check engine light illuminated",
          "Air conditioning blowing warm air",
          "Vibration at highway speeds",
        ][i % 7],
    customerNotes: isMain
      ? "Please call before carrying out any additional work. I am available after 11:00 AM."
      : "Call the customer before approving additional work.",
    internalNotes: isMain
      ? "Brake pad measurement confirmed at 2 mm. Verify rotor condition before installing. Customer has approved brake service and oil service."
      : "Complete a road test and document findings before closing the job.",
    services: serviceIds,
    parts: relatedParts,
    mileageIn: isMain ? 48230 : vehicle.mileage,
    fuelLevel: [75, 50, 90, 25, 60, 100][i % 6],
    priority: isMain
      ? "normal"
      : i % 11 === 0
        ? "urgent"
        : i % 7 === 0
          ? "high"
          : "normal",
    status,
    createdAt: `2026-10-${day}T${String(8 + (i % 8)).padStart(2, "0")}:${i % 2 ? "35" : "10"}:00`,
    dueAt: isMain
      ? "2026-10-05T15:30:00"
      : `2026-10-${String(5 + (i % 7)).padStart(2, "0")}T${String(10 + (i % 7)).padStart(2, "0")}:00:00`,
    startedAt: ["in-progress", "quality-check", "ready", "completed"].includes(
      status,
    )
      ? "2026-10-05T09:40:00"
      : undefined,
    completedAt: ["completed", "ready"].includes(status)
      ? `2026-10-${day}T14:40:00`
      : undefined,
    mileageOut: status === "completed" ? vehicle.mileage + 17 : undefined,
    labor: isMain ? 335 : serviceIds.reduce((s, x) => s + x.amount, 0),
    shopSupplies: isMain
      ? 18
      : Math.round(
          (serviceIds.reduce((s, x) => s + x.amount, 0) +
            relatedParts.reduce((s, x) => s + x.price * x.quantity, 0)) *
            0.03,
        ),
    taxRate: 0.08,
    discount: isMain ? 20 : 0,
    paid: isMain ? 300 : status === "completed" ? 0 : 0,
  };
});
export const inspections: Inspection[] = Array.from({ length: 34 }, (_, i) => {
  const w = workOrders[i];
  const isMain = i === 0;
  const sections = [
    "Exterior",
    "Tires & Wheels",
    "Brakes",
    "Under Hood",
    "Fluids",
    "Suspension",
    "Steering",
    "Battery",
    "Lights",
    "Interior",
    "Safety",
    "Road Test",
  ].map((name, j) => ({
    id: `SEC-${i}-${j}`,
    name,
    items: [0, 1].map((k) => {
      const urgent = isMain && j === 2 && k === 0;
      const attention =
        isMain && ((j === 1 && k === 0) || (j === 4 && k === 1));
      const condition: Condition = urgent
        ? "urgent"
        : attention
          ? "attention"
          : isMain
            ? "good"
            : (["good", "good", "attention", "not-checked"][
                (j + k + i) % 9 === 0 ? 2 : (j + k) % 7
              ] as Condition);
      const id = `ITM-${i}-${j}-${k}`;
      return {
        id,
        name: urgent
          ? "Front Brake Pads"
          : isMain && j === 1
            ? "Front Tire Tread"
            : j === 0
              ? "Windshield & Glass"
              : k === 0
                ? `${name} inspection`
                : `${name} condition`,
        condition,
        measurement: urgent
          ? "2 mm remaining"
          : isMain && attention
            ? "4/32 in tread"
            : "Within manufacturer specification",
        note: urgent
          ? "Pads are below recommended safe thickness. Replace in pairs and inspect rotors."
          : isMain && attention
            ? "Tread is approaching the wear bars. Recommend replacing before the rainy season."
            : "No visible concerns. Performing within normal specification.",
        recommendationServiceId: urgent
          ? "SRV-002"
          : attention
            ? "SRV-015"
            : undefined,
        estimatedCost: urgent ? 240 : attention ? 190 : undefined,
        photo: urgent ? "img-placeholder" : undefined,
      };
    }),
  }));
  const status: Inspection["status"] =
    i === 0
      ? "completed"
      : i % 9 === 0
        ? "draft"
        : i % 7 === 0
          ? "awaiting-approval"
          : i % 5 === 0
            ? "in-progress"
            : "completed";
  return {
    id: isMain
      ? "INS-2026-0084"
      : `INS-2026-${String(84 + i).padStart(4, "0")}`,
    customerId: w.customerId,
    vehicleId: w.vehicleId,
    technicianId: w.technicianId,
    workOrderId: w.id,
    date: isMain
      ? "2026-10-05"
      : `2026-10-${String(Math.max(1, 5 - (i % 8))).padStart(2, "0")}`,
    status,
    sections,
    customerMessage:
      "Our inspection identifies items needing your attention. Review each recommendation at your convenience; no additional work starts without your approval.",
  };
});
export const estimates: Estimate[] = Array.from({ length: 32 }, (_, i) => {
  const w = workOrders[i];
  const main = i === 0;
  const items: Estimate["items"] = main
    ? [
        {
          id: "ESTI-1",
          kind: "service",
          description: "Front Brake Pad Replacement",
          category: "urgent",
          quantity: 1,
          unitPrice: 240,
          approved: "approved",
        },
        {
          id: "ESTI-2",
          kind: "service",
          description: "Oil & Filter Change",
          category: "recommended",
          quantity: 1,
          unitPrice: 125,
          approved: "approved",
        },
        {
          id: "ESTI-3",
          kind: "service",
          description: "Cabin Air Filter",
          category: "optional",
          quantity: 1,
          unitPrice: 58,
          approved: "declined",
        },
        {
          id: "ESTI-4",
          kind: "service",
          description: "Wheel Alignment",
          category: "recommended",
          quantity: 1,
          unitPrice: 125,
          approved: "pending",
        },
      ]
    : [
        {
          id: `EI-${i}-1`,
          kind: "service",
          description: services[i % services.length].name,
          category:
            i % 3 === 0 ? "urgent" : i % 3 === 1 ? "recommended" : "optional",
          quantity: 1,
          unitPrice: services[i % services.length].basePrice,
          approved: i % 4 === 0 ? "pending" : "approved",
        },
      ];
  return {
    id: main ? "EST-2026-0214" : `EST-2026-${String(214 + i).padStart(4, "0")}`,
    customerId: w.customerId,
    vehicleId: w.vehicleId,
    workOrderId: w.id,
    date: "2026-10-05",
    expiresAt: "2026-10-19",
    status: main
      ? "partially-approved"
      : i % 7 === 0
        ? "draft"
        : i % 4 === 0
          ? "sent"
          : i % 5 === 0
            ? "approved"
            : "viewed",
    items,
    taxRate: 0.08,
    discount: main ? 20 : 0,
    notes: main
      ? "Customer requested a call before additional work beyond the approved brake and oil service."
      : "All work is carried out to manufacturer specifications.",
    terms:
      "Estimate valid for 14 days. Additional work requires written customer approval.",
    approvedBy: main ? "James Wilson" : undefined,
    approvedAt: main ? "2026-10-05T10:31:00" : undefined,
  };
});
const invStatuses: import("@/types/domain").InvoiceStatus[] = [
  "partially-paid",
  "paid",
  "overdue",
  "paid",
  "sent",
  "paid",
  "draft",
  "paid",
  "overdue",
  "paid",
  "paid",
  "sent",
];
export const invoices: Invoice[] = Array.from({ length: 42 }, (_, i) => {
  const w = workOrders[i];
  const isMain = i === 0;
  const items: Invoice["items"] = isMain
    ? [
        {
          id: "II-1",
          description: "Front Brake Pad Replacement — Labor",
          quantity: 2,
          unitPrice: 90,
          kind: "labor",
        },
        {
          id: "II-2",
          description: "Oil & Filter Change — Labor",
          quantity: 1,
          unitPrice: 155,
          kind: "labor",
        },
        {
          id: "II-3",
          description: "Brembo Front Brake Pads · BRM-P06059",
          quantity: 1,
          unitPrice: 180,
          kind: "part",
        },
        {
          id: "II-4",
          description: "Bosch Oil Filter · BOS-OF145",
          quantity: 1,
          unitPrice: 97,
          kind: "part",
        },
        {
          id: "II-5",
          description: "Shop supplies",
          quantity: 1,
          unitPrice: 18,
          kind: "supply",
        },
      ]
    : [
        ...w.services.map((s) => ({
          id: `II-${s.id}`,
          description:
            services.find((x) => x.id === s.serviceId)!.name + " — Labor",
          quantity: 1,
          unitPrice: s.amount,
          kind: "labor" as const,
        })),
        ...w.parts.map((p) => ({
          id: `II-${p.id}`,
          description: parts.find((x) => x.id === p.partId)!.name,
          quantity: p.quantity,
          unitPrice: p.price,
          kind: "part" as const,
        })),
      ];
  return {
    id: isMain
      ? "INV-2026-0188"
      : `INV-2026-${String(188 + i).padStart(4, "0")}`,
    customerId: w.customerId,
    vehicleId: w.vehicleId,
    workOrderId: w.id,
    date: isMain
      ? "2026-10-05"
      : `2026-10-${String(Math.max(1, 5 - (i % 8))).padStart(2, "0")}`,
    dueAt: "2026-10-19",
    items,
    taxRate: 0.08,
    discount: isMain ? 20 : 0,
    paid: isMain ? 300 : i % 3 === 0 ? 0 : Math.min((w.labor + 18) * 0.25, 200),
    status: isMain ? "partially-paid" : invStatuses[i % invStatuses.length],
    notes: isMain
      ? "Thank you for trusting GarageX with your BMW M4."
      : "Thank you for choosing GarageX Auto Services.",
  };
});
export const payments: Payment[] = invoices
  .filter((i) => i.paid > 0)
  .map((i, n) => ({
    id: `PAY-2026-${String(504 + n).padStart(4, "0")}`,
    customerId: i.customerId,
    invoiceId: i.id,
    amount: i.paid,
    method: ["card", "bank-transfer", "cash", "online", "check"][
      n % 5
    ] as Payment["method"],
    date: i.date,
    status: "completed",
    reference: `REF-${String(48210 + n * 179)}`,
    notes: "Demo payment recorded.",
  }));
export const purchaseOrders: PurchaseOrder[] = Array.from(
  { length: 14 },
  (_, i) => ({
    id: `PO-2026-${String(48 + i).padStart(4, "0")}`,
    supplierId: `SUP-${String(11 + (i % 12)).padStart(3, "0")}`,
    locationId: i % 3 === 0 ? "LOC-02" : "LOC-01",
    createdAt: `2026-10-${String(Math.max(1, 4 - (i % 4))).padStart(2, "0")}`,
    expectedAt: `2026-10-${String(6 + (i % 10)).padStart(2, "0")}`,
    status:
      i === 0
        ? "ordered"
        : i === 1
          ? "partially-received"
          : i % 4 === 0
            ? "draft"
            : i % 3 === 0
              ? "received"
              : "ordered",
    items: [
      {
        id: `POI-${i}-1`,
        partId: parts[(i + 2) % parts.length].id,
        quantity: 10 + (i % 20),
        received: i === 1 ? 4 : i % 3 === 0 ? 10 + (i % 20) : 0,
        damaged: 0,
        unitCost: parts[(i + 2) % parts.length].cost,
      },
      {
        id: `POI-${i}-2`,
        partId: parts[(i + 8) % parts.length].id,
        quantity: 8 + (i % 12),
        received: i % 3 === 0 ? 8 + (i % 12) : 0,
        damaged: 0,
        unitCost: parts[(i + 8) % parts.length].cost,
      },
    ],
    notes: "",
  }),
);
const weekAppointments: Appointment[] = Array.from(
  { length: 32 },
  (_, i) => {
    const w = workOrders[i];
    const d = String(5 + (i % 6)).padStart(2, "0");
    // Shift the last rows so no day repeats the same start times.
    const slot = (i + (i >= 24 ? 3 : 0)) % 8;
    return {
      id:
        i === 0
          ? "APT-2026-0124"
          : `APT-2026-${String(124 + i).padStart(4, "0")}`,
      customerId: w.customerId,
      vehicleId: w.vehicleId,
      serviceIds: [w.services[0]?.serviceId || "SRV-001"],
      technicianId: w.technicianId,
      locationId: w.locationId,
      date: "2026-10-" + d,
      start: [
        "09:00",
        "10:30",
        "12:00",
        "13:30",
        "15:00",
        "16:30",
        "08:00",
        "11:00",
      ][slot],
      duration: [60, 60, 90, 45, 60, 90, 45, 60][slot],
      bay: `Bay ${(i % 8) + 1}`,
      source: ["phone", "online", "walk-in", "returning"][
        i % 4
      ] as Appointment["source"],
      status:
        i === 0
          ? "confirmed"
          : i % 9 === 0
            ? "requested"
            : i % 5 === 0
              ? "checked-in"
              : i % 11 === 0
                ? "no-show"
                : "confirmed",
      notes:
        i === 0
          ? "Brake vibration and oil service requested."
          : "Confirm the customer’s primary concern at check-in.",
      workOrderId: i % 4 === 0 ? w.id : undefined,
    };
  },
);
const monthDays = [
  "01", "02", "03", "12", "13", "14", "15", "16", "17", "19", "20", "21",
  "22", "23", "24", "26", "27", "28", "29", "30", "31",
];
const monthAppointments: Appointment[] = Array.from(
  { length: 42 },
  (_, i) => {
    const w = workOrders[(i + 5) % workOrders.length];
    const day = monthDays[i % monthDays.length];
    const past = Number(day) < 5;
    return {
      id: `APT-2026-${String(156 + i).padStart(4, "0")}`,
      customerId: w.customerId,
      vehicleId: w.vehicleId,
      serviceIds: [w.services[0]?.serviceId || "SRV-001"],
      technicianId: w.technicianId,
      locationId: w.locationId,
      date: "2026-10-" + day,
      start: ["08:30", "10:00", "13:00", "14:30", "11:30", "15:30"][i % 6],
      duration: [60, 45, 90, 60, 30, 60][i % 6],
      bay: `Bay ${((i + 3) % 8) + 1}`,
      source: ["online", "phone", "returning", "walk-in"][
        i % 4
      ] as Appointment["source"],
      status: past ? "completed" : i % 4 === 1 ? "requested" : "confirmed",
      notes: past
        ? "Vehicle collected by the customer."
        : "Confirm the customer’s primary concern at check-in.",
    };
  },
);
export const appointments: Appointment[] = [
  ...weekAppointments,
  ...monthAppointments,
];
export const expenses: Expense[] = Array.from({ length: 32 }, (_, i) => ({
  id: `EXP-2026-${String(79 + i).padStart(4, "0")}`,
  name: [
    "Lift maintenance — Bay 4",
    "Shop electricity · September",
    "Brake pad restock",
    "Diagnostic tablet service plan",
    "Commercial property insurance",
    "Shop supplies",
    "Waste oil collection",
    "Uniform replacement",
  ][i % 8],
  category: [
    "maintenance",
    "utilities",
    "parts",
    "software",
    "insurance",
    "other",
    "maintenance",
    "payroll",
  ][i % 8] as Expense["category"],
  vendor: [
    "West Coast Lift Service",
    "Pacific Energy",
    "Brembo North America",
    "Snap-on Tools",
    "State Farm Commercial",
    "NAPA Auto Parts",
    "Eco Oil Recycling",
    "Workwear Pacific",
  ][i % 8],
  date: `2026-10-${String(Math.max(1, 5 - (i % 9))).padStart(2, "0")}`,
  amount: [480, 720, 1230, 145, 980, 68, 225, 320][i % 8],
  method: ["Bank Transfer", "Card", "Check", "Bank Transfer"][i % 4],
  status: i % 9 === 0 ? "pending" : "paid",
}));
export const threads: MessageThread[] = Array.from({ length: 12 }, (_, i) => {
  const customer = customers[i];
  const vehicle = vehicles.find((v) => v.customerId === customer.id);
  const main = i === 0;
  const id = main ? "THREAD-001" : `THREAD-${String(i + 1).padStart(3, "0")}`;
  return {
    id,
    customerId: main ? "CUS-0101" : customer.id,
    vehicleId: main ? "VEH-0501" : vehicle?.id,
    subject: main
      ? "BMW M4 · Inspection & estimate"
      : `${vehicle?.make || "Your vehicle"} service update`,
    unread: i % 4 === 1 ? 1 : 0,
    updatedAt: "2026-10-05T10:42:00",
    messages: main
      ? [
          {
            id: "MSG-01",
            threadId: id,
            direction: "out",
            channel: "SMS",
            body: "Hi James, we’ve completed the inspection on your BMW M4. The front brake pads are at 2 mm and need attention. Your estimate is ready to review.",
            sentAt: "2026-10-05T09:58:00",
          },
          {
            id: "MSG-02",
            threadId: id,
            direction: "in",
            channel: "SMS",
            body: "Thanks. Can you send the estimate?",
            sentAt: "2026-10-05T10:18:00",
          },
          {
            id: "MSG-03",
            threadId: id,
            direction: "out",
            channel: "SMS",
            body: "Absolutely — EST-2026-0214 is ready. The brake and oil service have your approval. We’ll call before proceeding with anything else.",
            sentAt: "2026-10-05T10:31:00",
          },
        ]
      : [
          {
            id: `MSG-${i}-1`,
            threadId: id,
            direction: "out",
            channel: "SMS",
            body: `Hi ${customer.name.split(" ")[0]}, a quick update from GarageX about your upcoming vehicle service. Let us know if you have any questions.`,
            sentAt: "2026-10-05T09:15:00",
          },
          {
            id: `MSG-${i}-2`,
            threadId: id,
            direction: "in",
            channel: "SMS",
            body: "Thanks for keeping me informed.",
            sentAt: "2026-10-05T10:42:00",
          },
        ],
  };
});
export const notifications: Notification[] = [
  {
    id: "N-001",
    title: "Estimate approved",
    body: "James Wilson approved EST-2026-0214.",
    time: "2 minutes ago",
    read: false,
    kind: "approval",
    href: "/estimates/EST-2026-0214",
  },
  {
    id: "N-002",
    title: "Low stock",
    body: "Bosch Oil Filter reached its reorder level.",
    time: "18 minutes ago",
    read: false,
    kind: "inventory",
    href: "/inventory",
  },
  {
    id: "N-003",
    title: "Vehicle ready",
    body: "WO-2026-0299 passed its quality check.",
    time: "1 hour ago",
    read: false,
    kind: "ready",
    href: "/work-orders/WO-2026-0299",
  },
  {
    id: "N-004",
    title: "Payment received",
    body: "A customer payment was recorded.",
    time: "2 hours ago",
    read: true,
    kind: "payment",
    href: "/payments",
  },
  {
    id: "N-005",
    title: "Appointment checked in",
    body: "Audi Q5 · Bay 3 · Westside Service Center.",
    time: "3 hours ago",
    read: true,
    kind: "appointment",
    href: "/appointments",
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `N-${String(i + 6).padStart(3, "0")}`,
    title: [
      "Purchase order dispatched",
      "Service reminder due",
      "New appointment request",
      "Part received",
      "Invoice payment due",
    ][i % 5],
    body: [
      "Supplier order expected tomorrow.",
      "A customer has a vehicle due for service.",
      "Review the upcoming shop calendar.",
      "A recent shipment has been received.",
      "An invoice is due to be reviewed.",
    ][i % 5],
    time: `${i + 1} hours ago`,
    read: true,
    kind: (["inventory", "appointment", "payment"] as const)[i % 3],
    href: ["/purchase-orders", "/customers", "/appointments"][i % 3],
  })),
];
export const documents: GarageDocument[] = Array.from(
  { length: 36 },
  (_, i) => ({
    id: `DOC-${202 + i}`,
    name: [
      "BMW M4 — signed estimate.pdf",
      "Vehicle registration.pdf",
      "Brake inspection — front axle.jpg",
      "Invoice INV-2026-0188.pdf",
      "Fleet maintenance agreement.pdf",
      "Technician ASE certification.pdf",
      "Supplier delivery receipt.pdf",
      "Audi Q5 inspection photos.zip",
    ][i % 8],
    category: [
      "vehicle",
      "vehicle",
      "inspection-photo",
      "invoice",
      "customer",
      "staff",
      "supplier",
      "inspection-photo",
    ][i % 8] as GarageDocument["category"],
    relatedId:
      i === 0
        ? "VEH-0501"
        : i % 3 === 0
          ? customers[i % customers.length].id
          : vehicles[i % vehicles.length].id,
    uploadedBy: ["Alex Morgan", "Michael Roberts", "Sofia Alvarez"][i % 3],
    date: `2026-10-${String(Math.max(1, 5 - (i % 9))).padStart(2, "0")}`,
    size: `${(0.4 + (i % 48) * 0.3).toFixed(1)} MB`,
  }),
);
export const users: User[] = mechanics.map((m): User => ({
  id: m.id,
  name: m.name,
  email: m.email,
  role:
    m.id === "MEC-007"
      ? "Service Advisor"
      : m.id === "MEC-008"
        ? "Parts Manager"
        : "Technician",
  phone: m.phone,
  locationId: m.locationId,
  color: m.color,
}));
export const activity: ActivityEvent[] = [
  {
    id: "EV-1",
    title: "WO-2026-0291 moved to In Progress",
    description: "Michael Roberts · Front brake replacement started",
    date: "2026-10-05T10:42:00",
    kind: "work-order",
    workOrderId: "WO-2026-0291",
    customerId: "CUS-0101",
    vehicleId: "VEH-0501",
  },
  {
    id: "EV-2",
    title: "James Wilson approved the estimate",
    description: "EST-2026-0214 · Brake and oil service approved",
    date: "2026-10-05T10:31:00",
    kind: "approval",
    customerId: "CUS-0101",
    workOrderId: "WO-2026-0291",
  },
  {
    id: "EV-3",
    title: "Payment of $661 received",
    description: "A customer invoice was paid in full",
    date: "2026-10-05T10:18:00",
    kind: "payment",
    customerId: "CUS-0105",
  },
  {
    id: "EV-4",
    title: "Vehicle inspection completed",
    description: "Michael Roberts · BMW M4 Competition",
    date: "2026-10-05T09:56:00",
    kind: "inspection",
    vehicleId: "VEH-0501",
    customerId: "CUS-0101",
  },
  {
    id: "EV-5",
    title: "Audi Q5 checked in",
    description: "Bay 3 · Riley Chen · Westside Service Center",
    date: "2026-10-05T09:32:00",
    kind: "check-in",
    vehicleId: "VEH-0502",
    customerId: "CUS-0102",
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `EV-${i + 6}`,
    title: [
      "Bosch Oil Filter restocked",
      "Vehicle ready for pickup",
      "Service visit booked",
      "Technician clocked onto job",
    ][i % 4],
    description: `Garage operations update · ${locations[i % 3].name}`,
    date: `2026-10-05T0${8 - (i % 4)}:${String(40 - (i % 40)).padStart(2, "0")}:00`,
    kind: (["inventory", "delivery", "appointment", "work-order"] as const)[
      i % 4
    ],
  })),
];
export const revenueByMonth = [
  ["Jan", 28400],
  ["Feb", 31200],
  ["Mar", 29800],
  ["Apr", 36400],
  ["May", 39100],
  ["Jun", 42800],
  ["Jul", 40900],
  ["Aug", 46300],
  ["Sep", 48700],
  ["Oct", 51200],
  ["Nov", 53800],
  ["Dec", 57400],
].map(([name, revenue]) => ({
  name: String(name),
  revenue: Number(revenue),
  labor: Math.round(Number(revenue) * 0.49),
  parts: Math.round(Number(revenue) * 0.38),
}));
