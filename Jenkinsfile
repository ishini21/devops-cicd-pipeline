pipeline {
    agent none

    stages {
        stage('Backend Test') {
            agent {
                docker {
                    image 'node:22-alpine'
                }
            }

            steps {
                dir('backend') {
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }
    }
}