#!/bin/bash

ab  -p post_body.json -T application/json -n 5000 -c 100 http://localhost:7000/api/auth/login