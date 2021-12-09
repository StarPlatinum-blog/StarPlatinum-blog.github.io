---
layout: post
title: Coursera Algorithms
date: 21-12-09 08:11:04 +0800
categories: nots
---

<head>
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            inlineMath: [['$','$']]
            }
        });
    </script>
</head>

## 1. 并查集(Union Find)

概述：用一个数组存储各个元素之间的连接关系，可以用来快速查找两个元素是否是连通的。

### 1. 快速查找并查集(Quick Find UF)

并查集由一个数组实现，数组中存储的是与对应索引所表示的元素相连的根节点的索引。

方法：

| name           | functionality                                                | time complexity                    |
| -------------- | ------------------------------------------------------------ | ---------------------------------- |
| QuickFindUF(n) | 构造函数，按照元素个数初始化数组，并把数组的每一项赋值为它的索引 | O(N) (N个元素)                     |
| connected(a,b) | 判断两个索引位置代表的元素是否是连通的，只需要对比它们在数组中的值是否相同即可 | O(1)                               |
| union(a,b)     | 合并两个连通分量（component），即把数组中两个值不同的元素集合的值改成相同的。 | O(N) (最坏情况下N-1个元素都要修改) |

union举例：
$$
QFUF = \{\{1,2,3\},\{4,5\},\{6,7,8\}\}
\\
数组表示为：[1,1,1,4,4,6,6,6]
\\
如果对元素3和6做\mathtt{union(3, 6)}操作，则可以得到以下并查集：
\\
QFUF = \{\{1,2,3,6,7,8\},\{4,5\}\}
\\
数组中的操作就是把之前的6改成1：[1,1,1,4,4,1,1,1]
$$
缺点：

1.   合并的时间复杂度太高了；
2.   树很平坦，但是将它维护为平坦的开销太大了；

### 2. 快速合并并查集(Quick Union UF)

仍然由一个数组实现，数组中存储的是索引表示元素的父节点的索引。

方法：构造函数和QFUF相同

| name           | functionality                                                | time complexity |
| -------------- | ------------------------------------------------------------ | --------------- |
| root(a)        | 寻找元素的根节点                                             | 最差情况O(N)    |
| connected(a,b) | 调用root()比较两索引的根节点是否相同，然后判断它是否连通     | 最差情况O(N)    |
| union(a,b)     | 调用root()获得根节点，然后把一个分量的根节点的值改成另一个分量的根节点的索引 | 最差情况O(N)    |

缺点：

1.   虽然合并的时间有所下降，但是在树很高的情况下依然开销很大；
2.   寻找相邻节点时开销太大了；

### 3. 带权快速合并并查集（Weighted Quick Union UF）

使用一个额外的数组来记录每个节点所在子树的大小，在合并时比较二者大小，然后把小的树合并到大的树的根节点位置。同时在寻找根节点时，不断地通过将访问节点的父节点改为祖父节点（父节点的父节点），来减小树的深度（Path Compression）。优化了QUUF的建树过程，尽量保证树的高度较小。

| name       | functionality                                                | time complexity |
| ---------- | ------------------------------------------------------------ | --------------- |
| root(a)    | 在寻找根节点的同时，调整父节点为祖父节点                     | O(lg*N)         |
| union(a,b) | 合并两个根节点前，比较两树的大小，然后把较小的树插入较大树的根节点 | O(lg*N)         |



## Interview Questions

1.   **Social network connectivity.** Given a social network containing *n* members and a log file containing *m* timestamps at which times pairs of members formed friendships, design an algorithm to determine the earliest time at which all members are connected (i.e., every member is a friend of a friend of a friend ... of a friend). Assume that the log file is sorted by timestamp and that friendship is an equivalence relation. The running time of your algorithm should be $m \log n$ or better and use extra space proportional to *n*.

     Ans: Use WQUPC or WQU at every timestamp to union the friends which takes O(lgN), and check the root of all people in the network O(lgN). If the all of them is from the same root, return true.

2.   **Union-find with specific canonical element.** Add a method $$\mathtt{find()}$$ to the union-find data type so that $\mathtt{find(i)}$ returns the largest element in the connected component containing i. The operations, $\mathtt{union()}$, $\mathtt{connected()}$, and $\mathtt{find()}$ should all take logarithmic time or better.

     For example, if one of the connected components is $\{1, 2, 6, 9\}$, then the $\mathtt{find()}$ method should return 9 for each of the four elements in the connected components.

     Ans: maintain an extra array to the weighted quick-union data structure that stores for each root $\mathtt{i}$ the large element in the connected component containing $\mathtt{i}$. Update the maximum element when do $\mathtt{union()}$.

3.   **Successor with delete**. Given a set of n integers $S = \{ 0, 1, ... , n-1 \}$ and a sequence of requests of the following form:

     -   Remove *x* from *S*
     -   Find the *successor* of *x*: the smallest *y* in *S* such that $y \ge x$.

     design a data type so that all operations (except construction)  take logarithmic time or better in the worst case.

     Ans: use the modification of the union−find data discussed in the previous question.

$O(N^2)$的时间复杂度太慢了。



