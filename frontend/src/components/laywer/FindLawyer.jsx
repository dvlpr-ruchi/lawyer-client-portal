import React, { useState } from 'react';
import { Search, MapPin, Languages, Briefcase, Scale, Star, ChevronDown, Filter, X, Phone, Video, MessageSquare, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FindLawyer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const practiceAreas = [
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Civil Law',
    'Property Law',
    'Tax Law',
    'Labour Law',
    'Consumer Law',
    'Constitutional Law',
    'Cyber Law'
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const languages = [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Marathi',
    'Bengali', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  const experienceLevels = [
    { value: '0', label: 'All Experience' },
    { value: '3', label: '3+ Years' },
    { value: '5', label: '5+ Years' },
    { value: '10', label: '10+ Years' },
    { value: '15', label: '15+ Years' }
  ];

  // Sample lawyer data
  const lawyers = [
    {
      id: 1,
      name: 'Adv. Rajesh Kumar',
      photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400',
      practiceArea: 'Criminal Law',
      city: 'Delhi',
      languages: ['English', 'Hindi'],
      experience: 12,
      barCouncil: 'D/1234/2010',
      consultationFee: 2000,
      rating: 4.8,
      totalReviews: 124,
      verified: true,
      bio: 'Specialized in criminal defense with extensive courtroom experience. Successfully handled 200+ cases.'
    },
    {
      id: 2,
      name: 'Adv. Priya Sharma',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      practiceArea: 'Family Law',
      city: 'Mumbai',
      languages: ['English', 'Hindi', 'Marathi'],
      experience: 8,
      barCouncil: 'M/5678/2015',
      consultationFee: 1500,
      rating: 4.9,
      totalReviews: 89,
      verified: true,
      bio: 'Expert in divorce, custody battles, and family disputes. Compassionate approach with strong legal acumen.'
    },
    {
      id: 3,
      name: 'Adv. Vikram Reddy',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      practiceArea: 'Corporate Law',
      city: 'Bangalore',
      languages: ['English', 'Telugu', 'Kannada'],
      experience: 15,
      barCouncil: 'K/9012/2008',
      consultationFee: 3500,
      rating: 4.7,
      totalReviews: 156,
      verified: true,
      bio: 'Corporate counsel for startups and SMEs. Expertise in contracts, compliance, and M&A transactions.'
    },
    {
      id: 4,
      name: 'Adv. Meera Patel',
      photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400',
      practiceArea: 'Civil Law',
      city: 'Ahmedabad',
      languages: ['English', 'Hindi', 'Gujarati'],
      experience: 10,
      barCouncil: 'G/3456/2013',
      consultationFee: 1800,
      rating: 4.6,
      totalReviews: 98,
      verified: true,
      bio: 'Focused on civil litigation, property disputes, and consumer rights. Strong track record in dispute resolution.'
    },
    {
      id: 5,
      name: 'Adv. Arjun Singh',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      practiceArea: 'Property Law',
      city: 'Pune',
      languages: ['English', 'Hindi', 'Marathi'],
      experience: 7,
      barCouncil: 'M/7890/2016',
      consultationFee: 1600,
      rating: 4.5,
      totalReviews: 72,
      verified: true,
      bio: 'Specializing in real estate transactions, title disputes, and property documentation.'
    },
    {
      id: 6,
      name: 'Adv. Kavita Nair',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
      practiceArea: 'Tax Law',
      city: 'Chennai',
      languages: ['English', 'Tamil', 'Malayalam'],
      experience: 13,
      barCouncil: 'T/2345/2010',
      consultationFee: 2500,
      rating: 4.9,
      totalReviews: 134,
      verified: true,
      bio: 'Tax consultant and litigator with expertise in GST, income tax, and international taxation.'
    }
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.practiceArea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPracticeArea = !selectedPracticeArea || lawyer.practiceArea === selectedPracticeArea;
    const matchesCity = !selectedCity || lawyer.city === selectedCity;
    const matchesLanguage = !selectedLanguage || lawyer.languages.includes(selectedLanguage);
    const matchesExperience = !minExperience || lawyer.experience >= parseInt(minExperience);
    
    return matchesSearch && matchesPracticeArea && matchesCity && matchesLanguage && matchesExperience;
  });

  const clearFilters = () => {
    setSelectedPracticeArea('');
    setSelectedCity('');
    setSelectedLanguage('');
    setMinExperience('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Scale className="text-yellow-600 w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif">
                Legal<span className="text-yellow-600">Ease</span>
              </span>
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-black">
              Dashboard
            </Link>
          </div>

          <h1 className="text-3xl font-bold font-serif text-gray-800 mb-2">Find & Hire a Lawyer</h1>
          <p className="text-gray-600 mb-6">Connect with verified legal professionals across India</p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or practice area..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full mt-4 flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedPracticeArea || selectedCity || selectedLanguage || minExperience) && (
              <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">Active</span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block fixed lg:static inset-0 z-40 lg:z-0 bg-black/50 lg:bg-transparent`}>
            <div className="lg:w-80 bg-white h-full lg:h-auto p-6 overflow-y-auto lg:sticky lg:top-24 lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-serif">Filters</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Practice Area */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Briefcase className="w-4 h-4 text-yellow-600" />
                  Practice Area
                </label>
                <select
                  value={selectedPracticeArea}
                  onChange={(e) => setSelectedPracticeArea(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="">All Practice Areas</option>
                  {practiceAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  City / Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Languages className="w-4 h-4 text-yellow-600" />
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="">All Languages</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Award className="w-4 h-4 text-yellow-600" />
                  Experience
                </label>
                <select
                  value={minExperience}
                  onChange={(e) => setMinExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden w-full py-3 bg-black text-white rounded-xl font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Lawyer Cards */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">{filteredLawyers.length}</span> lawyers found
              </p>
            </div>

            <div className="space-y-6">
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-yellow-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Photo */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={lawyer.photo}
                            alt={lawyer.name}
                            className="w-32 h-32 rounded-xl object-cover"
                          />
                          {lawyer.verified && (
                            <div className="absolute -bottom-2 -right-2 bg-yellow-600 text-white p-1.5 rounded-full shadow-lg">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold font-serif text-gray-800 mb-1">
                              {lawyer.name}
                            </h3>
                            <p className="text-yellow-700 font-semibold text-sm mb-2">
                              {lawyer.practiceArea}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                              <span className="font-bold text-gray-800">{lawyer.rating}</span>
                              <span className="text-sm text-gray-500">({lawyer.totalReviews})</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {lawyer.bio}
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{lawyer.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{lawyer.experience} years experience</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Languages className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{lawyer.languages.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Scale className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 font-mono">Bar: {lawyer.barCouncil}</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Consultation Fee</p>
                            <p className="text-2xl font-bold text-gray-800">
                              ₹{lawyer.consultationFee}
                              <span className="text-sm text-gray-500 font-normal">/session</span>
                            </p>
                          </div>

                          <div className="flex gap-2 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm font-semibold">Call</span>
                            </button>
                            <button className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                              <Video className="w-4 h-4" />
                              <span className="text-sm font-semibold">Video</span>
                            </button>
                            <Link
                              to={`/lawyer/${lawyer.id}`}
                              className="flex-1 sm:flex-initial px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-semibold"
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <div className="text-center py-12">
                <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-serif text-gray-800 mb-2">No lawyers found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindLawyer;