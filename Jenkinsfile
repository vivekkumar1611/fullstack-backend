pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/vivekkumar1611/fullstack-backend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t backend-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f backend-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name backend-container backend-app'
            }
        }
    }
}
