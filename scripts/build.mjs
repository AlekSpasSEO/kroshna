import {mkdir,readFile,writeFile,cp,readdir} from 'node:fs/promises';
import {articles,VERIFIED} from '../public/data.js';
import {renderHeader,renderFooter,renderHome,renderArticle,renderPrintJournal,escape} from '../public/app.js';
const root=new URL('../',import.meta.url);const output=new URL('dist/',root);await mkdir(output,{recursive:true});
for(const file of ['app.js','data.js','styles.css'])await cp(new URL('public/'+file,root),new URL(file,output));
await mkdir(new URL('assets/',output),{recursive:true});
for(const file of await readdir(new URL('public/assets/',root))){if(/\.(svg|webp|woff2|css|json|txt)$/.test(file)&&file!=='bazaar.webp')await cp(new URL('public/assets/'+file,root),new URL('assets/'+file,output));}
const template=await readFile(new URL('public/index.html',root),'utf8');
function page(content,{route='home',base='',title,description,canonical,article=false}={}){
 let html=template.replace('<header id="header"></header>',`<header id="header">${renderHeader(route.split('/')[0])}</header>`).replace('<footer id="footer"></footer>',`<footer id="footer">${renderFooter()}</footer>`).replace(/<div id="app">[\s\S]*?<\/div><\/main>/,`<div id="app">${content}</div></main>`).replace('data-route="home"',`data-route="${route}"`);
 if(base)html=html.replace('<head>','<head>\n <base href="'+base+'">');
 if(title)html=html.replace(/<title>.*?<\/title>/,`<title>${escape(title)} · крошна</title>`).replace(/property="og:title" content="[^"]*"/,`property="og:title" content="${escape(title)} · крошна"`);
 if(description)html=html.replace(/name="description" content="[^"]*"/,`name="description" content="${escape(description)}"`).replace(/property="og:description" content="[^"]*"/,`property="og:description" content="${escape(description)}"`);
 if(canonical)html=html.replace(/rel="canonical" href="[^"]*"/,`rel="canonical" href="${canonical}"`).replace(/property="og:url" content="[^"]*"/,`property="og:url" content="${canonical}"`);
 if(article)html=html.replace('property="og:type" content="website"','property="og:type" content="article"');
 return html;
}
await writeFile(new URL('index.html',output),page(renderHome()));
for(const a of articles){const dir=new URL(`articles/${a.id}/`,output);await mkdir(dir,{recursive:true});await writeFile(new URL('index.html',dir),page(renderArticle(a.id),{route:'articles/'+a.id,base:'../../',title:a.title,description:a.intro,canonical:`https://alekspasseo.github.io/kroshna/articles/${a.id}/`,article:true}));}
const journalDir=new URL('journal/print/',output);await mkdir(journalDir,{recursive:true});await writeFile(new URL('index.html',journalDir),page(renderPrintJournal(),{route:'journal/print',base:'../../',title:'Журнал — пилот издание',description:'Шест оригинални семејни приказни и идеи, подготвени за читање и печатење.',canonical:'https://alekspasseo.github.io/kroshna/journal/print/'}));
await writeFile(new URL('.nojekyll',output),'');
await writeFile(new URL('404.html',output),`<!doctype html><html lang="mk"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Непронајдена патека · крошна</title><body style="font-family:system-ui;padding:10%;background:#fffdf6;color:#223c49"><h1>Оваа гранка сè уште ја нема.</h1><p>Врати се кон нашите места и приказни.</p><a href="/kroshna/">Кон крошна →</a></body></html>`);
const domain='https://alekspasseo.github.io/kroshna/';
await writeFile(new URL('robots.txt',output),`User-agent: *\nAllow: /\nSitemap: ${domain}sitemap.xml\n`);
await writeFile(new URL('sitemap.xml',output),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...articles.map(a=>'articles/'+a.id+'/'),'journal/print/'].map(p=>`<url><loc>${domain+p}</loc><lastmod>${VERIFIED}</lastmod></url>`).join('')}</urlset>`);
const xml=s=>escape(s);
await writeFile(new URL('feed.xml',output),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>крошна — Растеме заедно</title><link>${domain}</link><description>Независен семеен водич за Скопје.</description><language>mk</language><atom:link href="${domain}feed.xml" rel="self" type="application/rss+xml"/>${articles.map(a=>`<item><title>${xml(a.title)}</title><link>${domain}articles/${a.id}/</link><guid>${domain}articles/${a.id}/</guid><pubDate>Fri, 16 Oct 2026 10:00:00 GMT</pubDate><description>${xml(a.intro)}</description></item>`).join('')}</channel></rss>`);
console.log(`Built ${articles.length} article pages, printable journal, RSS, sitemap, and app into dist/.`);
