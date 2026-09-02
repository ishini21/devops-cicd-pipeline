pipeline {
    agent none

    stages {
        stage('Backend Test') {
            agent {
                docker {
                    image 'node:22-alpine'
                }
            }

            environment {
                HOME = "${WORKSPACE}"
                NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
            }

            steps {
                dir('backend') {
                    sh 'rm -rf node_modules'
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }

        stage('Docker Build') {
            agent any

            steps {
                sh 'docker build -t devops-cicd-backend:${BUILD_NUMBER} ./backend'
                sh 'docker build -t devops-cicd-frontend:${BUILD_NUMBER} ./frontend'
            }
        }
        stage('Push Docker Images') {
    agent any

    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-credentials',
                usernameVariable: 'DOCKERHUB_USERNAME',
                passwordVariable: 'DOCKERHUB_PASSWORD'
            )
        ]) {
            sh '''
                echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

                docker tag devops-cicd-backend:${BUILD_NUMBER} $DOCKERHUB_USERNAME/devops-cicd-backend:${BUILD_NUMBER}
                docker tag devops-cicd-frontend:${BUILD_NUMBER} $DOCKERHUB_USERNAME/devops-cicd-frontend:${BUILD_NUMBER}

                docker push $DOCKERHUB_USERNAME/devops-cicd-backend:${BUILD_NUMBER}
                docker push $DOCKERHUB_USERNAME/devops-cicd-frontend:${BUILD_NUMBER}
            '''
        }
    }
}
stage('Deploy to App Server') {
    agent any

    steps {
        sshagent(credentials: ['app-server-ssh']) {
            sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@172.31.26.202 "
                    cd ~/devops-cicd-pipeline &&
                    git pull origin main &&
                    IMAGE_TAG=${BUILD_NUMBER} docker compose -f docker-compose.prod.yml pull &&
                    IMAGE_TAG=${BUILD_NUMBER} docker compose -f docker-compose.prod.yml up -d &&
                    IMAGE_TAG=${BUILD_NUMBER} docker compose -f docker-compose.prod.yml ps
                "
            '''
        }
    }
}
    }
}