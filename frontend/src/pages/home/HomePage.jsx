// HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import FAQ from "../FAQ/FAQ"

import {
  Scale,
  Search,
  MessageSquare,
  Video,
  Phone,
  MapPin,
  Shield,
  Clock,
  Award,
  CheckCircle,
  Star,
  ChevronRight,
  FileText,
  Users,
  TrendingUp,
  Menu,
  X,
  ArrowRight,
  Briefcase,
  Home as HomeIcon,
  Car,
  Heart,
  Building,
  Landmark,
  Calendar,
} from "lucide-react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      icon: Shield,
      title: "Verified Lawyers",
      description: "All lawyers are verified with Bar Council registration",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get consultation within 24 hours of booking",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Award,
      title: "Expert Lawyers",
      description: "Access to top-rated legal professionals",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      icon: FileText,
      title: "Document Support",
      description: "Upload and share documents securely",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const consultationTypes = [
    {
      icon: MessageSquare,
      title: "Chat Consultation",
      description: "Get quick legal advice via text",
      price: "Starting at ₹500",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Phone Call",
      description: "Speak directly with a lawyer",
      price: "Starting at ₹1000",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Face-to-face consultation online",
      price: "Starting at ₹1500",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MapPin,
      title: "Physical Meeting",
      description: "In-person consultation at office",
      price: "Starting at ₹2000",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const practiceAreas = [
    { icon: Briefcase, name: "Corporate Law", cases: "2,500+" },
    { icon: Users, name: "Family Law", cases: "3,200+" },
    { icon: Shield, name: "Criminal Law", cases: "1,800+" },
    { icon: HomeIcon, name: "Property Law", cases: "2,100+" },
    { icon: Car, name: "Motor Accident", cases: "1,500+" },
    { icon: Heart, name: "Consumer Rights", cases: "1,200+" },
    { icon: Building, name: "Civil Law", cases: "2,800+" },
    { icon: Landmark, name: "Tax Law", cases: "1,600+" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Found an excellent lawyer for my property dispute. The entire process was smooth and professional.",
      case: "Property Dispute",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "Quick response and expert advice. Helped me resolve my family matter efficiently.",
      case: "Family Law",
    },
    {
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      text: "Professional service and transparent pricing. Highly recommend for corporate legal matters.",
      case: "Corporate Law",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Verified Lawyers" },
    { value: "50,000+", label: "Cases Resolved" },
    { value: "25+", label: "Cities Covered" },
    { value: "4.8/5", label: "Average Rating" },
  ];

  const topLawyers = [
    {
      id: 1,
      name: "Adv. Rajesh Kumar",
      photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
      specialization: "Criminal Law",
      experience: 12,
      rating: 4.8,
      cases: 200,
      city: "Delhi",
    },
    {
      id: 2,
      name: "Adv. Priya Sharma",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      specialization: "Family Law",
      experience: 8,
      rating: 4.9,
      cases: 150,
      city: "Mumbai",
    },
    {
      id: 3,
      name: "Adv. Vikram Reddy",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      specialization: "Corporate Law",
      experience: 15,
      rating: 4.7,
      cases: 300,
      city: "Bangalore",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzBoLTJ2NGgtNHYyaDR6TTYgMTR2Mmgydi00SDZ2Mmg0djJINnpNNTQgMjR2Mmgydi00aC0ydjRoLTR2Mmg0ek0xOCA0NHYyaDJ2LTRoLTJ2NGgtNHYyaDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-600/20 border border-yellow-600/30 px-4 py-2 rounded-full mb-6">
                <CheckCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">
                  Trusted by 50,000+ Clients
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                Find the Right Lawyer for Your Legal Needs
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Connect with verified lawyers across India. Get expert legal
                consultation from the comfort of your home.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-2 shadow-2xl mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by practice area or city..."
                      className="w-full pl-12 pr-4 py-3 text-gray-800 rounded-xl focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Link
                    to={`/find-lawyer?q=${searchQuery}`}
                    className="px-8 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-yellow-500">10K+</div>
                  <div className="text-sm text-gray-400">Lawyers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500">50K+</div>
                  <div className="text-sm text-gray-400">Cases</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500">4.8★</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-600/20 rounded-3xl blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
                  alt="Legal consultation"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              Why Choose LegalEase?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              India's most trusted platform for legal consultation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              Choose Your Consultation Type
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible options to suit your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-yellow-600 transition-all duration-300 hover:shadow-xl"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-gray-800 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {type.description}
                  </p>
                  {/* <p className="text-yellow-600 font-bold">{type.price}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              Popular Practice Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert legal help across all domains
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Link
                  key={index}
                  to={`/find-lawyer?area=${area.name}`}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-yellow-600 hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-gray-600 group-hover:text-yellow-600 transition-colors" />
                  <h3 className="font-bold text-gray-800 mb-1">{area.name}</h3>
                  <p className="text-sm text-gray-500">{area.cases}</p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/find-lawyer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 font-semibold transition-colors"
            >
              View All Practice Areas
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Lawyers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              Top Rated Lawyers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with highly rated legal professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={lawyer.photo}
                  alt={lawyer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-gray-800 mb-1">
                    {lawyer.name}
                  </h3>
                  <p className="text-yellow-600 font-semibold text-sm mb-3">
                    {lawyer.specialization}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{lawyer.experience} years</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{lawyer.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">
                      {lawyer.cases}+ cases
                    </span>
                    <Link
                      to={`/lawyer/${lawyer.id}`}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold text-sm transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/all-lawyers"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-black text-black rounded-xl hover:bg-black hover:text-white font-semibold transition-all"
            >
              Browse All Lawyers
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get legal help in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search & Select",
                description:
                  "Browse verified lawyers by practice area, city, or specialization",
                icon: Search,
              },
              {
                step: "02",
                title: "Book Consultation",
                description:
                  "Choose your preferred consultation type and schedule a time",
                icon: Calendar,
              },
              {
                step: "03",
                title: "Get Expert Advice",
                description:
                  "Connect with your lawyer and get professional legal guidance",
                icon: MessageSquare,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                    <div className="text-6xl font-bold text-yellow-600/20 mb-4">
                      {item.step}
                    </div>
                    <div className="w-14 h-14 bg-yellow-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-yellow-600"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-300">
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                    {testimonial.case}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}

      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">
            Need Legal Help? We're Here for You
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Connect with expert lawyers and get the legal support you need today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/find-lawyer"
              className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 font-bold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Find a Lawyer Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 font-bold text-lg transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
