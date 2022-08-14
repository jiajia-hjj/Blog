(window.webpackJsonp=window.webpackJsonp||[]).push([[186],{816:function(t,s,a){"use strict";a.r(s);var n=a(18),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"一、web攻击是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、web攻击是什么"}},[t._v("#")]),t._v(" 一、Web攻击是什么")]),t._v(" "),a("ul",[a("li",[t._v("Web攻击（webAttack）是针对用户上网行为或网站服务器等设备进行攻击的行为。")]),t._v(" "),a("li",[t._v("如植入恶意代码，修改网站权限，获取网站用户隐私信息等等")]),t._v(" "),a("li",[t._v("站点安全就是为保护站点不受未授权的访问、使用、修改和破坏而采取的行为或实践")]),t._v(" "),a("li",[t._v("我们常见的Web攻击方式有\n"),a("ul",[a("li",[t._v("XSS (Cross Site Scripting) 跨站脚本攻击")]),t._v(" "),a("li",[t._v("CSRF (Cross-site request forgery)跨站请求伪造")]),t._v(" "),a("li",[t._v("SQL注入攻击")])])])]),t._v(" "),a("h2",{attrs:{id:"二、什么xss"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、什么xss"}},[t._v("#")]),t._v(" 二、什么XSS")]),t._v(" "),a("ul",[a("li",[t._v("XSS，"),a("strong",[t._v("跨站脚本攻击")]),t._v("，允许攻击者将恶意代码植入到提供给其它用户使用的页面中")]),t._v(" "),a("li",[t._v("XSS涉及到三方，即攻击者、客户端与 web 应用")]),t._v(" "),a("li",[t._v("攻击目标是为了盗取存储在客户端的cookie 或者其他网站用于识别客户端身份的敏感信息。")]),t._v(" "),a("li",[t._v("一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互")]),t._v(" "),a("li",[t._v("简单说：XSS 就是攻击者想尽一切办法将可以执行的代码注入到网页中。")])]),t._v(" "),a("p",[a("strong",[t._v("举个例子：一个搜索页面，根据 url参数决定关键词的内容")])]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("<%= getParameter("),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("keyword")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v('")')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("%")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('" >\n'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" 搜索 "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(' \n    您搜索的关键词是：<%= getParameter("keyword") %>\n'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("ul",[a("li",[t._v("这里看似并没有问题，但是如果不按套路出牌呢？")]),t._v(" "),a("li",[t._v("用户输入 "),a("code",[t._v("\"<script>alert('XSS');<\/script>")]),t._v("， 服务端会解析 ，拼接到HTML 中返回给浏览器。形成了如下的 HTML ：")])]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("< script > alert('XSS'); "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('">\n'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("搜索"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('\n\t您搜索的关键词是">'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'XSS'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("ul",[a("li",[a("p",[t._v("浏览器无法分辨出"),a("code",[t._v("<script>alert('xSs');<\/script>")]),t._v("是恶意代码，因而将其执行，  alert 会弹出两次。 试想一下，如果是获取 cookie 发送对黑客服务器呢？")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("我们应该如何进行防范呢？")]),t._v("  这只是浏览器把用户的输入当成了脚本进行了执行。那么只要告诉浏览器这段内容是文本就可以了。")])]),t._v(" "),a("li",[a("p",[t._v("修复：")])])]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("<%= escapeHTML(getParameter("),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v('keyword"))')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("%")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('">\n'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("搜索"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v('\n  您搜索的关键词是：<%= escapeHTML(getParameter("keyword")) %>\n'),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("p",[a("code",[t._v("escapeHTML()")]),t._v(" 按照如下规则进行转义：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("字符")]),t._v(" "),a("th",[t._v("转义后的字符")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("&")])]),t._v(" "),a("td",[a("code",[t._v("&amp;")])])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("<")])]),t._v(" "),a("td",[a("code",[t._v("&lt;")])])]),t._v(" "),a("tr",[a("td",[a("code",[t._v(">")])]),t._v(" "),a("td",[a("code",[t._v("&gt;")])])]),t._v(" "),a("tr",[a("td",[a("code",[t._v('"')])]),t._v(" "),a("td",[a("code",[t._v("&quot;")])])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("'")])]),t._v(" "),a("td",[a("code",[t._v("&#x27;")])])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("/")])]),t._v(" "),a("td",[a("code",[t._v("&#x2F;")])])])])]),t._v(" "),a("ul",[a("li",[t._v("经过了转义函数的处理后，最终浏览器接收到的响应为：")])]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:'"'}},[t._v("&quot;")]),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:">"}},[t._v("&gt;")]),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:"<"}},[t._v("&lt;")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:">"}},[t._v("&gt;")]),t._v("alert("),a("span",{pre:!0,attrs:{class:"token entity",title:"&#x27;"}},[t._v("&#x27;")]),t._v("XSS"),a("span",{pre:!0,attrs:{class:"token entity",title:"&#x27;"}},[t._v("&#x27;")]),t._v(");"),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:"<"}},[t._v("&lt;")]),a("span",{pre:!0,attrs:{class:"token entity",title:"&#x2F;"}},[t._v("&#x2F;")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:">"}},[t._v("&gt;")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("搜索"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  您搜索的关键词是："),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:'"'}},[t._v("&quot;")]),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:">"}},[t._v("&gt;")]),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:"<"}},[t._v("&lt;")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:">"}},[t._v("&gt;")]),t._v("alert("),a("span",{pre:!0,attrs:{class:"token entity",title:"&#x27;"}},[t._v("&#x27;")]),t._v("XSS"),a("span",{pre:!0,attrs:{class:"token entity",title:"&#x27;"}},[t._v("&#x27;")]),t._v(");"),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:"<"}},[t._v("&lt;")]),a("span",{pre:!0,attrs:{class:"token entity",title:"&#x2F;"}},[t._v("&#x2F;")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token entity named-entity",title:">"}},[t._v("&gt;")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("ul",[a("li",[t._v("恶意代码都被转义，不再被浏览器执行，而且搜索词能够完美的在页面显示出来。")])]),t._v(" "),a("h2",{attrs:{id:"三、攻击类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、攻击类型"}},[t._v("#")]),t._v(" 三、攻击类型")]),t._v(" "),a("h3",{attrs:{id:"_3-1-存储型-server端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-存储型-server端"}},[t._v("#")]),t._v(" 3.1.存储型(server端)")]),t._v(" "),a("p",[a("strong",[t._v("1、攻击步骤：")])]),t._v(" "),a("ul",[a("li",[t._v("攻击者将恶意代码"),a("strong",[t._v("提交到目标网站的数据库中")])]),t._v(" "),a("li",[t._v("用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器")]),t._v(" "),a("li",[t._v("用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行")]),t._v(" "),a("li",[t._v("恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击操作")])]),t._v(" "),a("p",[a("strong",[t._v("2、场景：")])]),t._v(" "),a("ul",[a("li",[t._v("见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。")])]),t._v(" "),a("h3",{attrs:{id:"_3-2-反射型-server端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-反射型-server端"}},[t._v("#")]),t._v(" 3.2.反射型(server端)")]),t._v(" "),a("p",[a("strong",[t._v("1、攻击步骤：")])]),t._v(" "),a("ul",[a("li",[t._v("攻击者构造出特殊的 URL，其中包含恶意代码")]),t._v(" "),a("li",[t._v("用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML中返回给浏览器")]),t._v(" "),a("li",[t._v("用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行")]),t._v(" "),a("li",[t._v("恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作")])]),t._v(" "),a("p",[a("strong",[t._v("2、场景：")])]),t._v(" "),a("ul",[a("li",[t._v("通过 URL 传递参数的功能，如网站搜索、跳转等")]),t._v(" "),a("li",[t._v("由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。")]),t._v(" "),a("li",[t._v("POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见")])]),t._v(" "),a("p",[a("strong",[t._v("3、反射型 XSS跟存储型 XSS 的区别是：")])]),t._v(" "),a("ul",[a("li",[t._v("存储型 XSS的恶意代码存在数据库里，反射型 XSS 的恶意代码存在URL里。")])]),t._v(" "),a("h3",{attrs:{id:"_3-3-dom型-浏览器端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-dom型-浏览器端"}},[t._v("#")]),t._v(" 3.3.DOM型(浏览器端)")]),t._v(" "),a("p",[a("strong",[t._v("2、攻击步骤：")])]),t._v(" "),a("ul",[a("li",[t._v("攻击者构造出特殊的 URL,其中包含恶意代码")]),t._v(" "),a("li",[t._v("用户打开带有恶意代码的 URL")]),t._v(" "),a("li",[t._v("用户浏览器接收到响应后解析执行，前端JavaScript 取出 URL 中的恶意代码并执行")]),t._v(" "),a("li",[t._v("恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作")])]),t._v(" "),a("p",[a("strong",[t._v("2、场景：")])]),t._v(" "),a("ul",[a("li",[t._v("通过 URL 传递参数的功能，如网站搜索、跳转等")])]),t._v(" "),a("p",[a("strong",[t._v("3、DOM 型XSS跟前两种XSS 的区别：")])]),t._v(" "),a("ul",[a("li",[t._v("DOM 型XSS攻击中，取出和执行恶意代码由浏览器端完成，属于前端 Javascript 自身的安全漏洞，而其他两种XSS都属于服务端的安全漏洞")])]),t._v(" "),a("h2",{attrs:{id:"四、xss的预防"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、xss的预防"}},[t._v("#")]),t._v(" 四、XSS的预防")]),t._v(" "),a("p",[t._v("通过前面介绍，看到 xss 攻击的两大要素：")]),t._v(" "),a("ul",[a("li",[t._v("攻击者提交而恶意代码")]),t._v(" "),a("li",[t._v("浏览器执行恶意代码")])]),t._v(" "),a("p",[a("strong",[t._v("预防方案：(防止攻击者提交恶意代码，防止浏览器执行恶意代码)")])]),t._v(" "),a("ul",[a("li",[t._v("对数据进行严格的输出编码：\n"),a("ul",[a("li",[t._v("HTML元素的编码，JS编码，CSS编码，URL编码等等避免拼接HTML;")]),t._v(" "),a("li",[t._v("Vue/React 技术栈，避免使用 "),a("code",[t._v("v-html/dangerouslySetinnerHTML")])])])]),t._v(" "),a("li",[t._v("CSP HTTP Header，即 "),a("code",[t._v("Content-Securitv-Policy")]),t._v("、"),a("code",[t._v("X-XSS-Protection")]),t._v("增加攻击难度，配置CSP的本质是\n建立白名单，由浏览器进行拦截。")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("#有内容均来自站点的同一个源（不包括其子域名）\nContent-Security-Policy:default-snc 'self'\n#允许内容来自信任的域名及其子域名（域名不必须与CSP设置所在的域名相同)\nContent-Security-Policy:delault-src 'self'*.trusted.com \n该服务器仅允许通过HTTPS方式并仅从test.com域名来访问文档\nContent-Security-Policy:default-src https://test.com \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("ul",[a("li",[t._v("输入验证：过滤掉用户输入的恶劣代码，然后提交给后端，比如一些常见的数字、URL、电话号码、邮箱地址等等做校验判断")]),t._v(" "),a("li",[t._v("开启浏览器XSS防御：Http Only cookie ，禁止JavaScript 读取某些敏感 Cookie，攻击者完成 XSS注入后，也无法窃取此 Cookie.")])]),t._v(" "),a("blockquote",[a("p",[t._v("参考：")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.cn/post/6844903685122703367",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端安全系列（一）：如何防止XSS攻击？"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);