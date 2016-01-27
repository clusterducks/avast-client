FROM node:onbuild
 
RUN npm run build:prod

VOLUME ["/usr/src/app/dist"]
 
CMD ["npm", "run", "build:prod"]
