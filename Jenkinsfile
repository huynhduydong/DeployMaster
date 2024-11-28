pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/huynhduydong/DeployMaster.git'
            }
        }

        stage('Stop Existing Services') {
            steps {
                sh 'docker-compose down || true'
            }
        }

        stage('Build and Deploy Services') {
            steps {
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up --build -d"
            }
        }

        stage('Healthcheck Verification') {
            steps {
                script {
                    sh '''
                    echo "Waiting for MySQL to be healthy..."
                    for i in {1..10}; do
                      HEALTH_STATUS=$(docker inspect --format='{{json .State.Health.Status}}' deploymaster-mysql-1 || echo "unhealthy")
                      echo "MySQL Health Status: $HEALTH_STATUS"
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

        stage('Run Tests') {
            steps {
                script {
                    sh 'docker exec deploymaster-springboot-1 ./mvnw test || true'
                }
            }
        }
    }

    post {
        always {
            sh 'docker-compose down || true'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
