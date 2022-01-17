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

| name           | functionality                               | time complexity        |
| -------------- | ------------------------------------------- | ---------------------- |
| QuickFindUF(n) | 构造函数，按照元素个数初始化数组，并把数组的每一项赋值为它的索引            | O(N) (N个元素)            |
| connected(a,b) | 判断两个索引位置代表的元素是否是连通的，只需要对比它们在数组中的值是否相同即可     | O(1)                   |
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

1. 合并的时间复杂度太高了；
2. 树很平坦，但是将它维护为平坦的开销太大了；

### 2. 快速合并并查集(Quick Union UF)

仍然由一个数组实现，数组中存储的是索引表示元素的父节点的索引。

方法：构造函数和QFUF相同

| name           | functionality                             | time complexity |
| -------------- | ----------------------------------------- | --------------- |
| root(a)        | 寻找元素的根节点                                  | 最差情况O(N)        |
| connected(a,b) | 调用root()比较两索引的根节点是否相同，然后判断它是否连通           | 最差情况O(N)        |
| union(a,b)     | 调用root()获得根节点，然后把一个分量的根节点的值改成另一个分量的根节点的索引 | 最差情况O(N)        |

缺点：

1. 虽然合并的时间有所下降，但是在树很高的情况下依然开销很大；
2. 寻找相邻节点时开销太大了；

### 3. 带权快速合并并查集（Weighted Quick Union UF）

使用一个额外的数组来记录每个节点所在子树的大小，在合并时比较二者大小，然后把小的树合并到大的树的根节点位置。同时在寻找根节点时，不断地通过将访问节点的父节点改为祖父节点（父节点的父节点），来减小树的深度（Path Compression）。优化了QUUF的建树过程，尽量保证树的高度较小。

| name       | functionality                     | time complexity |
| ---------- | --------------------------------- | --------------- |
| root(a)    | 在寻找根节点的同时，调整父节点为祖父节点              | O(lg*N)         |
| union(a,b) | 合并两个根节点前，比较两树的大小，然后把较小的树插入较大树的根节点 | O(lg*N)         |

### Interview Questions

1. **Social network connectivity.** Given a social network containing *n* members and a log file containing *m* timestamps at which times pairs of members formed friendships, design an algorithm to determine the earliest time at which all members are connected (i.e., every member is a friend of a friend of a friend ... of a friend). Assume that the log file is sorted by timestamp and that friendship is an equivalence relation. The running time of your algorithm should be $m \log n$ or better and use extra space proportional to *n*.
   
   Ans: Use WQUPC or WQU at every timestamp to union the friends which takes O(lgN), and check the root of all people in the network O(lgN). If the all of them is from the same root, return true.

2. **Union-find with specific canonical element.** Add a method $$\mathtt{find()}$$ to the union-find data type so that $\mathtt{find(i)}$ returns the largest element in the connected component containing i. The operations, $\mathtt{union()}$, $\mathtt{connected()}$, and $\mathtt{find()}$ should all take logarithmic time or better.
   
   For example, if one of the connected components is $\{1, 2, 6, 9\}$, then the $\mathtt{find()}$ method should return 9 for each of the four elements in the connected components.
   
   Ans: maintain an extra array to the weighted quick-union data structure that stores for each root $\mathtt{i}$ the large element in the connected component containing $\mathtt{i}$. Update the maximum element when do $\mathtt{union()}$.

3. **Successor with delete**. Given a set of n integers $S = \{ 0, 1, ... , n-1 \}$ and a sequence of requests of the following form:
   
   - Remove *x* from *S*
   - Find the *successor* of *x*: the smallest *y* in *S* such that $y \ge x$.
   
   design a data type so that all operations (except construction)  take logarithmic time or better in the worst case.
   
   Ans: use the modification of the union−find data discussed in the previous question.

$O(N^2)$的时间复杂度太慢了。

## 2. 算法分析

