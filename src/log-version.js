import { name, version } from '../package.json';

console.log(
  `%c💡 ${name} v${version} ${new Date().toISOString()}`,
  'font-size:12px;color:#03aabb;display:block;padding:8px;'
);
