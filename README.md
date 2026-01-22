# 📚 Hệ Thống Quản Lý Sách và Tác Giả

Mini project quản lý sách và tác giả sử dụng Ruby on Rails (Backend) và Next.js (Frontend), được containerized với Docker và sẵn sàng deploy lên Linux server với Cloudflare.

## 🚀 Tính năng

- ✅ Quản lý tác giả (thêm, xem, xóa)
- ✅ Quản lý sách (thêm, xem, xóa)
- ✅ Liên kết sách với tác giả
- ✅ RESTful API với Ruby on Rails 7.1
- ✅ Giao diện hiện đại với Next.js 14
- ✅ PostgreSQL database
- ✅ Hoàn toàn containerized với Docker
- ✅ Nginx reverse proxy
- ✅ Sẵn sàng deploy lên production với Cloudflare SSL

## 📋 Yêu cầu

- Docker và Docker Compose
- Git

## 🛠️ Cài đặt và Chạy Local

### 1. Clone repository

```bash
git clone <your-repo-url>
cd miniprj
```

### 2. Chạy với Docker Compose

```bash
# Development mode
docker-compose up --build

# Hoặc chạy ở background
docker-compose up -d --build
```

### 3. Truy cập ứng dụng

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000/api/v1
- **Health Check**: http://localhost:3000/health

### 4. Dừng ứng dụng

```bash
docker-compose down

# Xóa cả volumes (database data)
docker-compose down -v
```

## 📁 Cấu trúc Project

```
miniprj/
├── backend/                 # Ruby on Rails API
│   ├── app/
│   │   ├── controllers/    # API Controllers
│   │   └── models/         # Author & Book models
│   ├── config/             # Rails configuration
│   ├── db/
│   │   ├── migrate/        # Database migrations
│   │   └── seeds.rb        # Sample data
│   ├── Dockerfile
│   └── Gemfile
├── frontend/               # Next.js App
│   ├── src/
│   │   ├── app/           # Pages (Next.js 14 App Router)
│   │   └── lib/           # API client
│   ├── Dockerfile
│   └── package.json
├── nginx/                  # Nginx configuration
│   ├── nginx.conf
│   └── ssl/               # SSL certificates
├── docker-compose.yml      # Development
└── docker-compose.prod.yml # Production
```

## 🌐 Deploy lên Linux Server với Cloudflare

### Bước 1: Chuẩn bị Server Linux

```bash
# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài đặt Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Cài đặt Docker Compose
sudo apt install docker-compose -y

# Thêm user vào docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Bước 2: Upload Code lên Server

```bash
# Từ máy local
rsync -avz --exclude 'node_modules' --exclude '.git' \
  ./ user@your-server-ip:/home/user/miniprj/

# Hoặc dùng git
# Trên server:
git clone <your-repo-url>
cd miniprj
```

### Bước 3: Cấu hình Cloudflare

#### 3.1. Thêm Domain vào Cloudflare
1. Đăng nhập Cloudflare Dashboard
2. Thêm domain của bạn
3. Cập nhật nameservers tại nhà cung cấp domain

#### 3.2. Cấu hình DNS
Trong Cloudflare DNS settings:
- **Type**: A
- **Name**: @ (hoặc subdomain)
- **Content**: IP server của bạn
- **Proxy status**: ✅ Proxied (màu cam)

#### 3.3. Tạo Origin Certificate
1. Vào **SSL/TLS** → **Origin Server**
2. Click **Create Certificate**
3. Chọn:
   - Private key type: RSA (2048)
   - Hostnames: your-domain.com, *.your-domain.com
   - Certificate Validity: 15 years
4. Click **Create**
5. Copy **Origin Certificate** và **Private Key**

#### 3.4. Lưu SSL Certificate trên Server

```bash
cd ~/miniprj/nginx/ssl

# Tạo file cert.pem
cat > cert.pem << 'EOF'
-----BEGIN CERTIFICATE-----
[Paste Origin Certificate here]
-----END CERTIFICATE-----
EOF

# Tạo file key.pem
cat > key.pem << 'EOF'
-----BEGIN PRIVATE KEY-----
[Paste Private Key here]
-----END PRIVATE KEY-----
EOF

# Phân quyền
chmod 600 cert.pem key.pem
```

#### 3.5. Cấu hình SSL Mode
Trong Cloudflare: **SSL/TLS** → **Overview**
- Chọn: **Full (strict)**

### Bước 4: Cấu hình Environment Variables

```bash
# Tạo file .env
cp .env.example .env

# Chỉnh sửa
nano .env
```

Cập nhật các giá trị:
```env
DB_USERNAME=postgres
DB_PASSWORD=your_very_secure_password_here_123
RAILS_ENV=production
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://backend:3000/api/v1
```

### Bước 5: Cập nhật Nginx Config

```bash
nano nginx/nginx.conf
```

Thay `your-domain.com` bằng domain thực của bạn.

### Bước 6: Deploy

```bash
# Build và chạy containers
docker-compose -f docker-compose.prod.yml up -d --build

