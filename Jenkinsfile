pipeline {
    agent any

    environment {
            GITHUB_TOKEN = credentials('1429df98-a349-4222-94bf-4bb3a074cbd6')
    }

    stage('Check Node and npm versions') {
        steps {
            sh 'node -v'
            sh 'npm -v'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                dir('todo-frontend') {
                    git branch: 'main', credentialsId: '1429df98-a349-4222-94bf-4bb3a074cbd6', url: 'https://github.com/raktimraihanprova13346/todo-frontend.git'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('todo-frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('todo-frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t my-react-app:latest .'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker run -d -p 80:80 --name my-react-app my-react-app:latest'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline has finished running'
        }
    }
}
