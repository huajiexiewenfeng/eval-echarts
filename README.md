# eval-echarts
基于echarts前后端封装 <br>
springboot2.x+jquery1.11.x+echarts3.x<br>
附demo 可以直接在项目中使用

介绍
====

* 对echarts前端js对象option进行封装，前端只需要传接口url和div的id
* 后台提供对应的java数据结构，每种图形对应自己的抽象模板类，整个数据对象拼接的过程都已经封装好
* 极大的方便了开发人员，只需关注业务代码和sql语句的实现即可

特点
====
* 1.使用多种设计模式保证代码的扩展性和解耦
* 2.项目整体架构已经搭建完成
* 3.自己可以动手扩展相关echarts图形实现代码
* 4.目前支持7种图形 折线图，柱状图，条线图，饼状图，环形图，雷达图,区域图
* 5.持续更新


项目目录
----
* eval-core -----相关实现核心代码
* eval-demo   -----springboot简易demo 代码持续更新中

环境
----
jdk8 <br>
springboot2.x <br>
jquery1.11x <br>
echarts3.x

使用方式
----
[CSDN博客](https://blog.csdn.net/xiewenfeng520/article/details/90704526)
后面会持续完善博客，如何扩展代码，如何使用

![首页](https://github.com/huajiexiewenfeng/eval-echarts/blob/master/img/index.png)
![line](https://github.com/huajiexiewenfeng/eval-echarts/blob/master/img/echarts-line.png)
