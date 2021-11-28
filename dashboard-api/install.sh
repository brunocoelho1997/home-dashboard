
#stop container
echo "\n\n\n\n\n"
echo "----------------------------"
echo "Stopping the container"
docker rm -f "$(docker ps | grep "home-dashboard-api" | awk '{ print $1 }')"

#delete old image
echo "\n\n\n\n\n"
echo "----------------------------"
echo "Deleting the old image"
docker rmi -f $(docker images --filter=reference="*dashboard-api*" -q)

#update repo
echo "\n\n\n\n\n"
echo "----------------------------"
echo "Updating repository"
git pull

echo "\n\n\n\n\n"
echo "----------------------------"
echo "Maven - Building"
mvn clean install

echo "\n\n\n\n\n"
echo "----------------------------"
echo "Docker - building the new image"
docker build --tag home-dashboard-api:v1.0 .

echo "\n\n\n\n\n"
echo "----------------------------"
echo "Docker - running the new container"
docker run -d -p 8080:8080 home-dashboard-api:v1.0


#react commands
#docker build -t sample:dev .
#docker run -d -v /app/node_modules -p 3000:3000 sample:dev