## 1.第一篇：HTTP 概述

### (1) HTTP 交互过程
HTTP协议是连接HTTP服务器和客户端的可靠的数据传输协议。客户端根据URL向指定服务器发送请求报文，对应的服务器会在HTTP响应中返回请求的数据。

具体点说，就是客户端通过URL，找到服务器的IP地址（其中通过DNS解析），连接上服务器之后，发送请求的内容，服务器对请求做出处理，会给出响应的结果。服务器会返回对应的响应报文，包含服务器的处理结果以及提示。
### (2) HTTP 请求报文

HTTP的请求报文中包括三个部分： 起始行、请求头、请求主体。起始行和请求头、请求头和请求主体之间都有一个CRLF(回车加换行)。

 1. 请求报文的起始行格式比较固定，由方法、资源路径和HTTP协议版本组成，比如 GET /products/index.html HTTP/1.0. 请求头主要的作用是告诉服务器请求使用什么方法，请求的资源在哪个路径下，客户端使用哪一套协议。简言之，就是告诉服务器要做什么。

 2. 请求头是由用冒号分隔的键值对组成的，一般请求时，客户端代理会自动给请求添加一些请求头，比如host，accept等，JavaScript的XMLHttpRequest对象提供了增加请求头字段的接口，用户可以自定义一些请求头。
    > 请求头举例： 

    > Accept: text/*

    > Host: www.google.com

 3. 请求主体是请求想要传给服务器的数据，是HTTP要传输的内容。一般PUT请求和POST请求才会有请求主体，请求主体的数据类型可以是文本，也可以是二进制数据，图片、视频等都可以。

### (3) HTTP 响应报文

HTTP的响应报文中也包括三个部分： 起始行、响应头、响应主体。起始行和响应头、响应头和响应主体之间都有一个CRLF(回车加换行)。

 1. 起始行包括： 协议、状态码、原因短语  例如 HTTP/1.0 200 OK

 2. 响应头也是冒号分隔的键值对组成的，主要是响应的数据的描述以及服务器状态的描述。
 
    > 响应头举例：

    > Content-Type: text/plain

    > Content-Length: 1024

 3. 响应主体是HTTP服务器根据请求，返回给客户端的数据，是由任意数据类型组成的数据块。

### (4) URL概述

URL(Uniform Resource Location 统一资源定位符) 是 URI(Uniform Resource Identifier 统一资源标识) 的子集。URI包括URL和URN(Uniform Resource Name 统一资源名)，但是目前URN尚未实行，因此当前说的URI一般都是指URL。客户端可以通过URL寻找到互联网上对应的服务器主机上的资源，一个URL对应一个资源。

URL的组成成分主要包括三部分，

  1. 第一部分是方案，比如HTTP、FTp等；

  2. 第二部分是服务器的因特网地址，比如www.google.com等；

  3. 第三部分是web服务器上的某个资源，比如/product/index.html

URL规范中，URL包括9个部分： 方案(scheme)，用户名(user)，密码(password)，主机名(host)，端口(port)，路径(path)，参数(param)，查询(query)，片段(frag);

  完整的URL模型：方案://用户名:密码@主机名:端口路径;参数?查询#片段

  例子： ftp://anonymous:password@ftp.mit.edu:80/test/index.txt;num=1;type=2?name=jack&gender=1#frag



    