---
layout: post
title: Machine Learning
date: 21-10-22 11:48:24 +0800
categories: notes
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
# Coursera Machine Learning

## What is Machine Learning?

Two definitions of Machine Learning are offered. 

Arthur Samuel described it as: "the field of study that gives computers the ability to learn without being explicitly programmed." This is an older, informal definition.

Tom Mitchell provides a more modern definition: "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."

>   Example: playing checkers.
>
>   E = the experience of playing many games of checkers
>
>   T = the task of playing checkers.
>
>   P = the probability that the program will win the next game.



Machine learning algorithms:

-   supervised learning
-   unsupervised learning

Others: Reinforcement learning, recommender systems.



### Supervised Learning

In supervised learning, we are given a data set and already know what our correct output should look like, having the idea that there is a relationship between the input and the output.

Supervised learning problems are categorized into "regression" and "classification" problems. In a regression problem, we are trying to predict results within a continuous output, meaning that we are trying to map input variables to some continuous function. In a classification problem, we are instead trying to predict results in a discrete output. In other words, we are trying to map input variables into discrete categories. 

**Example 1:**

Given data about the size of houses on the real estate market, try to predict their price. Price as a function of size is a continuous output, so this is a regression problem.

We could turn this example into a classification problem by instead making our output about whether the house "sells for more or less than the asking price." Here we are classifying the houses based on price into two discrete categories.

**Example 2**:

(a) Regression - Given a picture of a person, we have to predict their age on the basis of the given picture

(b) Classification - Given a patient with a tumor, we have to predict whether the tumor is malignant or benign. 



### Unsupervised Learning

Unsupervised learning allows us to approach problems with little or no idea what our results should look like. We can derive structure from data where we don't necessarily know the effect of the variables.

We can derive this structure by clustering the data based on relationships among the variables in the data.

With unsupervised learning there is no feedback based on the prediction results.

**Example:**

Clustering: Take a collection of 1,000,000 different genes, and find a way to automatically group these genes into groups that are somehow similar or related by different variables, such as lifespan, location, roles, and so on.

