# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of your application files
COPY . .

# Log Node and npm versions (for troubleshooting)
RUN node -v
RUN npm -v

# Build the Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
