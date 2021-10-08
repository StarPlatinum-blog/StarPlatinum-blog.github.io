---
layout: post
title: Docker Usage
date: 21-09-29 18:29:04 +0800
categories: notes
---

# Docker Usage

## 1. 安装Docker社区版(Ubuntu)

通过Repository来安装docker

### 1.1 安装一些依赖以及让apt能够通过HTTPS来使用Repository

```sh
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```



### 1.2 添加Docker的官方GPG Key

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

```



### 1.3 设置使用stable repository

```sh
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

LinuxMint需要查看基于什么版本的Ubuntu，然后替换`$(lsb_release -cs)`为对应版本，通过命令`cat /etc/os-release`查看。



### 1.4 安装Docker Engine

```sh
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

```





## 2. 制作镜像

### 2.1 Dockerfile

参考[官方文档](https://docs.docker.com/engine/reference/builder/)，

