export const email = 'ryantan.htn@gmail.com'
export const github = 'https://github.com/ryantanio'

export const experience = [
  {
    company: 'Masimo', role: 'Senior Full-Stack Engineer', type: 'Contract',
    date: 'Aug 2025 — Jun 2026', location: 'Irvine, CA / Remote', sector: 'Connected healthcare',
    summary: 'Web and cloud services for connected patient monitoring and remote healthcare.',
    contributions: ['Developed features across frontend, APIs, databases, and AWS infrastructure.', 'Handled testing, deployments, release support, and ongoing production fixes.'],
    details: [
      'I worked across the frontend, backend, APIs, databases, and AWS infrastructure, adding features and maintaining services already in production.',
      'The work covered testing, deployment, release support, and ongoing fixes for connected monitoring and remote patient workflows.',
    ],
    tags: ['Web applications', 'APIs & databases', 'AWS', 'Production support'],
  },
  {
    company: 'OriginallyUs', role: 'Software Engineer', type: '',
    date: 'Mar 2021 — Jun 2025', location: 'Singapore', sector: 'Finance · Government · Business',
    summary: 'Mobile, web, and backend products for financial institutions, government organisations, and businesses.',
    contributions: ['Worked with React Native, React, TypeScript, Node.js, Python, and AWS.', 'Contributed to Price Kaki after its nationwide launch, including community-contributed data and AI-assisted moderation.'],
    details: [
      'Over four years, I helped take products from early development through release and later improvements, with growing responsibility across backend, cloud, and delivery.',
      'I worked closely with product, design, QA, and stakeholders, using React Native, React, TypeScript, Node.js, Python, and AWS on long-running production systems.',
    ],
    tags: ['React Native', 'React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
  },
  {
    company: 'Vinova', role: 'Full-Stack Developer', type: '',
    date: 'Sep 2019 — Feb 2021', location: 'Singapore', sector: 'Web & mobile development',
    summary: 'Client applications across finance, insurance, government, healthcare, logistics, and consumer products.',
    contributions: ['Built frontend features, backend services, and API and database integrations.', 'Contributed to FWD Mobile and other financial and public-sector applications, supporting development through release.'],
    details: [
      'I built frontend features and backend services, connected APIs and databases, and helped with testing, deployment, and production fixes.',
      'Working on new products alongside established systems taught me how to deliver within an existing team and real business constraints.',
    ],
    tags: ['Web & mobile', 'Backend development', 'Cloud deployment'],
  },
  {
    company: 'Vinova', role: 'Software Engineering Intern', type: '',
    date: 'Summer 2018', location: 'Singapore', sector: 'Where it started',
    summary: 'My first experience of building software with a production engineering team.',
    contributions: ['Contributed to web and mobile development, testing, and debugging while studying at NUS.'],
    details: ['I helped with web and mobile development, testing, debugging, and day-to-day product work while studying computer science at NUS.'],
    tags: ['Development', 'Testing', 'Debugging'],
  },
]

export const stack = [
  { title: 'Frontend', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'React Native', 'Vue.js', 'Redux', 'Tailwind CSS'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Python', 'Django', 'GraphQL', 'REST APIs'] },
  { title: 'Cloud & infrastructure', items: ['AWS', 'EC2', 'Docker', 'Nginx', 'Linux', 'CI/CD', 'Cloud deployment'] },
  { title: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
]

// Personal involvement confirmed by Ryan. Public screenshots show product imagery,
// not necessarily the exact app version from his employment dates.
export const projects = [
  {
    title: 'SCO Digital Archives', company: 'Vinova', period: 'Role: Sep 2019 – Feb 2021',
    format: 'Web platform · Arts & culture',
    description: 'A digital home for the Singapore Chinese Orchestra’s history, with recordings, photographs, scores, and publications. The archive initiative began in 2019 and opened to the public in 2022, after my time at Vinova.',
    contributions: [
      'Contributed to the archive project during its earlier development at Vinova.',
      'Worked on web development and integration tasks within the project team, helping turn archive content into a browsable online resource.',
    ],
    technologies: ['Web development', 'Content integration', 'Testing'],
    images: ['/sco-web.png'], imageAlt: ['Current SCO Digital Archives website with archive categories and orchestra imagery'],
    imageCredit: 'Current public website · Singapore Chinese Orchestra',
    url: 'https://archives.sco.com.sg/', linkLabel: 'Explore the archives',
    source: 'https://sco.com.sg/media-releases/first-chinese-orchestral-digital-archives-launched-for-public-access/', sourceLabel: 'About the archive project',
    theme: 'web sco',
  },
  {
    title: 'Price Kaki', company: 'OriginallyUs', period: 'Role: Mar 2021 – Jun 2025',
    format: 'Post-launch development · Consumer technology',
    description: 'A public-facing app from the Consumers Association of Singapore for comparing groceries, everyday essentials, and hawker food prices. My work was on the established product after its nationwide launch.',
    contributions: [
      'Contributed to continued development and improvements while the app was already in public use.',
      'Worked on community-contributed data and AI-assisted moderation as part of those improvements.',
    ],
    technologies: ['Mobile development', 'Community data', 'AI-assisted moderation'],
    images: ['/price-kaki-1.webp', '/price-kaki-2.webp'],
    imageAlt: ['Price Kaki official home screen preview', 'Price Kaki rewards and community contribution preview'],
    imageCredit: 'Current App Store screenshots · CASE Singapore',
    url: 'https://apps.apple.com/sg/app/price-kaki/id1477815678', linkLabel: 'View Price Kaki',
    source: 'https://originallyus.sg/work/', sourceLabel: 'OriginallyUs project page',
    theme: 'price-kaki',
  },
  {
    title: 'SSDC', company: 'Vinova', period: 'Role: Sep 2019 – Feb 2021',
    format: 'Web portal · Booking & scheduling',
    description: 'An online platform for Singapore Safety Driving Centre. Students can find available classes, book lessons, and check their progress, while the centre manages schedules for students and instructors.',
    contributions: [
      'Contributed to the web platform as part of Vinova’s full-stack team.',
      'Worked across frontend and backend integration, testing, and fixes for the student-facing experience.',
    ],
    technologies: ['Web development', 'Backend integration', 'Testing & fixes'],
    images: ['/ssdc-web.png'], imageAlt: ['SSDC website showing enrolment and appointment services from Vinova’s case study'],
    imageCredit: 'Project screenshot · Vinova / SSDC',
    url: 'https://ssdcl.com.sg/', linkLabel: 'Visit SSDC',
    source: 'https://vinova.sg/portfolio/ssdc/', sourceLabel: 'SSDC case study',
    theme: 'web ssdc',
  },
  {
    title: 'ITEES', company: 'Vinova', period: 'Role: Sep 2019 – Feb 2021',
    format: 'Website & partner portal · Education',
    description: 'A public website and partner portal for ITE Education Services. Alongside its international training programmes, the platform brings together schedules, attendance, learning materials, and content administration.',
    contributions: [
      'Contributed to website and portal development within Vinova’s engineering team.',
      'Helped connect web interfaces with backend functionality and supported testing and fixes during delivery.',
    ],
    technologies: ['Web development', 'Backend integration', 'Content management'],
    images: ['/itees-web.png'], imageAlt: ['ITEES website project screenshot showing programme information and partner login'],
    imageCredit: 'Project screenshot · Vinova / ITEES',
    url: 'https://itees.com.sg/', linkLabel: 'Visit ITEES',
    source: 'https://vinova.sg/portfolio/itees/', sourceLabel: 'ITEES case study',
    theme: 'web itees',
  },
  {
    title: 'FWD Mobile', company: 'Vinova', period: 'Role: Sep 2019 – Feb 2021',
    format: 'Post-launch contribution · Insurance',
    description: 'FWD Tapp, listed as FWD Mobile in Vinova’s portfolio, lets policyholders access policy information, payments, investments, and claims. The app launched in 2018; my contribution came later, during my full-time role at Vinova.',
    contributions: [
      'Contributed to an existing insurance product as a full-stack developer within Vinova’s engineering team.',
      'Supported application development, API integration, testing, and fixes as part of ongoing product work.',
    ],
    technologies: ['Mobile development', 'Financial services', 'Team delivery'],
    images: ['/fwd-1.png', '/fwd-2.png'],
    imageAlt: ['FWD Tapp home and policy overview from Vinova’s case study', 'FWD Tapp investment details from Vinova’s case study'],
    imageCredit: 'Project screenshots · Vinova / FWD',
    url: 'https://www.fwd.com.ph/', linkLabel: 'Visit FWD',
    source: 'https://vinova.sg/portfolio/fwd-mobile/', sourceLabel: 'FWD Mobile case study',
    theme: 'fwd',
  },
]
