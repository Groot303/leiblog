import{_ as e,c as i,o as a,d as l}from"./app.7214cd0f.js";const f=JSON.parse('{"title":"浏览器相关知识总结","description":"","frontmatter":{},"headers":[{"level":2,"title":"进程、线程、协程","slug":"进程、线程、协程","link":"#进程、线程、协程","children":[]},{"level":2,"title":"浏览器事件机制","slug":"浏览器事件机制","link":"#浏览器事件机制","children":[]},{"level":2,"title":"事件循环","slug":"事件循环","link":"#事件循环","children":[]},{"level":2,"title":"宏任务和微任务","slug":"宏任务和微任务","link":"#宏任务和微任务","children":[]}],"relativePath":"浏览器原理/知识总结.md"}'),r={name:"浏览器原理/知识总结.md"},d=l(`<h1 id="浏览器相关知识总结" tabindex="-1">浏览器相关知识总结 <a class="header-anchor" href="#浏览器相关知识总结" aria-hidden="true">#</a></h1><h2 id="进程、线程、协程" tabindex="-1">进程、线程、协程 <a class="header-anchor" href="#进程、线程、协程" aria-hidden="true">#</a></h2><ol><li>进程是资源分配的最小单位，线程是cpu调度的最小单位</li><li>浏览器的每一个tab都是一个进程</li><li>线程是不能单独存在的，由进程来管理和启动的，一个进程可以并发多个线程，每个线程并行执行不同的任务，进程中的某一个线程执行出错都会导致整个进程崩溃</li><li>同一个进程下的线程之间可以直接通信和获取数据</li><li>协程是开发人员调度的，协程的目的就是当出现长时间的I/O操作时，通过让出目前的协程调度，执行下一个任务的方式</li></ol><h5 id="并行处理" tabindex="-1">并行处理 <a class="header-anchor" href="#并行处理" aria-hidden="true">#</a></h5><p>线程是不能单独存在的，是由进程来管理和启动的</p><ul><li>那什么是进程呢？</li><li>操作系统给一个程序创建一块内存来存放代码，运行中的数据和一个执行任务的主进程我们把这个环境叫做进程</li></ul><h5 id="单进程浏览器存在的问题" tabindex="-1">单进程浏览器存在的问题 <a class="header-anchor" href="#单进程浏览器存在的问题" aria-hidden="true">#</a></h5><ol><li>不稳定 <ul><li>插件和渲染引擎模块很容易导致浏览器崩溃</li></ul></li><li>不流畅 <ul><li>当单线程浏览器执行一个无限循环的脚本时，他会独占整个进程，其他模块就没有机会执行导致整个浏览器失去响应</li><li>页面的内存泄漏也是进程变慢的一个重要原因，当我们运行一个复杂的页面再关闭时，存在内存不能完全回收导致内存占用越来越高，浏览器变慢。</li></ul></li><li>不安全 <ul><li>一个进程中的线程是可以共享数据的，那 js 线程就可以随意访问其他线程的数据</li></ul></li></ol><h5 id="多进程浏览器" tabindex="-1">多进程浏览器 <a class="header-anchor" href="#多进程浏览器" aria-hidden="true">#</a></h5><ol><li>浏览器进程</li><li>渲染进程</li><li>GPU进程</li><li>网络进程</li><li>插件进程</li></ol><h2 id="浏览器事件机制" tabindex="-1">浏览器事件机制 <a class="header-anchor" href="#浏览器事件机制" aria-hidden="true">#</a></h2><h5 id="事件是什么-事件模型" tabindex="-1">事件是什么? 事件模型? <a class="header-anchor" href="#事件是什么-事件模型" aria-hidden="true">#</a></h5><pre><code>- 事件流：捕获、目标、冒泡阶段
- 事件模型：原始、标准、IE
</code></pre><h5 id="事件捕获和事件冒泡" tabindex="-1">事件捕获和事件冒泡 <a class="header-anchor" href="#事件捕获和事件冒泡" aria-hidden="true">#</a></h5><pre><code>- 微软-&gt;冒泡，网景-&gt;捕获，由第三个参数决定在什么阶段执行
- 事件代理的作用就是方便为多个列表绑定事件，还有动态创建列表时候不用绑定和解绑事件
- 如果一个元素同时绑定了两个事件，既有冒泡事件，又有捕获事件时，应该执行几次，先后顺序是什么？ 
</code></pre><ul><li>如果多次绑定事件的元素是目标元素，且都是冒泡执行的话，那么执行时就按照绑定的顺序执行（注意：这里说的按照绑定顺序执行是指利用addEventListener来绑定事件的；如果是利用attachEvent来绑定事件的，就是以绑定时的相反顺序执行），其他元素就按照先捕获后冒泡的顺序执行。</li><li>如果多次绑定事件的元素不是目标元素，先捕获，后目标元素，最后冒泡</li></ul><h5 id="对事件委托的理解、使用场景" tabindex="-1">对事件委托的理解、使用场景 <a class="header-anchor" href="#对事件委托的理解、使用场景" aria-hidden="true">#</a></h5><pre><code>- 利用事件冒泡的机制为元素动态绑定事件的方法
- 优点： 
</code></pre><ul><li>动态绑定，不用手动绑定和移除事件</li><li>如果有很多一个ul有很多li要绑定事件，不用一个个绑定函数，减少内存消耗</li></ul><h5 id="如何阻止事件冒泡、阻止原生js事件" tabindex="-1">如何阻止事件冒泡、阻止原生js事件 <a class="header-anchor" href="#如何阻止事件冒泡、阻止原生js事件" aria-hidden="true">#</a></h5><pre><code>- e.stopPropagation()
- preventDefault()，或者在js中return false
</code></pre><h2 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-hidden="true">#</a></h2><ul><li>js分为同步任务和异步任务，同步任务在主线程中执行，当执行栈中的同步任务执行完毕就会读取事件触发线程的任务队列，将需要执行的回调函数添加到执行栈中执行，反反复复就是事件循环</li><li>同步任务执行完之后会先执行微任务队列里面的微任务，再执行下一个宏任务</li></ul><h2 id="宏任务和微任务" tabindex="-1">宏任务和微任务 <a class="header-anchor" href="#宏任务和微任务" aria-hidden="true">#</a></h2><h5 id="常见的宏任务" tabindex="-1">常见的宏任务： <a class="header-anchor" href="#常见的宏任务" aria-hidden="true">#</a></h5><ul><li>主代码块、</li><li>setTimeout、</li><li>setInterval、</li><li>setImmediate ()-Node、</li><li>requestAnimationFrame ()-浏览器</li></ul><h5 id="常见的微任务" tabindex="-1">常见的微任务： <a class="header-anchor" href="#常见的微任务" aria-hidden="true">#</a></h5><ul><li>process.nextTick ()-Node</li><li>Promise.then()、</li><li>catch、finally、</li><li>Object.observe、</li><li>MutationObserver</li></ul>`,28),h=[d];function t(n,s,c,o,u,_){return a(),i("div",null,h)}const b=e(r,[["render",t]]);export{f as __pageData,b as default};
