# Sử dụng Node.js phiên bản >= 18.17.0
FROM node:18.17.1

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build the Next.js application
RUN npm run build

# Mở cổng 3000 để ứng dụng lắng nghe
EXPOSE 3000

# Start the built Next.js application
CMD ["npm", "start"]
