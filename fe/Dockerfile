# Sử dụng Node.js bản LTS mới nhất (Node.js 20)
FROM node:20

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Sao chép toàn bộ mã nguồn ứng dụng vào container
COPY . .

# # Build ứng dụng Next.js
# RUN npm run build

# Mở cổng 3000 cho ứng dụng Next.js
EXPOSE 3000

# Lệnh chạy ứng dụng Next.js
CMD ["npm", "dev"]