# Xem logs
docker-compose -f docker-compose.prod.yml logs -f

# Kiểm tra status
docker-compose -f docker-compose.prod.yml ps
```

### Bước 7: Kiểm tra

1. Truy cập https://your-domain.com
2. Kiểm tra SSL certificate (nên thấy Cloudflare SSL)
3. Test các chức năng: thêm tác giả, thêm sách

## 🔒 Cloudflare Security Settings (Khuyến nghị)

### SSL/TLS Settings
- **SSL/TLS encryption mode**: Full (strict)
- **Always Use HTTPS**: On
- **Minimum TLS Version**: TLS 1.2

### Firewall Rules
Tạo rule để chặn bot:
- Challenge (Managed Challenge) cho các request đáng ngờ
- Block các IP từ các quốc gia không mong muốn (nếu cần)

### Page Rules (Optional)
- Cache Level: Standard
- Browser Cache TTL: Respect Existing Headers

### DDoS Protection
- Cloudflare tự động bật DDoS protection
- Có thể bật "Under Attack Mode" nếu bị tấn công

## 🔧 Maintenance Commands

### Xem logs

```bash
# Tất cả services
docker-compose logs -f

# Chỉ backend
docker-compose logs -f backend

# Chỉ frontend
docker-compose logs -f frontend
```

### Restart services

```bash
# Restart tất cả
docker-compose restart

# Restart một service
docker-compose restart backend
```

### Update code và rebuild

```bash
# Pull code mới
git pull

# Rebuild và restart
docker-compose -f docker-compose.prod.yml up -d --build
```

### Backup database

```bash
# Backup
docker-compose exec db pg_dump -U postgres bookmanager_production > backup.sql

# Restore
docker-compose exec -T db psql -U postgres bookmanager_production < backup.sql
```

### Clean up

```bash
# Xóa các containers không dùng
docker system prune -a

# Xóa volumes cũ
docker volume prune
```

## 🐛 Troubleshooting

### Container không start được

```bash
# Xem logs chi tiết
docker-compose logs backend
docker-compose logs frontend

# Kiểm tra status
docker-compose ps
```

### Database connection error

```bash
# Restart database
docker-compose restart db

# Kiểm tra database có chạy không
docker-compose exec db psql -U postgres -c "SELECT 1"
```

### SSL certificate error

- Kiểm tra file cert.pem và key.pem có đúng format không
- Kiểm tra Cloudflare SSL mode: phải là "Full (strict)"
- Đảm bảo DNS đã propagate (có thể mất 24h)

### Port đã được sử dụng

```bash
# Tìm process đang dùng port
sudo lsof -i :80
sudo lsof -i :443

# Kill process nếu cần
sudo kill -9 <PID>
```

## 📚 API Endpoints

### Authors

- `GET /api/v1/authors` - Lấy danh sách tác giả
- `GET /api/v1/authors/:id` - Lấy thông tin tác giả
- `POST /api/v1/authors` - Tạo tác giả mới
- `PUT /api/v1/authors/:id` - Cập nhật tác giả
- `DELETE /api/v1/authors/:id` - Xóa tác giả

### Books

- `GET /api/v1/books` - Lấy danh sách sách
- `GET /api/v1/books/:id` - Lấy thông tin sách
- `POST /api/v1/books` - Tạo sách mới
- `PUT /api/v1/books/:id` - Cập nhật sách
- `DELETE /api/v1/books/:id` - Xóa sách

### Example Request

```bash
# Thêm tác giả
curl -X POST https://your-domain.com/api/v1/authors \
  -H "Content-Type: application/json" \
  -d '{
    "author": {
      "name": "Nguyễn Nhật Ánh",
      "email": "nna@example.com",
      "bio": "Nhà văn nổi tiếng"
    }
  }'

# Thêm sách
curl -X POST https://your-domain.com/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{
    "book": {
      "title": "Mắt Biếc",
      "isbn": "978-1234567890",
      "published_year": 2010,
      "description": "Truyện tình",
      "author_id": 1
    }
  }'
```

## 🎯 Performance Tips

1. **Enable Cloudflare Caching**
   - Vào Speed → Optimization
   - Bật Auto Minify (HTML, CSS, JS)
   - Bật Brotli compression

2. **Database Optimization**
   - Đảm bảo có indexes cho các query thường xuyên
   - Theo dõi slow queries

3. **Monitoring**
   - Sử dụng Cloudflare Analytics
   - Setup health check endpoint monitoring

## 📞 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra logs: `docker-compose logs -f`
2. Kiểm tra Cloudflare Dashboard cho errors
3. Verify SSL certificates
4. Kiểm tra firewall rules trên server

## 📝 License

MIT License - Free to use for personal and commercial projects.

---

**Note**: Nhớ thay đổi các thông tin sau khi deploy:
- Domain name trong nginx.conf
- Database password trong .env
- SSL certificates
- Cloudflare security settings theo nhu cầu của bạn
#   b o o k r u b y  
 