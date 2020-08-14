#!/bin/bash

work_dir=$(dirname "$0");
cd "$work_dir/admin";

yarn build;
pm2 delete caresteps_admin;
pm2 start app.config.json;
