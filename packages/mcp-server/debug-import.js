
try {
  console.log('Importing tools...');
  import('./dist/tools/index.js')
    .then(m => {
      console.log('Tools imported successfully.');
      console.log('Tool count:', m.tools.length);
    })
    .catch(e => {
      console.error('Failed to import tools:', e);
    });
} catch (e) {
  console.error('Synchronous error:', e);
}

