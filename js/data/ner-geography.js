/**
 * DRISHTI - Geographic Data for North Eastern Region (8 States)
 * 
 * IMPORTANT SAFETY NOTE:
 * All authority email addresses in this file are SAFE DEMO PLACEHOLDERS (@ner-demo.gov.in).
 * Testing the SOS trigger with these addresses will NOT send emails to real government agencies.
 * If you need to test live email delivery to a specific inbox, set SOS_TEST_RECIPIENT in .env.
 */

export const NER_STATES = [
  {
    id: "assam",
    name: "Assam",
    capital: "Dispur (Guwahati)",
    center: [26.2006, 92.9376],
    zoom: 7,
    terrainRisk: "High Monsoon Flood & Riverbank Erosion",
    districts: [
      "Kamrup Metropolitan", "Kamrup", "Nagaon", "Jorhat", "Dibrugarh",
      "Cachar (Silchar)", "Sonitpur (Tezpur)", "Karbi Anglong", "Dima Hasao",
      "Goalpara", "Dhubri", "Barpeta", "Tinsukia", "Golaghat", "Morigaon"
    ],
    authorities: [
      {
        id: "ASDMA-STATE",
        name: "Assam State Disaster Management Authority (ASDMA)",
        role: "State Control Room",
        email: "asdma-control@ner-demo.gov.in"
      },
      {
        id: "PWD-ASSAM",
        name: "Assam Public Works Roads Department",
        role: "Highway Infrastructure Monitoring",
        email: "pwd-roads@ner-demo.gov.in"
      }
    ]
  },
  {
    id: "sikkim",
    name: "Sikkim",
    capital: "Gangtok",
    center: [27.5330, 88.5122],
    zoom: 8,
    terrainRisk: "Severe Landslide Vulnerability & Flash Floods (Teesta Basin)",
    districts: ["Gangtok", "Mangan (North)", "Namchi (South)", "Gyalshing (West)", "Pakyong", "Soreng"],
    authorities: [
      {
        id: "SSDMA-STATE",
        name: "Sikkim State Disaster Management Authority (SSDMA)",
        role: "State Emergency Operations Centre",
        email: "ssdma-eoc@ner-demo.gov.in"
      },
      {
        id: "BRO-SWASTIK",
        name: "Border Roads Organisation (Project Swastik)",
        role: "NH-10 Highway Maintenance",
        email: "bro-swastik@ner-demo.gov.in"
      }
    ]
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    capital: "Shillong",
    center: [25.4670, 91.3662],
    zoom: 8,
    terrainRisk: "Extreme Rainfall (Cherrapunji/Mawsynram) & Hill Slump",
    districts: ["East Khasi Hills", "West Khasi Hills", "Ri-Bhoi", "West Garo Hills", "East Garo Hills", "East Jaintia Hills", "West Jaintia Hills"],
    authorities: [
      {
        id: "MSDMA-STATE",
        name: "Meghalaya State Disaster Management Authority (MSDMA)",
        role: "State Control Room",
        email: "msdma-control@ner-demo.gov.in"
      }
    ]
  },
  {
    id: "arunachal_pradesh",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    center: [28.2180, 94.7278],
    zoom: 7,
    terrainRisk: "High Mountain Passes, Landslides & Remote River Crossings",
    districts: ["Papum Pare", "Tawang", "West Kameng", "East Siang (Pasighat)", "Lower Subansiri", "Dibang Valley", "Changlang", "Lohit"],
    authorities: [
      {
        id: "APSDMA-STATE",
        name: "Arunachal Pradesh SDMA",
        role: "State Emergency Operations",
        email: "apsdma-control@ner-demo.gov.in"
      },
      {
        id: "BRO-VARTAK",
        name: "Border Roads Organisation (Project Vartak & Brahmank)",
        role: "Border Highway Clearance",
        email: "bro-vartak@ner-demo.gov.in"
      }
    ]
  },
  {
    id: "nagaland",
    name: "Nagaland",
    capital: "Kohima",
    center: [26.1584, 94.5624],
    zoom: 8,
    terrainRisk: "Pagal Pahar Sinking Zone (NH-29) & Slope Instability",
    districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Mon", "Phek", "Chümoukedima"],
    authorities: [
      {
        id: "NSDMA-STATE",
        name: "Nagaland State Disaster Management Authority",
        role: "State Control Room",
        email: "nsdma-control@ner-demo.gov.in"
      }
    ]
  },
  {
    id: "manipur",
    name: "Manipur",
    capital: "Imphal",
    center: [24.6637, 93.9063],
    zoom: 8,
    terrainRisk: "Barak Valley Bottleneck, Landslides (NH-37 & NH-2)",
    districts: ["Imphal West", "Imphal East", "Churachandpur", "Thoubal", "Bishnupur", "Senapati", "Ukhrul", "Tamenglong"],
    authorities: [
      {
        id: "MAN-SDMA",
        name: "Manipur State Disaster Management Authority",
        role: "State Control Room",
        email: "manipur-sdma@ner-demo.gov.in"
      }
    ]
  },
  {
    id: "mizoram",
    name: "Mizoram",
    capital: "Aizawl",
    center: [23.1645, 92.9376],
    zoom: 8,
    terrainRisk: "Steep Ridge Roads, Subsidence & Single Lifeline (NH-306)",
    districts: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Mamit", "Lawngtlai", "Siaha"],
    authorities: [
      {
        id: "MIZ-SDMA",
        name: "Mizoram State Disaster Management Authority",
        role: "State Control Room",
        email: "mizoram-sdma@ner-demo.gov.in"
      }
    ]
  },
  {
    id: "tripura",
    name: "Tripura",
    capital: "Agartala",
    center: [23.9408, 91.9882],
    zoom: 8,
    terrainRisk: "River Flooding & Churaibari Border Corridor Bottlenecks",
    districts: ["West Tripura", "North Tripura", "South Tripura", "Dhalai", "Gomati", "Khowai", "Sepahijala", "Unakoti"],
    authorities: [
      {
        id: "TRP-SDMA",
        name: "Tripura State Disaster Management Authority",
        role: "State Control Room",
        email: "tripura-sdma@ner-demo.gov.in"
      }
    ]
  }
];

export const NATIONAL_AUTHORITIES = [
  {
    id: "NDMA-NER",
    name: "National Disaster Management Authority (NER Desk)",
    role: "National Operations Centre",
    email: "ndma-ner-control@ner-demo.gov.in"
  },
  {
    id: "NHIDCL-NER",
    name: "National Highways & Infrastructure Dev. Corp. Ltd. (NHIDCL)",
    role: "Northeast Highway Emergency Desk",
    email: "nhidcl-emergency@ner-demo.gov.in"
  }
];

export function resolveAuthorityRecipients(stateId) {
  const state = NER_STATES.find(s => s.id === stateId);
  const stateAuths = state ? state.authorities : [];
  return [...stateAuths, ...NATIONAL_AUTHORITIES];
}
