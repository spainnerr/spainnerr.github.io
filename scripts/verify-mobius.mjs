// Compare the PBR renderer with the untouched original mathematical generator.
// node scripts/verify-mobius.mjs /tmp/render-mobius
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const original=readFileSync('scripts/generate-mobius.mjs','utf8');
const surfaceCode=original.slice(original.indexOf('  function surface('),original.indexOf('  const light ='));
const context=vm.createContext({Math});
vm.runInContext(surfaceCode,context);
const samples=execFileSync(process.argv[2]||'/tmp/render-mobius',['--geometry'],{encoding:'utf8'}).trim().split('\n');
let maxError=0;
for(const row of samples){
 const [u,v,...actual]=row.split(' ').map(Number);
 const p=context.surface(u,v),xy=context.project(p);
 for(const [i,value] of [...p,...xy].entries())maxError=Math.max(maxError,Math.abs(value-actual[i]));
}
assert(maxError<1e-10,'Geometry or projection diverged from the original');
const css=readFileSync('assets/site.css','utf8');
assert(css.includes('body[data-motion="running"] .mobius-image { animation: levitate 8s ease-in-out infinite; }'));
assert(css.includes('@keyframes levitate { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-11px) rotate(2deg); } }'));
assert(css.includes('transform-origin: 50% 55%;'));
// Weld the mathematical seam (u=2pi,v) to (u=0,-v), then count boundary loops.
const U=64,V=12,edges=new Map();
const id=(i,j)=>i===U?V-j:i*(V+1)+j;
for(let i=0;i<U;i++)for(let j=0;j<V;j++){
 const q=[id(i,j),id(i+1,j),id(i+1,j+1),id(i,j+1)];
 for(let k=0;k<4;k++){const a=q[k],b=q[(k+1)%4],key=a<b?`${a},${b}`:`${b},${a}`;edges.set(key,(edges.get(key)||0)+1);}
}
const boundary=new Map();
for(const [key,count] of edges){assert(count===1||count===2);if(count!==1)continue;const [a,b]=key.split(',').map(Number);for(const [x,y] of [[a,b],[b,a]])boundary.set(x,[...(boundary.get(x)||[]),y]);}
for(const neighbors of boundary.values())assert.equal(neighbors.length,2);
let components=0;const seen=new Set();
for(const start of boundary.keys()){if(seen.has(start))continue;components++;const queue=[start];while(queue.length){const v=queue.pop();if(seen.has(v))continue;seen.add(v);queue.push(...boundary.get(v));}}
assert.equal(components,1,'The Mobius strip must have one boundary');
assert.equal(U*(V+1)-edges.size+U*V,0,'Euler characteristic must be zero');
for(let j=0;j<=V;j++){
 const a=context.surface(0,-.6+j*1.2/V),b=context.surface(2*Math.PI,.6-j*1.2/V);
 assert(Math.hypot(...a.map((x,k)=>x-b[k]))<1e-12);
}
console.log(JSON.stringify({geometrySamples:samples.length,maxCoordinateError:maxError,originalMotionPreserved:true,boundaryComponents:components,eulerCharacteristic:0},null,2));
