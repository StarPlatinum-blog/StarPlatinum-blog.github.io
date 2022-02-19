---
layout: post
title: Qt Desktop First taste
date: 21-09-28 17:40:22 +0800
categories: notes
---

# Qt Desktop First Taste

其实要说是Qt的`First Taste`也不是不妥，之前确实也没有认真用Qt开发过桌面App，但是要说是`First Taste`，`qtcreator`也当做Linux IDE用了很久了，之前的课设也是用`PyQt5`写了桌面前端。这篇博文的标题应当是`C++ Qt`的`First Taste`。

最近想做个桌面日程提醒的小工具，类似于一个总是浮在桌面的小程序，上面有每日安排的工作内容，左侧有时间，按照时间排序。同时有一个可以打开的日历，点击日历上的日期就可以增加当天的事件。同时在每天的界面上也可以删除事件。





## 1. 安装Qt以及Helloworld

我是从tuna下载的`Qt`：https://mirrors.tuna.tsinghua.edu.cn/#

下载后得到文件`qt-opensource-linux-x64-5.12.11.run`，添加执行权限`chmod +x ...`然后运行即可打开Qt的安装程序，虽然Qt是开源项目，但是还是需要注册一个账号才能安装。安装过程中可以选择一并安装`qtcreator`，很不错的`IDE`。

新建一个项目：就叫`DailyEvent`吧。

创建好的文件树如下：

```sh
DailyEvent
├── CMakeLists.txt
├── CMakeLists.txt.user
├── DailyEvent_zh_CN.ts
├── main.cpp
├── mainwindow.cpp
├── mainwindow.h
└── mainwindow.ui

```



然后`CMake`居然报错了：

```sh
/opt/Qt5.12.11/5.12.11/gcc_64/lib/cmake/Qt5Gui/Qt5GuiConfigExtras.cmake:9: error: Failed to find "GL/gl.h" in "/usr/include/libdrm". /opt/Qt5.12.11/5.12.11/gcc_64/lib/cmake/Qt5Gui/Qt5GuiConfig.cmake:174 (include) /opt/Qt5.12.11/5.12.11/gcc_64/lib/cmake/Qt5Widgets/Qt5WidgetsConfig.cmake:89 (find_package) /opt/Qt5.12.11/5.12.11/gcc_64/lib/cmake/Qt5/Qt5Config.cmake:28 (find_package) CMakeLists.txt:15 (find_package)
```

查一下发现是没有安装`opengl`，那就安装一下：

```sh
sudo apt install mesa-common-dev
```

