export type Specialization = {
  id: string;
  name: string;
  description: string;
  iconName: string;
};

export type Doctor = {
  id: string;
  specializationId: string;
  name: string;
  experience: number;
  rating: number;
  image: string;
  bio: string;
  location: { x: number; y: number; name: string };
  availability: string[];
  reviews: { id: string; user: string; comment: string; rating: number }[];
};

export const SPECIALIZATIONS: Specialization[] = [
  { id: 'cardiology', name: 'Cardiology', description: 'Heart and vascular system health.', iconName: 'Heart' },
  { id: 'dermatology', name: 'Dermatology', description: 'Skin, hair, and nail conditions.', iconName: 'User' },
  { id: 'orthopedics', name: 'Orthopedics', description: 'Musculoskeletal system care.', iconName: 'Activity' },
  { id: 'pediatrics', name: 'Pediatrics', description: 'Medical care for infants and children.', iconName: 'Baby' },
  { id: 'neurology', name: 'Neurology', description: 'Brain and nervous system disorders.', iconName: 'Zap' },
  { id: 'ophthalmology', name: 'Ophthalmology', description: 'Eye and vision care specialists.', iconName: 'Eye' },
];

export const DOCTORS: Doctor[] = [
  // Cardiology
  {
    id: 'dr1',
    specializationId: 'cardiology',
    name: 'Dr. Sarah Mitchell',
    experience: 15,
    rating: 4.9,
    image: 'doc2',
    bio: 'Board-certified cardiologist with over 15 years of experience in managing complex heart conditions.',
    location: { x: 20, y: 30, name: 'Hamani Heart Center' },
    availability: ['Mon 9-5', 'Wed 10-4', 'Fri 9-1'],
    reviews: [{ id: 'r1', user: 'John D.', comment: 'Very professional and caring.', rating: 5 }],
  },
  {
    id: 'dr7',
    specializationId: 'cardiology',
    name: 'Dr. Anthony Hamani',
    experience: 22,
    rating: 5.0,
    image: 'doc1',
    bio: 'Lead cardiologist specializing in advanced surgical interventions and preventive care.',
    location: { x: 45, y: 55, name: 'Hamani Medical HQ' },
    availability: ['Tue 10-6', 'Thu 10-6'],
    reviews: [{ id: 'r10', user: 'Kevin L.', comment: 'The best in the city.', rating: 5 }],
  },
  {
    id: 'dr8',
    specializationId: 'cardiology',
    name: 'Dr. Elena Rossi',
    experience: 12,
    rating: 4.8,
    image: 'doc4',
    bio: 'Specialist in pediatric cardiology and congenital heart defects.',
    location: { x: 70, y: 25, name: 'Eastside Health' },
    availability: ['Mon-Fri 8-2'],
    reviews: [],
  },
  {
    id: 'dr2',
    specializationId: 'cardiology',
    name: 'Dr. James Wilson',
    experience: 10,
    rating: 4.8,
    image: 'doc1',
    bio: 'Specializing in interventional cardiology and cardiovascular research.',
    location: { x: 65, y: 45, name: 'Westside Cardiology' },
    availability: ['Tue 9-5', 'Thu 9-5'],
    reviews: [{ id: 'r3', user: 'Robert K.', comment: 'Great experience.', rating: 5 }],
  },

  // Dermatology
  {
    id: 'dr3',
    specializationId: 'dermatology',
    name: 'Dr. Emily Chen',
    experience: 8,
    rating: 4.7,
    image: 'doc4',
    bio: 'Dedicated dermatologist focusing on medical and cosmetic skin health.',
    location: { x: 40, y: 70, name: 'Crystal Skin Hamani' },
    availability: ['Mon-Fri 8-4'],
    reviews: [{ id: 'r4', user: 'Anna S.', comment: 'Highly recommend.', rating: 5 }],
  },
  {
    id: 'dr9',
    specializationId: 'dermatology',
    name: 'Dr. Marcus Thorne',
    experience: 14,
    rating: 4.6,
    image: 'doc3',
    bio: 'Expert in skin cancer screening and dermatopathology.',
    location: { x: 15, y: 60, name: 'North Hamani Skin Clinic' },
    availability: ['Wed 10-7', 'Sat 9-1'],
    reviews: [],
  },
  {
    id: 'dr10',
    specializationId: 'dermatology',
    name: 'Dr. Sofia Vergara',
    experience: 9,
    rating: 4.9,
    image: 'doc6',
    bio: 'Aesthetic dermatology specialist focusing on rejuvenation and laser treatments.',
    location: { x: 85, y: 80, name: 'Luxe Derm Hamani' },
    availability: ['Mon 12-8', 'Thu 12-8'],
    reviews: [],
  },

  // Pediatrics
  {
    id: 'dr4',
    specializationId: 'pediatrics',
    name: 'Dr. Michael Brown',
    experience: 12,
    rating: 4.9,
    image: 'doc5',
    bio: 'Compassionate pediatrician who loves working with children of all ages.',
    location: { x: 80, y: 20, name: 'Little Hamani Stars' },
    availability: ['Mon-Sat 9-12'],
    reviews: [{ id: 'r5', user: 'The Smiths', comment: 'Kids love him!', rating: 5 }],
  },
  {
    id: 'dr11',
    specializationId: 'pediatrics',
    name: 'Dr. Jessica Alba',
    experience: 6,
    rating: 4.8,
    image: 'doc2',
    bio: 'Pediatric specialist focusing on developmental milestones and nutrition.',
    location: { x: 30, y: 15, name: 'Happy Kids Hamani' },
    availability: ['Tue-Fri 9-5'],
    reviews: [],
  },
  {
    id: 'dr12',
    specializationId: 'pediatrics',
    name: 'Dr. David Tennant',
    experience: 18,
    rating: 4.7,
    image: 'doc3',
    bio: 'Senior pediatrician specializing in childhood immunology and vaccinations.',
    location: { x: 50, y: 35, name: 'Hamani Pediatric Hospital' },
    availability: ['Mon-Wed 8-6'],
    reviews: [],
  },

  // Orthopedics
  {
    id: 'dr5',
    specializationId: 'orthopedics',
    name: 'Dr. Alan Harper',
    experience: 20,
    rating: 4.6,
    image: 'doc3',
    bio: 'Expert in sports medicine and joint replacement surgery.',
    location: { x: 10, y: 85, name: 'Hamani Orthopedics' },
    availability: ['Tue-Thu 1-5'],
    reviews: [{ id: 'r6', user: 'Dave L.', comment: 'Back on my feet quickly.', rating: 4 }],
  },
  {
    id: 'dr13',
    specializationId: 'orthopedics',
    name: 'Dr. Chris Evans',
    experience: 11,
    rating: 4.9,
    image: 'doc1',
    bio: 'Specialist in spinal disorders and robotic-assisted joint surgery.',
    location: { x: 75, y: 90, name: 'Spine & Joint Center' },
    availability: ['Mon-Fri 9-5'],
    reviews: [],
  },
  {
    id: 'dr14',
    specializationId: 'orthopedics',
    name: 'Dr. Gal Gadot',
    experience: 15,
    rating: 4.8,
    image: 'doc6',
    bio: 'Orthopedic trauma specialist with a focus on emergency reconstruction.',
    location: { x: 40, y: 40, name: 'Hamani Emergency Care' },
    availability: ['Rotating Shifts'],
    reviews: [],
  },

  // Neurology
  {
    id: 'dr15',
    specializationId: 'neurology',
    name: 'Dr. Stephen Strange',
    experience: 19,
    rating: 5.0,
    image: 'doc3',
    bio: 'Master of neurosurgery and cognitive brain research.',
    location: { x: 25, y: 75, name: 'Hamani Neuro Institute' },
    availability: ['Mon 9-5', 'Wed 9-5'],
    reviews: [{ id: 'r15', user: 'Peter P.', comment: 'Truly exceptional care.', rating: 5 }],
  },
  {
    id: 'dr16',
    specializationId: 'neurology',
    name: 'Dr. Jean Grey',
    experience: 13,
    rating: 4.8,
    image: 'doc4',
    bio: 'Neurobiologist specializing in neural pathway disorders and migraines.',
    location: { x: 60, y: 65, name: 'Mind & Body Hamani' },
    availability: ['Tue 10-4', 'Fri 10-4'],
    reviews: [],
  },
  {
    id: 'dr17',
    specializationId: 'neurology',
    name: 'Dr. Charles Xavier',
    experience: 30,
    rating: 5.0,
    image: 'doc1',
    bio: 'Pioneer in non-invasive neuro-mapping and cognitive therapy.',
    location: { x: 90, y: 10, name: 'Xavier Health Hamani' },
    availability: ['By Appointment Only'],
    reviews: [],
  },

  // Ophthalmology
  {
    id: 'dr6',
    specializationId: 'ophthalmology',
    name: 'Dr. Linda Foster',
    experience: 11,
    rating: 4.8,
    image: 'doc6',
    bio: 'Specialist in refractive surgery and geriatric eye health.',
    location: { x: 55, y: 15, name: 'Hamani Vision Center' },
    availability: ['Mon 9-5', 'Fri 9-5'],
    reviews: [{ id: 'r7', user: 'George P.', comment: 'Vision is perfect.', rating: 5 }],
  },
  {
    id: 'dr18',
    specializationId: 'ophthalmology',
    name: 'Dr. Scott Summers',
    experience: 12,
    rating: 4.7,
    image: 'doc5',
    bio: 'Expert in laser eye surgery and retinal imaging.',
    location: { x: 35, y: 25, name: 'Hamani Optical' },
    availability: ['Mon-Thu 9-5'],
    reviews: [],
  },
  {
    id: 'dr19',
    specializationId: 'ophthalmology',
    name: 'Dr. Bruce Wayne',
    experience: 16,
    rating: 4.9,
    image: 'doc1',
    bio: 'Focused on low-light vision and ocular trauma recovery.',
    location: { x: 15, y: 15, name: 'Wayne Eye Institute' },
    availability: ['Fri-Sat 10-6'],
    reviews: [],
  },
];
