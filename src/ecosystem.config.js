module.exports = {
  apps: [{
    name: 'server',
    script: 'start ts-node -- -P tsconfig.json index.ts',
    watch: '.',
  },
  ],

  deploy: {
    production: {
      user: 'chewie',
      host: '34.118.65.200',
      ref: 'origin/prac1',
      repo: 'https://github.com/StepanChewbacca/dev-back/src',
      path: '/home/chewie/FirstDeploy',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      env: {
        NODE_ENV: 'prac1',
      },
      'pre-setup': 'rm -fr /home/chewie/FirstDeploy',
      'post-deploy': 'npm install && pm2 start ts-node -- -P tsconfig.json index.ts',
    },
  },
};