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
    }
}