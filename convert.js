import fs from 'fs';

const files = ['index.html', 'about.html', 'shop.html', 'contact.html'];
const srcDir = 'd:/downlaod/Rhode Beauty Original/Rhode Beauty/';
const destDir = 'd:/downlaod/Rhode Beauty/src/pages/';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

files.forEach(file => {
  if (!fs.existsSync(srcDir + file)) return;
  let html = fs.readFileSync(srcDir + file, 'utf8');
  
  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return;
  let body = bodyMatch[1];
  
  // Convert class to className
  body = body.replace(/class=/g, 'className=');
  
  // Convert for to htmlFor
  body = body.replace(/for=/g, 'htmlFor=');
  
  // Convert inline styles: style="color:#fff; text-align:center;" to style={{color: '#fff', textAlign: 'center'}}
  body = body.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = {};
    p1.split(';').forEach(rule => {
      const parts = rule.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        const value = parts.slice(1).join(':').trim();
        if (key && value) {
          styleObj[key] = value;
        }
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  // Close unclosed tags like img, input, br, hr
  body = body.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
  
  // Replace HTML comments
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

  // Convert onmouseover etc. They had inline JS like onmouseover="this.style.color='#ec4899'"
  body = body.replace(/onmouseover="([^"]*)"/g, 'onMouseOver={() => {}}');
  body = body.replace(/onmouseout="([^"]*)"/g, 'onMouseOut={() => {}}');
  body = body.replace(/onclick="([^"]*)"/g, 'onClick={() => {}}');

  // SVG fixes: stroke-width to strokeWidth, etc.
  body = body.replace(/stroke-width/g, 'strokeWidth');
  body = body.replace(/stroke-linecap/g, 'strokeLinecap');
  body = body.replace(/stroke-linejoin/g, 'strokeLinejoin');
  body = body.replace(/fill-rule/g, 'fillRule');
  body = body.replace(/clip-rule/g, 'clipRule');
  
  const componentName = file === 'index.html' ? 'Home' : file.charAt(0).toUpperCase() + file.slice(1, -5);
  
  const jsx = `import React from 'react';
import { Link } from 'react-router-dom';

export default function ${componentName}() {
  return (
    <>
      ${body}
    </>
  );
}
`;
  
  fs.writeFileSync(destDir + componentName + '.jsx', jsx);
  console.log('Converted ' + file);
});
