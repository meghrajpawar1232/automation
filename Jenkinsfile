pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm install cypress mochawesome mochawesome-merge mochawesome-report-generator --save-dev'
                }
            }
        }

      stage('Run Cypress Tests') {
          steps {
              script {
                  // Run the Cypress tests and generate reports
                  sh 'npx cypress run --headless || exit 0'
		  sh 'ls -lrt cypress/reports/html/'
              }
          }
      }

      stage('Send Email Notification') {
          steps {
              script {
                  // Send an email with the report as an attachment
                  emailext (
                      subject: "Cypress Test Results",
                      body: "Please find the attached test report.",
                      to: "mpawar@radinhealth.com,rkumari@radinhealth.com,
                      attachmentsPattern: 'cypress/reports/html/index.html'
                  )
              }
          }
      }      

      
    
    }

      post {
        always {
            cleanWs() // Clean up workspace after build
        }
      }      
}
