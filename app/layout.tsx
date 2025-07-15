import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { PortfolioProvider } from "@/context/portfolio-context"
import { createClient } from "@/lib/supabase/server"
import type { PortfolioData, PortfolioItem } from "@/lib/types"
import { sampleData } from "@/lib/sample-data"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: "Kurumsal Portfolyo Sitesi",
  description: "Sosyal Medya ve Dijital Pazarlama Uzmanı Portfolyosu",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  let initialData: PortfolioData

  if (supabase) {
    // Paralel olarak tüm verileri çek
    const [aboutMeRes, experienceRes, portfolioItemsRes, categoriesRes, linksRes] = await Promise.all([
      supabase.from("about_me").select().single(),
      supabase.from("experience").select().order("display_order"),
      supabase.from("portfolio_items").select("*, category:categories(*)").order("display_order"),
      supabase.from("categories").select(),
      supabase.from("portfolio_links").select(),
    ])

    const aboutMe = aboutMeRes.data
      ? {
          ...aboutMeRes.data,
          socials: {
            linkedin: aboutMeRes.data.linkedin_url ?? "",
            twitter: aboutMeRes.data.twitter_url ?? "",
            instagram: aboutMeRes.data.instagram_url ?? "",
          },
        }
      : sampleData.aboutMe

    const portfolioItems = (portfolioItemsRes.data || []).map((item) => ({
      ...item,
      links: (linksRes.data || []).filter((l) => l.portfolio_item_id === item.id),
    }))

    initialData = {
      aboutMe,
      experience: experienceRes.data || sampleData.experience,
      portfolioItems: portfolioItems as PortfolioItem[],
      categories: categoriesRes.data || sampleData.categories,
    }
  } else {
    initialData = sampleData
  }

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <PortfolioProvider initialData={initialData}>{children}</PortfolioProvider>
      </body>
    </html>
  )
}
