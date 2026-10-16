import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Trophy,
  Bus,
  BedDouble,
  HeartPulse,
  Library,
  Music,
  Palette,
  Globe,
  Calculator,
  type LucideIcon,
} from 'lucide-react';

export interface NavLink {
  label: string;
  path: string;
  children?: { label: string; path: string; description: string }[];
}

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    path: '/about',
    children: [
      { label: 'Our Story', path: '/about', description: 'History, mission and values' },
      { label: 'Leadership', path: '/leadership', description: 'Meet our leadership team' },
      { label: 'Teachers', path: '/teachers', description: 'Our dedicated teaching staff' },
    ],
  },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

export interface Facility {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

export const facilities: Facility[] = [
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    description: 'Fully equipped physics, chemistry, and biology labs that bring theory to life through hands-on experimentation.',
    image: 'https://images.pexels.com/photos/8471913/pexels-photo-8471913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Library,
    title: 'Library & Resource Centre',
    description: 'A sprawling library with over 15,000 books, digital resources, and quiet study spaces for every learner.',
    image: 'https://images.pexels.com/photos/9572664/pexels-photo-9572664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Trophy,
    title: 'Sports Complex',
    description: 'Athletics track, football pitch, basketball and tennis courts, and a modern indoor sports hall.',
    image: 'https://images.pexels.com/photos/19461117/pexels-photo-19461117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: BedDouble,
    title: 'Boarding Houses',
    description: 'Comfortable, secure dormitories with house parents, study rooms, and recreational areas for boarders.',
    image: 'https://images.pexels.com/photos/32170336/pexels-photo-32170336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Bus,
    title: 'Transport Fleet',
    description: 'A fleet of modern school buses covering all major routes with trained drivers and safety tracking.',
    image: 'https://images.pexels.com/photos/14909652/pexels-photo-14909652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: HeartPulse,
    title: 'Health Clinic',
    description: 'An on-site clinic staffed by a qualified nurse, with first-aid capacity and links to nearby hospitals.',
    image: 'https://images.pexels.com/photos/26855714/pexels-photo-26855714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export interface Subject {
  icon: LucideIcon;
  name: string;
  description: string;
}

export const primarySubjects: Subject[] = [
  { icon: BookOpen, name: 'English & Kiswahili', description: 'Building strong literacy and language foundations.' },
  { icon: Calculator, name: 'Mathematics', description: 'Developing numeracy and problem-solving skills.' },
  { icon: FlaskConical, name: 'Science', description: 'Exploring the natural world through inquiry.' },
  { icon: Globe, name: 'Social Studies', description: 'Understanding community, history, and geography.' },
  { icon: Palette, name: 'Creative Arts', description: 'Music, art, and drama for self-expression.' },
  { icon: HeartPulse, name: 'Physical Education', description: 'Health, fitness, and teamwork.' },
];

export const secondarySubjects: Subject[] = [
  { icon: BookOpen, name: 'Languages', description: 'English, Kiswahili, and French.' },
  { icon: Calculator, name: 'Mathematics', description: 'Core and applied mathematics tracks.' },
  { icon: FlaskConical, name: 'Sciences', description: 'Physics, Chemistry, and Biology.' },
  { icon: Globe, name: 'Humanities', description: 'History, Geography, and CRE.' },
  { icon: Music, name: 'Technical & Creative', description: 'Computer Studies, Music, and Art.' },
  { icon: GraduationCap, name: 'Career Guidance', description: 'University and career counselling.' },
];

export interface Leader {
  name: string;
  title: string;
  bio: string;
  image: string;
  qualifications: string;
}

export const leaders: Leader[] = [
  {
    name: 'Dr. Jonathan Mwangi',
    title: 'Director & Headteacher',
    bio: 'With over 25 years in education leadership, Dr. Mwangi has guided Riverside Academy to become one of Kenya\u2019s most respected schools, blending academic excellence with strong character formation.',
    image: 'https://images.pexels.com/photos/37898351/pexels-photo-37898351.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    qualifications: 'PhD in Educational Leadership, University of Nairobi',
  },
  {
    name: 'Mrs. Grace Wanjiru',
    title: 'Deputy Headteacher — Academics',
    bio: 'Mrs. Wanjiru oversees curriculum, examinations, and academic standards, ensuring every student receives a rigorous and enriching education aligned with the CBC and KCSE frameworks.',
    image: 'https://images.pexels.com/photos/28593051/pexels-photo-28593051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    qualifications: 'MEd Curriculum Studies, Kenyatta University',
  },
  {
    name: 'Mr. Peter Otieno',
    title: 'Director of Operations',
    bio: 'Mr. Otieno manages the school\u2019s operations, including boarding, transport, and facilities, ensuring a safe and well-resourced environment for all students.',
    image: 'https://images.pexels.com/photos/34162714/pexels-photo-34162714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    qualifications: 'MBA Operations Management, Strathmore University',
  },
  {
    name: 'Ms. Faith Achieng',
    title: 'Head of Student Welfare',
    bio: 'Ms. Achieng leads pastoral care, safeguarding, and counselling services, creating a nurturing environment where every child feels valued and supported.',
    image: 'https://images.pexels.com/photos/25457343/pexels-photo-25457343.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    qualifications: 'MA Counselling Psychology, Daystar University',
  },
];

export interface Teacher {
  name: string;
  subject: string;
  department: string;
  experience: string;
  image: string;
}

export const teachers: Teacher[] = [
  { name: 'Mr. Samuel Kamau', subject: 'Mathematics', department: 'STEM', experience: '15 years', image: 'https://images.pexels.com/photos/34162713/pexels-photo-34162713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Mrs. Mary Njoki', subject: 'English & Literature', department: 'Languages', experience: '12 years', image: 'https://images.pexels.com/photos/28593050/pexels-photo-28593050.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Mr. David Omondi', subject: 'Physics', department: 'STEM', experience: '10 years', image: 'https://images.pexels.com/photos/36467885/pexels-photo-36467885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Ms. Sarah Wambui', subject: 'Biology', department: 'STEM', experience: '8 years', image: 'https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Mr. James Miriti', subject: 'History & CRE', department: 'Humanities', experience: '18 years', image: 'https://images.pexels.com/photos/26855714/pexels-photo-26855714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Mrs. Rose Akinyi', subject: 'Chemistry', department: 'STEM', experience: '14 years', image: 'https://images.pexels.com/photos/34162719/pexels-photo-34162719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'kcse-2025-results',
    title: 'Riverside Academy Records Best KCSE Results in School History',
    excerpt: 'Our 2025 candidates achieved a remarkable 98.2% university qualification rate, with 12 students scoring straight A grades.',
    date: '2026-01-15',
    category: 'Achievements',
    image: 'https://images.pexels.com/photos/14909652/pexels-photo-14909652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    author: 'Communications Office',
  },
  {
    id: 'science-fair-2026',
    title: 'Students Win Top Awards at National Science and Engineering Fair',
    excerpt: 'Three Riverside projects placed in the top five at the national fair, including an innovative water purification system.',
    date: '2026-02-20',
    category: 'Academics',
    image: 'https://images.pexels.com/photos/8471913/pexels-photo-8471913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    author: 'Science Department',
  },
  {
    id: 'sports-day-2026',
    title: 'Annual Inter-House Sports Day Draws Record Participation',
    excerpt: 'Over 600 students competed in athletics, football, and volleyball, celebrating the spirit of healthy competition.',
    date: '2026-03-05',
    category: 'Events',
    image: 'https://images.pexels.com/photos/19461117/pexels-photo-19461117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    author: 'Sports Department',
  },
  {
    id: 'admissions-open-2026',
    title: 'Admissions Open for 2027 Academic Year',
    excerpt: 'Applications are now open for Grade 1, Form 1, and transfer students. Limited slots available across all year groups.',
    date: '2026-03-10',
    category: 'Admissions',
    image: 'https://images.pexels.com/photos/18449719/pexels-photo-18449719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    author: 'Admissions Office',
  },
  {
    id: 'library-expansion',
    title: 'Library Expansion Project Completed with New Digital Wing',
    excerpt: 'The newly expanded library now includes a digital resource centre with 30 computer terminals and e-book access.',
    date: '2026-03-18',
    category: 'Facilities',
    image: 'https://images.pexels.com/photos/9572664/pexels-photo-9572664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    author: 'Operations Office',
  },
  {
    id: 'music-concert',
    title: 'Annual Music Concert Showcases Student Talent',
    excerpt: 'From classical pieces to contemporary African rhythms, the concert highlighted the strength of our music programme.',
    date: '2026-04-02',
    category: 'Arts',
    image: 'https://images.pexels.com/photos/28593051/pexels-photo-28593051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    author: 'Music Department',
  },
];

export interface SchoolEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

export const schoolEvents: SchoolEvent[] = [
  { title: 'Open Day & Campus Tour', date: '2026-10-25', time: '9:00 AM', location: 'Main Campus', category: 'Admissions' },
  { title: 'Mid-Term Break', date: '2026-11-02', time: 'All day', location: 'School-wide', category: 'Calendar' },
  { title: 'Inter-House Debate Championship', date: '2026-11-08', time: '2:00 PM', location: 'Main Hall', category: 'Academics' },
  { title: 'Prize Giving Ceremony', date: '2026-11-15', time: '10:00 AM', location: 'Sports Ground', category: 'Events' },
  { title: 'End of Term 3 Examinations', date: '2026-11-20', time: '8:00 AM', location: 'Exam Halls', category: 'Examinations' },
  { title: 'Closing Day & Carol Service', date: '2026-12-05', time: '11:00 AM', location: 'Main Hall', category: 'Events' },
];

export interface CareerOpening {
  title: string;
  department: string;
  type: string;
  description: string;
  qualifications: string[];
}

export const careerOpenings: CareerOpening[] = [
  {
    title: 'Mathematics Teacher — Secondary',
    department: 'STEM',
    type: 'Full-time',
    description: 'We are seeking an experienced Mathematics teacher to join our secondary school department, teaching up to KCSE level.',
    qualifications: [
      'Bachelor of Education (Mathematics) or equivalent',
      'TSC registration',
      'Minimum 5 years teaching experience',
      'Strong KCSE track record',
    ],
  },
  {
    title: 'Boarding House Parent',
    department: 'Student Welfare',
    type: 'Full-time (Residential)',
    description: 'A compassionate and organized house parent to oversee the welfare, safety, and daily life of boarding students.',
    qualifications: [
      'Degree in Counselling, Education, or Social Work',
      'Experience working with children and adolescents',
      'First aid certification preferred',
      'Willingness to reside on campus',
    ],
  },
  {
    title: 'School Nurse',
    department: 'Health Services',
    type: 'Full-time',
    description: 'A qualified nurse to manage our on-site clinic, provide first aid, and coordinate student health care.',
    qualifications: [
      'Kenya Registered Nurse (KRN) certification',
      'Minimum 3 years clinical experience',
      'Paediatric or school nursing experience preferred',
      'Current nursing council registration',
    ],
  },
];

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const schoolValues: ValueItem[] = [
  {
    icon: GraduationCap,
    title: 'Academic Excellence',
    description: 'We pursue the highest standards of teaching and learning, challenging every student to reach their full potential.',
  },
  {
    icon: HeartPulse,
    title: 'Integrity & Character',
    description: 'We cultivate honesty, responsibility, and respect as the foundation of everything we do.',
  },
  {
    icon: Globe,
    title: 'Global Citizenship',
    description: 'We prepare students to be confident, compassionate leaders in their communities and the wider world.',
  },
  {
    icon: Trophy,
    title: 'Holistic Development',
    description: 'We nurture the whole child through academics, sports, arts, and spiritual growth.',
  },
];

export interface AdmissionStep {
  step: number;
  title: string;
  description: string;
}

export const admissionSteps: AdmissionStep[] = [
  { step: 1, title: 'Enquiry & Visit', description: 'Submit an enquiry form or attend one of our open days to tour the campus and meet staff.' },
  { step: 2, title: 'Application', description: 'Complete the application form and submit required documents including report cards and birth certificate.' },
  { step: 3, title: 'Assessment', description: 'Applicants sit an entrance assessment in core subjects. For younger learners, an informal observation is conducted.' },
  { step: 4, title: 'Interview', description: 'Shortlisted students and their parents meet with the headteacher or admissions panel.' },
  { step: 5, title: 'Offer', description: 'Successful applicants receive an admission offer letter with joining instructions and fee details.' },
  { step: 6, title: 'Enrollment', description: 'Accept the offer, pay the enrollment deposit, and complete registration to secure your child\u2019s place.' },
];
