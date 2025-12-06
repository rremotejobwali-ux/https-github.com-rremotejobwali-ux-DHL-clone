import React from 'react';
import { Globe, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-600 p-1 rounded-sm">
                 <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">GNN</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Global News Now provides real-time coverage of world events, politics, technology, and culture. Driven by advanced AI to bring you the most accurate updates.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">Sections</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500">World</a></li>
              <li><a href="#" className="hover:text-red-500">Politics</a></li>
              <li><a href="#" className="hover:text-red-500">Tech</a></li>
              <li><a href="#" className="hover:text-red-500">Science</a></li>
            </ul>
          </div>

           <div>
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500">About Us</a></li>
              <li><a href="#" className="hover:text-red-500">Careers</a></li>
              <li><a href="#" className="hover:text-red-500">Code of Ethics</a></li>
              <li><a href="#" className="hover:text-red-500">Contact</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">Follow Us</h3>
             <div className="flex space-x-4">
               <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5"/></a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5"/></a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5"/></a>
             </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Global News Now. All rights reserved. Powered by Google Gemini.
        </div>
      </div>
    </footer>
  );
};

export default Footer;