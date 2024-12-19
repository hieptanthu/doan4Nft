# Sử dụng image Node.js chính thức từ Docker Hub
FROM node:16

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc của dự án
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .


EXPOSE 8000

# Chạy ứng dụng Node.js
CMD ["node", "index.js"]
