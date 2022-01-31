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
      repo: 'https://github.com/StepanChewbacca/dev-back',
      path: '/home/chewie/FirstDeploy',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      'pre-setup': 'rm -rf /home/chewie/FirstDeploy',
      'post-deploy': 'npm install',
    },
  },
};
