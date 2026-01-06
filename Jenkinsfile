pipeline {
    agent any

    environment {
        APP_DIR = "/var/www/fullstack-backend"
        APP_NAME = "fullstack-backend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/vivekkumar1611/fullstack-backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd /var/www/fullstack-backend
                npm install
                '''
            }
        }

        stage('Restart App') {
            steps {
                sh '''
                pm2 delete fullstack-backend || true
                pm2 start /var/www/fullstack-backend/app.js --name fullstack-backend
                pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}
