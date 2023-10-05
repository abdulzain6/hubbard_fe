### RUNNING IT ON DOCKER .
## Step 1: Build the Docker Image

Build the Docker image using the following command:

```
docker build . -t chatbot_fe
```

This will build a Docker image with the tag `chatbot_fe`.

## Step 2: Run the Docker Container

Finally, run the Docker container with the following command:

```
docker run -p 5173:5173 chatbot_ai
