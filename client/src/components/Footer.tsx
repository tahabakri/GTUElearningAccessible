import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

// GTU Circular Logo SVG Component
function GTUCircularLogo() {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className="w-32 h-32"
      aria-label="GTU Logo - Scientia Potestas Est"
    >
      {/* Outer circle */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="1" />
      
      {/* Inner square frame */}
      <rect x="45" y="55" width="110" height="90" fill="none" stroke="white" strokeWidth="2" rx="3" />
      
      {/* GTU Text */}
      <text x="100" y="115" textAnchor="middle" fill="white" fontSize="42" fontWeight="bold" fontFamily="serif">
        GTU
      </text>
      
      {/* Curved text - SCIENTIA POTESTAS EST */}
      <defs>
        <path id="topArc" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
        <path id="bottomArc" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
      </defs>
      
      {/* Top arc text */}
      <text fill="white" fontSize="11" fontFamily="serif" letterSpacing="3">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          SCIENTIA · POTESTAS
        </textPath>
      </text>
      
      {/* Bottom arc text */}
      <text fill="white" fontSize="11" fontFamily="serif" letterSpacing="3">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          EST ·
        </textPath>
      </text>
    </svg>
  );
}

// ISO Certification Badge
function ISOCertBadge() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-white/80 mb-1">ISO 9001:2015</div>
      <div className="w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center relative">
        <div className="text-center">
          <div className="text-[10px] font-bold text-white">SIS</div>
          <div className="text-lg font-bold text-white">CERT.</div>
        </div>
        <svg className="absolute -right-1 -bottom-1 w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
      <div className="text-[9px] text-white/70 mt-1 text-center">
        QUALITY<br/>MANAGEMENT<br/>SYSTEM
      </div>
    </div>
  );
}

// Fast Links data
const fastLinks = [
  { en: "E-Services", ka: "ელ-სერვისები", href: "https://eservices.gtu.ge" },
  { en: "Email", ka: "ელ-ფოსტა", href: "https://mail.gtu.ge" },
  { en: "Studinfo", ka: "სტუდინფო", href: "https://studinfo.gtu.ge" },
  { en: "Learning Schedule", ka: "სასწავლო განრიგი", href: "https://schedule.gtu.ge" },
  { en: "Academic Performance", ka: "აკადემიური შედეგები", href: "#/grades" },
  { en: "Testing Center", ka: "ტესტირების ცენტრი", href: "https://testing.gtu.ge" },
  { en: "Cisco Academy", ka: "ცისკო აკადემია", href: "https://cisco.gtu.ge" },
  { en: "Search", ka: "ძიება", href: "https://gtu.ge/search" },
];

// About GTU links
const aboutLinks = [
  { en: "Our Story", ka: "ჩვენი ისტორია", href: "https://gtu.ge/about" },
  { en: "Visual Identity", ka: "ვიზუალური იდენტობა", href: "https://gtu.ge/identity" },
  { en: "GTU's Mission", ka: "მისია", href: "https://gtu.ge/mission" },
  { en: "Struct. Units", ka: "სტრუქტურა", href: "https://gtu.ge/structure" },
  { en: "F.A.Q", ka: "FAQ", href: "https://gtu.ge/faq" },
  { en: "Personal Data Protection", ka: "პერსონალური მონაცემები", href: "https://gtu.ge/privacy" },
  { en: "Policy", ka: "პოლიტიკა", href: "https://gtu.ge/policy" },
  { en: "Contact", ka: "კონტაქტი", href: "https://gtu.ge/contact" },
];

// Social media links
const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/gaborgia", icon: Facebook },
  { name: "LinkedIn", href: "https://linkedin.com/school/gtu", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/gaborgia", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com/@gtu", icon: Youtube },
];

export function Footer() {
  const { language } = useAccessibility();

  return (
    <footer 
      className="w-full"
      style={{ backgroundColor: "#1e2a45" }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: GTU Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <GTUCircularLogo />
          </div>

          {/* Column 2: Fast Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wide">
              {language === 'ka' ? 'სწრაფი ბმულები' : 'Fast Links'}
            </h3>
            <ul className="space-y-2">
              {fastLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/80 text-sm hover:text-blue-300 hover:underline transition-colors"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {language === 'ka' ? link.ka : link.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About GTU */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wide">
              {language === 'ka' ? 'სტუ-ს შესახებ' : 'About GTU'}
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/80 text-sm hover:text-blue-300 hover:underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {language === 'ka' ? link.ka : link.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: ISO Certification */}
          <div className="flex items-center justify-center md:justify-end">
            <ISOCertBadge />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="border-t border-white/20"
        style={{ backgroundColor: "#1a2540" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/60 text-sm text-center md:text-right">
            {language === 'ka' 
              ? 'საქართველოს ტექნიკური უნივერსიტეტი © 2025 ყველა უფლება დაცულია.'
              : 'Georgian Technical University © 2025 all rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
