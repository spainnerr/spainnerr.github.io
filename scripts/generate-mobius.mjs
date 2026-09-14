/* Original vector illustration. Run with Node.js: node scripts/generate-mobius.mjs */
import { mkdirSync, writeFileSync } from "node:fs";
function buildMobius() {
  const TAU = Math.PI * 2;
  const U = 176, V = 28, faces = [];
  const normalise = (p) => { const n = Math.hypot(...p); return p.map(v => v / n); };
  const subtract = (a,b) => a.map((v,i) => v-b[i]);
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const dot = (a,b) => a.reduce((n,v,i)=>n+v*b[i],0);
  function surface(u,v) {
    const a = (1.44 + v * Math.cos(u / 2)) * Math.cos(u);
    const b = (1.44 + v * Math.cos(u / 2)) * Math.sin(u);
    const c = v * Math.sin(u / 2);
    // Rotate the mathematical surface to reveal the half-twist and its opening.
    const rx = .88, ry = -.34, rz = -.48;
    const y = b*Math.cos(rx)-c*Math.sin(rx), z = b*Math.sin(rx)+c*Math.cos(rx);
    const x2 = a*Math.cos(ry)+z*Math.sin(ry), z2 = -a*Math.sin(ry)+z*Math.cos(ry);
    return [x2*Math.cos(rz)-y*Math.sin(rz),x2*Math.sin(rz)+y*Math.cos(rz),z2];
  }
  function project(p) { const perspective = 7.8/(7.8-p[2]); return [360+p[0]*151*perspective,275+p[1]*151*perspective]; }
  const light = normalise([-.55,-.65,1]);
  const half = normalise([light[0],light[1],light[2]+1]);
  const mix = (a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*Math.max(0,Math.min(1,t))));
  for(let i=0;i<U;i++) for(let j=0;j<V;j++){
    const u=i/U*TAU, v=-.6+j/V*1.2;
    const pts=[surface(u,v),surface(u+TAU/U,v),surface(u+TAU/U,v+1.2/V),surface(u,v+1.2/V)];
    const mid=surface(u+TAU/U/2,v+1.2/V/2);
    let n=normalise(cross(subtract(surface(u+.001,v),surface(u-.001,v)),subtract(surface(u,v+.001),surface(u,v-.001))));
    if(n[2]<0)n=n.map(x=>-x);
    const diffuse=Math.max(0,dot(n,light)), spec=Math.pow(Math.max(0,dot(n,half)),42);
    const edge=Math.pow(1-Math.max(0,n[2]),3);
    let rgb=mix([5,43,104],[16,140,244],.16+.77*diffuse);
    rgb=mix(rgb,[202,241,255],spec*.93+edge*.34);
    const xy=pts.map(project);
    const path="M"+xy.map(p=>p.map(v=>v.toFixed(2)).join(",")).join("L")+"Z";
    const color="#"+rgb.map(v=>v.toString(16).padStart(2,"0")).join("");
    faces.push({z:mid[2],path,color});
  }
  faces.sort((a,b)=>a.z-b.z);
  const paths=faces.map(f=>'<path d="'+f.path+'" fill="'+f.color+'" stroke="'+f.color+'"/>').join("");
  return '<?xml version="1.0" encoding="UTF-8"?>\n'+
    '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="620" viewBox="0 0 720 620" role="img" aria-labelledby="title desc">'+
    '<title id="title">Faixa de Möbius azul</title><desc id="desc">Ilustração vetorial de uma superfície de Möbius: uma fita com meia torção, um único lado e uma única borda.</desc>'+
    '<defs><radialGradient id="floor"><stop stop-color="#3977b2" stop-opacity=".22"/><stop offset=".48" stop-color="#85b9e7" stop-opacity=".1"/><stop offset="1" stop-color="#b2d8f5" stop-opacity="0"/></radialGradient>'+
    '<filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%"><feGaussianBlur stdDeviation="12"/></filter>'+
    '<filter id="objectShadow" x="-20%" y="-20%" width="140%" height="155%"><feDropShadow dx="0" dy="21" stdDeviation="14" flood-color="#1764a0" flood-opacity=".12"/></filter></defs>'+
    '<ellipse cx="355" cy="514" rx="243" ry="53" fill="url(#floor)"/><ellipse cx="365" cy="494" rx="159" ry="16" fill="#2d79b0" opacity=".065" filter="url(#softShadow)"/>'+
    '<g stroke-width=".4" stroke-linejoin="round" filter="url(#objectShadow)">'+paths+'</g></svg>\n';
}
mkdirSync("assets", {recursive:true});
writeFileSync("assets/mobius.svg", buildMobius());
