pipeline {
    agent any

    environment {
        GITHUB_TOKEN      = credentials('github-token')
        NEXUS_CREDENTIALS = credentials('nexus-credentials')
        NEXUS_DOCKER_REPO = '16.171.12.25:8083/docker-hosted'
        IMAGE_NAME        = 'backend'
        IMAGE_TAG         = "${env.BUILD_NUMBER}"
        EC2_HOST          = '13.53.124.88'          // Replace with your EC2 public IP
        CONTAINER_NAME    = 'backend'
        APP_PORT          = '3000'
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

        stage('Deploy to EC2') {
            steps {
                // Use Jenkins SSH credentials to deploy
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-key', keyFileVariable: 'EC2_PEM', usernameVariable: 'EC2_USER')]) {
                    sh """
                    ssh -i ${EC2_PEM} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                    "docker pull ${NEXUS_DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG} && \\
                    docker stop ${CONTAINER_NAME} || true && \\
                    docker rm ${CONTAINER_NAME} || true && \\
                    docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:${APP_PORT} ${NEXUS_DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG}"
                    """
                }
            }
        }
    }

    post {
        success { echo 'Pipeline completed successfully ✅' }
        failure { echo 'Pipeline failed ❌' }
    }
}
