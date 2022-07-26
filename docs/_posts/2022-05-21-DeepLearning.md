---
layout:	post
title:	Deep Learning
date:   2022-05-21 13:24:00 +0800
categories: note
---

# Deep Learning 

> 李宏毅 2022 深度学习课程 https://www.youtube.com/channel/UC2ggjtuuWvxrHHHiaDH1dlQ/playlists

## 1. 模型训练过程

![]({{ site.url }}\imgs\deeplearning\2\training_guide.png)

首先检测训练集的Loss，如果Loss较大，则可能有两个原因：

1. 模型出现偏差（Model bias），即能够降低Loss的拟合函数不在模型能够调参获得的范围内，此时需要增加模型的复杂度，增加输入的Feature等；
2. 解优化方法有问题，例如使用梯度下降法进行解优化就有可能使结果卡在局部最优解上；
   - 通过对比来判断，从比较浅的网络或者其它更容易优化的模型开始测试（例如线性回归或支持向量机）
   - 如果更深的网络不能在训练集上获得更小的Loss，则说明存在优化问题

如果训练集Loss较小，测试集Loss较大，则：

1. 出现过拟合：模型只能识别训练集上的数据，对于不存在的数据不能正确的判断
   - 进行数据增强：需要合理进行增强，不能让数据变成不可能的数据，这样网络就会学到错误的经验；
   - 对模型参数进行限制，使用更少的参数或共享参数（CNN）；
   - 使用更少的特征；
   - Early stopping；
   - Regularization；
   - Dropout；
2. Mismatch：训练集和测试集差很多；

Cross Validation：

- 将训练集分为两部分，一部分做训练，一部分做测试

N-fold Cross Validation：

- 将训练集分为N部分，一个部分做测试，其它部分分别做训练，这样根据测试集从第1个部分到第N个部分，就会产生N个测试结果，然后对这N个结果取平均，获得模型的测试结果。例如：分为3份，首先第1，2份进行训练，第3份做测试，得到一个结果；再用第1，3份进行训练，第2份做测试，得到结果；再用第1份做测试，得到结果。对得到的三个结果进行平均，得到最终结果。

### 1.1 梯度下降失效的可能

梯度为0的点（Critical Point）：

1. 局部最小值
2. 马鞍点

如何判断？计算Hessian：

$$
L(\theta) \approx L(\theta^{'}) + \frac{1}{2}(\theta - \theta^{'})^TH(\theta - \theta^{'})
$$

在 $\theta^{'}$周围，令 $v = (\theta - \theta^{'})$ ，对于所有的 $v$ 如果

- $v^THv > 0 \quad \therefore L(\theta) > L(\theta^{'})$：则 $\theta{'}$ 是一个局部最小值，此时H为正定矩阵，特征值全为正；
- $v^THv < 0 \quad \therefore L(\theta) < L(\theta^{'})$：则 $\theta{'}$ 是一个局部最大值，此时H为负定矩阵，特征值全为负；
- 如果有时大于0，有时小于0，则 $\theta{'}$ 是一个马鞍点，此时H的特征值有正有负；

在马鞍点上：沿着Hessian的负的特征值（如果想要取最小值）对应的特征向量的方向对参数进行更新，即可得到更小Loss的参数。

![]({{ site.url }}/imgs/deeplearning/2/minimum_ratio.png)

上图中*Minimum ratio*表示为正的特征值数量和全部特征值数量的比值，如果全部特征值都是正的，就表示达到了最小值，可以看出实际上能达到局部最小值的时刻并不多。









