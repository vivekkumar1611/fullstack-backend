pipeline {
    agent any

    environment {
        GITHUB_TOKEN      = credentials('github-token')       // GitHub Personal Access Token
        NEXUS_CREDENTIALS = credentials('nexus-credentials')  // Nexus username/password
        EC2_KEY           = credentials('ec2-key')           // Private key for EC2 SSH
        NEXUS_DOCKER_REPO = '16.171.12.25:8083/docker-hosted' // Your Nexus Docker repo
        IMAGE_NAME        = 'backend'
        IMAGE_TAG         = "${env.BUILD_NUMBER}"
        EC2_USER          = 'ubuntu'
        EC2_HOST          = '13.53.124.88'                    // Replace with your EC2 public IP
        EC2_PORT          = '22'
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
                // Use --password-stdin to avoid CLI warning
                sh """
                echo "${NEXUS_CREDENTIALS_PSW}" | docker login ${NEXUS_DOCKER_REPO.split('/')[0]} -u ${NEXUS_CREDENTIALS_USR} --password-stdin
                docker push ${NEXUS_DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh """
                ssh -i ${EC2_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                "docker pull ${NEXUS_DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG} && \\
                docker stop ${CONTAINER_NAME} || true && \\
                docker rm ${CONTAINER_NAME} || true && \\
                docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:${APP_PORT} ${NEXUS_DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG}"
                """
            }
        }
    }

    post {
        success { echo 'Pipeline completed successfully ✅' }
        failure { echo 'Pipeline failed ❌' }
    }
}
