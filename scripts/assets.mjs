import {mkdir,writeFile} from 'node:fs/promises';
const dir=new URL('../public/assets/',import.meta.url); await mkdir(dir,{recursive:true});
const sources=[];
for(const [name,title] of [['park','File:46 Skopje, city park (33663866281).jpg'],['matka','File:Matka (1 of 3).jpg'],['museum','File:Museum of Contemporary Art Skopje.jpg'],['bazaar','File:Old Bazaar, Skopje.jpg']]){
 const u=new URL('https://commons.wikimedia.org/w/api.php');
 u.search=new URLSearchParams({action:'query',format:'json',titles:title,prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1280'});
 let data=await(await fetch(u)).json();let p=Object.values(data.query.pages)[0];
 if(!p.imageinfo){u.search=new URLSearchParams({action:'query',format:'json',generator:'search',gsrsearch:name==='museum'?'Museum Contemporary Art Skopje building':'Skopje Old Bazaar street',gsrnamespace:'6',gsrlimit:'1',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1280'}); data=await(await fetch(u)).json(); p=Object.values(data.query.pages)[0];}
 const info=p.imageinfo[0]; const url=(info.thumburl||info.url).split('?')[0];
 const res=await fetch(url); if(!res.ok)throw Error(`${name}: ${res.status}`);
 await writeFile(new URL(name+'.jpg',dir),Buffer.from(await res.arrayBuffer()));
 const m=info.extmetadata;sources.push({name,file:name+'.jpg',title:p.title,source:info.descriptionurl,artist:m.Artist?.value.replace(/<[^>]*>/g,''),license:m.LicenseShortName?.value,licenseUrl:m.LicenseUrl?.value,changes:'Resized, converted to WebP; displayed cropped.'});
 console.log(name,p.title,res.status);
}
await writeFile(new URL('credits.json',dir),JSON.stringify(sources,null,2));
const font=await fetch('https://shkrtka.com/assets/lunchbox.ttf');if(font.ok){await writeFile(new URL('lunchbox.ttf',dir),Buffer.from(await font.arrayBuffer()));console.log('Shkrtka LunchBox font downloaded');}
const css=await(await fetch('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800;900&display=swap',{headers:{'User-Agent':'Mozilla/5.0'}})).text();
let local=css;let count=0;for(const match of [...css.matchAll(/url\((https:[^)]+)\)/g)]){const name=`nunito-${count++}.woff2`;const r=await fetch(match[1]);if(!r.ok)throw Error('Font download failed');await writeFile(new URL(name,dir),Buffer.from(await r.arrayBuffer()));local=local.replace(match[1],`./${name}`);}
await writeFile(new URL('fonts.css',dir),local);console.log('Local Nunito Sans fonts',count);
