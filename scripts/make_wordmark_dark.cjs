const fs=require('fs');const path=require('path');const puppeteer=require('puppeteer');
(async()=>{
  const dir=path.resolve('public/logos');
  const br=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
  const p=await br.newPage();await p.setContent('<canvas id="c"></canvas>');
  const data=fs.readFileSync(path.join(dir,'wordmark-ink.png')).toString('base64');
  const r=await p.evaluate(async(d)=>{
    const img=new Image();await new Promise(r=>{img.onload=r;img.src='data:image/png;base64,'+d;});
    const W=img.naturalWidth,H=img.naturalHeight;const c=document.getElementById('c');c.width=W;c.height=H;
    const ctx=c.getContext('2d');ctx.drawImage(img,0,0);const px=ctx.getImageData(0,0,W,H).data;
    const bg=[px[8],px[9],px[10]];const dist=(i)=>Math.abs(px[i]-bg[0])+Math.abs(px[i+1]-bg[1])+Math.abs(px[i+2]-bg[2]);
    let minX=W,minY=H,maxX=0,maxY=0;
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;if(dist(i)>60){if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;}}
    const bw=maxX-minX+1,bh=maxY-minY+1;
    const padY=Math.round(bh*0.16), padX=Math.round(bh*0.16);
    const sx=Math.max(0,minX-padX),sy=Math.max(0,minY-padY),sw=Math.min(W-sx,bw+padX*2),sh=Math.min(H-sy,bh+padY*2);
    const oc=document.createElement('canvas');oc.width=sw;oc.height=sh;oc.getContext('2d').drawImage(img,sx,sy,sw,sh,0,0,sw,sh);
    return {bw,bh,sw,sh,ratio:(sw/sh).toFixed(2),dataUrl:oc.toDataURL('image/png')};
  },data);
  console.log('tight wordmark+gridmark: ink',r.bw+'x'+r.bh,'-> canvas',r.sw+'x'+r.sh,'ratio',r.ratio);
  fs.writeFileSync(path.join(dir,'inspirelabs-wordmark-dark.png'),Buffer.from(r.dataUrl.split(',')[1],'base64'));
  await br.close();
})();
