---
layout: post
title:  'C++ Learning Path'
date:   2021-06-06 19:30:00 +0800
categories: notes
---

## C++ Learning Path

### 1. 基础

《Computer Networking: A Top-down Approach》

《The C Programming Language》 B. Kernighan and D. Ritchie

《CSAPP》

《编译原理》

《现代操作系统》MIT 6.828

 《The C++ Standard Library》

《C++ Primer》CS 106A, CS 106B

- 写一个复数类或大整数类，实现基本的加减乘运算，熟悉封装与数据抽象；
- 写一个字符串类，熟悉内存管理与拷贝控制；
- 写一个简化的vector\<T\>类模板，熟悉基本的模板编程；
- 写一个表达式计算器，实现一个节点类的集成体系，体会面向对象编程。
  - 把四则运算式解析为表达式树，对根节点调用calculate虚函数就能算出表达式的值；
  - 可以略微尝试GP
- 写一个json解析器
- 写一个markdown解析器
- 写一个HTTP服务器
- 写一个git管理器
- 优秀C++开源代码
  - Google: Protobuf, leveldb, PCRE
  - muduo

[侯捷老师网课](https://github.com/19PDP/Bilibili-plus)



---

### 2. 进阶

《泛型编程与STL》 / 《C++编程规范》

《TCP/IP 详解》TCPv1

《Effective TCP/IP Programming》

《Effective C++》

《APUE》

《UNP》《Unix网络编程》杨继张译，据（陈硕）说翻译的非常好

《Head First 设计模式》

《研磨设计模式》



---

### 3. 实践





---

#### Q&A

Q: 关于造轮子？

A: 强调不要重复发明轮子，但是要有自制轮子的能力，非不能也，是不为也。



---

### Notes:

#### C++

`vector<bool>`：

- bool的存储不一定是一个bool数组，而会优化成一个bit存储一个bool；
- 元素不是由`allocator`构造的，而是会直接被设置在内存中恰当的bit中；
- 拥有一个新的成员函数`flip`，可以翻转所有bool的值；(and a new signature for member [swap](http://www.cplusplus.com/vector::swap).??)
- A special member type, [reference](http://www.cplusplus.com/vector::reference), a class that accesses individual bits in the container's internal storage with an interface that emulates a `bool` reference. Conversely, member type `const_reference` is a plain `bool`.
- The pointer and iterator types used by the container are not necessarily neither pointers nor conforming iterators, although they shall simulate most of their expected behavior.

```
            for (size_t i = 0; i < queNext.size(); ++i) {
                if (queNext[i] == nextVertex) {
                    break;
                }
            }
            if (i != queNext.size()) {
                queNext.push_back(nexzz)
            }
```

- vector::erase返回值
  - 返回的是删除之后的第一个元素的iterator，可以用于在迭代中更新迭代器。



初始化列表如果初始化的是一个类，会调用这个类的构造函数：

```c++
class test {
private:

public:
    vector<int> children;
    test() : children(26, 1) {} // this act like vector<int>(26, 1);
};
```



- 虚析构函数的作用：为了避免内存泄漏，而且是当子类中会有指针成员变量时才会使用到。即虚析构函数使得在删除指向子类对象的基类指针时，可以调用子类的析构函数来实现释放子类中堆内存的目的，从而防止内存泄漏。