Non-clustering: The "Cocktail Party Algorithm", allows you to find structure in a chaotic environment. (i.e. identifying individual voices and music from a mesh of sounds at a [cocktail party](https://en.wikipedia.org/wiki/Cocktail_party_effect)).



### Model Presentation

To establish notation for future use, we’ll use $x^{(i)}$ to denote the “input” variables (living area in this example), also called input features, and $y^{(i)}$ to denote the “output” or target variable that we are trying to predict (price). A pair $(x^{(i)} , y^{(i)} )$ is called a training example, and the dataset that we’ll be using to learn—a list of m training examples ${(x^{(i)} , y^{(i)} ); i = 1, . . . , m}$—is called a training set. Note that the superscript “(i)” in the notation is simply an index into the training set, and has nothing to do with exponentiation. We will also use X to denote the space of input values, and Y to denote the space of output values. In this example, X = Y = ℝ. 

To describe the supervised learning problem slightly more formally, our goal is, given a training set, to learn a function h : X → Y so that h(x) is a “good” predictor for the corresponding value of y. For historical reasons, this function h is called a **hypothesis**. Seen pictorially, the process is therefore like this:

![]({{ site.url }}/imgs/machine_learning/week1/01_model_presentation.png)

When the target variable that we’re trying to predict is continuous, such as in our housing example, we call the learning problem a regression problem. When y can take on only a small number of discrete values (such as if, given the living area, we wanted to predict if a dwelling is a house or an apartment, say), we call it a classification problem.



### Cost Function

We can measure the accuracy of our hypothesis function by using a **cost function**. This takes an average difference (actually a fancier version of an average) of all the results of the hypothesis with inputs from x's and the actual output y's.

$$
J(\theta_0, \theta_1) = \dfrac {1}{2m} \displaystyle \sum _{i=1}^m \left ( \hat{y}_{i}- y_{i} \right)^2 = \dfrac {1}{2m} \displaystyle \sum _{i=1}^m \left (h_\theta (x_{i}) - y_{i} \right)^2
$$

To break it apart, it is $\frac{1}{2} \bar{x}$ where $\bar{x}$ is the mean of the squares of $h_\theta (x_{i}) - y_{i}$ , or the difference between the predicted value and the actual value.

This function is otherwise called the "Squared error function", or "Mean squared error". The mean is halved $\left(\frac{1}{2}\right)$ as a convenience for the computation of the gradient descent, as the derivative term of the square function will cancel out the $\frac{1}{2}$ term. The following image summarizes what the cost function does: 

![]({{ site.url }}/imgs/machine_learning/week1/02_cost_function.png)

#### 1. Intuition 1

If we try to think of it in visual terms, our training data set is scattered on the x-y plane. We are trying to make a straight line (defined by $h_\theta(x)$) which passes through these scattered data points. 

Our objective is to get the best possible line. The best possible line will be such so that the average squared vertical distances of the scattered points from the line will be the least. Ideally, the line should pass through all the points of our training data set. In such a case, the value of $J(\theta_0, \theta_1)$ will be 0. The following example shows the ideal situation where we have a cost function of 0. 

![]({{ site.url }}/imgs/machine_learning/week1/03_cost_function_intuition.png)

When $\theta_1 = 1$, we get a slope of 1 which goes through every single data point in our model. Conversely, when $\theta_1 = 0.5$, we see the vertical distance from our fit to the data points increase. 

![]({{ site.url }}/imgs/machine_learning/week1/04_cost_function_intuition.png)

This increases our cost function to 0.58. Plotting several other points yields to the following graph: 

![]({{ site.url }}/imgs/machine_learning/week1/05_cost_function_intuition.png)

Thus as a goal, we should try to minimize the cost function. In this case, $\theta_1 = 1$ is our global minimum.

#### 2. Intuition 2

A contour plot is a graph that contains many contour lines. A contour line of a two variable function has a constant value at all points of the same line. An example of such a graph is the one to the right below.

![]({{ site.url }}/imgs/machine_learning/week1/06_cost_function_intuition.png)

Taking any color and going along the 'circle', one would expect to get the same value of the cost function. For example, the three green points found on the green line above have the same value for $J(\theta_0,\theta_1)$ and as a result, they are found along the same line. The circled x displays the value of the cost function for the graph on the left when $\theta_0 = 800$ and $\theta_1= -0.15$. Taking another h(x) and plotting its contour plot, one gets the following graphs:

![]({{ site.url }}/imgs/machine_learning/week1/07_cost_function_intuition.png)

When $\theta_0 = 360$ and $\theta_1 = 0$, the value of $J(\theta_0,\theta_1)$ in the contour plot gets closer to the center thus reducing the cost function error. Now giving our hypothesis function a slightly positive slope results in a better fit of the data.

![]({{ site.url }}/imgs/machine_learning/week1/08_cost_function_intuition.png)

The graph above minimizes the cost function as much as possible and consequently, the result of $\theta_1$ and $\theta_0$ tend to be around 0.12 and 250 respectively. Plotting those values on our graph to the right seems to put our point in the center of the inner most 'circle'. 



## Gradient Descent

So we have our hypothesis function and we have a way of measuring how well it fits into the data. Now we need to estimate the parameters in the hypothesis function. That's where gradient descent comes in.

Imagine that we graph our hypothesis function based on its fields $\theta_0$ and $\theta_1$ (actually we are graphing the cost function as a function of the parameter estimates). We are not graphing x and y itself, but the parameter range of our hypothesis function and the cost resulting from selecting a particular set of parameters.

We put $\theta_0$ on the x axis and $\theta_1$ on the y axis, with the cost function on the vertical z axis. The points on our graph will be the result of the cost function using our hypothesis with those specific theta parameters. The graph below depicts such a setup.

![]({{ site.url }}/imgs/machine_learning/week1/09_plot_gradient.png)

We will know that we have succeeded when our cost function is at the very bottom of the pits in our graph, i.e. when its value is the minimum.  The red arrows show the minimum points in the graph.

The way we do this is by taking the derivative (the tangential line to a function) of our cost function. The slope of the tangent is the derivative at that point and it will give us a direction to move towards. We make steps down the cost function in the direction with the steepest descent. The size of each step is determined by the parameter α, which is called the learning rate. 

For example, the distance between each 'star' in the graph above represents a step determined by our parameter α. A smaller α would result in a smaller step and a larger α results in a larger step. The direction in which the step is taken is determined by the partial derivative of $J(\theta_0,\theta_1)$. Depending on where one starts on the graph, one could end up at different points. The image above shows us two different starting points that end up in two different places. 

The gradient descent algorithm is:

$$
repeat\ until\ convergence:
\\
\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta_0, \theta_0)
$$

where

j=0,1 represents the feature index number.

At each iteration j, one should simultaneously update the parameters $\theta_1, \theta_2,...,\theta_n$. Updating a specific parameter prior to calculating another one on the $j^{(th)}$ iteration would yield to a wrong implementation. 

![]({{ site.url }}/imgs/machine_learning/week1/10_gradient_descent.png)



### 1. intuition

In this video we explored the scenario where we used one parameter $\theta_1$ and plotted its cost function to implement a gradient descent. Our formula for a single parameter was : 

Repeat until convergence:

$$
\theta_1:=\theta_1-\alpha \frac{d}{d\theta_1} J(\theta_1)
$$

Regardless of the slope's sign for $\frac{d}{d\theta_1} J(\theta_1)$, $\theta_1$ eventually converges to its minimum value. The following graph shows that when the slope is negative, the value of $\theta_1$ increases and when it is positive, the value of $\theta_1$ decreases.

![]({{ site.url }}/imgs/machine_learning/week1/11_gradient_descent_intuition.png)

On a side note, we should adjust our parameter $\alpha$ to ensure that the gradient descent algorithm converges in a reasonable time. Failure to converge or too much time to obtain the minimum value imply that our step size is wrong.

![]({{ site.url }}/imgs/machine_learning/week1/12_gradient_descent_intuition.png)

>   How does gradient descent converge with a fixed step size *α*?

The intuition behind the convergence is that $\frac{d}{d\theta_1} J(\theta_1)$ approaches 0 as we approach the bottom of our convex function. At the minimum, the derivative will always be 0 and thus we get: 

$$
\theta_1:=\theta_1-\alpha
$$

![]({{ site.url }}/imgs/machine_learning/week1/13_gradient_descent_intuition.png)



### 2. Gradient Descent for Linear Regression

When specifically applied to the case of linear regression, a new form of the gradient descent equation can be derived. We can substitute our actual cost function and our actual hypothesis function and modify the equation to :

$$
repeat\ until\ convergence: \{\\
\theta_0 :=\theta_0-\alpha\frac{1}{m}\sum_{i=1}^{m}{(h_\theta(x_i)-y_i)} \\
\theta_1 :=\theta_1-\alpha\frac{1}{m}\sum_{i=1}^{m}{((h_\theta(x_i)-y_i)x_i)} \\
\}
$$


where m is the size of the training set, $\theta_0$ a constant that will be changing simultaneously with $\theta_1$ and $x_{i}, y_{i}$ are values of the given training set (data).

Note that we have separated out the two cases for $\theta_j$ into separate equations for $\theta_0$ and $\theta_1$; and that for $\theta_1$ we are multiplying $x_{i}$ at the end due to the derivative. The following is a derivation of $\frac {\partial}{\partial \theta_j}J(\theta)$ for a single example : 

![]({{ site.url }}/imgs/machine_learning/week1/14_gradient_descent_for_linear_regression.png)

The point of all this is that if we start with a guess for our hypothesis and then repeatedly apply these gradient descent equations, our hypothesis will become more and more accurate.

So, this is simply gradient descent on the original cost function J. This method looks at every example in the entire training set on every step, and is called **batch gradient descent**. Note that, while gradient descent can be susceptible to local minima in general, the optimization problem we have posed here for linear regression has only one global, and no other local, optima; thus gradient descent always converges (assuming the learning rate α is not too large) to the global minimum. Indeed, J is a convex quadratic function. Here is an example of gradient descent as it is run to minimize a quadratic function.

![]({{ site.url }}/imgs/machine_learning/week1/15_gradient_descent_for_linear_regression.png)

The ellipses shown above are the contours of a quadratic function. Also shown is the trajectory taken by gradient descent, which was initialized at (48,30). The x’s in the figure (joined by straight lines) mark the successive values of θ that gradient descent went through as it converged to its minimum.



### 3. Multiple Features

Linear regression with multiple variables is also known as "multivariate linear regression".

We now introduce notation for equations where we can have any number of input variables.

$$
x^{(i)}_j=value\ of\ feature\ j\ in\ the\ i^{th}\ training\ example
\\
x^{(i)}=the\ input\ (features)\ of\ the\ i^{th}\ training\ example
\\
m=the\ number\ of\ training\ examples
\\
n=the\ number\ of\ features
$$

The multivariable form of the hypothesis function accommodating these multiple features is as follows:

$$
h_\theta (x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \theta_3 x_3 + \cdots + \theta_n x_n
$$

In order to develop intuition about this function, we can think about 

$\theta_0$ as the basic price of a house, $\theta_1$ as the price per square meter, $\theta_2$ as the price per floor, etc. $x_1$ will be the number of square meters in the house, $x_2$ the number of floors, etc.

Using the definition of matrix multiplication, our multivariable hypothesis function can be concisely represented as:

$$
h_{\theta}(x)=
\begin{bmatrix}
\theta_0 & \theta_1 & ... & \theta_n
\end{bmatrix}
\begin{bmatrix}
x_0 \\
x_1 \\
... \\
x_n
\end{bmatrix}
=\theta^Tx
$$

This is a vectorization of our hypothesis function for one training example; see the lessons on vectorization to learn more.

Remark: Note that for convenience reasons in this course we assume $x_{0}^{(i)} =1 \text{ for } (i\in { 1,\dots, m } )$ . This allows us to do matrix operations with theta and x. Hence making the two vectors '$\theta$' and $x^{(i)}$ match each other element-wise (that is, have the same number of elements: n+1).



### 4. Gradient Descent for Multiple Variables

The gradient descent equation itself is generally the same form; we just have to repeat it for our 'n' features:

$$
repeat\ until\ convergence: \{\\
\theta_0 :=\theta_0-\alpha\frac{1}{m}\sum_{i=1}^{m}{(h_\theta(x_i)-y_i)\cdot x_0^{(i)}} \\
\theta_1 :=\theta_1-\alpha\frac{1}{m}\sum_{i=1}^{m}{((h_\theta(x_i)-y_i)\cdot x_1^{(i)})} \\
\theta_2 :=\theta_2-\alpha\frac{1}{m}\sum_{i=1}^{m}{((h_\theta(x_i)-y_i)\cdot x_2^{(i)})} \\
...
\}
$$

In other words:

$$
repeat\ until\ convergence:\{
\\
θ_j:=θ_j−α\frac{1}{m}∑i=1m(hθ(x(i))−y(i))⋅x(i)jfor j := 0...n\}
$$

The following image compares gradient descent with one variable to gradient descent with multiple variables: 

![]({{ site.url }}/imgs/machine_learning/week2/01_mul_var_gradient.png)



### 5. Gradient Descent in Practice I - Feature Scaling

如何让梯度下降的更快：把数据范围变成：[-1, 1]

We can speed up gradient descent by having each of our input values in roughly the same range. This is because θ will descend quickly on small ranges and slowly on large ranges, and so will oscillate inefficiently down to the optimum when the variables are very uneven.

The way to prevent this is to modify the ranges of our input variables so that they are all roughly the same. Ideally:

$$
−1 ≤ x_{(i)} ≤ 1
\\
or
\\
−0.5 ≤ x_{(i)} ≤ 0.5
$$

These aren't exact requirements; we are only trying to speed things up. The goal is to get all input variables into roughly one of these ranges, give or take a few.

Two techniques to help with this are **feature scaling** and **mean normalization**. 

**Feature scaling** involves dividing the input values by the range (i.e. the maximum value minus the minimum value) of the input variable, resulting in a new range of just 1. 

**Mean normalization** involves subtracting the average value for an input variable from the values for that input variable resulting in a new average value for the input variable of just zero. To implement both of these techniques, adjust your input values as shown in this formula:

$$
x_i := \dfrac{x_i - \mu_i}{s_i}
$$

Where $μ_i$ is the **average** of all the values for feature (i) and $s_i$ is the **range** of values (max - min), or $s_i$ is the standard deviation.

Note that dividing by the range, or dividing by the standard deviation, give different results. The quizzes in this course use range - the programming exercises use standard deviation.

For example, if $x_i$ represents housing prices with a range of 100 to 2000  and a mean value of 1000, then, $x_i := \dfrac{price-1000}{1900}$.



### 6. Gradient Descent in Practice II - Learning Rate

**Debugging gradient descent.** Make a plot with *number of iterations* on the x-axis. Now plot the cost function, J(θ) over the number of iterations of gradient descent. If J(θ) ever increases, then you probably need to decrease α.

**Automatic convergence test.** Declare convergence if J(θ) decreases by less than E in one iteration, where E is some small value such as $10^{−3}$. However in practice it's difficult to choose this threshold value.

![]({{ site.url }}/imgs/machine_learning/week2/02_learning_rate.png)

It has been proven that if learning rate α is sufficiently small, then J(θ) will decrease on every iteration.

![]({{ site.url }}/imgs/machine_learning/week2/03_learning_rate.png)

To summarize:

 If $\alpha$ is too small: slow convergence. 

 If $\alpha$ is too large: may not decrease on every iteration and thus may not converge.



### 7. Features and Polynomial Regression

We can improve our features and the form of our hypothesis function in a couple different ways.

We can **combine** multiple features into one. For example, we can combine $x_1$ and $x_2$ into a new feature $x_3$ by taking $x_1 \cdot x_2$.

#### Polynomial Regression

Our hypothesis function need not be linear (a straight line) if that does not fit the data well.

We can **change the behavior or curve** of our hypothesis function by making it a quadratic, cubic or square root function (or any other form).

For example, if our hypothesis function is $h_\theta(x) = \theta_0 + \theta_1 x_1$ then we can create additional features based on $x_1$, to get the quadratic function $h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_1^2$or the cubic function $h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_1^2 + \theta_3 x_1^3$

In the cubic version, we have created new features $x_2$ and $x_3$ where $x_2 = x_1^2$ and $x_3 = x_1^3$.

To make it a square root function, we could do: $h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 \sqrt{x_1}$

One important thing to keep in mind is, if you choose your features this way then feature scaling becomes very important.

eg. if $x_1$ has range 1 - 1000 then range of $x_1^2$ becomes 1 - 1000000 and that of $x_1^3$ becomes 1 - 1000000000



## Normal Equation

Gradient descent gives one way of minimizing J. Let’s discuss a second way of doing so, this time performing the minimization explicitly and without resorting to an iterative algorithm. In the "Normal Equation" method, we will minimize J by explicitly taking its derivatives with respect to the θj ’s, and setting them to zero. This allows us to find the optimum theta without iteration. The normal equation formula is given below: 

$$
\theta = (X^T X)^{-1}X^T y
$$

There is **no need** to do feature scaling with the normal equation.

The following is a comparison of gradient descent and the normal equation:

| Gradient Descent           | Normal Equation                                |
| :------------------------- | :--------------------------------------------- |
| Need to choose alpha       | No need to choose alpha                        |
| Needs many iterations      | No need to iterate                             |
| $O (kn^2)$                 | $O (n^3)$, need to calculate inverse of $X^TX$ |
| Works well when n is large | Slow if n is very large                        |

With the normal equation, computing the inversion has complexity $\mathcal{O}(n^3)$. So if we have a very large number of features, the normal equation will be slow. 

In practice, when n exceeds **10,000** it might be a good time to go from a normal solution to an iterative process(gradient descent).



### Normal Equation Non-invertibility

When implementing the normal equation in octave we want to use the 'pinv' function rather than 'inv.' The 'pinv' function will give you a value of $\theta$ even if $X^TX$ is not invertible. 

If $X^TX$ is **noninvertible,** the common causes might be having :

-   Redundant features, where two features are very closely related (i.e. they are linearly dependent)
-   Too many features (e.g. m ≤ n). In this case, delete some features or use "regularization" (to be explained in a later lesson).

Solutions to the above problems include deleting a feature that is linearly dependent with another or deleting one or more features when there are too many features.



### ex1

记录一下作业无法提交的问题：

在从Coursera下载的`ex1`目录下调用函数`submit`，输入邮箱和Token后报错：

```sh
[error] submission with curl() was not successful
!! Submission failed: unexpected error: Error using loadjson (line 73)
input file does not exist
!! Please try again later.
```

报错是在`loadjson`文件的73行：

```matlab
73: error('input file does not exist');
```

报错是文件不存在，这个文件的文件名是从函数参数传入的，所以我们看看是谁调用了`loadjson`，然后传入了一个不存在的文件名。梳理一下submit的流程之后，可以看到在`submitWithConfiguration`文件内调用了`loadjson`：

```matlab
function response = submitParts(conf, email, token, parts)
  body = makePostBody(conf, email, token, parts);
  submissionUrl = SubmissionUrl(); % Updated
  responseBody = getResponse(submissionUrl, body);
  response = loadjson(responseBody); % Here
end
```

也就是说传入的`responseBody`是一个不存在的文件名，打印一下看看到底是什么：

```sh
curl: /usr/local/MATLAB/R2019b/bin/glnxa64/libcurl.so.4: no version information available (required by curl)
curl: symbol lookup error: curl: undefined symbol: curl_multi_poll, version CURL_OPENSSL_4
```

可以看到`curl`是有输出的，但是似乎找不到某个`symbol`，这里看到目录是`/usr/local`开头的，而我的MATLAB是使用普通用户登录的，所以可能是调用`curl`时没有权限。在MATLAB命令行测试一下：

```MATLAB
system('curl'); % 报错，和上面的报错相同
system('sudo curl -V'); % 请求用户密码，然后顺利执行
% 输出：
curl 7.68.0 (x86_64-pc-linux-gnu) libcurl/7.68.0 OpenSSL/1.1.1f zlib/1.2.11 brotli/1.0.7 libidn2/2.2.0 libpsl/0.21.0 (+libidn2/2.2.0) libssh/0.9.3/openssl/zlib nghttp2/1.40.0 librtmp/2.3
Release-Date: 2020-01-08
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtmp rtsp scp sftp smb smbs smtp smtps telnet tftp 
Features: AsynchDNS brotli GSS-API HTTP2 HTTPS-proxy IDN IPv6 Kerberos Largefile libz NTLM NTLM_WB PSL SPNEGO SSL TLS-SRP UnixSockets
```

那么给`submitWithConfiguration`文件中所有调用`curl`的代码加上`sudo`就解决了。



## Classification

To attempt classification, one method is to use linear regression and map all predictions greater than 0.5 as a 1 and all less than 0.5 as a 0. However, this method doesn't work well because classification is not actually a linear function.

The classification problem is just like the regression problem, except that the values we now want to predict take on only a small number of discrete values. For now, we will focus on the **binary classification** **problem** in which y can take on only two values, 0 and 1. (Most of what we say here will also generalize to the multiple-class case.) For instance, if we are trying to build a spam classifier for email, then $x^{(i)}$ may be some features of a piece of email, and y may be 1 if it is a piece of spam mail, and 0 otherwise. Hence, y∈{0,1}. 0 is also called the negative class, and 1 the positive class, and they are sometimes also denoted by the symbols “-” and “+.” Given $x^{(i)}$, the corresponding $y^{(i)}$ is also called the label for the training example. 

### 1. Hypothesis Representation

We could approach the classification problem ignoring the fact that y is discrete-valued, and use our old linear regression algorithm to try to predict y given x. However, it is easy to construct examples where this method performs very poorly. Intuitively, it also doesn’t make sense for $h_\theta (x)$ to take values larger than 1 or smaller than 0 when we know that y ∈ {0, 1}. To fix this, let’s change the form for our hypotheses $h_\theta (x)$ to satisfy $0 \leq h_\theta (x) \leq 1$. This is accomplished by plugging $\theta^Tx$ into the Logistic Function.

Our new form uses the "Sigmoid Function," also called the "Logistic Function":

$$
h_θ(x)=g(θ^Tx)
\\
z=θ^Tx
\\
g(z)=\frac{1}{1+e^{−z}}
$$




The following image shows us what the sigmoid function looks like: 

![]({{ site.url }}/imgs/machine_learning/week3/01_Logistic_function.png)

The function g(z), shown here, maps any real number to the (0, 1) interval, making it useful for transforming an arbitrary-valued function into a function better suited for classification.

$h_\theta(x)$ will give us the **probability** that our output is 1. For example, $h_\theta(x)=0.7$ gives us a probability of 70% that our output is 1. Our probability that our prediction is 0 is just the complement of our probability that it is 1 (e.g. if probability that it is 1 is 70%, then the probability that it is 0 is 30%).

$$
h_θ(x)=P(y=1|x;θ)=1−P(y=0|x;θ)
\\
P(y=0|x;θ)+P(y=1|x;θ)=1
$$

### 2. Decision Boundary 

In order to get our discrete 0 or 1 classification, we can translate the output of the hypothesis function as follows:

$$
h_θ(x)≥0.5→y=1
\\
h_θ(x)<0.5→y=0
$$

The way our logistic function g behaves is that when its input is greater than or equal to zero, its output is greater than or equal to 0.5:

$$
g(z)≥0.5
\\
when\ z≥0
$$

Remember.

$$
z=0,e^0=1⇒g(z)=1/2
\\
z→∞,e^{−∞}→0⇒g(z)=1
\\
z→−∞,e^∞→∞⇒g(z)=0
$$

So if our input to g is $\theta^T$, then that means:

$$
hθ(x)=g(θ^Tx)≥0.5
\\
when\ θ^Tx≥0
$$

From these statements we can now say:

$$
θ^Tx≥0⇒y=1
\\
θ^Tx<0⇒y=0
$$

The **decision boundary** is the line that separates the area where y = 0 and where y = 1. It is created by our hypothesis function.

**Example**:

$$
\theta = \begin{bmatrix}
5 \\
-1 \\
0
\end{bmatrix}
\\
y=1\ if\ 5+(−1)x_1+0x_2≥0
\\
5−x_1≥0
\\
−x_1≥−5
\\
x_1≤5
$$

In this case, our decision boundary is a straight vertical line placed on the graph where $x_1 = 5$, and everything to the left of that denotes y = 1, while everything to the right denotes y = 0.

Again, the input to the sigmoid function g(z) (e.g. $\theta^TX$) doesn't need to be linear, and could be a function that describes a circle (e.g. $z = \theta_0 + \theta_1 x_1^2 +\theta_2 x_2^2$) or any shape to fit our data.

