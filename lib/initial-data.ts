export type PortfolioItem = {
  id: string | number
  title: string
  category: "Strateji" | "İçerik Üretimi" | "Kampanya Yönetimi" | "Analiz ve Raporlama" | string
  imageUrl: string
  link: string
  description: string
}
