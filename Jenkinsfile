pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/vivekkumar1611/fullstack-backend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t fullstack-backend-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop fullstack-backend || true
                docker rm fullstack-backend || true
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d \
                  --name fullstack-backend \
                  -p 3000:3000 \
                  fullstack-backend-app
                '''
            }
        }
    }
}
