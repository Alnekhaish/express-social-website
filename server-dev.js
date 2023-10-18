const nodemon = require('nodemon');
const browserSync = require('browser-sync').create();

// Start nodemon
nodemon({
  script: 'bin/www',
  ext: 'js html css', // list of extensions to watch
});

nodemon.on('start', function () {
  // ensure browser-sync only starts once
  if (!browserSync.active) {
    browserSync.init({
      proxy: 'http://localhost:8000', // your dev server here
      files: ['./'], // watch changes in the public folder
      port: 4000, // port browser-sync will listen on (your site will be available on http://localhost:4000)
    });
  }
});

nodemon.on('restart', function () {
  // reload browser-sync when nodemon restarts
  setTimeout(() => {
    browserSync.reload();
  }, 500); // give a bit of time for the server to restart
});
