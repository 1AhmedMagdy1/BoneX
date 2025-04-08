import React, { useState } from 'react';
import DoctorCardv1 from './components/DoctorCardv1';

function Doctorsv1() {
  const doctorsData = [
    {
      id: '1',
      name: 'Dr. Ahmed Imam',
      specialization: 'Cardiology',
      rating: 4.5,
      description:
        'Dr. Ahmed Imam is a renowned cardiologist with over 20 years of experience in treating heart diseases.',
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
      id: '2',
      name: 'Dr. Mohamed Esmaeal',
      specialization: 'Dermatology',
      rating: 4.0,
      description:
        'Dr. Mohamed Esmaeal specializes in skin care and cosmetic treatments.',
      image: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
    {
      id: '3',
      name: 'Dr. Khaled Tawfic',
      specialization: 'Pediatrics',
      rating: 4.2,
      description:
        'Dr. Khaled Tawfic is dedicated to children’s health and wellness.',
      image: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    {
      id: '4',
      name: 'Dr. Ibraheem Mohamed',
      specialization: 'Orthopedics',
      rating: 3.8,
      description:
        'Dr. Ibraheem Mohamed focuses on musculoskeletal disorders and injuries.',
      image: 'https://randomuser.me/api/portraits/men/40.jpg',
    },
    // Row 2
    {
      id: '5',
      name: 'Dr. Sarah Johnson',
      specialization: 'Neurology',
      rating: 4.3,
      description:
        'Dr. Sarah Johnson is an experienced neurologist focusing on brain disorders.',
      image: 'https://randomuser.me/api/portraits/women/10.jpg',
    },
    {
      id: '6',
      name: 'Dr. David Smith',
      specialization: 'Urology',
      rating: 4.1,
      description:
        'Dr. David Smith provides specialized care for urological conditions.',
      image: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
    {
      id: '7',
      name: 'Dr. Emily Davis',
      specialization: 'Dentistry',
      rating: 4.7,
      description:
        'Dr. Emily Davis offers excellent dental care and cosmetic dentistry.',
      image: 'https://randomuser.me/api/portraits/women/20.jpg',
    },
    {
      id: '8',
      name: 'Dr. Michael Brown',
      specialization: 'General Surgery',
      rating: 4.0,
      description:
        'Dr. Michael Brown is a general surgeon with extensive experience in various surgeries.',
      image: 'https://randomuser.me/api/portraits/men/60.jpg',
    },
    // Row 3
    {
      id: '9',
      name: 'Dr. Linda Wilson',
      specialization: 'Ophthalmology',
      rating: 4.4,
      description:
        'Dr. Linda Wilson specializes in eye care and vision correction procedures.',
      image: 'https://randomuser.me/api/portraits/women/30.jpg',
    },
    {
      id: '10',
      name: 'Dr. Robert Taylor',
      specialization: 'Psychiatry',
      rating: 3.9,
      description:
        'Dr. Robert Taylor is a compassionate psychiatrist dedicated to mental health.',
      image: 'https://randomuser.me/api/portraits/men/70.jpg',
    },
    {
      id: '11',
      name: 'Dr. Karen Martinez',
      specialization: 'Endocrinology',
      rating: 4.2,
      description:
        'Dr. Karen Martinez is an expert in hormonal and metabolic disorders.',
      image: 'https://randomuser.me/api/portraits/women/40.jpg',
    },
    {
      id: '12',
      name: 'Dr. James Anderson',
      specialization: 'Gastroenterology',
      rating: 4.0,
      description:
        'Dr. James Anderson is a specialist in digestive system disorders.',
      image: 'https://randomuser.me/api/portraits/men/80.jpg',
    },
    // Row 4
    {
      id: '13',
      name: 'Dr. Susan Clark',
      specialization: 'Pulmonology',
      rating: 4.5,
      description:
        'Dr. Susan Clark is dedicated to treating respiratory conditions.',
      image: 'https://randomuser.me/api/portraits/women/50.jpg',
    },
    {
      id: '14',
      name: 'Dr. William Rodriguez',
      specialization: 'Nephrology',
      rating: 4.1,
      description:
        'Dr. William Rodriguez specializes in kidney-related diseases and disorders.',
      image: 'https://randomuser.me/api/portraits/men/90.jpg',
    },
    {
      id: '15',
      name: 'Dr. Patricia Lewis',
      specialization: 'Rheumatology',
      rating: 4.3,
      description:
        'Dr. Patricia Lewis provides expert care in rheumatic and autoimmune conditions.',
      image: 'https://randomuser.me/api/portraits/women/60.jpg',
    },
    {
      id: '16',
      name: 'Dr. Charles Walker',
      specialization: 'Oncology',
      rating: 4.6,
      description:
        'Dr. Charles Walker is renowned for his work in cancer treatment and research.',
      image: 'https://randomuser.me/api/portraits/men/100.jpg',
    },
  ];

  const categories = [
    'All',
    'Orthopedics',
    'Radiology',
    'Physical Therapy',
    'Sports Medicine',
   
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredDoctors = doctorsData.filter((doctor) => {
    const inCategory =
      activeCategory === 'All' ||
      doctor.specialization.toLowerCase() === activeCategory.toLowerCase();
    const inSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return inCategory && inSearch;
  });

  const totalPages = Math.ceil(filteredDoctors.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentDoctors = filteredDoctors.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-blue-700 font-sans">Doctors List</h1>
            <p className="text-md text-gray-600">Book your appointment now!</p>
          </div>
          {/* Search Bar */}
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search Doctor"
              className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500 shadow-md"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-2.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.386 4.385a1 1 0 01-1.414 1.415l-4.386-4.386zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-nowrap space-x-3 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-2 rounded-full border ${
                activeCategory === cat
                  ? 'bg-[#071952] text-white border-[#333]'
                  : 'bg-white text-black border-gray-300'
              } hover:bg-[#287DA5] hover:text-white transition`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentDoctors.map((doctor) => (
            <DoctorCardv1 key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center"
          >
            <span className="mr-2">←</span> Previous
          </button>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center"
          >
            Next <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Doctorsv1;