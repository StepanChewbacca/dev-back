module.exports = {
  apps: [{
    name: 'server',
    script: 'pm2 start ts-node -- -P tsconfig.json index.ts',
    watch: '.',
    env_production: {
      PORT: 8080,
      NODE_ENV: 'production',
    },
  },
  ],

  deploy: {
    production: {
      key: '/home/student/.ssh/server_google_rsa',
      user: 'chewie',
      host: '34.118.65.200',
      ref: 'origin/prac1',
      env: {
        NODE_ENV: 'production',
      },
      repo: 'https://github.com/StepanChewbacca/dev-back',
      path: '/home/chewie/FirstDeploy',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      'pre-setup': 'rm -rf /home/chewie/FirstDeploy',
      'post-deploy': 'npm i && npm install pm2 && pm2 startOrRestart ecosystem.config.js --env production ',
    },
  },
};
