---
layout: post
title: Graph Theory
date: 21-10-06 00:59:04 +0800
categories: notes
---

实现一些图论中的算法。

### 1. Dijkstra

用Dijkstra算法求单源最短路径。

邻接矩阵如下：

|      |  C1  |  C2  |  C3  |  C4  |  C5  |  C6  |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  C1  |  0   |  50  | INF  |  40  |  25  |  10  |
|  C2  |  50  |  0   |  15  |  20  | INF  |  25  |
|  C3  | INF  |  15  |  0   |  10  |  20  | INF  |
|  C4  |  40  |  20  |  10  |  0   |  10  |  25  |
|  C5  |  25  | INF  |  20  |  10  |  0   |  55  |
|  C6  |  10  |  25  | INF  |  25  |  55  |  0   |



点击下图中的圆圈，它到其他顶点的最短路径就会在下面的表中显示出来。



<canvas id="myCanvas" width="800" height="300" ></canvas>

<table id="path">
<tr>
<th>To City</th>
<th>Path</th>
<th>Distance</th>
</tr>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
</table>

<script src="{{ site.url }}/js/dijkstra/driver.js"></script>



### 2. Hamilton Cycles

按路径遍历图的每个节点，且对每个节点只访问一次，最终返回起始节点。

<button onclick="DrawOptimalCycle()">Find optimal hamilton cycle</button>
<p id="hint">Optimal hamilton cycle's total weight:</p>
<canvas id="canvas_suboptimal" width="800" height="300" ></canvas>


---

## MISC

### NP完全问题

NP完全问题(NP-C问题)，是世界七大数学难题之一。 NP的英文全称是Non-deterministic Polynomial的问题，即多项式复杂程度的非确定性问题。简单的写法是 NP=P？。

#### P类问题

所有可以在多项式时间内求解的判定问题构成P类问题。判定问题：判断是否有一种能够解决某一类问题的能行算法的研究课题。

#### NP类问题

所有的非确定性多项式时间可解的判定问题构成NP类问题。

非确定性算法：非确定性算法将问题分解成猜测和验证两个阶段。算法的猜测阶段是非确定性的，算法的验证阶段是确定性的，它验证猜测阶段给出解的正确性。设算法A是解一个判定问题Q的非确定性算法，如果A的验证阶段能在多项式时间内完成，则称A是一个多项式时间非确定性算法。

有些计算问题是确定性的，例如加减乘除，只要按照公式推导，按部就班一步步来，就可以得到结果。但是，有些问题是无法按部就班直接地计算出来。比如，找大质数的问题。有没有一个公式能推出下一个质数是多少呢？这种问题的答案，是无法直接计算得到的，只能通过间接的“猜算”来得到结果。这也就是非确定性问题。而这些问题的通常有个算法，它不能直接告诉你答案是什么，但可以告诉你，某个可能的结果是正确的答案还是错误的。这个可以告诉你“猜算”的答案正确与否的算法，假如可以在多项式（polynomial）时间内算出来，就叫做多项式非确定性问题。

#### NPC问题

NP中的某些问题的复杂性与整个类的复杂性相关联.这些问题中任何一个如果存在多项式时间的算法,那么所有NP问题都是多项式时间可解的.这些问题被称为NP-完全问题(NPC问题)。



