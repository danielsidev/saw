module.exports = {
    apps : [{
      name: 'sales_analysis',
      script: 'src/main.js',
      instances: 1,
      max_memory_restart: '256M',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_file: 'logs/combined.log',
      time: true,
      env: {
        PORT_SAW: 7000,
        NODE_ENV: 'development'
      },
      env_homolog: {
        PORT_SAW: 7000,
        NODE_ENV: 'homolog'
      },
      env_production: {
        PORT_SAW: 7000,
        NODE_ENV: 'production'
      }
    }]
  };