![order-of-growth classifications](https://algs4.cs.princeton.edu/14analysis/images/classifications.png)

$O(N^2logN)$时间解决3-Sum问题：先对数组进行排序，然后用二重循环遍历数组，然后在最后一个数组中通过二分查找寻找能把遍历前两个数组得到的数消为0的数。

双log画图：N,O(N)轴变量都取log，然后作图

并不是所有的三重循环都是$O(N^3)$，当循环每次对索引的增加为m的倍数时，则这次循环的复杂度是$O(log_mN)$。

一个正确的二分查找的实现：

```java
public static int binarySearch(int[] a, int key) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if         (key < a[mid]) hi = mid - 1;
        else if (key > a[mid]) lo = mid + 1;
        else return mid;
    }
    return -1;
}
```

复杂度表示

| notation  | provides         | example       | shorthand for                        | used to    |
| --------- | ---------------- | ------------- | ------------------------------------ | ---------- |
| Big Theta | 向算法的增长渐进         | $\Theta(N^2)$ | $\frac{1}{2}N^2$,$10N^2$             | 分类算法       |
| Big Oh    | $\Theta(N^2)$或更小 | $O(N^2)$      | $10N^2$,$100N^2$                     | 找到算法复杂度的上界 |
| Big Omega | $\Theta(N^2)$或更大 | $\Omega(N^2)$ | $\frac{1}{2}N^2$,$N^5$,$N^3+22NlogN$ | 找到算法复杂度的下界 |

### Interview Questions

1. 用平方项时间解决3-Sum问题：在O(N)时间内解决a[i] + a[j] = x问题。（LeetCode 3-Sum）
2. 搜索双音数组：双音数组（bitonic array）是指一个由一个升序排列的数组和一个降序排列数组相邻组成的数组，已知一个数组，判断它是双音数组。
   - 标准解法：最差情况下使用~$3lgN$次比较；
   - 加分解法：最差情况下使用~$2lgN$次比较；

## 3. 栈与队列

课程内容：

1. 使用单链表和可变数组实现稳健的（robust）栈和队列；
2. 介绍JAVA的泛型和迭代器；
3. 栈和队列的常见应用，例如解析算术表达式、仿真排队系统；

模块化编程：分离接口与实现。

>   Don't use a library until you understand its API.
> 
>   (In this course) Can't use a library until we've implemented it in class.

JAVA默认禁止声明泛型数组，需要使用泛型数组时可以使用如下的声明：

```java
s = (Item[]) new Object[capacity]; // 把Object数组强制转换为Item数组
```

泛型栈：

```java
public class Stack<Item>
{
    private Node first = null;
    private class Node
    {
        Item item;
        Node next;
    }

    public boolean isEmpty()
    { return first == null; }
    public void push(Item item)
    {
        Node oldfirst = first;
        first = new Node();
        first.item = item;
        first.next = oldfirst;
    }
    public Item pop()
    {
        Item item = first.item;
        first = first.next;
        return item;
    }
}
```

为什么JAVA不支持泛型数组？

>   Quote: Arrays of generic types are not allowed because they're not sound. The problem is due to the interaction of Java arrays, which are not statically sound but are dynamically checked, with generics, which are statically sound and not dynamically checked.

- 一般来说可以用一个`栈`来去除递归，把它变为迭代

Dijkstra双栈算法：通过一个数字栈和一个符号栈，求算术表达式的值，具体步骤为：

1. 逐个扫描表达式：
   1. 遇到`(`，忽略；
   2. 遇到数字`i`，压入数字栈中；
   3. 遇到`)`，从数字栈中`pop`两个数字，从符号栈中`pop`一个符号，然后求它们的值；

用除二取余法把10进制数转为2进制：

```java
int n = 50;

Stack<Integer> stack = new Stack<Integer>();
while (n > 0) {
    stack.push(n % 2);
    n = n / 2;
}

for (int digit : stack) {
    StdOut.print(digit);
}

StdOut.println();
```

### Interview Questions

2. Stack with max：给栈加入一个`return-the-maximum operation`。
   
   用两个栈来存储，一个栈按照顺序来存储数据，另一个栈按照数据大小存储，栈顶为最大数（具体方法为：当要存一个数字到这个栈时，逐个比较栈顶元素和它的大小，如果它更大，就把它入栈，如果它更小，就pop栈顶元素，然后继续比较下一个元素）

### Homeworks

#### 实现泛型双端队列：`deque`（读作deck）

ez work

#### 实现泛型随机队列：`randomized queue`，随机队列和普通队列的唯一区别是，随机队列在删除元素时是按均匀分布随机删除。

实现`constant time`的出队：

1. 使用动态数组来存储元素；
   - 动态数组维护：
     1. 入队时根据数组长度进行容量扩充，当前数组空间不够时将数组长度扩大两倍；
     2. 出队时根据数组长度进行容量缩减，当数组实际占用不到数组的$\frac{1}{4}$时，将数组容量缩小为原来的$\frac{1}{2}$；
2. 出队时，随机选取数组下标，然后将下标位置的元素置为数组的最后一个元素交换，最后把这个元素置为`null`，确保在GC时会被清除。（JAVA实现，C++实现时可以利用智能指针或者手动delete）

## 4. 元素排序

课程内容：

1. 介绍排序问题和JAVA的接口；
2. 学习选择排序和插入排序，以及它们的变体；
3. 学习两种均匀打乱数组的算法；
4. 排序算法的应用：利用Graham scan算法计算凸包（convex hull）

### 4.1  JAVA接口

`Insertion.sort()`：对一个数组进行升序排序，其中：

- 数字直接按照大小排序；
- 英文按照字母表排序；

`sort()`通过调用数组类型的`compareTo`方法来实现排序中的大小比较，`compareTo`方法实现了`java`的`Comparable`接口。

#### 辅助函数

1. `boolean less(Comparable v, Comparable w)`，用于判断`v`是否小于`w`，`v < w`时返回true。

```java
private static boolean less(Comparable v, Comparable w)
{ return v.compareTo(w) < 0; }
```

2. `void exch(Comparable[] a, int i, int j)`，交换数组a中的第`i`个和第`j`个元素。

```java
private static void exch(Comparable[] a, int i, int j)
{
    Comparable swap = a[i];
    a[i] = a[j];
    a[j] = swap;
}
```

3. `boolean isSorted(Comparable[] a)`，判断数组a是否已经被升序排序。

```java
private static boolean isSorted(Comparable[] a)
{
    for (int i = 1; i < a.length; i++)
        if (less(a[i], a[i-1])) return false;
    return true;
}
```

### 4.2 选择排序

从第一个元素开始，寻找最小的数，然后和数组中的第一个数交换位置，直到最后一个元素。

### 4.3 插入排序

从第一个元素开始，逐个读取下一个元素，然后逐个与自己的前一个元素进行比较，如果较小则交换，然后再和自己交换后位置的前一个元素比较，直到最后一个位置。

#### 逆序数

定义：一个数组中顺序不正确的元素对数

如果一个数组中的逆序数$\leq \mathbf{c}N$，则它是一个部分排序数组。例如：

1. 一个已排好序的数组后在连接一个未排序的数组；
2. 一个数组里只有10个数未排序；

### 4.4 希尔排序(shell sort)

和插入排序类似，但每次和自己之前的第`h`个元素比较，称为`h-sort`，h取由大到小（最小的h一定是1），做多次排序，最终得到一个结果。
