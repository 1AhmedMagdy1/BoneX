import {React,useEffect,useState} from 'react';
import Slider from 'react-slick';
import DoctorCardv1 from './components/DoctorCardv1';
import TheImage from './images/avatar-male.jpg'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import './doctorhomev1.css'
export default function Doctors() {
  const [doctors, setdoctors] = useState([]);
  const navigate = useNavigate();
  const showAllClick = () => navigate('/doctorsv1');


  useEffect(() => {
    fetch('http://bonex.runasp.net/Doctor/doctors').then((res)=>res.json()).then((data)=>setdoctors(data))

  }, []);
  const docstors = [
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
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600,  settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div style={{ width: '90%', maxWidth: 1200, margin: '2rem auto' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
      Doctors Are Ready to Help You
    </h1>

    <Slider {...settings} style={{ padding: '0 1rem' }}>
      
      {doctors.map((doc, idx) => (
        <div key={idx} style={{ padding: '0 20px' }}>
          <DoctorCardv1 doctor={doc} />
        </div>
      ))}
    </Slider>

    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
    <button
  
  className="bg-[#287DA5] text-white border-none px-6 py-3 rounded hover:bg-[#071952] cursor-pointer transition duration-300"
  onClick={showAllClick}
>
  
  Show All Doctors
  
</button>

    </div>
  </div>
  );
}
