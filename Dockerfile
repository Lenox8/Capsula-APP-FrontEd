# Etapa 1: Build
# Official Node js runtime 
FROM node:20-alpine AS BUILDER

# set working dir
WORKDIR /app

# copy only needed files
COPY package*.json ./
RUN npm install

# copy rest of code
COPY . .

# build da app
RUN npm run build

# Etapa 2: Produção
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# necessary files copy
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "npm", "start" ]