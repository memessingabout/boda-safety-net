
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Tagline and Social */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-secondary">Digital</span> Boda
            </h2>
            <p className="mb-6">Promoting safety and professionalism among digital boda drivers and delivery personnel</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/register" className="hover:text-accent transition-colors">Register</Link></li>
              <li><Link to="/login" className="hover:text-accent transition-colors">Login</Link></li>
              <li><Link to="/verify" className="hover:text-accent transition-colors">Verify a bike</Link></li>
              <li><Link to="/help" className="hover:text-accent transition-colors">Help</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>+254 702 423004</li>
              <li>+254 723 983222</li>
              <li>info@digitalboda.co.ke</li>
              <li>complaint@digitalboda.co.ke</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-4">To get the latest news, offers and updates from digital boda.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none bg-white/10 border-r-0"
              />
              <Button size="icon" className="rounded-l-none bg-accent hover:bg-accent-dark">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">© 2024 Digital Boda and Deliveries Kenya. All rights reserved.</p>
            <Link to="/donate" className="mt-4 sm:mt-0">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
