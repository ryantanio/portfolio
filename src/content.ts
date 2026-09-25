export const email = 'ryantan.htn@gmail.com'
export const github = 'https://github.com/ryantanio'

export const experience = [
  {
    company: 'Masimo', role: 'Senior Full-Stack Engineer', type: 'Contract',
    date: 'Aug 2025 - Jun 2026', location: 'Irvine, CA / Remote',
    summary: 'A contract focused on the software behind connected patient monitoring, with responsibility for both development and production support.',
    contributions: [
      'Took changes through the web application, backend APIs, and databases, then into testing and deployment.',
      'Maintained services on AWS and handled issues during releases and after they reached production.',
    ],
  },
  {
    company: 'OriginallyUs', role: 'Software Engineer', type: '',
    date: 'Mar 2021 - Jun 2025', location: 'Singapore',
    summary: 'Over four years, I moved from application features into more backend, cloud, and release work. Many of the products stayed with the team long after launch.',
    contributions: [
      'Used React, React Native, and TypeScript for web and mobile applications, with Node.js and Python on the backend.',
      'Worked closely with product, design, and QA to turn requirements into releases and plan the next round of improvements.',
      'Took on more of the database and AWS infrastructure work as my responsibilities grew.',
    ],
  },
  {
    company: 'Vinova', role: 'Full-Stack Developer', type: '',
    date: 'Sep 2019 - Feb 2021', location: 'Singapore',
    summary: 'My first full-time engineering role after NUS. Client projects gave me hands-on experience with web portals and mobile apps, often within systems that were already in use.',
    contributions: [
      'Built application screens, connected APIs, and made backend and database changes with the engineering team.',
      'Tested features and resolved bugs through delivery, including updates to existing insurance and public-sector applications.',
    ],
  },
  {
    company: 'Vinova', role: 'Software Engineering Intern', type: '',
    date: 'Summer 2018', location: 'Singapore',
    summary: 'A summer internship while I was studying computer science. It was my first experience shipping software with an engineering team.',
    contributions: ['Wrote and debugged web and mobile code, tested changes, and learned how the team prepared software for release.'],
  },
]

export const stack = [
  { title: 'Frontend & mobile', description: 'Web interfaces and mobile applications.', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'React Native', 'Vue.js', 'Redux', 'Tailwind CSS'] },
  { title: 'Backend & APIs', description: 'Application logic, services, and APIs.', items: ['Node.js', 'Express', 'NestJS', 'Python', 'Django', 'GraphQL', 'REST APIs'] },
  { title: 'Cloud & delivery', description: 'Deployments and the infrastructure around them.', items: ['AWS', 'EC2', 'Docker', 'Nginx', 'Linux', 'CI/CD'] },
  { title: 'Databases', description: 'The data those applications depend on.', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
]

export type Project = {
  id: string; title: string; company: string; period: string;
  kind: 'Web' | 'Mobile' | 'Services'; format: string; focus: string;
  description: string; workHeading: string; work: string[]; technologies: string[];
  productDetail?: { heading: string; body: string };
  images: string[]; imageAlt: string[]; imageCredit: string;
  url: string; linkLabel: string; source: string; sourceLabel: string;
  theme: string; chronology?: string; contextNote?: string;
}

// Ryan confirmed participation. Sources establish product scope, not individual
// tasks. Work paragraphs stay within the supplied experience; productDetail
// explains the public product, not ownership of a particular feature.
// Periods are employment dates. Public images may postdate his involvement.
export const projects: Project[] = [
  {
    id: 'masimo', title: 'Connected monitoring', company: 'Masimo', period: '2025 - 2026',
    kind: 'Web', format: 'Healthcare / Web & cloud', focus: "Web applications and AWS services for remote patient care",
    description: "Connected patient monitoring depends on software that runs beyond the bedside device. At Masimo, my contract covered the web and cloud services used in those remote healthcare workflows.",
    workHeading: "Application changes through production",
    work: [
      "I handled changes to web interfaces, backend logic, APIs, and the databases behind them. Some were new features; others were fixes to services already in use.",
      "Deployment was part of the job, too. I tested changes, deployed services on AWS, and handled release issues and production fixes.",
    ],
    technologies: ["Web interfaces","Backend APIs","Databases","AWS deployments"],
    images: ['/masimo-context.jpg'], imageAlt: ['Public Masimo SafetyNet clinician portal preview, shown as product context rather than a screenshot of Ryan’s individual work'],
    imageCredit: 'Public product reference: Masimo SafetyNet / Masimo',
    url: 'https://www.masimo.com/products/telehealth/masimo-safetynet/', linkLabel: 'Explore Masimo SafetyNet',
    source: 'https://play.google.com/store/apps/details?id=com.masimo.masimosafetynet', sourceLabel: 'Public product listing',
    chronology: "August 2025–June 2026. Development and maintenance of existing connected-monitoring services.",
    contextNote: "Shown: Masimo’s public SafetyNet clinician portal. The work described here covers connected-monitoring services broadly; the image isn’t a record of a specific SafetyNet assignment.",
    theme: 'web masimo',
  },
  {
    id: 'cpfv', title: 'CPFV 2.0', company: 'OriginallyUs', period: '2021 - 2025',
    kind: 'Mobile', format: 'Public sector / Volunteer platform', focus: "Learning and volunteering in one mobile app",
    description: "CPFV 2.0 is the CPF Board’s volunteer app. Members use it to find learning resources and volunteering opportunities, with missions and progress tracking built around their participation.",
    workHeading: "The CPFV rebuild",
    work: [
      "CPFV was one of the public-sector projects I worked on at OriginallyUs, during the team’s rebuild of the volunteer app.",
    ],
    productDetail: {"heading":"How the product fits together","body":"The app combines a personalized volunteer profile with learning content and event updates. Missions, avatars, and leaderboards give members a way to follow their progress. OriginallyUs designed and developed the rebuilt application."},
    technologies: ["Mobile application","Volunteer profiles","Learning & events"],
    images: ['/cpfv-1.png', '/cpfv-2.png'], imageAlt: ['CPFV 2.0 home screen from the OriginallyUs case study', 'CPFV 2.0 volunteer missions from the OriginallyUs case study'],
    imageCredit: 'Public product previews / OriginallyUs & CPF Board',
    url: 'https://www.cpf.gov.sg/member/infohub/cpf-volunteering', linkLabel: 'Explore CPF volunteering',
    source: 'https://originallyus.sg/winning-with-our-client-cpfb-mobex-2024/', sourceLabel: '2024 project announcement',
    chronology: "The rebuilt app was in use by April 2024. OriginallyUs published its project announcement that July, within my March 2021–June 2025 employment.",
    theme: 'cpfv',
  },
  {
    id: 'sco', title: 'SCO Digital Archives', company: 'Vinova', period: '2019 - 2021',
    kind: 'Web', format: 'Arts & culture', focus: "Making an orchestra’s collection accessible on the web",
    description: "The Singapore Chinese Orchestra’s archive gives the public access to recordings, scores, photographs, and publications. The collection brings several types of historical material into a searchable website.",
    workHeading: "Web pages and archive content",
    work: [
      "Before the archive opened to the public, I developed web pages and integrated content at Vinova. My involvement was in the earlier build, as the site and its collection were taking shape.",
    ],
    technologies: ["Archive web pages","Content integration"],
    images: ['/sco-web.png'], imageAlt: ['Current SCO Digital Archives website with archive categories and orchestra imagery'],
    imageCredit: 'Current public website / Singapore Chinese Orchestra',
    url: 'https://archives.sco.com.sg/', linkLabel: 'Explore the archives',
    source: 'https://sco.com.sg/media-releases/first-chinese-orchestral-digital-archives-launched-for-public-access/', sourceLabel: 'About the archive project',
    chronology: "The initiative began in 2019. The public archive launched in June 2022, after I left Vinova in February 2021.",
    theme: 'web sco',
  },
  {
    id: 'price-kaki', title: 'Price Kaki', company: 'OriginallyUs', period: '2021 - 2025',
    kind: 'Mobile', format: 'Consumer technology', focus: "User submissions and AI-assisted moderation",
    description: "Price Kaki is a price-comparison app from the Consumers Association of Singapore. Users submit updates, making the handling of community data an ongoing part of the product.",
    workHeading: "Keeping community data useful",
    work: [
      "My focus was the data people submitted and the moderation around it. I made improvements to the existing product, including work on AI-assisted moderation.",
      "I joined after the nationwide launch. This was ongoing development on a live app, with an established user base and a continuing flow of submissions.",
    ],
    technologies: ["Community submissions","AI-assisted moderation","App improvements"],
    images: ['/price-kaki-1.webp', '/price-kaki-2.webp'],
    imageAlt: ['Price Kaki official home screen preview', 'Price Kaki rewards and community submissions preview'],
    imageCredit: 'App Store imagery / CASE Singapore',
    url: 'https://apps.apple.com/sg/app/price-kaki/id1477815678', linkLabel: 'View Price Kaki',
    source: 'https://originallyus.sg/work/', sourceLabel: 'OriginallyUs project page',
    chronology: "Post-launch development during my March 2021–June 2025 role at OriginallyUs.",
    theme: 'price-kaki',
  },
  {
    id: 'ssdc', title: 'SSDC', company: 'Vinova', period: '2019 - 2021',
    kind: 'Web', format: 'Booking & scheduling', focus: "A web portal for lesson availability and bookings",
    description: "Students use the Singapore Safety Driving Centre portal to find classes, book lessons, and check their progress. The same platform helps the center manage schedules for students and instructors.",
    workHeading: "The student-facing web application",
    work: [
      "I built web screens and connected them to the portal’s backend functionality. The application needed to make the center’s booking and scheduling services usable from a browser.",
      "I also tested the student-facing experience and fixed interface issues during development.",
    ],
    technologies: ["Student web interface","Backend integration","Interface testing"],
    images: ['/ssdc-web.png'], imageAlt: ['SSDC enrollment and appointment services, from the Vinova case study'],
    imageCredit: 'Project imagery / Vinova & SSDC',
    url: 'https://ssdcl.com.sg/', linkLabel: 'Visit SSDC',
    source: 'https://vinova.sg/portfolio/ssdc/', sourceLabel: 'SSDC case study',
    chronology: "My Vinova employment ran from September 2019 to February 2021. The case study doesn’t give a delivery date for this version.",
    theme: 'web ssdc',
  },
  {
    id: 'itees', title: 'ITEES', company: 'Vinova', period: '2019 - 2021',
    kind: 'Web', format: 'Education & training', focus: "Public training information and a portal for partners",
    description: "ITE Education Services uses its website to present international training programs. Registered partners have a separate set of services for schedules, attendance, and learning materials.",
    workHeading: "Website and portal development",
    work: [
      "I developed web interfaces for the site and partner portal, connected them to backend services, and handled testing and fixes during delivery.",
    ],
    productDetail: {"heading":"Publishing and partner access","body":"Partners can sign in to check schedules, record attendance, and access workshop material. Administrators manage the training content through a CMS. The platform serves both the people publishing that material and the partners using it."},
    technologies: ["Website & partner portal","Backend connections","Content management"],
    images: ['/itees-web.png'], imageAlt: ['ITEES program information and partner login, from the Vinova case study'],
    imageCredit: 'Project imagery / Vinova & ITEES',
    url: 'https://itees.com.sg/', linkLabel: 'Visit ITEES',
    source: 'https://vinova.sg/portfolio/itees/', sourceLabel: 'ITEES case study',
    chronology: "Part of my September 2019–February 2021 work at Vinova. A public release date isn’t listed in the case study.",
    theme: 'web itees',
  },
  {
    id: 'fwd', title: 'FWD Mobile', company: 'Vinova', period: '2019 - 2021',
    kind: 'Mobile', format: 'Insurance', focus: "Updates to an established insurance app",
    description: "FWD Tapp lets policyholders in the Philippines review coverage, track investments, pay premiums, and file claims. Vinova lists the product as FWD Mobile.",
    workHeading: "Mobile changes and API integration",
    work: [
      "The app was already live when I joined Vinova. I made application changes and connected the mobile interface to APIs within the existing product.",
      "For subsequent updates, I tested the app and resolved defects with the team.",
    ],
    technologies: ["Mobile application changes","API integration","Defect fixes"],
    images: ['/fwd-1.png', '/fwd-2.png'],
    imageAlt: ['FWD Tapp home and policy overview from the Vinova case study', 'FWD Tapp investment details from the Vinova case study'],
    imageCredit: 'Project imagery / Vinova & FWD',
    url: 'https://www.fwd.com.ph/', linkLabel: 'Visit FWD',
    source: 'https://vinova.sg/portfolio/fwd-mobile/', sourceLabel: 'FWD Mobile case study',
    chronology: "FWD Tapp launched in October 2018. My work came later, during my September 2019–February 2021 role at Vinova.",
    theme: 'fwd',
  },
]
const singa: Project = {
  id: 'singa', title: 'Singa', company: 'OriginallyUs', period: '2021 - 2025',
  kind: 'Services', format: 'Conversational service / Public sector', focus: "A WhatsApp service built on OriginallyUs’s Origin.AI",
  description: "Singa answers questions for the Singapore Kindness Movement through WhatsApp. It was introduced to visitors at the 2025 Kindness Day exhibition at Changi Airport.",
  workHeading: "Singa at OriginallyUs",
    work: [
      "I was on the engineering team for the Singa project. The service reached the public in May 2025, shortly before my time at OriginallyUs ended.",
    ],
    productDetail: {"heading":"Behind the conversation","body":"OriginallyUs built the service on Origin.AI using large language models and retrieval-augmented generation. The bot shares exhibition information, answers questions about the Singapore Kindness Movement, and collects visitor feedback. The company’s AI team developed the underlying platform."},
  technologies: ["WhatsApp service","Conversational application","Origin.AI platform"],
  images: ['/singa-1.png', '/singa-2.png'], imageAlt: ['Singa WhatsApp introduction from the OriginallyUs case study', 'Singa conversation preview from the OriginallyUs case study'],
  imageCredit: 'Public product previews / OriginallyUs & Singapore Kindness Movement',
  url: 'https://originallyus.sg/work/', linkLabel: 'View the Singa project',
  source: 'https://engage.smu.edu.sg/article/how-frugal-upbringing-became-business-asset', sourceLabel: 'May 2025 launch context',
  chronology: "Publicly launched in May 2025. Development began in 2023; my OriginallyUs role ended in June 2025.",
  theme: 'singa',
}
projects.push(singa)

export const selectedProjectIds = ['masimo', 'cpfv', 'sco', 'price-kaki', 'ssdc']
