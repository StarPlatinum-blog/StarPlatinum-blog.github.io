---
layout: post
title: C++ Primer 2
date: 21-09-27 10:00:41 +0800
categories: CPP
---

## C++ Primer 第五版复习

### 2. 变量和基本类型

#### 要点

1.   `wchar_t`能够存储机器最大扩展字符集中的任意一个字符，`char16_t`和`char32_t`位Unicode字符集服务；

2.   如何选择数字基本类型：
     1.   明确知晓不可能负时，选择无符号类型；
     2.   日常使用`int`进行整数运算，如果数值超过`int`则使用`long long`，原因是`long`的大小和`int`一般一样，而`short`又太小；
     3.   不要使用`bool char`作为数字类型，如果实在需要一个只占一字节的数字时，使用`unsigned char`或者`signed char`来明确指出数字是否可以为负；
     4.   浮点数运算使用`double`，`float`精度不够且计算速度并不比`double`快，`long double`一般情况下没有必要，同时性能损耗较大；
     
3.   无符号类型和有符号类型变量在同一表达式中时，有符号类型会自动转换为无符号类型：`-1 --> 4294967295`导致程序出现不可预见错误；

4.   要理解一个变量究竟是什么，可以从变量名开始从右往左阅读它的定义，离变量名最近的符号对变量有最直接的影响，其他的符号制定了变量的类型。例如`int *&r;`定义了一个`int*`类型的引用；

5.   默认状态下，`const`常量的值仅在文件内有效，可以通过`extern`关键字使其在外部也有效，也可以在`.h`文件中声明`extern const int x;`，然后在其他文件中，例如`.cc`中使用`extern const int x = 1;`；

6.   临时量：编译器需要一个空间来暂存表达式的求值结果时创建的一个未命名的对象。如下面的代码：

     ```c++
     double s = 2313.213545;
     const int &r = s;
     ```

     在实际执行时，先创建了一个临时量来将`double`类型的变量转换成`const int`，然后再创建引用：

     ```c++
     double s = 2313.213545;
     const int temp = s; // added by compiler
     const int &r = temp;
     ```

7.   只能使用常量引用来引用一个常量

     ```c++
     const int x = 1;
     const int &r = x;
     int &r1 = x; // This is illegal
     ```

     `const`引用一个变量时，不能通过这个常量引用来修改变量的值，但是如果同时有一个引用变量绑定了这个变量的值时，可以通过这个引用变量来修改：

     ```c++
     int x = 1;
     int &r1 = x;
     const int &cr1 = x;
     r1 = 2; // This is leagal, cr1 will be 2 at the same time
     cr1 = 3; // This is illeagal
     ```

     



### 6. 函数

#### 要点

1.   编译器预处理变量：
     1.   `__func__`：存放函数名；
     2.   `__FILE__`：存放当前文件名；
     3.   `__LINE__`：存放当前行号；
     4.   `__TIME__`：存放文件编译时间的字符串字面值；
     5.   `__DATE__`：存放文件编译日期的字符串字面值；
