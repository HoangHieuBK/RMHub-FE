#!/bin/sh
IMAGE_NAME="rmhub-ui:test"
CONTAINER_NAME="rmhub-ui"

echo "=========================================================================="
echo "Stop and remove old container..."

docker stop ${CONTAINER_NAME} || true && docker rm ${CONTAINER_NAME} || true

echo "=========================================================================="
echo "Build image..."

docker build -t ${IMAGE_NAME} .

echo "=========================================================================="
echo "Run container..."

docker run --name ${CONTAINER_NAME} -d ${IMAGE_NAME}

echo "=========================================================================="
echo "Done!"
