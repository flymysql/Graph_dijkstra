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

<a href="https://me.idealli.com/post/651cfd47.html"><img src="https://image.idealli.com/blog/18123106.jpg"></a>

<a href="https://www.vultr.com/?ref=7446652"><img src="https://www.vultr.com/media/banner_1.png" width="728" height="90"></a>

**部分javascript代码**

```java

var MaxvertextType = 100
var gigantic = 99999

//邻接矩阵
function Mgraph() {
    this.vex=new Array();
    this.edge=new Array();
    this.vexnum=MaxvertextType;
    this.arcnum=MaxvertextType;
};

function getVex(G,x){
    var i=0;
    for(;G.vex[i]!=x;i++);
    return i;
}


//单源最短路径算法
function Dijkstra(g,x){
    var vexnum=g.vexnum;
    var vex=getVex(g,x);
    var dist= new Array();
    var path = new Array();
    path[0]=0;
    for (var i = 0; i < vexnum; ++i) {
        dist[i]=g.edge[vex][i];
        if(dist[i]!=gigantic)path[i]=0;
    }
    var S = new Array();
    S[0] = true;
    var dd;
    var dvex=0;
    for (var j = 0; j < vexnum-1; ++j) {
        dd=gigantic;
        for (var i = 1; i < vexnum; ++i) {
            if(dist[i]<dd && !S[i]) {
                dd=dist[i];
                dvex=i;
            }
        }
        S[dvex]= true;
        for (var k = 1; k < vexnum; ++k) {
            if (!S[k]){
                if (dist[dvex]+g.edge[dvex][k]<dist[k]) {
                    dist[k] = dist[dvex] + g.edge[dvex][k];
                    path[k] = dvex;
                }
            }
        }
    }
    for (var m = 1; m < vexnum; ++m) {
        var nowvex=m;
        var str="\npath:"+g.vex[nowvex];
        while(path[nowvex]!=0){
            nowvex=path[nowvex];
            str=str+"<-"+g.vex[nowvex];
        }
        str=str+"<-"+g.vex[0]+"\tdistance:"+dist[m];
        console.log(str);
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

```

感觉代码还是有点臃肿了




