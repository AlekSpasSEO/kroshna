import {cp,mkdir,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import './build.mjs';
const project=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const docs=path.resolve(project,'docs');
if(path.dirname(docs)!==project||path.basename(docs)!=='docs')throw Error('Release output must stay in project/docs');
await rm(docs,{recursive:true,force:true});await mkdir(docs,{recursive:true});await cp(path.join(project,'dist'),docs,{recursive:true});console.log('Release saved in docs/.');
