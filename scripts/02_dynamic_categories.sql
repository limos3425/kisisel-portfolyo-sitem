-- Kategorileri saklamak için yeni bir tablo
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

-- Her portfolyo öğesine bağlı linkleri/butonları saklamak için yeni tablo
CREATE TABLE portfolio_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_item_id UUID REFERENCES portfolio_items(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  url TEXT NOT NULL
);

-- Mevcut portfolio_items tablosunu güncelle
-- Önce eski 'category' sütununu kaldıralım
ALTER TABLE portfolio_items DROP COLUMN category;
-- Şimdi yeni 'category_id' sütununu ekleyelim
ALTER TABLE portfolio_items ADD COLUMN category_id UUID REFERENCES categories(id);

-- Başlangıç için örnek kategoriler ekleyelim
INSERT INTO categories (name) VALUES ('Strateji'), ('İçerik Üretimi'), ('Kampanya Yönetimi'), ('Analiz ve Raporlama');
