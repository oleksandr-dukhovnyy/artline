import packageJSON from '../package.json';

const { name, version } = packageJSON;

console.log(
  `%c💡 ${name} v${version} ${new Date().toISOString()}`,
  'font-size:12px;color:#03aabb;display:block;padding:8px;'
);
