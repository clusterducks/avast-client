FROM node:onbuild
 
RUN npm run build:prod
 
EXPOSE 8080
 
CMD ["npm", "run", "server:prod"]
