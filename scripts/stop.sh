#!/bin/bash
cd /home/ubuntu/art-ground/server
pm2 stop index.js 2> /dev/null || true
pm2 delete index.js 2> /dev/null || true