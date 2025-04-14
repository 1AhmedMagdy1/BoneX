import React, { useEffect, useState } from 'react';
import DoctorCardv1 from './components/DoctorCardv1';
import ModalComponent from './components/ModalComponent';
function Doctorsv1() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetch('http://bonex.runasp.net/Doctor/doctors')
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const filteredDoctors = doctors.filter((doctor) => {
    const inCategory =
      activeCategory === 'All' ||
      doctor.speciality.toLowerCase() === activeCategory.toLowerCase();
    const inSearch =
      doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
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