FROM node:20-alpine

WORKDIR /app

# Add npmrc for faster, more reliable installs
RUN echo "fetch-retry-mintimeout=20000" >> /root/.npmrc && \
    echo "fetch-retry-maxtimeout=120000" && \
    echo "fetch-retries=5" >> /root/.npmrc && \
    echo "prefer-offline=false" >> /root/.npmrc

COPY package*.json ./

RUN npm install --no-audit --no-fund --prefer-offline || npm install --no-audit --no-fund

COPY . .

CMD ["npm", "start"]
