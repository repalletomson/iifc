import React from 'react';
import { Link } from 'wouter';
import { SiInstagram, SiYoutube, SiFacebook } from 'react-icons/si';
import { Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <span className="font-serif text-4xl font-bold gradient-text cursor-pointer tracking-wider block mb-4">
                IICA
              </span>
            </Link>
            <p className="text-gray-400 font-serif italic text-lg leading-relaxed">
              Elevating India's Cultural Legacy
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <Link href="/about"><span className="hover:text-white transition-colors cursor-pointer">About Us</span></Link>
              </li>
              <li>
                <Link href="/artists"><span className="hover:text-white transition-colors cursor-pointer">Artists Directory</span></Link>
              </li>
              <li>
                <Link href="/events"><span className="hover:text-white transition-colors cursor-pointer">Events</span></Link>
              </li>
              <li>
                <Link href="/membership"><span className="hover:text-white transition-colors cursor-pointer">Membership</span></Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wider uppercase text-sm">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>info@iica.app</li>
              <li>India</li>
              <li className="pt-2">
                <Link href="/jobs"><span className="text-[#C13584] hover:text-[#E1306C] transition-colors cursor-pointer">Careers & Gigs →</span></Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wider uppercase text-sm">Follow Us</h4>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-[#833AB4] transition-colors glow-purple hover:scale-110 transform">
                <SiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C13584] transition-colors hover:scale-110 transform">
                <SiYoutube className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E1306C] transition-colors hover:scale-110 transform">
                <SiFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#833AB4] transition-colors hover:scale-110 transform">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2025 International Indian Culture & Arts. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#"><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></Link>
            <Link href="#"><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
