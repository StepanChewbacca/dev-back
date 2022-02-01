module.exports = {
  apps: [{
    name: 'server',
    script: 'pm2 start ts-node -- -P tsconfig.json index.ts',
    watch: '.',
  },
  ],

  deploy: {
    production: {
      key: '/home/student/.ssh/server_google_rsa',
      user: 'chewie',
      host: '34.118.65.200',
      ref: 'origin/prac1',
      repo: 'https://github.com/StepanChewbacca/dev-back/src',
      path: '/home/chewie/FirstDeploy',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      'pre-setup': 'rm -rf /home/chewie/FirstDeploy',
      'post-deploy': 'npm i && npm install pm2 && pm2 ecosystem   &&'
          + ' pm2 startOrRestart'
          + ' ecosystem.config.js',
    },
  },
};
