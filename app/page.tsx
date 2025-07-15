"use client"

import { Mail, Linkedin, Twitter, Instagram, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PortfolioSection from "@/components/portfolio-section"
import { usePortfolio } from "@/context/portfolio-context"
import AnimatedBackground from "@/components/animated-background"
import { DiamondIcon } from "@/components/icons"
import Footer from "@/components/footer"

export default function PortfolioPage() {
  const { data } = usePortfolio()
  const { aboutMe, experience, portfolioItems, categories } = data

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0C10] text-gray-100 font-sans">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <AnimatedBackground />
          <div className="container px-4 md:px-6 z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    {aboutMe.name}
                  </h1>
                  <h2 className="text-2xl font-semibold text-purple-300">{aboutMe.title}</h2>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">{aboutMe.bio}</p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row items-center">
                  <a href={`tel:${aboutMe.phone}`}>
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full min-[400px]:w-auto"
                    >
                      Beni Ara <Phone className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <div className="flex gap-2">
                    {aboutMe.socials.linkedin && (
                      <a href={aboutMe.socials.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-transparent border-purple-400 hover:bg-purple-400/20"
                        >
                          <Linkedin className="h-5 w-5 text-purple-400" />
                        </Button>
                      </a>
                    )}
                    {aboutMe.socials.twitter && (
                      <a href={aboutMe.socials.twitter} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-transparent border-purple-400 hover:bg-purple-400/20"
                        >
                          <Twitter className="h-5 w-5 text-purple-400" />
                        </Button>
                      </a>
                    )}
                    {aboutMe.socials.instagram && (
                      <a href={aboutMe.socials.instagram} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-transparent border-purple-400 hover:bg-purple-400/20"
                        >
                          <Instagram className="h-5 w-5 text-purple-400" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <Avatar className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto border-4 border-purple-500 shadow-2xl shadow-purple-500/20 animate-pulse-slow">
                <AvatarImage src={aboutMe.profile_image_url || "/placeholder.svg"} alt={aboutMe.name} />
                <AvatarFallback>{aboutMe.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <a href="#experience" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </a>
        </section>

        {/* Experience Section */}
        <section id="experience" className="w-full py-12 md:py-24 bg-[#1F2833]/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
              Kariyer Yolculuğum
            </h2>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-1/2 w-0.5 h-full bg-purple-400/30 transform -translate-x-1/2"></div>
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  className={`mb-10 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center justify-center order-1 bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl w-12 h-12 rounded-full">
                    <DiamondIcon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`order-1 rounded-lg shadow-xl w-5/12 px-6 py-4 ${index % 2 === 0 ? "text-right items-end" : "text-left items-start"} bg-gray-800/50 flex flex-col`}
                  >
                    <p className="text-purple-400 text-sm font-semibold">{job.duration}</p>
                    <h3 className="mb-1 font-bold text-white text-xl">{job.company}</h3>
                    <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-90">{job.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-12 md:py-24">
          <PortfolioSection items={portfolioItems} categories={categories} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 bg-[#1F2833]/50">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Birlikte Harika İşler Yapalım
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4 mb-8">
              Projeniz hakkında konuşmak veya bir kahve içmek için bana ulaşın. Fikirlerinizi hayata geçirmek için
              sabırsızlanıyorum.
            </p>
            <a href={`mailto:${aboutMe.email}`}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6"
              >
                E-posta Gönder <Mail className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer aboutMe={aboutMe} />
    </div>
  )
}
