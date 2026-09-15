// Offline PBR render of the original surface; no animation or camera changes.
// g++ -O3 -std=c++17 -fopenmp scripts/render-mobius.cpp -o /tmp/render-mobius
// /tmp/render-mobius /tmp/mobius.rgb 5760
#include <algorithm>
#include <array>
#include <cmath>
#include <fstream>
#include <iostream>
#include <iomanip>
#include <numeric>
#include <vector>
using namespace std;
constexpr double PI=3.14159265358979323846;
struct V {
 double x=0,y=0,z=0;
 V operator+(V b)const{return{x+b.x,y+b.y,z+b.z};}
 V operator-(V b)const{return{x-b.x,y-b.y,z-b.z};}
 V operator*(double k)const{return{x*k,y*k,z*k};}
 V operator/(double k)const{return *this*(1/k);}
 double at(int a)const{return a==0?x:a==1?y:z;}
};
V mul(V a,V b){return{a.x*b.x,a.y*b.y,a.z*b.z};}
double dot(V a,V b){return a.x*b.x+a.y*b.y+a.z*b.z;}
V cross(V a,V b){return{a.y*b.z-a.z*b.y,a.z*b.x-a.x*b.z,a.x*b.y-a.y*b.x};}
V norm(V a){return a/sqrt(max(1e-20,dot(a,a)));}
V mix(V a,V b,double t){return a*(1-t)+b*t;}
double clamp01(double a){return clamp(a,0.,1.);}
V rotateOriginal(V p){
 // EXACT rotations from generate-mobius.mjs.
 const double rx=.88, ry=-.34, rz=-.48;
 double y=p.y*cos(rx)-p.z*sin(rx),z=p.y*sin(rx)+p.z*cos(rx);
 double x2=p.x*cos(ry)+z*sin(ry),z2=-p.x*sin(ry)+z*cos(ry);
 return{x2*cos(rz)-y*sin(rz),x2*sin(rz)+y*cos(rz),z2};
}
V surface(double u,double v){
 return rotateOriginal({(1.44+v*cos(u/2))*cos(u),(1.44+v*cos(u/2))*sin(u),v*sin(u/2)});
}
V surfaceNormal(double u,double v){
 double r=1.44+v*cos(u/2),ru=-v*.5*sin(u/2);
 V du={ru*cos(u)-r*sin(u),ru*sin(u)+r*cos(u),v*.5*cos(u/2)};
 V dv={cos(u/2)*cos(u),cos(u/2)*sin(u),sin(u/2)};
 return norm(rotateOriginal(cross(du,dv)));
}
struct Vertex {V p,n,c; double u,v;};
struct Tri {int a,b,c;V center,lo,hi;};
struct Node {V lo,hi;int begin,end,left=-1,right=-1;};
vector<Vertex> vertices;vector<Tri> tris;vector<int> order;vector<Node> nodes;
V vmin(V a,V b){return{min(a.x,b.x),min(a.y,b.y),min(a.z,b.z)};}
V vmax(V a,V b){return{max(a.x,b.x),max(a.y,b.y),max(a.z,b.z)};}
int build(int begin,int end){
 int idx=nodes.size();nodes.push_back({{1e9,1e9,1e9},{-1e9,-1e9,-1e9},begin,end});
 for(int i=begin;i<end;i++){nodes[idx].lo=vmin(nodes[idx].lo,tris[order[i]].lo);nodes[idx].hi=vmax(nodes[idx].hi,tris[order[i]].hi);}
 if(end-begin<=6)return idx;
 V d=nodes[idx].hi-nodes[idx].lo;int axis=d.x>d.y?0:1;if(d.z>d.at(axis))axis=2;
 int mid=(begin+end)/2;
 nth_element(order.begin()+begin,order.begin()+mid,order.begin()+end,[axis](int a,int b){return tris[a].center.at(axis)<tris[b].center.at(axis);});
 int l=build(begin,mid),r=build(mid,end);nodes[idx].left=l;nodes[idx].right=r;return idx;
}
bool boxHit(const Node& n,V o,V inv,double maxT){
 double t0=0,t1=maxT;
 for(int a=0;a<3;a++){double p=(n.lo.at(a)-o.at(a))*inv.at(a),q=(n.hi.at(a)-o.at(a))*inv.at(a);if(p>q)swap(p,q);t0=max(t0,p);t1=min(t1,q);if(t1<t0)return false;}return true;
}
bool triangleHit(const Tri&t,V o,V d,double maxT){
 V a=vertices[t.a].p,e1=vertices[t.b].p-a,e2=vertices[t.c].p-a;
 V p=cross(d,e2);double det=dot(e1,p);if(abs(det)<1e-12)return false;
 double inv=1/det;V s=o-a;double u=dot(s,p)*inv;if(u<0||u>1)return false;
 V q=cross(s,e1);double v=dot(d,q)*inv;if(v<0||u+v>1)return false;
 double hit=dot(e2,q)*inv;return hit>.0008&&hit<maxT;
}
bool occluded(V o,V d,double maxT){
 V inv={1/(abs(d.x)<1e-15?1e-15:d.x),1/(abs(d.y)<1e-15?1e-15:d.y),1/(abs(d.z)<1e-15?1e-15:d.z)};
 int stack[64],count=1;stack[0]=0;
 while(count){const Node&n=nodes[stack[--count]];if(!boxHit(n,o,inv,maxT))continue;
  if(n.left<0){for(int i=n.begin;i<n.end;i++)if(triangleHit(tris[order[i]],o,d,maxT))return true;}
  else {stack[count++]=n.left;stack[count++]=n.right;}
 }return false;
}
double srgbToLinear(double c){return c<=.04045?c/12.92:pow((c+.055)/1.055,2.4);}
V linear(V s){return{srgbToLinear(s.x),srgbToLinear(s.y),srgbToLinear(s.z)};}
double srgb(double c){c=max(c,0.);return c<=.0031308?12.92*c:1.055*pow(c,1/2.4)-.055;}
double ggxG(double nd,double alpha2){return 2*nd/(nd+sqrt(alpha2+(1-alpha2)*nd*nd)+1e-9);}
struct Light {V position,color;double radius;};
array<Light,3> lights={Light{{-3.5,-4.5,6},{4.9,4.95,5.0},1.9},Light{{4,-.5,4},{2.0,2.3,2.7},2.1},Light{{-1,4,2.5},{2.5,3.0,3.7},1.3}};
V shade(const Vertex& vert){
 V p=vert.p,view=norm(V{0,0,7.8}-p),n=vert.n;
 if(dot(n,view)<0)n=n*-1;
 // Seam-compatible pigment: f(2pi,v) = f(0,-v).
 double tint=.5+.28*(vert.v/.6)*cos(vert.u/2)+.18*sin(vert.u);
 V base=mix(linear({.018,.19,.52}),linear({.028,.46,.82}),clamp01(tint));
 double roughness=.29,metallic=.28;
 V f0=mix({.045,.045,.045},base,metallic);
 double nv=max(.001,dot(n,view)),a=roughness*roughness,a2=a*a;
 V tangent=norm(cross(abs(n.z)<.95?V{0,0,1}:V{0,1,0},n)),bitangent=cross(n,tangent);
 double ao=0;
 for(int s=0;s<40;s++){
  double t=(s+.5)/40,r=sqrt(t),phi=s*2.399963229728653;
  V ray=tangent*(r*cos(phi))+bitangent*(r*sin(phi))+n*sqrt(1-t);
  if(!occluded(p+n*.003,ray,1.6))ao+=1./40;
 }
 V radiance=mul(base,{.28,.34,.46})*(.42+.58*ao);
 for(const auto& light:lights){
  V center=norm(light.position-p),lt=norm(cross(center,{0,1,0})),lb=cross(center,lt);
  for(int s=0;s<24;s++){
   double r=sqrt((s+.5)/24)*light.radius,phi=s*2.399963229728653;
   V position=light.position+lt*(r*cos(phi))+lb*(r*sin(phi)),delta=position-p;
   double distance=sqrt(dot(delta,delta));V l=delta/distance;double nl=max(0.,dot(n,l));if(nl<=0)continue;
   if(occluded(p+n*.003,l,distance-.01))continue;
   V h=norm(l+view);double nh=max(0.,dot(n,h)),vh=clamp01(dot(view,h));
   double d=a2/(PI*pow(nh*nh*(a2-1)+1,2));
   V f=f0+(V{1,1,1}-f0)*pow(1-vh,5);
   V spec=f*(d*ggxG(nl,a2)*ggxG(nv,a2)/max(4*nl*nv,1e-6));
   V diffuse=mul(V{1,1,1}-f,base)*((1-metallic)/PI);
   radiance=radiance+mul(diffuse+spec,light.color)*(nl/24);
  }
 }
 // Broad neutral studio environment reflection, without artificial edge lines.
 V reflection=n*(2*dot(n,view))-view;
 auto panel=[&](V direction,double width,double height){
  direction=norm(direction);V tx=norm(cross(direction,{0,1,0})),ty=cross(direction,tx);
  double facing=dot(reflection,direction);if(facing<=0)return 0.;
  double x=dot(reflection,tx)/facing,y=dot(reflection,ty)/facing;
  return exp(-.5*(x*x/(width*width)+y*y/(height*height)));
 };
 // Roughness-prefiltered rectangular studio panels reflected in the lacquer.
 double softbox=2.8*panel({-.42,-.68,-.61},.15,.9)+1.9*panel({.78,.12,-.63},.18,.8)+.55*panel({0,-.08,-1},.9,.11);
 V fresnel=f0+(V{1,1,1}-f0)*pow(1-nv,5);
 radiance=radiance+mul(fresnel,{.82,.94,1.08})*((.10+softbox)*(.7+.3*ao));
 // Gentle highlight compression in linear light; preserve saturated blue.
 auto tone=[](double x){x*=1.10;return x/(1+.45*x);};
 return{tone(radiance.x),tone(radiance.y),tone(radiance.z)};
}
struct Screen {double x,y,w;};
Screen project(V p,double scale){double w=7.8/(7.8-p.z);return{(360+p.x*151*w)*scale,(275+p.y*151*w)*scale,w};}
double edge(Screen a,Screen b,double x,double y){return (b.x-a.x)*(y-a.y)-(b.y-a.y)*(x-a.x);}
int main(int argc,char**argv){
 if(argc<2){cerr<<"usage: render-mobius output.rgb [width=5760]\n";return 1;}
 if(string(argv[1])=="--geometry"){
  cout<<setprecision(17);
  for(int i=0;i<=16;i++)for(int j=0;j<=8;j++){
   double u=i*2*PI/16,v=-.6+j*1.2/8;V p=surface(u,v);Screen s=project(p,1);
   cout<<u<<" "<<v<<" "<<p.x<<" "<<p.y<<" "<<p.z<<" "<<s.x<<" "<<s.y<<"\n";
  }return 0;
 }
 int width=argc>2?stoi(argv[2]):5760,height=width*620/720;double scale=width/720.;
 const int U=1056,VV=112;
 for(int i=0;i<=U;i++)for(int j=0;j<=VV;j++){double u=i*2*PI/U,v=-.6+j*1.2/VV;vertices.push_back({surface(u,v),surfaceNormal(u,v),{},u,v});}
 auto add=[&](int a,int b,int c){V p=vertices[a].p,q=vertices[b].p,r=vertices[c].p;tris.push_back({a,b,c,(p+q+r)/3,vmin(p,vmin(q,r)),vmax(p,vmax(q,r))});};
 for(int i=0;i<U;i++)for(int j=0;j<VV;j++){int a=i*(VV+1)+j,b=a+VV+1;add(a,b,b+1);add(a,b+1,a+1);}
 order.resize(tris.size());iota(order.begin(),order.end(),0);nodes.reserve(tris.size());build(0,order.size());
 cerr<<"Mesh: "<<vertices.size()<<" vertices, "<<tris.size()<<" triangles. Baking PBR / studio shadows / AO.\n";
 #pragma omp parallel for schedule(dynamic,128)
 for(size_t i=0;i<vertices.size();i++)vertices[i].c=shade(vertices[i]);
 cerr<<"Rasterizing "<<width<<" x "<<height<<" in linear light.\n";
 vector<float> depth((size_t)width*height,-1e9),pixels((size_t)width*height*4,0);
 // Disjoint row bands avoid racing on the z-buffer; perspective-correct colors.
 #pragma omp parallel for schedule(dynamic,1)
 for(int band=0;band<32;band++){
  int start=height*band/32,end=height*(band+1)/32;
  for(const auto&t:tris){
   const Vertex& a=vertices[t.a];const Vertex&b=vertices[t.b];const Vertex&c=vertices[t.c];
   Screen p=project(a.p,scale),q=project(b.p,scale),r=project(c.p,scale);double area=edge(p,q,r.x,r.y);if(abs(area)<1e-9)continue;
   int x0=max(0,(int)floor(min({p.x,q.x,r.x}))),x1=min(width-1,(int)ceil(max({p.x,q.x,r.x})));
   int y0=max(start,(int)floor(min({p.y,q.y,r.y}))),y1=min(end-1,(int)ceil(max({p.y,q.y,r.y})));
   for(int y=y0;y<=y1;y++)for(int x=x0;x<=x1;x++){
    double wa=edge(q,r,x+.5,y+.5)/area,wb=edge(r,p,x+.5,y+.5)/area,wc=1-wa-wb;if(min({wa,wb,wc})<-1e-8)continue;
    double denom=wa*p.w+wb*q.w+wc*r.w;wa=wa*p.w/denom;wb=wb*q.w/denom;wc=wc*r.w/denom;
    double z=wa*a.p.z+wb*b.p.z+wc*c.p.z;size_t idx=(size_t)y*width+x;if(z<=depth[idx])continue;
    depth[idx]=z;V rgb=a.c*wa+b.c*wb+c.c*wc;
    pixels[idx*4]=rgb.x;pixels[idx*4+1]=rgb.y;pixels[idx*4+2]=rgb.z;pixels[idx*4+3]=1;
   }
  }
 }
 ofstream out(argv[1],ios::binary);out.write((char*)pixels.data(),pixels.size()*sizeof(float));
 cerr<<"Saved linear RGBA float32.\n";
}
