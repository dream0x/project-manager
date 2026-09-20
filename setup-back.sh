#!/bin/bash

set -euo pipefail

## back

# create project
cd src/back
curl -G https://start.spring.io/starter.tgz \
  -d configurationFileFormat=yaml \
  -d type=gradle-project \
  -d javaVersion=25 \
  -d groupId=com \
  -d artifactId=app \
  -d dependencies=devtools,lombok,web,validation,data-jpa,postgresql \
  | tar -xzvf -


# docker compose exec back bash -c '

# '
