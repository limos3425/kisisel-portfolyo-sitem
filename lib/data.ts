export type PortfolioItem = {
  id: number
  title: string
  category: "Strateji" | "İçerik Üretimi" | "Kampanya Yönetimi" | "Analiz ve Raporlama"
  imageUrl: string
  link: string
  description: string
}

export type AboutMe = {
  name: string
  title: string
  bio: string
  email: string
  profileImageUrl: string
  socials: {
    linkedin: string
    twitter: string
    instagram: string
  }
}

export type Experience = {
  id: number
  company: string
  role: string
  duration: string
}

// --- ADMIN PANELİNDEN GELECEK VERİLER (ÖRNEK) ---

export const aboutMe: AboutMe = {
  name: "Adınız Soyadınız",
  title: "Sosyal Medya ve Dijital Pazarlama Uzmanı",
  bio: "Markaların dijital dünyadaki sesini bulmalarına ve hedef kitleleriyle anlamlı bağlar kurmalarına yardımcı oluyorum. Veri odaklı stratejiler ve yaratıcı içeriklerle büyümeyi sağlıyorum.",
  email: "email@adresiniz.com",
  profileImageUrl: "/placeholder.svg?height=320&width=320",
  socials: {
    linkedin: "https://linkedin.com/in/kullaniciadiniz",
    twitter: "https://twitter.com/kullaniciadiniz",
    instagram: "https://instagram.com/kullaniciadiniz",
  },
}

export const experience: Experience[] = [
  { id: 1, company: "Teknoloji A.Ş.", role: "Sosyal Medya Yöneticisi", duration: "2022 - Günümüz" },
  { id: 2, company: "Creative Ajans", role: "Dijital Pazarlama Uzmanı", duration: "2020 - 2022" },
  { id: 3, company: "Startup X", role: "İçerik Üreticisi", duration: "2019 - 2020" },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Global Lansman Kampanyası",
    category: "Kampanya Yönetimi",
    imageUrl: "/placeholder.svg?height=281&width=500",
    link: "#",
    description:
      "Yeni bir teknoloji ürününün global pazarda tanıtımı için 360 derece dijital pazarlama kampanyası yönetimi.",
  },
  {
    id: 2,
    title: "Etkileşim Odaklı İçerik Stratejisi",
    category: "İçerik Üretimi",
    imageUrl: "/placeholder.svg?height=281&width=500",
    link: "#",
    description: "Organik takipçi sayısını 6 ayda %200 artıran, video ve görsel odaklı yaratıcı içerik serisi.",
  },
  {
    id: 3,
    title: "Marka Bilinirliği Stratejisi",
    category: "Strateji",
    imageUrl: "/placeholder.svg?height=281&width=500",
    link: "#",
    description: "Sektöre yeni giren bir B2B markası için hedef kitle analizi ve pazar konumlandırma stratejisi.",
  },
  {
    id: 4,
    title: "Aylık Performans Raporlaması",
    category: "Analiz ve Raporlama",
    imageUrl: "/placeholder.svg?height=281&width=500",
    link: "#",
    description: "Tüm sosyal medya kanallarının performansını ölçen ve iyileştirme önerileri sunan detaylı raporlama.",
  },
  {
    id: 5,
    title: "Influencer Pazarlama Kampanyası",
    category: "Kampanya Yönetimi",
    imageUrl: "/placeholder.svg?height=281&width=500",
    link: "#",
    description: "Moda sektöründeki bir marka için 15'ten fazla influencer ile yürütülen başarılı iş birliği projesi.",
  },
  {
    id: 6,
    title: "Reels & TikTok Video Serisi",
    category: "İçerik Üretimi",
    imageUrl: "/placeholder.svg?height=281&width=500",
    link: "#",
    description: "Genç hedef kitleye yönelik, trendlere uygun, eğlenceli ve eğitici kısa video içerikleri.",
  },
]
