
export default {
  apps: [
    {
      name   : 'n60-backend',
      script : './server.js',
      cwd    : '/home/ubuntu/n60-backend',   // path to the folder that holds server.js
      env: {
        NODE_ENV          : 'production',
        SERVER_PORT       : 5002,
        SENDGRID_API_KEY  : process.env.SENDGRID_API_KEY,
        FRONTEND_URL      : 'https://n60.ai'
      }
    }
  ]
};
