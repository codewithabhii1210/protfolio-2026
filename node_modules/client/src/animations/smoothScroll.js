import Lenis from 'lenis';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function initSmoothScroll(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return()=>{};
 const l=new Lenis({anchors:true});l.on('scroll',ScrollTrigger.update);
 const t=(time)=>l.raf(time*1000);gsap.ticker.add(t);gsap.ticker.lagSmoothing(0);
 return()=>{gsap.ticker.remove(t);l.destroy();};}
