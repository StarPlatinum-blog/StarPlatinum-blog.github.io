---
layout: post
title: Ros Installation
date: 21-10-08 19:50:24 +0800
categories: notes
---

## Ros Installation

### 1. Ros2 Installation on Linux Mint

[Ros2 官方文档](https://docs.ros.org/en/galactic/)

按照Ros2的[安装文档](https://docs.ros.org/en/galactic/Installation/Ubuntu-Development-Setup.html)安装，如果是在Ubuntu20.04或者18.04，那么应该可以顺畅地完成安装，如果是使用了Linux Mint则需要修改两个地方即可。

1.   Add ros2's repository这一步，先查看Linux Mint基于的Ubuntu版本号`cat /etc/os-release`，然后替换命令中的`lsb_release -cs`，我的Linux Mint基于Ubuntu focal，所以完整的命令如下：

     `echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu focal main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null`

2.   Installing the missing dependencies这一步，rosdep是不认识`mint`的，会报错`OS unsupported`，需要在命令后面添加一个选项`--os=ubuntu:focal`，



### 2. Ros docker

从官网抄一个很拽的颜文字：`¯\_(ツ)_/¯`。



### 3. Ros Melodic on Ubuntu

[安装文档](http://wiki.ros.org/cn/melodic/Installation/Ubuntu)

