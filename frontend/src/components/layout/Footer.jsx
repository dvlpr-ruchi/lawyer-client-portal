import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                <Scale className="text-black w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-white">
                Legal<span className="text-yellow-600">Ease</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              India's trusted platform for legal consultation and lawyer
              discovery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/find-lawyer" className="hover:text-yellow-600 transition-colors">
                  Find Lawyers
                </Link>
              </li>
              <li>
                <Link to="/practice-areas" className="hover:text-yellow-600 transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-yellow-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:text-yellow-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-yellow-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-yellow-600 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@legalease.in</li>
              <li>Phone: +91 1800-123-4567</li>
              <li>Hours: Mon-Sat, 9 AM - 6 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            © 2026 LegalEase. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-yellow-600 transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 