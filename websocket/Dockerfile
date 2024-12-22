# Use the latest Node.js LTS version
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code to the container
COPY . .

# Expose port 5001 for the WebSocket application
EXPOSE 5001

# Command to run the WebSocket application
CMD ["npm", "start"]