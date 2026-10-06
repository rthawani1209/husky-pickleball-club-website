import React,{useEffect,useRef,useState} from 'react';
const vert=`attribute vec2 position;varying vec2 uv;void main(){uv=position;gl_Position=vec4(position,0.,1.);}`;
const frag=`precision highp float;
varying vec2 uv;uniform vec2 resolution;uniform vec2 orbit;uniform float time;uniform sampler2D face;
mat3 rotation(float x,float y){return mat3(cos(y),0.,sin(y),0.,1.,0.,-sin(y),0.,cos(y))*mat3(1.,0.,0.,0.,cos(x),-sin(x),0.,sin(x),cos(x));}
float box(vec3 p,vec3 b,float r){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r;}
vec2 scene(vec3 p){
 vec3 b=p-vec3(.91,.08,.55);float shell=max(length(b)-.66,.603-length(b));
 for(int i=0;i<26;i++){float fi=float(i),y=1.-2.*(fi+.5)/26.;float phi=fi*2.399963;vec3 n=vec3(sqrt(1.-y*y)*cos(phi),y,sqrt(1.-y*y)*sin(phi));float hole=max(length(b-n*dot(b,n))-.074,abs(dot(b,n)-.63)-.13);shell=max(shell,-hole);}
 vec2 result=vec2(shell,1.);
 vec3 q=rotation(.05,-.24)*(p-vec3(-.37,.22,0.));q.xy=mat2(.966,-.259,.259,.966)*q.xy;
 float taper=mix(.72,1.,smoothstep(-.65,-.05,q.y));vec3 faceq=vec3(q.x/taper,q.y,q.z);float body=max(box(vec3(faceq.xy,0.),vec3(.33,.47,0.),.18),abs(q.z)-.047);float guard=max(box(vec3(faceq.xy,0.),vec3(.36,.50,0.),.19),abs(q.z)-.038);float handle=box(q-vec3(0.,-.98,0.),vec3(.075,.30,.036),.043);
 float d=min(guard,handle);if(d<result.x)result=vec2(d,3.);if(body<result.x)result=vec2(body,2.);
 float cap=box(q-vec3(0.,-1.32,0.),vec3(.09,.012,.045),.04);if(cap<result.x)result=vec2(cap,4.);
 return result;}
vec3 normal(vec3 p){vec2 e=vec2(.002,0.);return normalize(vec3(scene(p+e.xyy).x-scene(p-e.xyy).x,scene(p+e.yxy).x-scene(p-e.yxy).x,scene(p+e.yyx).x-scene(p-e.yyx).x));}
float shadow(vec3 p,vec3 l){float res=1.,t=.04;for(int i=0;i<12;i++){float d=scene(p+l*t).x;res=min(res,12.*d/t);t+=clamp(d,.06,.3);if(t>4.)break;}return clamp(res,.12,1.);}
vec3 env(vec3 n){float top=max(n.y,0.);return mix(vec3(.09,.067,.12),vec3(.68,.69,.76),pow(top,.65))+vec3(.40,.28,.60)*pow(max(dot(n,normalize(vec3(-1.,.5,-1.))),0.),8.);}
vec3 shade(vec3 p,vec3 n,vec3 v,float mat){vec3 base=vec3(.65,.76,.045);float rough=.43;
 vec3 q=rotation(.05,-.24)*(p-vec3(-.37,.22,0.));q.xy=mat2(.966,-.259,.259,.966)*q.xy;
 if(mat>1.5&&mat<2.5){base=texture2D(face,vec2(q.x/1.24+.5,q.y/1.52+.5)).rgb;rough=.48;}
 if(mat>2.5){base=vec3(.045,.038,.055);rough=.58;if(q.y<-.72){float stripe=step(.72,fract((q.y+q.x*.35)*38.));base+=stripe*.025;}}
 if(mat>3.5){base=vec3(.48,.36,.63);rough=.32;}
 if(mat<1.5){float seam=1.-smoothstep(.002,.008,abs(p.y-.08));base*=1.-.12*seam;float grain=fract(sin(dot(p.xy,vec2(123.4,365.3)))*12345.);base*=.96+.045*grain;}
 vec3 l=normalize(vec3(-2.5,4.,4.)),h=normalize(l+v);float nl=max(dot(n,l),0.),nv=max(dot(n,v),.001),nh=max(dot(n,h),0.),vh=max(dot(v,h),0.);
 float a=rough*rough,a2=a*a;float D=a2/(3.14159*pow(nh*nh*(a2-1.)+1.,2.));float k=pow(rough+1.,2.)/8.;float G=nl/(nl*(1.-k)+k)*nv/(nv*(1.-k)+k);vec3 F=vec3(.04)+(1.-vec3(.04))*pow(1.-vh,5.);vec3 spec=D*G*F/max(4.*nv*nl,.001);
 float ao=1.;for(int i=1;i<4;i++){float t=float(i)*.035;ao-=max(t-scene(p+n*t).x,0.)*.65;}
 vec3 c=(base/3.14159+spec)*nl*vec3(3.4,3.25,3.05)*shadow(p+n*.015,l)+base*env(n)*.52*ao;
 c+=env(reflect(-v,n))*F*.55;return c;}
void main(){float aspect=resolution.x/resolution.y;vec3 ro=vec3(0.,.18,4.85);mat3 rot=rotation(orbit.x,orbit.y);ro=rot*ro;vec3 rd=normalize(rot*vec3(uv.x*aspect*.95,uv.y*.95+.04,-2.4));float t=0.;vec2 hit;
 for(int i=0;i<56;i++){hit=scene(ro+rd*t);if(hit.x<.002||t>8.)break;t+=hit.x*.78;}
 vec3 col=vec3(.0029,.0020,.0072);
 if(t<8.&&hit.x<.006){vec3 p=ro+rd*t;col=shade(p,normal(p),normalize(ro-p),hit.y);}else{
 float ft=(-1.20-ro.y)/rd.y;if(ft>0.&&ft<16.){vec3 p=ro+rd*ft;float sh=shadow(p,normalize(vec3(-2.5,4.,4.)));float fade=exp(-length(p.xz)*.32);col=mix(col,vec3(.014,.008,.025)*(.3+.7*sh),fade*.45);}}
 col=col/(1.+col);col=pow(col,vec3(1./2.2));gl_FragColor=vec4(col,1.);}`;
