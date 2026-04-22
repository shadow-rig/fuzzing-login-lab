# Use the official lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (helps with caching layers)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your lab code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]