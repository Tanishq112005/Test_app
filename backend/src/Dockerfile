# Use the official Render.com Node.js image
FROM rendercom/node:20

# Install Google Chrome Stable
# This will make Chrome available at /usr/bin/google-chrome-stable
RUN apt-get update && \
    apt-get install -y libxshmfence-dev libgbm-dev wget && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# IMPORTANT: You must have a "build" script in your package.json for TypeScript
# e.g., "build": "tsc"
# If you don't, Render will run this command and it might fail.
RUN npm run build

# Set the user to a non-root user for security
USER node

# Expose the port your app runs on
EXPOSE 3000 
# Note: Render automatically maps its internal port to your service's port. 
# This EXPOSE is good practice but not strictly required by Render.

# The command to start your application
CMD [ "npm", "start" ]