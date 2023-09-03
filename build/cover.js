// @ts-check

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const read = fs.readFileSync
const write = fs.writeFileSync
const dirname = path.dirname(fileURLToPath(import.meta.url));
const version =
  process.env.VERSION ||
  JSON.parse(fs.readFileSync(path.resolve(dirname, '..', 'package.json')).toString())
    .version;

const file = dirname + '/../docs/_coverpage.md'
let cover = read(file, 'utf8').toString()

console.log('Replace version number in cover page...')
cover = cover.replace(
  /<small>(\S+)?<\/small>/g,
  '<small>' + version + '</small>'
)
write(file, cover)
