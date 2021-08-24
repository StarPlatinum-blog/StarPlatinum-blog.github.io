---
layout: post
title:  'C++ Learning Path'
date:   2021-06-06 19:30:00 +0800
categories: notes
---

[TOC]

<a name="Top"></a>

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

##### vector\<bool\>

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



##### 初始化列表，初始化一个类的对象

初始化列表如果初始化的是一个类，会调用这个类的构造函数：

```c++
class test {
private:

public:
    vector<int> children;
    test() : children(26, 1) {} // this act like vector<int>(26, 1);
};
```

##### 宏 高级

宏 ##，可以把两个宏参数连接成一个

do {} while(0) 的作用： 在宏中使用，保证{}内部的代码能够正确执行

##### 聪明的数组遍历

for(int i = 0; s[i]; i++)：遍历一个未知大小的c数组

##### 虚析构函数

虚析构函数的作用：为了避免内存泄漏，而且是当子类中会有指针成员变量时才会使用到。即虚析构函数使得在删除指向子类对象的基类指针时，可以调用子类的析构函数来实现释放子类中堆内存的目的，从而防止内存泄漏。

##### non-POD

什么是non-POD？ Firstly, 什么是POD？

> A **POD type** is a C++ **type** that has an equivalent in C, and that uses the same rules as C uses for initialization, copying, layout, and addressing. ... To make sure the other rules match, the C++ version must not have virtual functions, base classes, non-static members that are private or protected , or a destructor.

POD(Plain Old Data)是在C++中有着和在C相同作用的类型，POD有着和在C中一样的运行方式，比如初始化、拷贝、内存布局、寻址方式……为了保证此类型的所有的其他运行方式都一样，在C++不能对这些类型添加虚函数、基类、私有或保护的非静态成员以及析构函数。

>A POD (plain old data) object has one of these data types--a fundamental type, pointer, union, struct, array, or class--with no constructor, destructor and virtual function. Conversely, a non-POD object **is one for which a constructor exists**.

##### unique_ptr赋值

`std::unique_ptr`的正确赋值方法：

`std::unique_ptr<type> a(new type);`

用另一个`unique_ptr`初始化：

`std::unique_ptr<type> a = std::move(b);`

想声明一个多态的`unique_ptr`时

`std::unique_ptr<BaseClass> ptr(new ChildClass);`

##### unique_ptr所指对象做为bind的参数

和普通指针一样，用`*`来获取对象。

```c++
unique_ptr<A> a(new A);
auto test = std::bind(&A::test, *a)
```

##### std::bind与虚函数

`std::bind`在绑定一个类的成员函数时，需要将类的一个对象绑定在第一个参数位置(std::placeholder::\_1)。

不能将一个抽象类指针所指的对象绑定在其成员函数（任意成员函数，而不仅仅是纯虚函数）上。

会导致报错：`invalid abstract parameter type ‘Base’`（抽象父类）

当bind绑定一个父类的成员函数`Base::test`和一个子类的对象`A`时，如果

1. 父类的成员函数是一个虚函数，在子类`A `中对这个虚函数进行了重写，则会调用子类实现的函数`test`。（具有多态性）
2. 父类的成员函数是一个普通函数，在子类`A`中对这个函数进行重写，则会调用父类实现的函数`test`。

如果想要绑定指向子类对象的抽象基类指针，则需要使用`std::ref`

```c++
Base* b_ptr = new A(10);
auto fn = bind(&Base::test, std::ref(b_ptr));
```



## CPP Errors

1. c++ class does not name a type，可能原因：
   1. 未包含引用的类命名空间；
   2. 未包含引用的类头文件；
   3. 类名写错；
   4. 循环引用头文件。
   
2. passing ‘const xxx’ as ‘this’ argument discards qualifiers，可能原因：
   1. 使用`const`对象或对象指针调用了类的非`const`方法

3. 一个很奇怪的BUG，记录一下：

   1. 声明基类A，用`#ifndef #define #endif`进行保护；
   2. 声明子类B，同样用`#define`保护，`#include`基类A，并继承A；
   3. 声明子类C，同B；
   4. 建立`main.cpp`函数，`#include`子类B，C，则只有先包含进来的头文件中的类有效。

   解决方法，全部头文件使用`#pragma once`进行限定，应该是编译器预处理文件展开的问题，之后有空了再研究。

4. 在子类中都实现了基类的纯虚函数，且子类基类都实现了虚函数，出现undefined reference to `vtable for [ClassName]'

   1. 可能是因为连接时没有将`.cpp`文件编译生成的`.o`文件链接进来，如果使用`QtCreator`，可以尝试重新保存一下`CMakeLists.txt`，让`IDE`刷新`Cmake`选项。



----

[Return To Top](#Top)
