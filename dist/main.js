(()=>{const t=document.querySelector("[data-list]"),e=document.querySelector("[data-new-list]"),a=document.querySelector("[data-new-input]"),n=document.querySelector("[delete-list-btn]"),l=document.querySelector("[data-list-display-container]"),i=document.querySelector("[data-list-title]"),s=document.querySelector("[data-list-count]"),o=(document.querySelector("[data-tasks]"),"task.lists");let d=JSON.parse(localStorage.getItem(o))||[];const r="task.selectedListID";let c=localStorage.getItem(r);function u(){localStorage.setItem(o,JSON.stringify(d)),localStorage.setItem(r,c),m()}function m(){!function(t){for(;t.firstChild;)t.removeChild(t.firstChild)}(t),d.forEach((e=>{const a=document.createElement("li");a.dataset.listId=e.id,a.classList.add("listname"),a.innerText=e.name,e.id===c&&a.classList.add("active"),t.appendChild(a)}));const e=d.find((t=>t.id===c));null==c?l.style.display="none":(l.style.display="",i.innerText=e.name,function(t){const e=t.task.filter((t=>!t.complete)).length,a=1===e?"task":"tasks";s.innerText=`${e} ${a} remaining`}(e))}m(),t.addEventListener("click",(t=>{"li"===t.target.tagName.toLowerCase()&&(c=t.target.dataset.listId,u())})),n.addEventListener("click",(()=>{d=d.filter((t=>t.id!==c)),c=null,u()})),e.addEventListener("submit",(t=>{t.preventDefault();const e=a.value;if(null==e||""===e)return;const n=(l=e,{id:Date.now().toString(),name:l,task:[]});var l;a.value=null,d.push(n),u()}))})();