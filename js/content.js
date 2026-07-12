const SITE_CONFIG = {
  INAT_RG_URL: "https://help.inaturalist.org/en/support/solutions/articles/151000169936-what-is-the-data-quality-assessment-dqa-and-how-do-observations-qualify-to-become-research-grade-"
};

// Centralized content for the Biodiversity Hall of Fame (BHOF) Website.
// Edit this file to quickly update the resources, bioblitzes, and rules.
window.BHOF_CONTENT = {
  mission: {
    title: "Recognizing the Next Generation of Conservation Heroes",
    lead: "The Biodiversity Hall of Fame (BHOF) is a recognition program guided by structured ecological achievements that inspire high school, college, and university students to discover, document, and conserve the natural world around them.",
    description: "Modelled after traditional sports halls of fame, BHOF awards outstanding young naturalists who make high-quality, research-grade contributions to biodiversity science using iNaturalist."
  },

  criteria: [
    {
      title: "Research-Grade Focus",
      icon: "shield",
      description: `Observations must be verified as <a href='${SITE_CONFIG.INAT_RG_URL}'>'Research-Grade'</a> on iNaturalist, ensuring scientific data quality and validating genuine contributions to global biodiversity databases.`
    },
    {
      title: "Taxonomic Breadth",
      icon: "leaf",
      description: "Rewards generalist observation strategies. To qualify, students must observe at least 100 unique Research Grade individuals across diverse categories (Plants, Invertebrates, Amphibians, Reptiles, Fish, Birds, Mammals)."
    },
    {
      title: "Tiered Recognition",
      icon: "award",
      description: "Inductees are celebrated at multiple levels: local high schools/colleges, districts, states (Top 10), jurisdictions (Top 3), and ecoregions (Top 50)."
    }
  ],

  resources: [
    {
      title: "CNC Education Toolkit",
      category: "Guides",
      description: "A complete curriculum guide and resource pack on how to integrate iNaturalist directly into high school and college courses.",
      link: "https://www.citynaturechallenge.org/education-toolkit",
      linkLabel: "Visit Education Toolkit"
    },
    {
      title: "How to Build a Biodiversity Club",
      category: "Guides",
      description: "Learn how to establish a school-based club, organize local bioblitzes, and train students in observation ethics. (Note: This guide is currently under development).",
      link: "#",
      linkLabel: "Coming Soon"
    },
    {
      title: "Creating High-Quality Observations",
      category: "Resources",
      description: "Tips for making observations with identifiable photos. Guide created by iNaturalist user @mickley:",
      link: "https://www.inaturalist.org/posts/80155-creating-high-quality-inaturalist-observations",
      linkLabel: "View Guide"
    },
    {
      title: "Ecoregion Finder",
      category: "Resources",
      description: "Explore the ecological boundaries of your jurisdiction and locate your specific ecoregion using Homegrown National Park's map tool.",
      link: "https://homegrownnationalpark.org/ecoregion-finder/",
      linkLabel: "View Ecoregion Finder"
    }
  ],

  bioblitzes: [
    {
      name: "2026 Fall South-Central Plains Biodiversity Challenge (SCPBC)",
      status: "Upcoming",
      date: "October 16 - October 19, 2026",
      description: "Join schools across the south-central plains to document pollinators, migratory birds, and native grasses. Compete for the regional leaderboards!",
      link: "https://www.inaturalist.org/projects/2026-fall-south-central-plains-biodiversity-challenge-scpbc",
      linkLabel: "View iNaturalist Project"
    },
    {
      name: "2026 Summer South-Central Plains Biodiversity Challenge (SCPBC)",
      status: "Upcoming",
      date: "July 24 - July 27, 2026",
      //description: "Join schools across the south-central plains to document pollinators, migratory birds, and native grasses. Compete for the regional leaderboards!",
      link: "https://www.inaturalist.org/projects/2026-summer-south-central-plains-biodiversity-challenge-scpbc",
      linkLabel: "View iNaturalist Project"
    },
    {
      name: "2026 Spring South-Central Plains Biodiversity Challenge (SCPBC)",
      status: "Completed",
      date: "April 24 - April 27, 2026",
      //description: "",
      link: "https://www.inaturalist.org/projects/2026-spring-south-central-plains-biodiversity-challenge-scpbc",
      linkLabel: "View iNaturalist Project"
    }
  ],

  missionStatement: "To recognize outstanding young naturalists and inspire students to discover, document, and conserve their local ecosystems.",
  goals: [
    "Establish a structured, replicable achievement framework that schools can easily adopt to celebrate achievements in biodiversity education.",
    "Cultivate student leadership and foster community engagement through hands-on, student-led bioblitz events.",
    "Deepen ecological literacy and student engagement with local ecoregional biodiversity.",
    "Encourage active education and citizen science research in biodiversity and biological conservation.",
    "Document and raise awareness for species of conservation concern to support local wildlife action plans."
  ],

  contributors: [
    {
      name: "George Gehrig",
      username: "quovadis",
      role: "Founder & Bioblitz Organizer & Community Advocate",
      bio: "Active community naturalist, experienced organizer of regional Bioblitzes (including the City Nature Challenge), and passionate advocate for school-based biodiversity clubs and student recognition networks.",
      link: "https://www.inaturalist.org/people/quovadis"
    },
    {
      name: "Karina M. Torres",
      username: "kmtorres",
      role: "Contributor",
      bio: "Researcher focused on the intersection of quantitative ecology, deep learning, citizen science, and conservation technology. Designing platforms to bridge the gap between academic research and community conservation efforts.",
      link: "https://www.inaturalist.org/people/kmtorres",
      website: "https://ktorres23.github.io",
      linkedin: "https://www.linkedin.com/in/karina-torres-828175299/"
    },
    {
      name: "Christine Gambino",
      role: "Contributor",
      bio: "Extension Associate in the Entomology Department at the LSU AgCenter. Focused on science communication, sustainable agriculture, and conservation. She leads community science initiatives, including firefly and bat conservation programs that restore native habitats and engage the public in field research.",
      website: "https://www.lsuagcenter.com/profiles/cgambino"
    }
  ],

  contact: {
    text: "If you are interested in being involved with the development of Biodiversity Halls of Fame, reach out and let's collaborate!",
    links: [
      { name: "Karina M. Torres (kmtorres)", url: "https://www.inaturalist.org/people/kmtorres" },
      { name: "George Gehrig (quovadis)", url: "https://www.inaturalist.org/people/quovadis" }
    ]
  },

  leaderboards: {
    individuals: [
      { rank: 1, name: "Student A", school: "University A", observations: 342, species: 154, level: "University", badge: "Gold Inductee" },
      { rank: 2, name: "Student B", school: "High School A", observations: 289, species: 112, level: "High School", badge: "Gold Inductee" },
      { rank: 3, name: "Student C", school: "University B", observations: 254, species: 98, level: "University", badge: "Silver Inductee" },
      { rank: 4, name: "Student D", school: "University A", observations: 210, species: 91, level: "University", badge: "Silver Inductee" },
      { rank: 5, name: "Student E", school: "High School B", observations: 198, species: 88, level: "High School", badge: "Bronze Inductee" },
      { rank: 6, name: "Student F", school: "High School A", observations: 176, species: 82, level: "High School", badge: "Bronze Inductee" },
      { rank: 7, name: "Student G", school: "University B", observations: 145, species: 76, level: "University", badge: "Active Observer" }
    ],
    schools: [
      { rank: 1, name: "University A", level: "University", observations: 1420, species: 412, activeStudents: 24 },
      { rank: 2, name: "High School A", level: "High School", observations: 980, species: 289, activeStudents: 18 },
      { rank: 3, name: "University B", level: "University", observations: 890, species: 310, activeStudents: 15 },
      { rank: 4, name: "High School B", level: "High School", observations: 560, species: 194, activeStudents: 9 }
    ]
  }
};
