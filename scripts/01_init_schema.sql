-- Kişisel bilgileri saklamak için tek satırlık bir tablo
CREATE TABLE about_me (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  title TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  profile_image_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT
);

-- Deneyimleri saklamak için tablo
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT,
  role TEXT,
  duration TEXT,
  display_order SMALLINT
);

-- Portfolyo öğelerini saklamak için tablo
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  category TEXT,
  image_url TEXT,
  link TEXT,
  display_order SMALLINT
);

-- Örnek verileri ekleyelim
INSERT INTO about_me (name, title, bio, email, phone, profile_image_url, linkedin_url, twitter_url, instagram_url)
VALUES
  ('Adınız Soyadınız', 'Sosyal Medya ve Dijital Pazarlama Uzmanı', 'Markaların dijital dünyadaki sesini bulmalarına ve hedef kitleleriyle anlamlı bağlar kurmalarına yardımcı oluyorum.', 'email@adresiniz.com', '5551234567', '/placeholder.svg?height=320&width=320', 'https://linkedin.com/in/kullaniciadiniz', 'https://twitter.com/kullaniciadiniz', 'https://instagram.com/kullaniciadiniz');
