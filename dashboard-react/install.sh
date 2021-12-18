
#stop container
echo "\n\n\n\n\n"
echo "----------------------------"
echo "Stopping the container"
docker rm -f "$(docker ps | grep "home-dashboard-react" | awk '{ print $1 }')"

#delete old image
echo "\n\n\n\n\n"
echo "----------------------------"
echo "Deleting the old image"
docker rmi -f $(docker images --filter=reference="*dashboard-react*" -q)

#update repo
echo "\n\n\n\n\n"
echo "----------------------------"
echo "Updating repository"
git pull

echo "\n\n\n\n\n"
echo "----------------------------"
echo "Docker - building the new image"
docker build --tag home-dashboard-react:v1.0 .

echo "\n\n\n\n\n"
echo "----------------------------"
echo "Docker - running the new container"
docker run -d -v /app/node_modules -p 3000:3000 --name watch-my-house-react home-dashboard-react:v1.0