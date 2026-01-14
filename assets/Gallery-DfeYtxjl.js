import{c as x,r as d,u as b,j as e,X as w,A as l,m as s,d as u,C as y,a as g}from"./index-CQ08eW_z.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=x("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=x("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]),C=({images:a,onImageClick:m})=>{const[t,p]=d.useState(0),[h,f]=d.useState(0),i=b("/Portfolio/click.mp3"),o=c=>{i(),f(c),p(v=>{const r=v+c;return r<0?a.length-1:r>=a.length?0:r})},n=[`class Developer extends Human {
  constructor(name, skills) {
    super(name);
    this.skills = skills;
  }
}`,`// Fetching project data from API
fetch('https://api.github.com/users/nazrulhaq12/repos')
  .then(response => response.json())
  .then(data => console.log(data));`,`function solveProblem(problem) {
  const solution = findSolution(problem);
  return solution.isOptimal ? solution : refactor(solution);
}`],j=n[t%n.length];return e.jsx("div",{className:"relative w-full max-w-4xl mx-auto py-8 text-emerald-400 font-mono",children:e.jsxs("div",{className:"bg-slate-950 rounded-lg shadow-xl border border-emerald-500/30 overflow-hidden terminal-frame",children:[e.jsxs("div",{className:"flex items-center justify-between p-2 bg-slate-900 border-b border-emerald-500/30",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-yellow-400 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"})]}),e.jsx("span",{className:"text-sm",children:"root@portfolio:~/gallery"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(N,{size:16,className:"text-slate-500"}),e.jsx(S,{size:16,className:"text-slate-500"}),e.jsx(w,{size:16,className:"text-slate-500"})]})]}),e.jsx("div",{className:"text-sm p-4 h-6 mb-4",children:e.jsx(l,{mode:"wait",children:e.jsx(s.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},children:e.jsx(u.Typewriter,{words:[`> ACCESSING PHOTO ${t+1}/${a.length}...`],loop:1,typeSpeed:20,cursor:!0,cursorStyle:"_"})},t)})}),e.jsxs("div",{className:"relative w-full aspect-video flex items-center justify-center px-8",children:[e.jsx(l,{initial:!1,custom:h,children:e.jsx(s.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,ease:"easeInOut"},className:"absolute inset-0 group overflow-hidden rounded-lg shadow-lg border border-emerald-500/30",onClick:()=>{m(t),i()},children:e.jsx(s.img,{src:a[t].src,alt:a[t].alt,className:"w-full h-full object-cover glitch-scan"})},t)}),e.jsx(s.button,{onClick:()=>o(-1),className:"absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full text-white transition-all duration-300 hover:scale-110","aria-label":"Previous image",whileHover:{scale:1.1,textShadow:"0 0 8px #6366f1"},children:e.jsx(y,{size:36,className:"text-indigo-400"})}),e.jsx(s.button,{onClick:()=>o(1),className:"absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full text-white transition-all duration-300 hover:scale-110","aria-label":"Next image",whileHover:{scale:1.1,textShadow:"0 0 8px #ec4899"},children:e.jsx(g,{size:36,className:"text-pink-400"})})]}),e.jsx("div",{className:"mt-8 p-4 bg-slate-900 border-t border-emerald-500/30",children:e.jsx(l,{mode:"wait",children:e.jsx(s.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,ease:"easeInOut"},children:e.jsx("pre",{className:"text-xs md:text-sm whitespace-pre-wrap",children:e.jsx(u.Typewriter,{words:[j],loop:1,typeSpeed:10,cursor:!0,cursorStyle:"_"})})},t)})})]})})};export{C as default};
