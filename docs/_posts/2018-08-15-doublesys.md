---
layout: post
title:	Ubuntu + Win10 双系统安装踩坑实录
date:   2018-08-15 13:00:12 +0800
categories: notes
---



这次安装双系统踩了很多坑，在这记录一下以备不测……在茫茫多资料中找到有效的真的很麻烦，也是替同样环境的朋友做一个总结。

- 机器：微星 GP62 MVR
- 原系统：Win10家庭版
- 安装系统：Ubuntu 18.04.1

1. 压缩卷轴，烧录U盘，BIOS设置U盘引导启动就不说了，网上大部分博客都适用。
2. 选择install之前，注意让内核不要设置显示，按e进入启动设置，找到`splash ---`，把`---`替换为：`acpi_osi=linux nomodeset`，否则进入安装界面会卡死
3. 在挂载系统时，因为以上设置，会导致下一步被挡住，按 ALT + F7 ，就可以移动窗口了
4. 上面都是N卡+Intel集显的常见问题，下面就是MSI的特殊问题了
5. 安装好系统之后，重启，发现直接进入了Win10，这并不是grub被覆盖的原因，而是微星的BIOS的设置问题。重启，按del，进入BIOS，在启动顺序的下方，选择下图白色高亮的项目

![]({{ site.url }}/imgs/dousys/BIOS1.jpg)

进入之后就可以调整顺序了，使用Ubuntu引导，再重启就可以看到grub了。

![]({{ site.url }}/imgs/dousys/BIOS2.jpg)

6. 然而进入系统之后，99%的情况下会在初始界面卡死，这就是Nvidia驱动的问题了，卸载自带开源驱动然后自己重新安装驱动。
7. 进入文字模式，关闭gdm，在联网的情况下`sudo ubuntu-drivers autoinstall`，安装完毕重启，问题就解决了