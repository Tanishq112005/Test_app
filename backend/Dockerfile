# Use the official public Node.js 20 image from Docker Hub
FROM node:20

# Install dependencies needed for Chrome and clear apt cache
# (This part is fine, no changes needed)
RUN apt-get update && \
    apt-get install -y \
    wget gnupg libxshmfence-dev libgbm-dev libnss3 libxss1 libasound2 libatk-bridge2.0-0 libcups2 libgtk-3-0 libdrm2 xdg-utils \
    --no-install-recommends && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# --- START OF CHANGES ---

# Copy package.json and package-lock.json from the 'backend' directory
COPY backend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code from the 'backend' directory
COPY backend/ .

# --- END OF CHANGES ---

# Build your TypeScript project
RUN npm run build

# Set the user to a non-root user
USER node

# Expose the port
EXPOSE 3000

# Start your application
CMD [ "npm", "start" ]