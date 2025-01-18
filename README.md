Bu proje, kullanıcıların blog gönderileri oluşturmasına, gönderilere yorum yapmasına ve beğenmesine olanak tanıyan bir blog platformudur. Frontend tarafında React ve Bootstrap, backend tarafında ise Java Spring Boot kullanılmıştır. Projede kullanıcı güvenliği için JWT (JSON Web Token) ile kimlik doğrulama ve yetkilendirme mekanizması uygulanmıştır.

Backend yapısı, katmanlı mimari prensiplerine göre tasarlanmıştır ve aşağıdaki bileşenlerden oluşmaktadır:

config: JWT yapılandırması gibi uygulama konfigürasyonlarını içerir.
controllers: API uç noktalarını yönetir.
entities: Veritabanı modellerini temsil eder.
repos: Veritabanı erişim işlemleri.
requests ve responses: API için veri giriş/çıkış yapıları.
security: Kimlik doğrulama ve yetkilendirme işlemleri.
services: İş mantığı katmanı.
Frontend tarafında React, Vite ve Bootstrap ile modern ve kullanıcı dostu bir arayüz geliştirilmiştir. Kullanıcılar sisteme kayıt olabilir, giriş yapabilir, gönderiler oluşturabilir, bu gönderilere yorum yapabilir ve beğeni bırakabilirler.

Veritabanı olarak MySQL kullanılmıştır ve projede kullanıcılar, gönderiler, yorumlar, beğeniler ve yorum beğenileri için tablolar bulunmaktadır.

Bu proje, React ile dinamik bir kullanıcı arayüzü ve Spring Boot ile güvenli bir backend altyapısı sunmaktadır.

