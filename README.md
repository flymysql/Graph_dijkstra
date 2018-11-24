# Dijkstra算法动态演示


**2018-11-24更新**

花了一早上写了js版本的，并能够动态演示过程

演示地址:https://me.idealli.com/others/Dijkstra.html

![兰州小红鸡](https://picture-1256429518.cos.ap-chengdu.myqcloud.com/blog/112402.png)


先看下算法的描述

**问题描述**

给定一个带权有向图 G=(V,E) ，其中每条边的权是一个非负实数。另外，还给定 V 中的一个顶点，称为源。现在我们要计算从源到所有其他各顶点的最短路径长度。这里的长度是指路上各边权之和。这个问题通常称为单源最短路径问题。
Dijkstra算法的解决方案

Dijkstra提出按各顶点与源点v间的路径长度的递增次序，生成到各顶点的最短路径的算法。既先求出长度最短的一条最短路径，再参照它求出长度次短的一条最短路径，依次类推，直到从源点v 到其它各顶点的最短路径全部求出为止。


**Dijkstra算法的解题思想**

将图G中所有的顶点V分成两个顶点集合S和T。以v为源点已经确定了最短路径的终点并入S集合中，S初始时只含顶点v,T则是尚未确定到源点v最短路径的顶点集合。然后每次从T集合中选择S集合点中到T路径最短的那个点，并加入到集合S中，并把这个点从集合T删除。直到T集合为空为止。

**具体步骤**

1. 选一顶点v为源点，并视从源点v出发的所有边为到各顶点的最短路径（确定数据结构：因为求的是最短路径，所以①就要用一个记录从源点v到其它各顶点的路径长度数组dist[],开始时，dist是源点v到顶点i的直接边长度，即dist中记录的是邻接阵的第v行。②设一个用来记录从源点到其它顶点的路径数组path[],path中存放路径上第i个顶点的前驱顶点）。

2. 在上述的最短路径dist[]中选一条最短的，并将其终点（即v,k）k加入到集合s中。

3. 调整T中各顶点到源点v的最短路径。 因为当顶点k加入到集合s中后，源点v到T中剩余的其它顶点j就又增加了经过顶点k到达j的路径,这条路径可能要比源点v到j原来的最短的还要短。调整方法是比较dist[k]+g[k,j]与dist[j]，取其中的较小者。

4. 再选出一个到源点v路径长度最小的顶点k,从T中删去后加入S中，再回去到第三步，如此重复，直到集合S中的包含图G的所有顶点。

**部分javascript代码**

```java

var onlink=false;
var onid="";
var MaxvertextType = 100
var gigantic = 99999

var gx=""
var gy=""
var gobj
/*
  Dijkstra算法  
*/
//邻接矩阵
function Mgraph() {
    this.vex=new Array();
    this.edge=new Array();
    this.vexnum=0;
    this.arcnum=0;
};
function getVex(G,x){
    var i=0;
    for(;i<G.vexnum;i++){
    	if(G.vex[i]==x)return i;
    }
    if(G.vex[i]!=x)return -1;
}
//单源最短路径算法
function Dijkstra(g,x){
	cleancolor();
    var vexnum=g.vexnum;
    var vex=getVex(g,x);
    if (vex==-1) return;
    var dist= new Array();
    var path = new Array();
    path[vex]=vex;
    for (var i = 0; i < vexnum; ++i) {
        dist[i]=g.edge[vex][i];
        if(g.edge[vex][i]!=gigantic)path[i]=vex;
    }
    console.log(dist)
    var S = new Array();
    S[vex] = true;
    var dd;
    var dvex=0;
    var j = 0;
    var index=1;
    var descripe=document.getElementById("slider");
    descripe.innerHTML="";
    for (; j < vexnum-1; ++j) {
      setTimeout(function(){
      dd=gigantic;
        for (var i = 0; i < vexnum; ++i) {
            if(dist[i]<dd && !S[i]) {
                dd=dist[i];
                dvex=i;
            }
        }
        if(dd==gigantic){
          for (var i = 0; i < vexnum; ++i) {
              if(dist[i]==dd && !S[i]) {
                  dvex=i;
                  break;
              }
          }
          var str="节点"+g.vex[dvex]+"不可达<br><br>"
          
          descripe.innerHTML = descripe.innerHTML+"<div class=slider_line><div class=slide_title>第"+index+"趟</div><div class=slide_content>"+str+"</div></div>";
      document.body.appendChild(descripe);
      index++;
          S[dvex]= true;
        }
        else{
          var element=document.getElementById(g.vex[dvex]);
            var now=dvex;
            var colo="#"+(Math.round(Math.random()*800)+100);
            element.style.background=colo;
            var str=x+"到"+g.vex[dvex]+"的最短路径："+g.vex[now];
            while(now!=vex){
              var line1=document.getElementById(g.vex[now]+g.vex[path[now]]);
              if (line1==null)
                line1=document.getElementById(g.vex[path[now]]+g.vex[now]);
              //console.log(line1);
              line1.style.stroke=colo;
                now=path[now];
                str=str+"<--"+g.vex[now];
            }
            str=str+"<br>总路程:"+dist[dvex]+"<br><br>";
            descripe.innerHTML = descripe.innerHTML+"<div class=slider_line><div class=slide_title>第"+index+"趟</div><div class=slide_content>"+str+"</div></div>";
        document.body.appendChild(descripe);
        index++;
            S[dvex]= true;
            for (var k = 0; k < vexnum; ++k) {
                if (!S[k]){
                    if (dist[dvex]+g.edge[dvex][k]<dist[k]) {
                        dist[k] = dist[dvex] + g.edge[dvex][k];
                        path[k] = dvex;
                    }
                }
            }         
        }
      },3000*j);
    }

}
//图的初始化
function init(g){
    for(var i=0;i<g.vexnum;i++){
        var temp=[];
        for (var j = 0; j < g.vexnum; ++j) {
            if (i==j) temp[j]=0;
            else temp[j]=gigantic;
        }
        g.edge[i]=temp;
    }
}
//先创建一个全局图
mgraph =new Mgraph;

```

感觉代码还是有点臃肿了
晚点打算再写一个JavaScript实现的算法
结合html来制作图形界面



