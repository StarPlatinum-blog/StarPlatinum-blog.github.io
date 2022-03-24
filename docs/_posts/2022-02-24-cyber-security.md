---
layout:	post
title:	Cyber security
date:   2022-02-24 14:12:00 +0800
categories: note
---

## 1. 拒绝服务攻击（DoS）

### 1. 工具

[Impulse](https://github.com/LimerBoy/Impulse)

攻击方式：

| Method                  | Target  | Description                                                  |
| ----------------------- | ------- | ------------------------------------------------------------ |
| SMS                     | PHONE   | Sends a massive amount of SMS messages and calls to a single target |
| EMAIL                   | EMAIL   | Sends a massive amount of Email messages to a target         |
| NTP                     | IP:PORT | NTP amplification is a type of Distributed Denial of Service (DDoS) attack in which the attacker exploits publically-accessible Network Time Protocol (NTP) servers to overwhelm the targeted with User Datagram Protocol (UDP) traffic. |
| **SYN**                 | IP:PORT | A SYN flood (half-open attack) is a type of denial-of-service (DDoS) attack which aims to make a server unavailable to legitimate traffic by consuming all available server resources. |
| **UDP**                 | IP:PORT | A UDP flood is a type of denial-of-service attack in which a large number of User Datagram Protocol (UDP) packets are sent to a targeted server with the aim of overwhelming that device’s ability to process and respond. The firewall protecting the targeted server can also become exhausted as a result of UDP flooding, resulting in a denial-of-service to legitimate traffic. |
| **POD (Ping of Death)** | IP      | Ping of Death (a.k.a. PoD) is a type of Denial of Service (DoS) attack in which an attacker attempts to crash, destabilize, or freeze the targeted computer or service by sending malformed or oversized packets using a simple ping command. |
| **ICMP**                | IP:PORT | Ping flood, also known as ICMP flood, is a common Denial of Service (DoS) attack in which an attacker takes down a victim's computer by overwhelming it with ICMP echo requests, also known as pings. |
| **HTTP**                | URL     | HTTP Flood is a type of Distributed Denial of Service (DDoS) attack in which the attacker manipulates HTTP and POST unwanted requests in order to attack a web server or application. These attacks often use interconnected computers that have been taken over with the aid of malware such as Trojan Horses. |
| **Slowloris**           | IP:PORT | Slowloris is a denial-of-service attack program which allows an attacker to overwhelm a targeted server by opening and maintaining many simultaneous HTTP connections between the attacker and the target. |
| **Memcached**           | IP:PORT | A memcached distributed denial-of-service (DDoS) attack is a type of cyber attack in which an attacker attempts to overload a targeted victim with internet traffic. The attacker spoofs requests to a vulnerable UDP memcached* server, which then floods a targeted victim with internet traffic, potentially overwhelming the victim’s resources. While the target’s internet infrastructure is overloaded, new requests cannot be processed and regular traffic is unable to access the internet resource, resulting in denial-of-service. |

### 2. HTTP慢速攻击

[slowloris](https://github.com/gkbrk/slowloris)

>  What is Slowloris?
>
> Slowloris is basically an HTTP Denial of Service attack that affects threaded servers. It works like this:
>
> 1. We start making lots of HTTP requests.
>
> 2. We send headers periodically (every ~15 seconds) to keep the connections open.
>
> 3. We never close the connection unless the server does so. If the server closes a connection, we create a new one keep doing the same thing.
>
>    This exhausts the servers thread pool and the server can't reply to other people.

### 3. SYN泛洪

利用TCP三次握手过程进行攻击，攻击者只发送TCP 的SYN数据包，当服务器返回ACK时不再对其进行应答，那这个连接就处在了一个挂起的状态，也就是半连接的意思，那么服务器收不到再确认的一个消息，还会重复发送ACK给攻击者。这样一来就会更加浪费服务器的资源。攻击者就对服务器发送非法大量的这种TCP连接，由于每一个都没法完成握手的机制，所以它就会消耗服务器的内存最后可能导致服务器死机，就无法正常工作了。更进一步说，如果这些半连接的握手请求是恶意程序发出，并且持续不断，那么就会导致服务端较长时间内丧失服务功能。

### 4. UDP泛洪

发送大量UDP数据包到服务器，使其接口带宽处于饱和状态。

### 5. Ping of Death

攻击原理是攻击者A向受害者B发送一些尺寸超大的ICMP(Ping命令使用的是ICMP报文)报文对其进行攻击(对于有些路由器或系统，在接收到一个这样的报文后，由于处理不当，会造成系统崩溃、死机或重启)。

IP报文的最大长度是216-1=65535个字节，那么去除IP首部的20个字节和ICMP首部的8个字节，实际数据部分长度最大为：65535-20-8=65507个字节。所谓的尺寸超大的ICMP报文就是指数据部分长度超过65507个字节的ICMP报文

针对Ping of Death攻击，网络安全设备仅仅通过超大包过滤方法不能达到很好的防御效果，因为在线网种传输的大部分报文都经过了分片，所以单片报文不会超过65507个字节，只是在接收端完成组合后才会超过65507个字节。所以针对Ping of Death攻击，最有效防御方式是禁止ICMP报文通过网络安全设备。









