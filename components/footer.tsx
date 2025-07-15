import { Linkedin, Twitter, Instagram, Mail, Phone } from "lucide-react"
import type { AboutMe } from "@/lib/types"

type FooterProps = {
  aboutMe: AboutMe
}

export default function Footer({ aboutMe }: FooterProps) {
  return (
    <footer className="bg-[#1F2833]/50 border-t border-purple-500/20 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{aboutMe.name}</h3>
            <p className="text-purple-300">{aboutMe.title}</p>
            <div className="flex space-x-4 mt-4">
              {aboutMe.socials.linkedin && (
                <a
                  href={aboutMe.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {aboutMe.socials.twitter && (
                <a
                  href={aboutMe.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              {aboutMe.socials.instagram && (
                <a
                  href={aboutMe.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-purple-400 transition-colors">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-purple-400 transition-colors">
                  Deneyim
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-purple-400 transition-colors">
                  Portfolyo
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-400 transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">İletişimde Kalalım</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-400" />
                <a href={`mailto:${aboutMe.email}`} className="hover:text-purple-400 transition-colors">
                  {aboutMe.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-400" />
                <a href={`tel:${aboutMe.phone}`} className="hover:text-purple-400 transition-colors">
                  {aboutMe.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-purple-500/10 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {aboutMe.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
