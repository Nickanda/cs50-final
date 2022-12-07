module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000'
    },
    {
      name: 'backend',
      script: 'backend/index.js',
      env: {
        PORT: 3001
      }
    }
  ]
}
