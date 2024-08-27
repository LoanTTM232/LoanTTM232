#!/bin/bash

go-wrk -M POST -H 'Content-Type: application/json' -body @post_body.json -c 2048 -d 10 http://localhost:7000/api/v1/auth/login
