
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


    mgraph =new Mgraph;
    mgraph.vexnum=5;
    init(mgraph);
    mgraph.arcnum=10;
    mgraph.vex[0]='1';
    mgraph.vex[1]='2';
    mgraph.vex[2]='3';
    mgraph.vex[3]='4';
    mgraph.vex[4]='5';
    mgraph.edge[0][1]=10;
    mgraph.edge[0][4]=5;
    mgraph.edge[1][2]=1;
    mgraph.edge[1][4]=2;
    mgraph.edge[2][3]=4;
    mgraph.edge[3][2]=6;
    mgraph.edge[3][0]=7;
    mgraph.edge[4][1]=3;
    mgraph.edge[4][2]=9;
    mgraph.edge[4][3]=2;
    Dijkstra(mgraph,mgraph.vex[0]);
