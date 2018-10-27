module.exports = {
  apps: [{
    name: 'Strive',
    script: 'src/Strive.js',
    watch: ['./src'],
    ignore_watch: ['node_modules', '*.log'],
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
