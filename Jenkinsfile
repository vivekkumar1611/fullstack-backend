pipeline {
    agent any

    environment {
        GITHUB_TOKEN      = credentials('github-token')
        NEXUS_CREDENTIALS = credentials('nexus-credentials')
        NEXUS_DOCKER_REPO = '16.171.12.25:8083/docker-hosted'
        IMAGE_NAME        = 'nexus-test'
        IMAGE_TAG         = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vivekkumar1611/fullstack-backend.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Skipping tests for now (or run npm test)'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${NEXUS_DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push to Nexus') {
            steps {
                sh """
                docker login 16.171.12.25:8083 -u ${NEXUS_CREDENTIALS_USR} -p ${NEXUS_CREDENTIALS_PSW}
                docker push ${NEXUS_DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Add deployment steps: docker pull + run container on target server'
            }
        }
    }

    post {
        success { echo 'Pipeline succeeded ✅' }
        failure { echo 'Pipeline failed ❌' }
    }
}
