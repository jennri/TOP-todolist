(()=>{const e=document.querySelector("[data-list]"),t=document.querySelector("[data-new-list]"),n=document.querySelector("[data-new-input]"),a=document.querySelector("[delete-list-btn]"),l=document.querySelector("[data-list-display-container]"),o=document.querySelector("[data-list-title]"),i=document.querySelector("[data-list-count]"),d=document.querySelector("[data-tasks]"),c=document.querySelector("[task-template]"),r=document.querySelector("[task-edit]"),s=document.querySelector("[data-new-task-form]"),u=document.querySelector("[data-new-task-input]"),m=document.querySelector("[data-clear-complete-tasks-btn]"),y=document.querySelector("[modal-input-container]"),p=document.querySelector("[modal-background]"),S="task.lists";let f=JSON.parse(localStorage.getItem(S))||[];const k="task.selectedListID";let q=localStorage.getItem(k);function g(){v(),h()}function v(){localStorage.setItem(S,JSON.stringify(f)),localStorage.setItem(k,q)}function h(){E(e),f.forEach((t=>{const n=document.createElement("li");n.dataset.listId=t.id,n.classList.add("listname"),n.innerText=t.name,t.id===q&&n.classList.add("active"),e.appendChild(n)}));const t=f.find((e=>e.id===q));null==q?l.style.display="none":(l.style.display="",o.innerText=t.name,L(t),E(d),function(e){e.task.forEach((e=>{const t=document.importNode(c.content,!0),n=t.querySelector("input");n.id=e.id,n.checked=e.complete;const a=t.querySelector("label");a.htmlFor=e.id,a.append(e.name);const l=t.querySelector("button");l.id=n.id,l.addEventListener("click",(()=>{!function(e){y.style.display="block",p.style.display="block",E(y),console.log(e);const t=document.importNode(r.content,!0);t.querySelector("[edit-name]").value="tommi",t.querySelector("[edit-details]"),t.querySelector("[edit-date]"),t.querySelector("[edit-priority]"),t.querySelector("button"),y.appendChild(t)}(e.name)})),d.appendChild(t)}))}(t))}function L(e){const t=e.task.filter((e=>!e.complete)).length,n=1===t?"task":"tasks";i.innerText=`${t} ${n} remaining`}function E(e){for(;e.firstChild;)e.removeChild(e.firstChild)}h(),e.addEventListener("click",(e=>{"li"===e.target.tagName.toLowerCase()&&(q=e.target.dataset.listId,g())})),d.addEventListener("click",(e=>{if("input"===e.target.tagName.toLowerCase()){const t=f.find((e=>e.id===q));t.task.find((t=>t.id===e.target.id)).complete=e.target.checked,v(),L(t)}})),a.addEventListener("click",(()=>{f=f.filter((e=>e.id!==q)),q=null,g()})),m.addEventListener("click",(e=>{const t=f.find((e=>e.id===q));t.task=t.task.filter((e=>!e.complete)),g()})),p.addEventListener("click",(function(){y.style.display="none",p.style.display="none"})),t.addEventListener("submit",(e=>{e.preventDefault();const t=n.value;if(null==t||""===t)return;const a=(l=t,{id:Date.now().toString(),name:l,task:[]});var l;n.value=null,f.push(a),g()})),s.addEventListener("submit",(e=>{e.preventDefault();const t=u.value;if(null==t||""===t)return;const n=(a=t,{id:Date.now().toString(),name:a,details:"",priority:"",dateDue:"",complete:!1});var a;u.value=null,f.find((e=>e.id===q)).task.push(n),g()}))})();