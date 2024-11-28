pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone repository từ GitHub
                git branch: 'main', url: 'https://github.com/huynhduydong/DeployMaster.git'
            }
        }

        stage('Stop Existing Services') {
            steps {
                script {
                    // Tắt các container đang chạy
                    sh 'docker-compose down || true'
                }
            }
        }

        stage('Build and Deploy Services') {
            steps {
                script {
                    // Build và chạy lại các container
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up --build -d"
                }
            }
        }

        stage('Healthcheck Verification') {
            steps {
                script {
                    // Kiểm tra trạng thái healthcheck của MySQL
                    sh '''
                    echo "Waiting for MySQL to be healthy..."
                    for i in {1..10}; do
                      HEALTH_STATUS=$(docker inspect --format='{{json .State.Health.Status}}' deploymaster-mysql-1 || echo "unhealthy")
                      echo "MySQL Health Status: $HEALTH_STATUS"
                      if [ "$HEALTH_STATUS" == '"healthy"' ]; then
                        echo "MySQL is healthy!"
                        exit 0
                      fi
                      echo "Retrying in 5 seconds..."
                      sleep 5
                    done
                    echo "MySQL failed to become healthy in time."
                    exit 1
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // (Tùy chọn) Chạy các test
                    echo 'Running application tests...'
                    sh 'docker exec deploymaster-springboot-1 ./mvnw test'
                }
            }
        }
    }

    post {
        always {
            // Dọn dẹp container trong trường hợp cần thiết
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
