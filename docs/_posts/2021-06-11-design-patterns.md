---
layout: post
title:  'Design Patterns'
date:   2021-06-11 17:33:00 +0800
categories: notes
---

<a name="Top"></a>

使用设计模式的目标：应对变化，提高复用（二进制级别的复用）



### 模式分类

#### GOF-23的分类：

从目的来看：

1. 创建型（Creational）：将对象的部分创建工作交给其他类或者其他对象，应对需求变化为对象创建时带来的冲击；
2. 结构型（Structural）：通过类继承或对象组合获得灵活的结构，应对需求变化为对象的结构时带来的冲击；
3. 行为型（Behavioral）：通过类继承或对象组合来划分类与对象间的职责，应对需求变化为多个交互的对象时带来的冲击。

从范围来看：

1. 类模式处理类与子类的静态关系；
2. 对象模式处理对象间的动态关系。

#### 李建忠老师的分类：

从封装变化角度对模式分类

1. 组件协作：
   - [Template Method](#TemplateMethod)
   - [Strategy](#Strategy)
   - [Observer/Event](#observer)
2. 单一职责：
   - [Decorator](#Decorator)
   - [Bridge](#Bridge)
3. 对象创建：
   - [Factory Method](#Factory)
   - [Abstract Factory](#AbstractFactory)
   - [Prototype](#Prototype)
   - [Builder](#Builder)
4. 对象性能：解决性能问题
   - [Singleton](#Singleton)
   - [Flyweight](#Flyweight)
5. 接口隔离：
   - [Facade](#Facade)
   - [Proxy](#Proxy)
   - [Adapter](#Adapter)
   - [Mediator](#Mediator)
6. 状态变化：
   - [State](#State)
   - [Memento](#Memento)
7. 数据结构：
   - Composite
   - Iterator
   - Chain of Responsibility
8. 行为变化：
   - Command
   - Visitor
9. 领域问题：
   - Interpreter



[UML关系类型](#UML)



### Refactoring to Patterns

重构关键技法：

1. 静态绑定 --> 动态绑定
2. 早绑定 --> 晚绑定（早产生的东西调用晚的）
3. 继承 --> 组合
4. 编译时依赖 --> 运行时依赖
5. 紧耦合 --> 松耦合



### 面向对象设计原则

1. 设计原则重于设计模式，掌握了设计原则之后可以产生出自己的设计模式；
2. 设计模式可能会过时，但设计原则不会；
3. 不符合设计原则的设计模式是错误的。

#### 原则 1：依赖倒置原则（DIP）

1. 高层模块（稳定）不应该依赖于低层模块（变化），二者都应该依赖于抽象（稳定）； 
2. 抽象（稳定）不应该依赖于实现细节，实现细节应该依赖于抽象（稳定）。

总结：稳定的不应该依赖于不稳定的东西。通过抽象可以隔离变化。

#### 原则 2：开放封闭原则（OCP）

1. 对扩展开放，对更改封闭；
2. 类模块应该是可扩展的，但是不可修改。

总结：应该使用扩展的方式去应对变化。

#### 原则 3：单一职责原则（SRP）

1. 一个类应该仅有一个引起它变化的原因；
2. 变化的方向隐含着类的责任。

总结：一个类不应该有太多的成员，这意味着它的职责不是唯一的。

#### 原则 4：Liskov替换原则（LSP）

1.  子类必须能够替换它们的基类；
2. 继承表达类型抽象。

总结：父类能够使用的方法，子类也应该都能使用。二者是组合的关系。

#### 原则 5：接口隔离原则（ISP）

1. 不应该强迫客户程序依赖它们不用的方法；
2. 接口应该小而完备。

总结：不应该把不必要的接口暴露出去。子类内部使用的方法应该是private的。

#### 原则 6：优先使用对象组合，而不是类继承

1. 类继承通常为白箱复用，对象组合（Class A中有一个Class B）通常为黑箱复用；
2. 继承在某种程度上破坏了封装性，子类父类耦合度高；
3. 而对象组合则只要求被组合的对象具有良好定义的接口，耦合度低。

总结：不是很多东西有继承的关系。很多时候会误用。

#### 原则 7：封装变化点

1. 使用封装来创建对象之间的分界层，让设计者可以在分界层的一侧进行修改，而不会对另一侧产生不良的影响，从而实现层次间的松耦合。

两类不应做的假设：

1. 所有的部分都是变化的：则任何设计模式都无效；
2. 所有的部分都是稳定的：则不需要实现任何设计模式。

总结：封装更高层次的理解是封装变化点，一侧变化一侧稳定。

#### 原则 8：针对接口编程，而不是针对实现编程

1. 不将变量类型声明为某个特定的具体类，而是声明为某个接口；（不能绝对化）
2. 客户程序无需获知对象的具体类型，只需要知道对象所具有的接口；
3. 减少系统中各部分的依赖关系，从而实现“高内聚，松耦合”的类型设计方案。

总结：和依赖倒置原则（DIP）相辅相成。



#### 深入：接口标准化

> 产业强盛的标志

核心：分工协作，实现复用  



<a name="TemplateMethod"></a>

---

### 模式 1： Template Method

`Intention` 存在一个稳定的算法骨架、步骤，在这个骨架中的部分子程序是不稳定的，则此时可以使用Template Method。

`Definition` 在基类中定义一个算法的骨架，将一些步骤延迟到子类中，使得子类可以不改变算法的结构即可重定义该算法的某些特定步骤。

`Hint` 延迟到子类：基类定义虚函数让子类去实现。

`Hint` C++基类的必须写析构函数，并且这个析构函数应该是虚函数。

`Hint` C++中稳定的部分应该写成非虚函数，支持变化的部分应该写成虚函数。

`Conclusion`

1. 非常基础性的设计模式。在面向对象系统中有大量应用。
2. 机制非常简洁（虚函数的多态），为应用程序框架提供了灵活的扩展点，是代码复用方面的基本。
3. 反向控制结构。（库来调用子类）
4. 被Template Method调用的方法可以有实现，也可以没有任何实现（抽象方法、纯虚函数），推荐将其设置为protected方法。

`Practice` [01 Template Method](https://github.com/CaptainXX/Design_Patterns/tree/main/01_template_method)

 

<a name="Strategy"></a>

---

### 模式 2：Strategy

`Intention` 存在一系列可能需要扩展或者修改的算法，在某个固定的位置根据不同情况调用不同方法，则可以使用Strategy来解耦这些算法。

`Definition` 定义一系列算法，把它们一个个封装起来，并且使它们可以互相替换。本模式使得算法可独立于使用它的客户而变化。

`Hint` 需要用Strategy的代码特征：有大量的`if else`出现，“if else 散弹”。 

`Hint` 当存在绝对稳定不变的情况时，不应该用Strategy，而是应该用`if else`，例如一周七天每天做什么事。

`Conclusion`

1. Strategy及其子类为组件提供了一系列**可重用的算法**，从而可以使得类型在运行时方便地根据需要在各个算法之间进行切换；
2. Strategy模式提供了用条件判断语句以外的**另一种选择**，消除条件判断语句，就是在解耦合。含有许多条件判断语句的代码通常都需要Strategy模式；
3. 如果Strategy没有实例变量，那么各个上下文可以**共享同一个Strategy对象**，从而节省对象开销。（Singleton）

`Practice` [02 Strategy](https://github.com/CaptainXX/Design_Patterns/tree/main/02_Strategy/02_Strategy)



<a name="observer"></a>

---

### 模式 3：Observer/Event

`Intention` 定义对象间一对多的关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

`Definition` 当多个对象之间存在通知依赖关系时，即可使用Observer模式实现他们之间的松耦合。

`Hint` 通知依赖关系：一个对象（目标）的状态发生改变，所有的依赖对象（观察者）都能得到通知。

`Hint` 进度条可以使用Observer模式实现。

`Hint` C++一般不推荐使用多继承，会造成耦合的问题；但是推荐一种多继承的方法，就是只有一个是父类，其他的都是接口。

`Conclusion`

1. 使用面向对象的抽象，Observer模式使得我们可以独立地改变目标与观察者，从而使二者之间的依赖关系达到松耦合；
2. 目标发送通知时，无需指定观察者，通知（可以携带通知信息作为参数）会自动传播；
3. 观察者自己决定是否需要订阅通知，目标对象对此一无所知；
4. Observer模式是基于事件的UI框架中非常常用的设计模式，也是MVC模式的一个重要组成部分。

`Practice` [03 Observer](https://github.com/CaptainXX/Design_Patterns/tree/main/03_Obsever/03_Obsever)



<a name="Decorator"></a>

---

### 模式 4：Decorator

`Intention` 动态地给一个对象增加一些额外的职责，相比生成子类来说更加灵活。

`Definition` 想要给一个基类增加额外职责时，如果这些职责是可以互相依赖的（m个子类和n个子类相互依赖），则可以将其中的m个子类通过聚合父类指针的方式，与其他n个子类形成依赖（传入子类指针）。将这些子类的指针到一个介于父类和子类之间的类，同时继承父类，以保持接口一致，这个中间的类就是Decorator。

`Hint` 组合(m+n)优于继承(m*n)；

`Hint` 当需要的子类指针都是同一父类的子类时，则可以将其指针声明为父类指针，可以有效增加复用；

`Hint` 当子类中都有相同成员时，应当把它往上提，上提有两种方法：1. 提到基类中，2. 新增中间类Decorator；

`Hint` 用组合的方式引出多态的使用；

`Hint` Decorator继承父类是为了维护接口的规范，组合父类是为了实现子类的运行时多态。

`Conclusion` 

1. 通过采用组合而非继承的手法，Decorator模式实现了运行时动态扩展对象功能的能力，而且可以根据需要扩展多个功能。避免了使用继承带来的“灵活性差”和“多子类衍生问题”。
2. Decorator类在接口上表现为is-a Component的继承关系，即Decorator类继承了Component类所具有的接口。但在实现上又表现为has-a Component的组合关系，即Decorator类又使用了另外一个Component类。
3. Decorator模式的目的并非解决“多子类衍生的多继承”问题，Decorator模式应用的要点在于解决“主体类在多个方向上的扩展功能”——是为“装饰”的含义。

`Usage` 

1. 在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责；
2. 处理那些可以撤销的职责；
3. 当不能采用生成子类的方法进行扩充的一种可能的情况是：有大量的扩展（上文的m很大），为支持每一种组合将产生大量的子类（给n个子类每个都扩展出m个子类，则一共需要实现m*n个子类）。

`Practice` [04 Decorator](https://github.com/CaptainXX/Design_Patterns/tree/main/04_Decorator/04_Decorator)



<a name="Bridge"></a>

---

### 模式 5：Bridge

`Intention` 由于某些类型的固有实现逻辑，使得他们具有两个或多个变化的纬度。

`Definition` 将一个类的抽象部分和它的实现部分分离，使它们可以独立地变化。

`Hint` C++中多用单继承+组合的模式，少用多继承，多继承破坏了单一职责原则。

`Conclusion`

1. Bridge模式使用“对象间的组合关系”解耦了抽象和实现之间固有的绑定关系，使得抽象和实现可以沿着各自的纬度来变化，即“子类化”它们。
2. Bridge模式有时候类似于多继承方案，但是多继承方案违背单一职责原则，复用性较差。Bridge模式是比多继承方案更好的解决方法。
3. Bridge模式的应用一般是在“两个非常强的变化纬度”，有时一个类也有多于两个的变化纬度，这时可以使用Bridge的扩展模式。

`Usage`

1. 不希望在抽象和它的实现之间有一个固定的绑定关系。比如希望在运行时选择或者切换程序的实现。
2. 类的抽象和它的实现都应该可以通过生成子类的方法加以扩充。这时Bridge模式使你可以对不同的抽象接口和实现部分进行组合，并分别对它们进行扩充。
3. 对一个抽象的实现部分的修改应对客户不产生影响，即客户的代码不必重新编译。
4. （C++）你想对客户完全隐藏抽象的实现部分。在C++中，类的表示在类接口中是可见的。
5. 想在多个对象间共享实现（比如引用计数），但同时要求客户并不知道这一点。

`Practice` [05_Bridge](https://github.com/CaptainXX/Design_Patterns/tree/main/05_Bridge/05_Bridge)



<a name="Factory"></a>

---

### 模式 6：Factory Method

`Definition` 定义一个用于创建对象的接口，让子类决定实例化哪一个类。Factory Method使得一个类的实例化延迟（目的：解耦，手段：虚函数）到子类。

`Hint` 在前面的设计模式代码中，我们new一个类的对象时，违背了依赖倒置原则，依赖于类的实现而不是依赖于接口。

`Hint`  `PStream* buffered_file_s = new PStreamBuffered(file_s);`

`Hint` 等号左侧是一个基类指针，这是依赖接口，但等号右边是一个具体的类，这是依赖实现，需要把等号右边也变成依赖于接口。

`Conclusion`

1. Factory Method模式用于隔离类对象的使用者和具体类想之间的耦合关系、面对一个经常变化的具体类型，紧耦合关系（new）会导致软件的脆弱；
2. Factory Method模式通过面向对象的手法，将所要创建的具体对象工作延迟到子类，从而实现一种扩展（而非更改）的策略，较好地解决了这种紧耦合关系；
3. Factory Method模式解决“单个对象”的需求变化。缺点在于要求创建方法/参数相同。

`Usage`

1. yigexitong 



`Practice` [06 Factory Method](https://github.com/CaptainXX/Design_Patterns/tree/main/06_Factory_Method/06_Factory_Method)



<a name="AbstractFactory"></a>

---

### 模式 7：Abstract Factory

`Intention` 为了解决一系列相互依赖的对象的创建工作。绕过常规的new方法。

`Definition` 提供一个接口，让该接口负责创建一系列“相关或者相互依赖的对象”，无需指定他们具体的类。

`Hint` 实际上就是把工厂方法需要多种工厂创建的多个相互依赖的对象的创建函数都合并到同一个工厂类中。

`Hint` 能够创建多个对象的工厂就是抽象工厂，而只创建一种对象的抽象工厂即工厂方法。

`Hint` 高内聚：有相关性的就放在一起。

`Hint` 每个模式稳定的部分就是它的缺点。但是如果在实际工程中没有变化，可以认为它是稳定的。由此选择正确的模式。

`Hint` 抽象工厂与工厂方法有相同的缺点，同样在于要求创建方法/参数相同。

`Hint` 工厂方法和抽象工厂一般并称为工厂模式。

`Conclusion` 

1. 如果没有应对“多系列对象构建”的需求变化，则没有必要使用Abstract Factory模式，这时候使用简单工厂完全可以；
2. “系列对象”指的是在某一特定系列下对象之间有相互依赖或作用的关系。不同系列的对象之间不能相互依赖；
3. Abstract Factory模式主要在于应对新系列的需求变动。其缺点在于难以应对“新对象”的需求变动。

`Usage`

1. 一个系统要独立于它的产品的创建、组合和表示；
2. 一个系统要由多个产品系列中的一个来配置；
3. 要强调一系列相关的产品对象的设计以便进行联合使用；
4. 提供一个产品类库，但只想显示它们的接口而不是实现。

`Practice` [07 Abstract Factory](https://github.com/CaptainXX/Design_Patterns/tree/main/07_Abstract_Factory/07_Abstract_Factory)



<a name="Prototype"></a>

---

### 模式 8：Prototype

`Intention` 面对某些复杂对象的构建。 

`Hint` 相对工厂模式使用较少。

`Hint` 通过克隆原型来创建对象，深拷贝（拷贝构造函数需要写正确）。

`Hint` 初始对象（较为复杂）的状态不适合直接使用，则可以使用原型，克隆出原型的状态，而不是工厂模式。

`Conclusion` 

1. 用于隔离类对象的使用者和具体类型之间的耦合关系，它同样要求这些易变类有“稳定的接口”。
2. 对于如何创建易变类的实体对象，采用原型克隆的方法来做。它使得我们可以非常灵活地动态创建拥有某些稳定接口的新对象。所需工作仅仅是注册一个新类的对象（即原型），然后在任何需要的地方Clone。
3. Clone方法可以利用某些框架中的序列化来实现深拷贝。

`Usage`

1. 当一个系统应该独立于它的产品创建、构成和表示时；
2. 当要实例化的类是在运行时指定时，例如通过动态装载；
3. 为了避免创建一个与产品类层次平行的工厂类层次时。
4. 当一个类的实例只能有几个不同状态组合中的一种时。建立相应数目的原型并克隆它们可能比每次用合适的状态手工实例化该类更方便一些。

`Practice` [08 Prototype](https://github.com/CaptainXX/Design_Patterns/tree/main/08_Prototype/08_Prototype)



<a name="Builder"></a>

---

### 模式 9：Builder

`Intention` 面临复杂对象的构建。

`Definition` 将一个复杂对象的构建与表示相分离，使得同样的构建过程（稳定）可以创建不同的表示（变化）。

`Hint` C++ 中在构造函数里调用虚函数会导致静态绑定，而不是动态绑定。子类构造函数必须先调用父类的构造函数，所以如果在父类调用虚函数，子类的构造函数还未运行结束，则不会调用子类重写的虚函数。

`Hint` 类复杂就拆开，类简单就合并。

`Practice` [09 Builder](https://github.com/CaptainXX/Design_Patterns/tree/main/09_Builder/09_Builder)



<a name="Singleton"></a>

---

### 模式 10：Singleton

`Intention` 有些特殊的类，必须保证它们在系统中只存在一个实例，才能保证它的逻辑正确性以及良好的效率。

`Hint` 面向对象很好地解决了抽象的问题，但是必不可免地要付出一定代价。对于通常

`Hint` 继承带来的内存代价很少，可以忽略，但虚函数带来的开销有倍乘效应。在有些情况下，这些开销需要谨慎处理。

`Hint` 需要把构造函数和拷贝构造函数都设置成private。然后设置一个静态变量和一个静态成员函数，二者都是以Singleton类作为类型。成员函数用于返回这个成员变量，也就是我们创建的单例。

```c++ 
class Singleton {
private:
    Singleton(){};
    Singleton(Singleton& sglton){};

public:
    

};
```



`Hint` 线程不安全版本，多线程情况下，单例的创建可能被执行多次。

```c++
Singleton* Singleton::GetInstance() {
    if (! m_instance_) {
        m_instance_ = new Singleton();
    }
    return m_instance_;
}
```

`Hint` 线程安全版本1，加锁，但代价过高，读是不需要加锁的，在高并发中会导致延迟。

```c++ 
Singleton* Singleton::GetInstance() {
    Lock lock;
    if (! m_instance_) {
        m_instance_ = new Singleton();
    }
    return m_instance_;
}
```

`Hint` 改进版本，双检查锁，但会因为内存读写reorder不安全。可能的情况是：一般的`new`顺序是1. 分配内存 2. 调用类的构造函数 3. 把内存地址返回，但在内存reorder之后，这个顺序在CPU指令层就变成1. 分配内存 2. 返回内存地址给单例 3. 调用构造器。如果一个线程第一次进入`m_instance_`，执行到new 内存reorder的第二步，还没有调用类的构造器，这时`m_instance_`就已经有值了。如果此时另一个线程抢占到了时间片，进入`GetInstance`函数执行，就会发现`! m_instance_`的结果是`false`，直接返回`m_instance_`的地址，而此时得到的对象是一个还没有调用构造函数的对象，这就会导致对象是错误的，后续代码就会发生错误。

```C++
Singleton* Singleton::GetInstance() {
    if (! m_instance_) {
        Lock lock;
        if (! m_instance_)
        	m_instance_ = new Singleton();
    }
    return m_instance_;
}
```

为了解决上面的问题，JAVA增加了`valatile`关键字，来告诉编译器此处的代码不进行内存reorder优化。

`Hint` C++11的实现

```c++
std::atomic<Singleton*> Singleton::m_instance_;
std::mutex Singleton::m_mutex;

Singleton* Singleton::GetInstance() {
    Singleton* tmp = m_instance_.load(std::memory_order_relaxed);
    std::atomic_thread_fence(std::memory_order_acquire)；
    if (! tmp) {
        std::lock_guard<std::mutex> lock(m_mutex);
        tmp = m_instance_.load(std::memory_order_relaxed);
        if (! tmp) {
            tmp = new Singleton;
            std::atomic_thread_fence(std::memory_order_release);
            m_instance_.store(tmp, std::memory_order_relaxed);
        }
    }
    return tmp;
}
```

`Conclusion`

1. Singleton模式中的实例构造器可以设置为protected以允许子类派生；
2. Singleton模式一般不要支持拷贝构造函数和Clone接口，因为有可能导致多个对象实例，与`Singleton`的初衷违背。
3. 如何实现多线程环境下安全的Singleton。

`Practice` [10 Singleton](https://github.com/CaptainXX/Design_Patterns/tree/main/10_Singleton/10_Singleton)



<a name="Flyweight"></a>

---

### 模式 11：Flyweight

`Definition` 运用共享技术有效地支持大量细粒度的对象。

`Hint` 纯粹的面向对象：一切皆对象（Python?）

`Hint` Java等语言在编译器层面使用共享技术。

`Hint` Flyweight共享的对象是只读的。

`Hint` 虚函数表会多占用一个指针的大小（64位8个字节，32位4个字节）

`Hint` 评估内存开销：`sizeof`获得对象大小，然后查看运行时对象数量，计算得到占用相应的内存大小。

`Conclusion` 

1. 面向对象很好地解决了抽象性的问题，但作为一个运行在机器中的程序实体，我们需要考虑对象的代价问题。Flyweight主要解决面向对象的代价问题，一般不触及面向对象的抽象性问题；
2. Flyweight采用对象共享的做法来降低系统中对象的个数，从而降低细粒度对象给系统带来的内存压力。在具体实现方面，要注意对象状态的处理；
3. 对象的数量太大从而导致对象内存开销加大——什么样的数量才算大？需要仔细根据具体应用情况进行评估，而不能凭空臆断。

`Practice` [11 Flyweight](https://github.com/CaptainXX/Design_Patterns/tree/main/11_Flyweight/11_Flyweight)



<a name="Facade"></a>

---

### 模式 12：Facade 门面模式

`Intention` 简化外部客户程序和系统间的交互接口，将外部客户程序的演化和内部子系统的变化直接的依赖相互解耦。

`Definition` 为子系统中的一组接口提供一个一致（稳定）的界面，Facade模式定义了一个高层接口，这个接口使得这一子系统更加容易使用（复用）。

`Hint` 间接的设计思想：依赖倒置等。

`Hint` Facade提供的是一种设计思想，在显示的开发中，表达方式非常不同。

`Hint` Facade的内部是高内聚的，对外是松耦合的。

`Conclusion`

1. 从客户程序的角度来看，Facade模式简化了整个组件系统的接口，对于组件内部与外部客户程序来说，达到了一种**解耦**的效果——内部子系统的任何变化不会影响到Facade接口的变化；
2. Facade更注重从架构的层次去看整个系统，而不是单个类的层次。Facade很多时候更是一种结构设计模式；
3. Facade并非一个集装箱，可以任意地放进任何多个对象。Facade模式中的组件的内部应该是“相互耦合关系比较大的一系列组件”，而不是一个简单的功能集合。



<a name="Proxy"></a>

---

### 模式 13：Proxy

`Intention` 在面向对象系统中，有些对象由于某种原因（对象创建的开销很大、某些操作需要安全控制、需要进程外的访问），直接访问会给使用者或者系统结构带来很多麻烦。但又想要比较透明的对象访问（直接生成类的实例）。

`Definition` 为其他对象提供一种代理，以控制（隔离，使用接口）对这个对象的访问。

`Hint` 看起来简单，但通常需要很多层面的配合。实现的差异度非常大。

`Hint` 分布式系统中大量使用代理。

`Hint` [LCM](https://github.com/lcm-proj/lcm)实现了代理模式，通过`lcm-gen`可以产生传输需要的类。

`Conclusion`

1. “增加一层间接层”是软件系统中对许多复杂问题的一种常见解决方法。在面向对象系统中，直接使用某些对象会带来很多问题，作为间接层的Proxy对象便是解决这一问题的常用手段。
2. 具体Proxy设计模式的实现方法、实现粒度都相差很大，有些可能对单个对象做细粒度的控制，如`copy-on-write`技术，有些可能对组件模块提供抽象代理层，在架构层次对对象做Proxy。
3. Proxy并不一定要求保持接口完整的一致性，只要能够实现间接控制，有时候损及一些透明性是可以接收的。



<a name="Adapter"></a>

---

### 模式 14：Adapter

`Intention` 在软件系统中，由于应用环境的变化，常常需要将“一些现存的对象”放在新的环境中应用，但是新环境要求的接口是这些现存对象所不满足的。

`Definition` 将一个类的接口转换成客户希望的另一个接口。Adapter模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

`Hint` STL里的`stack`和`queue`，是`dequeue`通过adapter实现的，虽然没有使用GOF 23中示例的指针方式，但是是通过对象实例进行聚合，通过旧的接口实现新的接口，同样是Adapter模式的思想。

`Hint` 不能从实现的角度理解设计模式，要掌握设计原则。

`Conclusion`

1. Adapter模式主要应用于“希望复用一些现存的类，但是接口又与复用环境要求不一致的情况”，在遗留代码复用、类库迁移等方面非常有用；
2. GOF 23定义了两种Adapter模式的实现结构：对象适配器和类适配器。但类适配器采用多继承的实现方式，一般不推荐使用。对象适配器采用对象组合的方式，更符合松耦合精神；
3. Adapter模式可以实现的非常灵活，不必拘泥于GOF 23中定义的两种结构。例如，完全可以将Adapter模式中的“现存对象”作为新的接口方法参数，来达到适配的目的。

`Practice` [14 Adapter](https://github.com/CaptainXX/Design_Patterns/tree/main/14_Adapter/14_Adapter)





<a name="Mediator"></a>

---

### 模式 15：Mediator

`Intention` 在软件构建过程中，经常会出现多个对象互相关联交互的情况，对象之间常常会维持一种复杂的引用关系，如果遇到一些需求的更改，这种直接的引用关系将面临不断地变化。在这种情况下，我们可使用一个“中介对象”来管理对象间的关联关系，避免相互交互的对象之间的紧耦合引用关系，从而更好地抵御变化。

`Definition` 用一个中介对象来封装一系列的对象交互（封装变化）。中介者使各对象不需要显式的相互引用（编译期依赖 -> 运行期依赖），从而使其耦合松散（管理变化），而且可以独立地改变它们之间的交互。

`Conclusion` 

1. 将多个对象间复杂的关联关系解耦，Mediator模式将多个对象间的控制逻辑进行集中管理，变“多个对象互相关联”为多个对象和一个中介者关联，简化了系统的维护，抵御了可能的变化。
2. 随着控制逻辑的复杂化，Mediator具体对象的实现可能相当复杂。这时候可以对Mediator对象进行分解处理。
3. Facade模式是解耦系统间（单向）的对象关联关系；Mediator模式是解耦系统内各个对象之间的（双向）关联关系。



<a name="State"></a>

----

### 模式 16：State

`Intention` 在软件构建过程中，某些对象的状态如果改变，其行为也会随之而发生变化，比如文档处于只读状态，其支持的行为和读写状态支持的行为就可能完全不同。如何在运行时根据对象的状态来透明地更改对象的行为？而不会为对象操作和状态转化之间引入紧耦合？

`Definition`允许一个对象在其内部状态改变时改变它的行为。从而使对象看起来似乎修改了其行为。

`Hint` 状态模式应该使用`Singleton`来实现，共享一个`State`节省对象的开销。

`Hint` 和`Strategy`模式异曲同工。如果`State`只有一种处理方法，那就和`Strategy`没有什么区别。

`Conclusion`

1. State模式将所有与一个特定状态相关的行为都放入一个State的子类对象中，在对象状态切换时，切换相应的对象；但同时维持State的接口，这样实现了具体操作与状态转换之间的解耦；
2. 为不同的状态引入不同的对象使得状态转换变得更加明确，而且可以保证不会出现状态不一致的情况，因为转换是原子性的——即要么彻底转换过来，要么不转换；
3. 如果State对象没有实例变量，那么可以上下文共享一个State对象，从而节省对象开销。

`Practice` [16 State](https://github.com/CaptainXX/Design_Patterns/tree/main/16_State/16_State)







<a name="Memento"></a>

---

### 模式 17：Memento

`Intention` 在软件构建过程中，某些对象的状态在转换过程中，可能由于某种需要，要求程序能够回溯到对象之前处于某个点时的状态。同时避免暴露对象的实现细节，不破坏封装性。

`Definition` 在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可以将该对象恢复到原先保存的状态。

`Hint` Memento的一一映射的实现已经太低效了。

`Hint` 实现的角度：用一种不破坏对象封装性的方法保存对象的状态。

`Conclusion`

1. 备忘录（Memento）存储原发器（Originator）对象的内部状态，在需要时恢复原发器状态；
2. 



<a name="UML"></a>

---

### UML类图的6种关系类型

#### 1. Dependency (依赖)

`Definition` 类A依赖类B，在代码中表现为在类A中临时使用了类B，这种关系具有偶然性、临时性，但类B的变化会对A造成影响，所以称之为依赖关系。

`Behavior` 

1. 类B是类A成员函数的形参；
2. 类A中存在类B的局部变量；
3. 类A通过静态成员使用类B；

![]({{ site.url }}/imgs/design_patterns/UML/01_dependency.svg)



#### 2. Association (关联)

`Definition` 类A关联类B，对于两个相对独立的对象，当一个对象的实例与另一个对象的一些特定实例存在固定的对应关系时，这两个对象之间为关联关系。

`Behavior` 

1. 类A拥有类B的成员变量；

![]({{ site.url }}/imgs/design_patterns/UML/02_association.svg)



#### 3. Aggregation (聚合)

`Definition` 类A聚合于类B，表示类A和类B是一种关联关系，同时类A是类B的一部分，语义上和关联相同，体现了整体与部分的关系。但类A和类B是可以分别独立存在的。

`Behavior`

1. 类B中有类A的成员变量，类A是类B逻辑上的一部分，一般在类A中存在set方法用于设置类B的对象；

![]({{ site.url }}/imgs/design_patterns/UML/03_aggregation.svg)



#### 4. Composition (组合)

`Definition` 类A由类B组合而成，表示类A和类B的强关联关系，类B是类A的一部分，同样体现了整体与部分的关系，但类A和类B生命周期相同，不能独立存在。

`Behavior`

1. 类A中有类B的成员变量，类A和类B不可分离；

![]({{ site.url }}/imgs/design_patterns/UML/04_composition.svg)



#### 5. Generalization (继承)

`Definition` 类A继承类B的功能和成员，并可以增加自己新功能的能力，效果同C++中的继承。

`Behavior`

1. 类A : public 类B；

![]({{ site.url }}/imgs/design_patterns/UML/05_generalization.svg)



#### 6. Implementation (实现)

`Definition` 类A实现类B的接口。

`Behavior` 

1. 类B是含有纯虚函数的抽象类，类A继承类B后实现虚函数；

![]({{ site.url }}/imgs/design_patterns/UML/06_implementation.svg)



---





> 有志者，事竟成，破釜沉舟，百二秦关终属楚
>
> 苦心人，天不负，卧薪尝胆，三千越甲可吞吴









[Return to Top](#Top)
