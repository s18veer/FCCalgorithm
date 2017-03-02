var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width=canvas.height=400;
aaa();

function aaa(){
    var a,b,c,d,e,tim,p,max,len,han,x,y,z,st,tx,ty,xp,yp,xp2,yp2,bai;
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    tim=new Date().getTime()/45;
bai=1+Math.sin(tim/37)/2;

    for(e=0;e<3;e++){
tim*=1.1;
        s=(e+1)/3;
        max=(150*s)|0;
        p=[];
        for(a=0;a<max;a++){
            b=a/(max-1);
            x=(b-0.5)*2;
            han=1;
            p[a]=[];
c=0.7+Math.sin(b*5+tim/23)*0.5;
            x=Math.cos(b*Math.PI)*c;
            han=Math.sin(b*Math.PI)*c;
            len=(han*40*s*c)|0+4;
            st=Math.sin(b*7+tim/13)*2+Math.sin(b*3+tim/17)*3;
            r=st;
            for(c=0;c<len;c++){
                y=Math.sin(r)*han;
                z=Math.cos(r)*han;
                p[a].push([x,y,z]);
                r+=2/(len-1);
            }
        }
        
        a=tim/59;
        yp=Math.cos(a);
        yp2=Math.sin(a);
        a=tim/23;
        xp=Math.cos(a);
        xp2=Math.sin(a);
        p2=[];
        for(a=0;a<p.length;a++){
            p2[a]=[];
            for(b=0;b<p[a].length;b++){
                x=p[a][b][0];y=p[a][b][1];z=p[a][b][2];
                y1=y*yp+z*yp2;
                z1=y*yp2-z*yp;
                x1=x*xp+z1*xp2;
                z=x*xp2-z1*xp;
                z1=Math.pow(2,z*s);
                x=x1*z1;
                y=y1*z1;
                p2[a].push([x,y,z*s]);
            }
        }
        
        s*=120*bai;
        tx=canvas.width/2+Math.sin(tim/23)*50;
        ty=canvas.height/2+Math.sin(tim/29)*50;
        for(a=0;a<max;a++){
            b=244+(Math.sin(a/max+tim/19)*50);
            b=(b|0)%360;
            ctx.strokeStyle="hsla("+b+",70%,60%,0.75)";            
            for(d=0;d<p2[a].length-1;d++){
                ctx.beginPath();
                b=p2[a][d];
                c=p2[a][d+1];
                ctx.lineWidth=Math.pow(10,b[2])*bai;
                ctx.lineTo(b[0]*s+tx,b[1]*s+ty);
                ctx.lineTo(c[0]*s+tx,c[1]*s+ty);
                ctx.stroke();
            }
        }

    a=p2[(max/2)|0];
    b=(a.length/2)|0;
b=a.length-1;
    x=a[b][0]*s+tx;
    y=a[b][1]*s+ty;
    hito(x,y);
    }
    requestAnimationFrame(aaa);
}

function hito(x,y){
    var a,x1,y1,r,max;
    ctx.strokeStyle=ctx.fillStyle="rgb(0,0,0)";
    ctx.beginPath();
    ctx.arc(x,y-40,10,0,Math.PI*2,0);
    ctx.fill();
    
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.lineTo(x,y-40);
    ctx.lineTo(x,y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.lineTo(x,y-12);
    ctx.lineTo(x+6,y-12);
    ctx.lineTo(x+9,y-16);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.lineTo(x-10,y-25);
    ctx.lineTo(x+10,y-25);
    ctx.stroke();
    
    r=0;
    max=40;
    ctx.beginPath();
    for(a=0;a<max;a++){
        x1=Math.cos(r)*10;
        y1=Math.sin(r)*3;
        y1-=x1/5;
        ctx.lineTo(x+x1-2,y+y1);
        r+=Math.PI*2/max;
    }
    ctx.fill();
}
