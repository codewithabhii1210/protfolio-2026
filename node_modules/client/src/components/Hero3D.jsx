import {useRef,useMemo,useState,useEffect} from 'react';import {Canvas,useFrame} from '@react-three/fiber';import * as THREE from 'three';
const mobile=matchMedia('(max-width:700px)').matches,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const R=1.75,seg=mobile?8:14;
// Orbit ring with 4 nodes (frontend, backend, database, APIs) circling the profile photo
function Orbit(){
 const g=useRef();
 useFrame(({pointer},dt)=>{const m=THREE.MathUtils;g.current.rotation.z+=dt*.18;
  g.current.rotation.x=m.lerp(g.current.rotation.x,.45+pointer.y*.3,.05);g.current.rotation.y=m.lerp(g.current.rotation.y,pointer.x*.4,.05);});
 return <group ref={g}><mesh><torusGeometry args={[R,.006,8,mobile?48:96]}/><meshBasicMaterial color="#7cf5c8" transparent opacity={.5}/></mesh>
  {[0,1,2,3].map(i=>{const a=i*Math.PI/2;return <mesh key={i} position={[Math.cos(a)*R,Math.sin(a)*R,0]}><sphereGeometry args={[.09,seg,seg]}/><meshBasicMaterial color="#f2f2ee"/></mesh>;})}</group>;
}
function Particles(){
 const n=mobile?50:180,pos=useMemo(()=>Float32Array.from({length:n*3},()=>(Math.random()-.5)*7),[n]),r=useRef();
 useFrame((_,d)=>{r.current.rotation.y+=d*.03;});
 return <points ref={r}><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos,3]}/></bufferGeometry><pointsMaterial size={.03} color="#8a8a85" sizeAttenuation/></points>;
}
export default function Hero3D(){
 const [on,setOn]=useState(true),box=useRef();
 useEffect(()=>{const o=new IntersectionObserver(([e])=>setOn(e.isIntersecting));o.observe(box.current);return()=>o.disconnect();},[]); // pause when offscreen
 if(reduce)return null;
 return <div ref={box} className="hero3d" aria-hidden="true"><Canvas frameloop={on?'always':'never'} camera={{position:[0,0,5],fov:50}} dpr={[1,mobile?1:1.5]}
  eventSource={document.body} eventPrefix="client" gl={{antialias:!mobile,powerPreference:'high-performance'}}><Orbit/><Particles/></Canvas></div>;
}
