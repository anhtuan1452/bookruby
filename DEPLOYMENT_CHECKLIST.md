# Deployment Checklist

## Pre-deployment

- [ ] Server Linux đã cài Docker và Docker Compose
- [ ] Domain đã được thêm vào Cloudflare
- [ ] DNS đã được cấu hình trỏ về IP server
- [ ] Origin Certificate đã được tạo trên Cloudflare
- [ ] SSL certificates (cert.pem, key.pem) đã được tạo trong nginx/ssl/
- [ ] File .env đã được tạo và cấu hình
- [ ] Domain name đã được cập nhật trong nginx/nginx.conf

## Cloudflare Settings

- [ ] SSL/TLS mode: Full (strict)
- [ ] Always Use HTTPS: Enabled
- [ ] Minimum TLS Version: TLS 1.2
- [ ] DNS Proxy: Enabled (orange cloud)
- [ ] Firewall rules configured (optional)

## Deployment Steps

- [ ] Upload code lên server
- [ ] Chmod +x deploy.sh
- [ ] Run ./deploy.sh
- [ ] Verify services are running: docker-compose ps
- [ ] Check backend health: curl http://localhost:3000/health
- [ ] Access website: https://your-domain.com

## Post-deployment

- [ ] Test thêm tác giả
- [ ] Test thêm sách
- [ ] Test xóa tác giả/sách
- [ ] Verify SSL certificate
- [ ] Setup monitoring (optional)
- [ ] Setup backup script (optional)
- [ ] Document any custom configurations

## Monitoring

- [ ] Setup Cloudflare Analytics
- [ ] Monitor server resources (CPU, RAM, Disk)
- [ ] Setup health check monitoring
- [ ] Configure log rotation

## Security

- [ ] Change default database password
- [ ] Setup firewall on server
- [ ] Configure fail2ban (optional)
- [ ] Enable Cloudflare DDoS protection
- [ ] Regular security updates

## Backup

- [ ] Setup automated database backups
- [ ] Test restore procedure
- [ ] Store backups in secure location
- [ ] Document backup and restore process