export function CourtScene(){
 const canvas=useRef<HTMLCanvasElement>(null),state=useRef({x:-.07,y:.18,vx:0,vy:0,px:0,py:0,drag:false}),[motion,setMotion]=useState(false),[available,setAvailable]=useState(true);
 useEffect(()=>{const m=matchMedia('(prefers-reduced-motion: reduce)');setMotion(!m.matches);const f=()=>setMotion(!m.matches);m.addEventListener('change',f);return()=>m.removeEventListener('change',f)},[]);
 useEffect(()=>{const el=canvas.current;if(!el)return;const gl=el.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:true,powerPreference:'low-power'});if(!gl){setAvailable(false);return;}
 const shader=(type:number,src:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s)||'shader');return s};
 let program:WebGLProgram;try{program=gl.createProgram()!;gl.attachShader(program,shader(gl.VERTEX_SHADER,vert));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,frag));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('link');}catch{setAvailable(false);return;}
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
 const tex=document.createElement('canvas');tex.width=512;tex.height=512;const ctx=tex.getContext('2d')!;ctx.fillStyle='#281a40';ctx.fillRect(0,0,512,512);for(let y=0;y<512;y+=4)for(let x=0;x<512;x+=4){ctx.fillStyle=(x+y)%8?'#322247':'#251b38';ctx.fillRect(x,y,3,3)}ctx.fillStyle='#d9c7ee';ctx.textAlign='center';ctx.font='bold 69px Arial';ctx.fillText('HUSKY',256,235);ctx.font='bold 17px Arial';ctx.fillText('PICKLEBALL CLUB',256,267);ctx.strokeStyle='#a992c5';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(190,298);ctx.lineTo(322,298);ctx.stroke();ctx.font='12px Arial';ctx.fillText('UNIVERSITY OF WASHINGTON',256,325);
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.uniform1i(gl.getUniformLocation(program,'face'),0);
 const resolution=gl.getUniformLocation(program,'resolution'),orbit=gl.getUniformLocation(program,'orbit');let frame=0,last=0,visible=true;const obs=new IntersectionObserver(([e])=>visible=e.isIntersecting);obs.observe(el);
 const draw=(now:number)=>{frame=requestAnimationFrame(draw);if(!visible||now-last<66)return;last=now;const r=el.getBoundingClientRect();const scale=r.width<600?.65:.85;const w=Math.round(r.width*scale),h=Math.round(r.height*scale);if(el.width!==w||el.height!==h){el.width=w;el.height=h;gl.viewport(0,0,w,h)}const s=state.current;if(!s.drag&&motion){s.x+=s.vx;s.y+=s.vy;s.vx*=.92;s.vy*=.92;}s.x=Math.max(-.35,Math.min(.35,s.x));s.y=Math.max(-.65,Math.min(.65,s.y));const progress=Math.max(0,Math.min(1,-r.top/innerHeight));gl.uniform2f(resolution,w,h);gl.uniform2f(orbit,s.x+(motion?progress*.1:0),s.y+(motion?Math.sin(now*.00025)*.025:0));gl.drawArrays(gl.TRIANGLES,0,6);};frame=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(frame);obs.disconnect();gl.deleteProgram(program);gl.deleteBuffer(buffer);gl.deleteTexture(texture)};
 },[motion]);
 return <div className="court-scene">{available?<canvas ref={canvas} tabIndex={0} role="img" aria-label="WebGL pickleball and club paddle. Drag to turn the view; arrow keys also work." onPointerDown={e=>{const s=state.current;s.drag=true;s.px=e.clientX;s.py=e.clientY;s.vx=s.vy=0;e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{const s=state.current;if(!s.drag)return;s.vy=(e.clientX-s.px)*.004;s.vx=(e.clientY-s.py)*.003;s.y+=s.vy;s.x+=s.vx;s.px=e.clientX;s.py=e.clientY}} onPointerUp={()=>state.current.drag=false} onPointerCancel={()=>state.current.drag=false} onKeyDown={e=>{if(e.key.startsWith('Arrow')){e.preventDefault();state.current.y+=e.key==='ArrowLeft'?-.08:e.key==='ArrowRight'?.08:0;state.current.x+=e.key==='ArrowUp'?-.05:e.key==='ArrowDown'?.05:0;}}}/>:<div className="scene-fallback"><span>HUSKY</span><p>Pickleball. People. Possibility.</p></div>}<div className="scene-controls"><span>DRAG TO EXPLORE</span><button onClick={()=>setMotion(!motion)}>{motion?'Pause motion':'Enable motion'}</button><button onClick={()=>Object.assign(state.current,{x:-.07,y:.18,vx:0,vy:0})}>Reset</button></div></div>
}
