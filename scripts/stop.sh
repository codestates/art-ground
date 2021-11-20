#!/bin/bash
cd /home/ubuntu/art-ground-Refactoring/server
pm2 stop index.js 2> /dev/null || true
pm2 delete index.js 2> /dev/null || true

pm2 start clear.js
pm2 stop clear.js 2> /dev/null || true
pm2 delete clear.js 2> /dev/null || true