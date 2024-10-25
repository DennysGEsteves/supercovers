# docker kill $(docker ps -q)
# kill -9 $(lsof -t -i:3000)
# kill -9 $(lsof -t -i:3001)
docker-compose up -d
cd frontend
npm run dev &
cd ..
cd backend
npm run start:dev