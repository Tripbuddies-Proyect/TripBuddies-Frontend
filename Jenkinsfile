pipeline {
    agent any

    tools {
        // Asegúrate de que esta configuración coincida con la que has definido en Global Tool Configuration
        nodejs 'NodeJs_20_8_0'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'ng build --prod'
            }
        }

        stage('Start') {
            steps {
                sh 'npm start'
            }
        }

    }

    post {
        // Aquí puedes manejar la limpieza o enviar notificaciones dependiendo del resultado del build
        always {
            // Por ejemplo, limpiar después de los builds
            cleanWs()
        }
    }
}
