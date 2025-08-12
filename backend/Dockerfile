# Use the official public Node.js 20 image from Docker Hub
FROM node:20

# Install Google Chrome dependencies
RUN apt-get update && \
    apt-get install -y \
    wget gnupg libxshmfence-dev libgbm-dev libnss3 libxss1 libasound2 libatk-bridge2.0-0 libcups2 libgtk-3-0 libdrm2 xdg-utils \
    --no-install-recommends && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# --- START OF CORRECTIONS ---

# Copy package.json and package-lock.json from the build context root (which is now 'backend')
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code from the build context root
COPY . .

# --- END OF CORRECTIONS ---

# Build your TypeScript project
RUN npm run build

# Set the user to a non-root user for security
USER node

# Expose the port your app runs on
EXPOSE 3000

# The command to start your application
CMD [ "npm", "start" ]