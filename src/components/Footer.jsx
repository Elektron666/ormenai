import { motion } from 'framer-motion'
import { 
  HiOutlineMailOpen, 
  HiOutlinePhone, 
  HiOutlineLocationMarker 
} from 'react-icons/hi'
import { 
  FaTwitter, 
  FaFacebook, 
  FaLinkedinIn, 
  FaGithub 
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <span className="text-2xl font-semibold text-white">Quantum</span>
            </div>
            <p className="text-gray-400 mb-6">
              The AI-powered SaaS platform that transforms how businesses operate with intelligent automation and insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <HiOutlineMailOpen className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-400">hello@quantum.io</span>
              </li>
              <li className="flex items-start">
                <HiOutlinePhone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <HiOutlineLocationMarker className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-400">
                  123 Innovation Way<br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Quantum. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer