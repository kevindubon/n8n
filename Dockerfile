FROM n8nio/n8n:latest

# Expose the port that n8n runs on
EXPOSE 5678

# The base image already has everything configured
# Environment variables will be passed by Render