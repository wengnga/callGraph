#!/bin/bash
npm run build # 获取react打包好的的html,css,js等静态文件
rm -rf ./callgraph/src/build
cp -r ./build ./callgraph/src/build
sed 's/"\//".\//g' -i ./callgraph/src/build/index.html # 正则表达式替换入口index.html文件中所有"/ 为 "./ 