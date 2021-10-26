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

参考[官方文档](https://docs.docker.com/engine/reference/builder/)。



#### 2.1.1 Instructions

| Instruction Name | Usage                   | Result                                                       |
| ---------------- | ----------------------- | ------------------------------------------------------------ |
| FROM             | FROM [base image]       | creates a layer from the `ubuntu:18.04` Docker image.        |
| COPY             | COPY [src] [dest]       | adds files from your Docker client’s current directory.      |
| RUN              | RUN [commands]          | builds your application with `make`.                         |
| CMD              | CMD [commands]          | pecifies what command to run within the container.           |
| EXPOSE           | EXPOSE [port number]    | indicates the ports on which a container listens for connections. |
| ENV              | ENV [key=value]         | sets the environment variable `<key>` to the value `<value>`. |
| ENTRYPOINT       | ENTRYPOINT ["anything"] | set the image’s main command, allowing that image to be run as though it was that command (and then use `CMD` as the default flags). |
| USER             | USER [user[:group]]     | sets the user name (or UID) and optionally the user group (or GID) to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow it in the Dockerfile. |
|                  |                         |                                                              |





## 3. 使用镜像

### 3.1 创建镜像

从Dockerfile创建镜像（Dockerfile在当前目录），当前目录称为上下文`context`：

`docker build -t [ImageName]:[Version] .` 

制定Dockerfile：

`docker build -t [ImageName]:[Version] -f dockerfiles/Dockerfile context`



### 3.2 创建容器

```sh
docker run -d -p 2222:22 [ImageName]:[Version]
## 要使用GPU、opencv图像显示：
docker run -dit -p 2222:22 \
	-gpus all -v /tmp/.X11-unix:/tmp/.X11-unix \
	-e DISPLAY=unix$DISPLAY \
	-e NVIDIA_DRIVER_CAPABILITIES=compute,utility \
	-e NVIDIA_VISIBLE_DEVICES=all \
	[ImageName]:[Version]
```

-   `-dit`以deamon交互的方式运行；

然后通过`exec`命令连接docker：

```sh
docker exec -it [Container ID] /bin/bash
```



在docker中使用显卡：

-   启动容器时，设置`--runtime=nvidia`或`--gpus all`

要显示图像：`--env="DISPLAY"`



### 3.3 管理容器和镜像

#### 0. docker基本命令

| 命令                                     | 功能                     | 备注                                 |
| ---------------------------------------- | ------------------------ | ------------------------------------ |
| docker ps                                | 查看运行的容器           | 当你需要一个容器的ID时运行这条指令   |
| docker ps -a                             | 查看所有容器             | 包括已退出的                         |
| docker exec -it [Container ID] /bin/bash | 在容器中新建终端然后打开 |                                      |
| docker images                            | 查看所有镜像的信息       |                                      |
| docker stop [Container ID]               | 停止正在运行的容器       | 停止了容器后才能删除                 |
| docker rm [Container ID]                 | 删除容器                 | 也可以用-f选项强制删除一个运行的容器 |
| docker rmi [Image ID]                    | 删除镜像                 |                                      |
| docker attach [Container ID]             | 进入容器                 | 连接到容器启动命令的终端             |
| docker start [Container ID]              | 启动停止的容器           |                                      |
| docker restart [Container ID]            | 重启容器                 |                                      |



### 3.4 Docker中使用NVIDIA GPU

首先确认宿主机中已经安装好了显卡驱动：

```sh
nvidia-smi
```

如果显示找不到命令，先安装显卡驱动。

如果显示显卡信息，就可以在宿主机内安装NVIDIA container runtime。

#### 1. 添加Repo和GPG Key

```sh
curl -s -L https://nvidia.github.io/nvidia-container-runtime/gpgkey | \
  sudo apt-key add - distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-runtime.list
sudo apt-get update
apt-get install nvidia-container-runtime
```



#### 2. 把runtime添加到docker中

```sh
sudo systemctl stop docker
sudo dockerd --add-runtime=nvidia=/usr/bin/nvidia-container-runtime

# 修改 /etc/docker/daemon.json，配置默认nvidia运行
sudo vim /etc/docker/daemon.json 
# 在daemon.json文件中添加如下内容，如下示意图
{
"default-runtime": "nvidia"
    "runtimes": {
        "nvidia": {
            "path": "/usr/bin/nvidia-container-runtime",
            "runtimeArgs": []
        }
    }
}
# 重启docker服务即可生效
sudo systemctl daemon-reload
sudo systemctl restart docker

```



### 3.5 Docker 中使用桌面环境：如qt, cv2.imshow等

在启动容器时添加选项：

```sh
-v /tmp/.X11-unix:/tmp/.X11-unix
-e DISPLAY=unix$DISPLAY
```

同时在宿主机执行：

```sh
$ sudo apt-get install x11-xserver-utils

$ xhost +
```

