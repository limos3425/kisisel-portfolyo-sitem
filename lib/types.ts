export type Category = {
  id: string
  name: string
}

export type PortfolioLink = {
  id: string
  text: string
  url: string
  portfolio_item_id: string
}

export type PortfolioItem = {
  id: string
  title: string
  description: string
  image_url: string
  link: string
  display_order: number
  category_id: string | null
  // İlişkili veriler
  category?: Category | null
  links?: PortfolioLink[]
}

export type AboutMe = {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone: string
  profile_image_url: string
  socials: {
    linkedin: string
    twitter: string
    instagram: string
  }
}

export type Experience = {
  id: string
  company: string
  role: string
  duration: string
  display_order: number
}

export type PortfolioData = {
  aboutMe: AboutMe
  experience: Experience[]
  portfolioItems: PortfolioItem[]
  categories: Category[]
}
