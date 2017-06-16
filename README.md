# EXCELLANCE Moscow (HTML/CSS)
Based on gulp starter package to use with PostCss or sass, pug, autoprefixer, babel, compile bootstrap, minify assets and perform other common front-end tasks.

## Demo Live
http://dpmango.github.io/excellance/src/


## Getting stated
__Development:__
- Install node.js and npm
- Run `npm i`
- Run `gulp` (default task)
- Work with `/src` folder

__Production__
- Run `gulp build` to build minified assets ready to use in production

## Tasks
- `postcss` - including sass like plugins, autoprefixer, SugarSS
- `pug` - compile pug templates
- `babel` - compile es2015 javascript code for older browsers
- `useref` - optimize .css and .js
- `cssnano` - minify css in dest folder
- `images` - imagemin for graphics optimization
- `fonts` - copy fonts to dist folder
- `browserSync` - serve assets with hot reload from `./src` folder
- `clean:dist` - clean dist folder to prevent conflicts before build
