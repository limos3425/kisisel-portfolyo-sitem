"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { PortfolioItem, Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ExternalLink, LinkIcon } from "lucide-react"

type PortfolioSectionProps = {
  items: PortfolioItem[]
  categories?: Category[]
}

export default function PortfolioSection({ items = [], categories = [] }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState("Tümü")

  const filteredItems = activeFilter === "Tümü" ? items : items.filter((item) => item.category?.name === activeFilter)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Çalışmalarım</h2>
        <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Strateji geliştirmeden içerik üretimine, yönettiğim başarılı kampanyalara ve analizlere kadar geniş bir
          yelpazedeki projelerim.
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <Button
          variant="outline"
          onClick={() => setActiveFilter("Tümü")}
          className={cn(
            "border-purple-400/50 bg-transparent hover:bg-purple-400/20",
            activeFilter === "Tümü" && "bg-purple-500 text-white hover:bg-purple-600",
          )}
        >
          Tümü
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            onClick={() => setActiveFilter(category.name)}
            className={cn(
              "border-purple-400/50 bg-transparent hover:bg-purple-400/20",
              activeFilter === category.name && "bg-purple-500 text-white hover:bg-purple-600",
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800/50 border-purple-500/30 h-full flex flex-col overflow-hidden group transition-all duration-300">
                <CardHeader>
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      width={500}
                      height={281}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <p className="text-sm text-purple-400 mb-1">{item.category?.name || "Kategorisiz"}</p>
                  <CardTitle className="text-lg font-bold text-white">{item.title}</CardTitle>
                  <p className="text-gray-400 mt-2 text-sm">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.links?.map((link) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="secondary" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
                          <LinkIcon className="mr-2 h-3 w-3" />
                          {link.text}
                        </Button>
                      </a>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-purple-400 text-purple-400 hover:bg-purple-400/20 hover:text-purple-300 bg-transparent"
                    >
                      Projeyi Görüntüle <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
