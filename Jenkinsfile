pipeline {
    agent any

    environment {
        NEXUS_URL = "16.171.230.164:8083"
        NEXUS_REPO = "docker-hosted"
        IMAGE_NAME = "backend"
        IMAGE_TAG  = "5"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vivekkumar1611/fullstack-backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${NEXUS_URL}/${NEXUS_REPO}/${IMAGE_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage('Login to Nexus') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'nexus-credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
                    sh """
                        echo $NEXUS_PASS | docker login ${NEXUS_URL} -u $NEXUS_USER --password-stdin
                    """
                }
            }
        }

        stage('Push to Nexus') {
            steps {
                sh "docker push ${NEXUS_URL}/${NEXUS_REPO}/${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Skipping deploy since it's optional for now"
            }
        }

    }

    post {
        always {
            echo "Cleaning up..."
            sh "docker logout ${NEXUS_URL}"
        }
        success {
            echo "Pipeline completed successfully ✅"
        }
        failure {
            echo "Pipeline failed ❌"
        }
    }
}
