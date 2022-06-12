# callgraph README

用于支持高性能并行程序开发和优化的性能可视化工具，支持SWLU生成的swlu_prof.dot文件的可视化。

## Features

目前本性能可视化工具提供数据加载与解析、图表切换、主题颜色修改和函数导航等功能，使用此工具，用户可以根据自己的需要选择适合的图表显示方式，更有利于用户寻找到性能瓶颈，获取性能优化的要点，为程序的开发和优化提供了便利。

跳转到函数定义可以通过双击图表中的函数，又或者点击上方函数详情信息的"Go To Definition"触发。点击后会去寻找与文本格式的性能分析文件swlu_prof.dot位于同一目录下名为swlu_map.txt的映射文件，这个文件记录着每个函数与函数定义文件的映射关系，根据swlu_prof.txt文件、可执行文件（LbmCavity3D）和链接可执行文件时输出的map文件（swlu_symtable.txt）使用如下shell脚本得到：
```
#!/bin/bash

grep func-name $1 | awk -F "," '{print $1}' | awk '{print $3}' | while read line; do
	for var in $line; do
		grep " $var\$" $2 | awk '{print $2}' | addr2line -e $3 -f -C | awk '{if ($0!="") print $0}'
		echo ""
	done
done
```
假设该脚本名为process.sh，则执行
```
process.sh swlu_prof.txt swlu_symtable.txt LbmCavity3D
```
即可在标准输出stdout得到swlu_map.txt文件的内容，如果该文件存在，就加载并解析映射文件，获取函数及其定义文件的绝对路径的映射信息，否则弹出提示找不到该文件。
<!-- 
## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

### 1.0.0

Initialize

<!-- ### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z. -->

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
