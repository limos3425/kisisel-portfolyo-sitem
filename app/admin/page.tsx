"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePortfolio } from "@/context/portfolio-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { LogOut, Save, PlusCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { AboutMe, Experience, Category, PortfolioItem, PortfolioLink } from "@/lib/types"

// --- AboutMe Yöneticisi ---
const AboutMeManager = ({ aboutMe, onUpdate }: { aboutMe: AboutMe; onUpdate: () => void }) => {
  const [localAbout, setLocalAbout] = useState(aboutMe)
  const supabase = createClient()

  useEffect(() => {
    setLocalAbout(aboutMe)
  }, [aboutMe])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (["linkedin", "twitter", "instagram"].includes(name)) {
      setLocalAbout((prev) => ({ ...prev, socials: { ...prev.socials, [name]: value } }))
    } else {
      setLocalAbout((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = async () => {
    if (!supabase) return
    const { error } = await supabase
      .from("about_me")
      .update({
        name: localAbout.name,
        title: localAbout.title,
        bio: localAbout.bio,
        email: localAbout.email,
        phone: localAbout.phone,
        profile_image_url: localAbout.profile_image_url,
        linkedin_url: localAbout.socials.linkedin,
        twitter_url: localAbout.socials.twitter,
        instagram_url: localAbout.socials.instagram,
      })
      .eq("id", localAbout.id)
    if (error) alert(`Hata: ${error.message}`)
    else {
      alert("Kişisel bilgiler kaydedildi!")
      onUpdate()
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle>Kişisel Bilgiler</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Ad Soyad</Label>
          <Input id="name" name="name" value={localAbout.name} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Unvan</Label>
          <Input id="title" name="title" value={localAbout.title} onChange={handleChange} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" value={localAbout.bio} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={localAbout.email} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" value={localAbout.phone} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile_image_url">Profil Fotoğrafı URL</Label>
          <Input
            id="profile_image_url"
            name="profile_image_url"
            value={localAbout.profile_image_url}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" name="linkedin" value={localAbout.socials.linkedin} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter URL</Label>
          <Input id="twitter" name="twitter" value={localAbout.socials.twitter} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram URL</Label>
          <Input id="instagram" name="instagram" value={localAbout.socials.instagram} onChange={handleChange} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Bilgileri Kaydet
        </Button>
      </CardFooter>
    </Card>
  )
}

// --- Deneyim Yöneticisi ---
const ExperienceManager = ({ experiences, onUpdate }: { experiences: Experience[]; onUpdate: () => void }) => {
  const [localExperiences, setLocalExperiences] = useState(experiences)
  const supabase = createClient()

  useEffect(() => {
    setLocalExperiences(experiences)
  }, [experiences])

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updated = [...localExperiences]
    updated[index] = { ...updated[index], [field]: value }
    setLocalExperiences(updated)
  }

  const handleSave = async (exp: Experience) => {
    if (!supabase) return
    const { id, ...rest } = exp
    const { error } = await supabase.from("experience").update(rest).eq("id", id)
    if (error) alert(error.message)
    else {
      alert("Deneyim kaydedildi.")
      onUpdate()
    }
  }

  const handleAdd = async () => {
    if (!supabase) return
    const { error } = await supabase
      .from("experience")
      .insert({ company: "Yeni Şirket", role: "Yeni Rol", duration: "YYYY - YYYY", display_order: 99 })
    if (error) alert(error.message)
    else onUpdate()
  }

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Bu deneyimi silmek istediğinizden emin misiniz?")) return
    const { error } = await supabase.from("experience").delete().eq("id", id)
    if (error) alert(error.message)
    else onUpdate()
  }

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle>Deneyim Yönetimi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {localExperiences.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-gray-600 rounded-lg space-y-3">
            <Input
              placeholder="Şirket"
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
            />
            <Input placeholder="Rol" value={exp.role} onChange={(e) => handleChange(index, "role", e.target.value)} />
            <Input
              placeholder="Süre"
              value={exp.duration}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleSave(exp)}>
                <Save className="mr-2 h-4 w-4" /> Kaydet
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(exp.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Sil
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" /> Deneyim Ekle
        </Button>
      </CardFooter>
    </Card>
  )
}

// --- Kategori Yöneticisi ---
const CategoryManager = ({ categories, onUpdate }: { categories: Category[]; onUpdate: () => void }) => {
  const [newCategoryName, setNewCategoryName] = useState("")
  const supabase = createClient()

  const handleAdd = async () => {
    if (!newCategoryName.trim() || !supabase) return
    const { error } = await supabase.from("categories").insert({ name: newCategoryName.trim() })
    if (error) alert(error.message)
    else {
      setNewCategoryName("")
      onUpdate()
    }
  }

  const handleDelete = async (id: string) => {
    if (
      !supabase ||
      !confirm("Bu kategoriyi silerseniz, bu kategoriye ait projeler kategorisiz kalacaktır. Emin misiniz?")
    )
      return
    const { error } = await supabase.from("categories").delete().eq("id", id)
    if (error) alert(error.message)
    else onUpdate()
  }

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle>Kategori Yönetimi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between p-2 bg-gray-700 rounded-md">
            <span>{cat.name}</span>
            <Button variant="destructive" size="icon" onClick={() => handleDelete(cat.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Input
          placeholder="Yeni Kategori Adı"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" /> Ekle
        </Button>
      </CardFooter>
    </Card>
  )
}

// --- Portfolyo Yöneticisi ---
const PortfolioManager = ({
  portfolioItems,
  categories,
  onUpdate,
}: {
  portfolioItems: PortfolioItem[]
  categories: Category[]
  onUpdate: () => void
}) => {
  const [localItems, setLocalItems] = useState(portfolioItems)
  const supabase = createClient()

  useEffect(() => {
    setLocalItems(portfolioItems)
  }, [portfolioItems])

  const handleChange = (index: number, field: keyof PortfolioItem, value: any) => {
    const updated = [...localItems]
    updated[index] = { ...updated[index], [field]: value }
    setLocalItems(updated)
  }

  const handleLinkChange = (itemIndex: number, linkIndex: number, field: keyof PortfolioLink, value: string) => {
    const updatedItems = [...localItems]
    const updatedLinks = [...(updatedItems[itemIndex].links || [])]
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], [field]: value }
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], links: updatedLinks }
    setLocalItems(updatedItems)
  }

  const handleSave = async (item: PortfolioItem) => {
    if (!supabase) return
    const { id, category, links, ...rest } = item
    const { error } = await supabase.from("portfolio_items").update(rest).eq("id", id)
    if (error) {
      alert(`Proje kaydedilirken hata: ${error.message}`)
      return
    }

    if (links) {
      for (const link of links) {
        const { id: linkId, ...linkRest } = link
        const { error: linkError } = await supabase.from("portfolio_links").update(linkRest).eq("id", linkId)
        if (linkError) {
          alert(`Buton kaydedilirken hata: ${linkError.message}`)
        }
      }
    }
    alert("Proje ve butonları kaydedildi.")
    onUpdate()
  }

  const handleAdd = async () => {
    if (!supabase) return
    const { error } = await supabase.from("portfolio_items").insert({
      title: "Yeni Proje",
      description: "Açıklama girin...",
      link: "#",
      image_url: "/placeholder.svg",
      display_order: 99,
    })
    if (error) alert(error.message)
    else onUpdate()
  }

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Bu projeyi ve bağlı tüm linkleri silmek istediğinizden emin misiniz?")) return
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id)
    if (error) alert(error.message)
    else onUpdate()
  }

  const handleLinkAdd = async (portfolio_item_id: string) => {
    if (!supabase) return
    const { error } = await supabase.from("portfolio_links").insert({ portfolio_item_id, text: "Yeni Buton", url: "#" })
    if (error) alert(error.message)
    else onUpdate()
  }

  const handleLinkDelete = async (link_id: string) => {
    if (!supabase || !confirm("Bu butonu silmek istediğinizden emin misiniz?")) return
    const { error } = await supabase.from("portfolio_links").delete().eq("id", link_id)
    if (error) alert(error.message)
    else onUpdate()
  }

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle>Portfolyo Projeleri Yönetimi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {localItems.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-600 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label>Proje Başlığı</Label>
              <Input value={item.title} onChange={(e) => handleChange(index, "title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Açıklama</Label>
              <Textarea value={item.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Görsel URL</Label>
              <Input value={item.image_url} onChange={(e) => handleChange(index, "image_url", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Ana Proje Linki</Label>
              <Input value={item.link} onChange={(e) => handleChange(index, "link", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <select
                value={item.category_id || ""}
                onChange={(e) => handleChange(index, "category_id", e.target.value || null)}
                className="w-full p-2 bg-gray-700 border-gray-600 rounded-md"
              >
                <option value="">Kategorisiz</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Bağlı Butonlar/Linkler</Label>
              {item.links?.map((link, linkIndex) => (
                <div key={link.id} className="flex gap-2 items-center">
                  <Input
                    placeholder="Buton Metni"
                    value={link.text}
                    onChange={(e) => handleLinkChange(index, linkIndex, "text", e.target.value)}
                  />
                  <Input
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, linkIndex, "url", e.target.value)}
                  />
                  <Button variant="destructive" size="icon" onClick={() => handleLinkDelete(link.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => handleLinkAdd(item.id)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Buton Ekle
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSave(item)}>
                <Save className="mr-2 h-4 w-4" /> Projeyi Kaydet
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Projeyi Sil
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" /> Yeni Proje Ekle
        </Button>
      </CardFooter>
    </Card>
  )
}

// --- Ana Admin Sayfası ---
export default function AdminPage() {
  const { data } = usePortfolio()
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
      }
    }
    checkUser()
  }, [supabase, router])

  const forceUpdate = () => {
    router.refresh()
  }

  const handleSignOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (!data) {
    return <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 md:p-10 text-white">
      <style jsx>{`
        input,
        textarea,
        select {
          background-color: #374151;
          border-color: #4b5563;
          color: white;
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">Yönetim Paneli</h1>
          <div>
            <Link href="/" target="_blank" className="mr-4">
              <Button>Siteyi Görüntüle</Button>
            </Link>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
            </Button>
          </div>
        </div>

        <AboutMeManager aboutMe={data.aboutMe} onUpdate={forceUpdate} />
        <ExperienceManager experiences={data.experience} onUpdate={forceUpdate} />
        <CategoryManager categories={data.categories} onUpdate={forceUpdate} />
        <PortfolioManager portfolioItems={data.portfolioItems} categories={data.categories} onUpdate={forceUpdate} />
      </div>
    </div>
  )
}
