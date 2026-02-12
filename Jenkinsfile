pipeline {
    agent any

    environment {
        GITHUB_TOKEN      = credentials('github-token')
        NEXUS_CREDENTIALS = credentials('nexus-credentials')
        NEXUS_URL         = 'http://16.171.12.25:8083/repository/raw-releases/' 
        ARTIFACT_NAME     = "backend-${env.BUILD_NUMBER}.zip"
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
                echo "Skipping tests (add npm test if available)"
                // sh 'npm test'
            }
        }

        stage('Package Artifact') {
            steps {
                sh "zip -r ${ARTIFACT_NAME} ."
            }
        }

        stage('Publish to Nexus') {
            steps {
                sh """
                curl -v -u ${NEXUS_CREDENTIALS_USR}:${NEXUS_CREDENTIALS_PSW} \
                    --upload-file ${ARTIFACT_NAME} \
                    ${NEXUS_URL}${ARTIFACT_NAME}
                """
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Add your deployment steps here (copy to server / restart service)'
            }
        }
    }

    post {
        success { echo 'Pipeline finished successfully' }
        failure { echo 'Pipeline failed' }
    }
}
