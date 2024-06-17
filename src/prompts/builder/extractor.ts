export const user_resume_extractor = `
This is my resume:
`;

const example_json = {
  name: 'Janhavi Patil',
  address: 'Chembur, Mumbai - 400088',
  summary: "I'm a full stack developer",
  contacts: [
    { type: 'phone', value: '8976564333' },
    { type: 'email', value: 'patil.janhavi1207@gmail.com' },
    { type: 'github', value: 'www.janhavi.com' },
    { type: 'linkedin', value: 'www.linkedin.com/in/janhavi' },
  ],
  education: [
    {
      name: 'VESIT',
      course: 'BE Information technology',
      start: 'Aug 2020',
      end: 'May 2024',
      address: 'Chembur, Mumbai',
      cgpa: 9.5,
    },
    {
      name: 'Loreto Convent School',
      course: 'SSC',
      start: 'May 2006',
      end: 'May 2018',
      address: 'Chembur, Mumbai',
      percentage: 95.99,
    },
  ],
  technicalSkills: [
    {
      category: 'Frontend',
      skills: ['React', 'Nextjs', 'Typescript'],
    },
    {
      category: 'Database',
      skills: ['MongoDB', 'Postgres', 'MySQL'],
    },
    {
      category: 'Backend',
      skills: ['Nodejs', 'Expressjs'],
    },
  ],
  experience: [
    {
      company: 'Webskyne',
      role: 'Frontend Developer',
      address: 'Remote',
      start: 'Nov 2022',
      end: 'Feb 2023',
      description: [
        'Worked for various client-side projects and developed responsive and user-friendly web applications using Next.js and Nest.js and collaborated with project managers to ensure timely completion of projects.',
        'Contributed to various CRM projects and participated in daily scrum meetings to discuss progress, blockers, and next steps.',
      ],
    },

    {
      company: 'Cosedge',
      role: 'Full Stack Developer',
      address: 'Remote',
      start: 'Aug 2024',
      end: 'Present',
      description: [
        'Enhancing company’s CMS with Next.js, implementing server-side rendering (SSR) for improved SEO performance.',
        'Collaborated with the development team to implement new features and improve the user experience of the CMS.',
      ],
    },
  ],

  projects: [
    {
      name: 'MegaMart',
      technologies: ['MySQL', 'React', 'TailwindCSS', 'Nextjs', 'React Query'],
      link: 'https://github.com/ijanhv/megamart',
      description: [
        'Developed an ecommerce platform with features like authentication (Next-Auth), filtering, wishlist, and cart functionality.',
        'Utilized React Tanstack Query to fetch data from MySQL and created APIs for seamless integration.',
      ],
      start: 'Jan 2024',
      end: 'May 2024',
    },
    {
      name: 'SkillBrisk - A Freelancing Platform',
      technologies: ['React', 'Nodejs', 'Express'],
      link: 'https://github.com/ijanhv/skillbrisk',
      description: [
        'Built a platform for freelancers and clients to connect with each other, allowing sellers to post their gigs.',
        'Implemented features that make it easy for freelancers to create a profile, showcase their skills and experience.',
      ],
      start: 'Jan 2024',
      end: 'April 2024',
    },
  ],
  certifications: [
    {
      name: 'Full Stack Development by Colt Steele',
      link: 'https://udemy.com/coltsteele',
      description:
        'Learned full stack development with Nodejs, Express, MongoDB, and React. Built various projects to enhance my skills.',
      date: 'Aug 2023',
    },
  ],
  leadershipExperience: [
    {
      company: 'VESITConnect',
      position: 'Student Design Head',
      address: 'VESIT, Chembur, Mumbai',
      start: 'Aug 2023',
      end: 'May 2024',
      description: [
        'Covered and wrote over 10 articles about various workshops and events for the college newsletter.',
        'Collaborated with other team members to curate engaging content and lead the design team to ensure visually appealing and professional publications.',
      ],
    },
  ],
};

export const system_resume_extractor = `
As a resume-building assistant, your task is to extract details  into a JSON structure suitable for a resume. Here's what you need to do:

1. If there is no info for that field provide empty string
2. If there is no value for array than provide empty array

If the user's message does not contain valid resume, respond with the following JSON message: 
\`{"message":"Invalid format","error":"Explanation of the error"}\`

The data schema for the response should follow this format:  
${JSON.stringify(example_json)}`;
