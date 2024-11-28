pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                // Clone source code từ repository
                git branch: 'main', url: 'https://github.com/huynhduydong/DeployMaster.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build image Spring Boot
                    sh 'docker build -t laven-springboot ./LavenShopBackend'
                    
                    // Build image Next.js
                    sh 'docker build -t laven-nextjs ./LavenFontend/lavenshop'
                }
            }
        }

        stage('Start Services with Docker Compose') {
            steps {
                script {
                    // Chạy các container từ Docker Compose
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }

        stage('Healthcheck Verification') {
            steps {
                script {
                    // Kiểm tra MySQL đã sẵn sàng hay chưa
                    sh '''
                    echo "Waiting for MySQL to be healthy..."
                    for i in {1..10}; do
                      HEALTH_STATUS=$(docker inspect --format='{{json .State.Health.Status}}' deploymaster-mysql-1 || echo "unhealthy")
                      if [ "$HEALTH_STATUS" == '"healthy"' ]; then
                        echo "MySQL is healthy!"
                        exit 0
                      fi
                      sleep 5
                    done
                    echo "MySQL failed to become healthy in time."
                    exit 1
                    '''
                }
            }
        }

    }

    post {
        always {
            // Dọn dẹp sau khi build
            sh 'docker-compose down'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
