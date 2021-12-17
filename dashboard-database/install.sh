echo "\n\n\n\n\n"
echo "----------------------------"
echo "Docker - running new postgresql container"
docker run --name watch-my-house-database -p 5432:5432 -e POSTGRES_DB=watch-my-house-db -e POSTGRES_USER=fm2people -e POSTGRES_PASSWORD=123 -d postgres:14