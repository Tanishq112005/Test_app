# Use the official public Node.js 20 image from Docker Hub
FROM node:20

# Install dependencies needed for Chrome and clear apt cache
RUN apt-get update && \
    apt-get install -y \
    wget \
    gnupg \
    libxshmfence-dev \
    libgbm-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgtk-3-0 \
    libdrm2 \
    xdg-utils \
    --no-install-recommends && \
    # Install Google Chrome Stable
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    # Clean up
    rm google-chrome-stable_current_amd64.deb && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your TypeScript project
# This requires a "build" script in package.json (e.g., "build": "tsc")
RUN npm run build

# Set the user to a non-root user for security (the official node image has this user)
USER node

# Expose the port your app runs on (Render will map this automatically)
EXPOSE 3000

# The command to start your application
CMD [ "npm", "start" ]