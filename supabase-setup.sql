-- FINAL REVISED SQL - RUN THIS IN SUPABASE SQL EDITOR --
-- This fixes the column names to match your requirements exactly.

-- 1. Create Gallery Images Table (Using 'image' instead of 'url')
DROP TABLE IF EXISTS gallery_images;
CREATE TABLE gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    image TEXT NOT NULL, -- Changed from 'url' to 'image'
    caption TEXT,
    category TEXT DEFAULT 'General'
);

-- 2. Create Events Table
DROP TABLE IF EXISTS events;
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    event_date DATE,
    location TEXT -- Verified this column exists
);

-- 3. Create Explora Articles Table
DROP TABLE IF EXISTS explora_articles;
CREATE TABLE explora_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    author TEXT DEFAULT 'Radapasa Team',
    image_url TEXT,
    excerpt TEXT,
    content TEXT,
    slug TEXT UNIQUE
);

-- 4. Set up Row Level Security (RLS) - PUBLIC ACCESS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Access" ON gallery_images FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Access" ON events FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE explora_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Access" ON explora_articles FOR ALL USING (true) WITH CHECK (true);

-- 5. Pre-fill Gallery with 16 slots for your 16 images
INSERT INTO gallery_images (image, caption) 
VALUES 
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(1).jpg', 'Observation 1'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(2).jpg', 'Observation 2'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(3).jpg', 'Observation 3'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(4).jpg', 'Observation 4'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(5).jpg', 'Observation 5'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(6).jpg', 'Observation 6'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(7).jpg', 'Observation 7'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(8).jpg', 'Observation 8'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(9).jpg', 'Observation 9'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(10).jpg', 'Observation 10'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(11).jpg', 'Observation 11'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(12).jpg', 'Observation 12'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(13).jpg', 'Observation 13'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(14).jpg', 'Observation 14'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(15).jpg', 'Observation 15'),
('https://raw.githubusercontent.com/Radapasa-Astronomy-Society/New-site/main/assets/Gallery/G_%20(16).jpg', 'Observation 16');
