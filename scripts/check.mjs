import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {projects} from '../dist/projects.js';
const root = path.resolve('dist');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'HTML IDs must be unique');
assert.equal(projects.length,4,'Exactly four featured projects');
assert.equal(new Set(projects.map(project=>project.id)).size,4);
const anchors = new Set([...ids,...projects.map(project=>'project-'+project.id)]);
for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const value=match[1];
  if(value.startsWith('#')) assert(anchors.has(value.slice(1)),`Missing section: ${value}`);
  else if(!/^(https?:|mailto:|data:)/.test(value)) assert(fs.existsSync(path.join(root,value)),`Missing asset: ${value}`);
}
for(const project of projects) {
  assert(project.github.startsWith('https://github.com/Sarayu30/'));
  for(const key of ['poster','video']) if(project[key]) assert(fs.existsSync(path.join(root,project[key])),`Missing ${key}: ${project.id}`);
  assert(project.features.length>0 && project.overview && project.contribution);
}
for(const file of ['index.html','app.js','projects.js','styles.css']) {
  const content=fs.readFileSync(path.join(root,file),'utf8');
  assert(!/Janay|janayrawal|TODO|undefined/.test(content),`Unexpected placeholder/reference identity in ${file}`);
}
console.log('PASS: four projects; unique IDs; valid section links; all local assets; complete case-study data; personalized content.');
