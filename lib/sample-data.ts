import type { PortfolioData } from "@/lib/types"

export const sampleData: PortfolioData = {
  aboutMe: {
    id: "sample-user",
    name: "Adınız Soyadınız",
    title: "Sosyal Medya ve Dijital Pazarlama Uzmanı",
    bio: "Markaların dijital dünyadaki sesini bulmalarına ve hedef kitleleriyle anlamlı bağlar kurmalarına yardımcı oluyorum. Veri odaklı stratejiler ve yaratıcı içeriklerle büyümeyi sağlıyorum.",
    email: "email@adresiniz.com",
    phone: "5551234567",
    profile_image_url: "/placeholder.svg?height=320&width=320",
    socials: {
      linkedin: "https://linkedin.com/in/kullaniciadiniz",
      twitter: "https://twitter.com/kullaniciadiniz",
      instagram: "https://instagram.com/kullaniciadiniz",
    },
  },
  experience: [
    {
      id: "exp1",
      company: "Teknoloji A.Ş.",
      role: "Sosyal Medya Yöneticisi",
      duration: "2022 - Günümüz",
      display_order: 1,
    },
    {
      id: "exp2",
      company: "Creative Ajans",
      role: "Dijital Pazarlama Uzmanı",
      duration: "2020 - 2022",
      display_order: 2,
    },
  ],
  categories: [
    { id: "cat1", name: "Strateji" },
    { id: "cat2", name: "İçerik Üretimi" },
  ],
  portfolioItems: [
    {
      id: "item1",
      title: "Örnek Proje",
      description: "Bu bir örnek proje açıklamasıdır.",
      image_url: "/placeholder.svg?height=281&width=500",
      link: "#",
      category_id: "cat1",
      display_order: 1,
      links: [{ id: "link1", portfolio_item_id: "item1", text: "Örnek Buton", url: "#" }],
    },
  ],
}
