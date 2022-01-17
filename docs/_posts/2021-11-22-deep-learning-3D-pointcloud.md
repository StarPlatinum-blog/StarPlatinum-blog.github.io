---
layout: post
title: Paper reading: Deep Learning for 3D Point Clouds: A Survey
date: 21-11-22 16:02:04 +0800
categories: nots
---

这是一篇2020年6月发表的，关于深度学习在3D点云中应用的综述，还算比较新，可以看看了解一下3D点云处理的各种方法和处理的目的。

3D数据的表示方法：

1. 深度图像（depth image）；
2. 点云（point cloud）；
3. 网（mesh）；
4. 体积网格（volumetric grids）

其中，点云的优点：在没有任何离散化的情况下保留了 3D 空间中的原始几何信息。

3D点云处理包括：

1. 3D shape classifification（3D形状分类）
2. 3D object detection and tracking（3D目标检测和跟踪）
3. 3D point cloud segmentation（3D点云分割）
4. 3D point cloud registration（3D点云定位）
5. 6-DOF pose estimation（6自由度姿态估计）
6. 3D reconstruction （3D重建）

## 3D 形状分类

### 基于点的方法

#### 基于图的方法
