const u=["#440154","#48186a","#472d7b","#424086","#3b528b","#33638d","#2c728e","#26828e","#21918c","#1fa088","#28ae80","#3fbc73","#5ec962","#84d44b","#addc30","#d8e219","#fde725"],f=t=>{const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},h=(t,e,a)=>"#"+(16777216+(t<<16)+(e<<8)+a).toString(16).slice(1),i=(t,e,a)=>{const n=f(t),r=f(e);if(a<2)return[t];const o=[];for(let c=0;c<a;c++){const l=c/(a-1);o.push(h(Math.floor(n.r+l*(r.r-n.r)),Math.floor(n.g+l*(r.g-n.g)),Math.floor(n.b+l*(r.b-n.b))))}return o},g=(t,e)=>{if(t.length>e){const r=[];for(let o=0;o<e;o++){const c=Math.floor(o*t.length/e);r.push(t[c])}return r}const a=t.length-1;let n=[];for(let r=0;r<a-1;r++)n=n.concat(i(t[r],t[r+1],Math.max(1,Math.floor(e/a))));for(;n.length<e;)n.push(t[t.length-1]);return n};export{u as V,i as a,g as c};