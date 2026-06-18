CREATE TABLE t_p30360196_blue_vision_launch.promo_banner (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  old_price TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p30360196_blue_vision_launch.promo_banner (title, price, old_price, image_url, is_active)
VALUES (
  'Сплит-система BALLU BSD-09',
  '22 000 ₽',
  '26 000 ₽',
  'https://cdn.poehali.dev/projects/07c52384-035c-44ad-8118-a882037d4442/files/2b2e10ed-fea8-4ca4-a595-2229563f0a43.jpg',
  true
);
