node {
  def project = "townhall"
  def env_name = "qa"
  def docker_registry = "${DOCKER_REGISTRY}"
  def s3_bucket = "s3://${project}_${env_name}"
  def branch = "${BRANCH_NAME}"
  def feature_name = (branch =~ /^feature-/) ? branch.substring(8) : "master"
  def s3_location = "${s3_bucket}/${project}/map/${feature_name}/"
  def container_name = "${project}_${env_name}"

  checkout scm

  stage("Build") {
    sh returnStatus: true, script: "docker rm ${container_name}"
    sh returnStatus: true, script: "rm -Rf public"

    def cwd = pwd()
    sh script: "cp ~/.ssh/id_rsa $cwd/id_rsa"
    sh script: "docker build -t ${container_name}:latest --build-arg TARGET=${env_name} ."

    sh script: "docker create --name ${container_name} ${container_name}:latest"
    sh script: "docker cp ${container_name}:/build/public ./public"
    sh returnStatus: true, script: "docker rm ${container_name}"
  }

  stage("Deploy QA") {
    withCredentials([string(credentialsId: 's3_access_key', variable: 'S3_ACCESS_KEY'), string(credentialsId: 's3_secret_key', variable: 'S3_SECRET_KEY')]) {
      sh script: "s3cmd --access_key=${S3_ACCESS_KEY} --secret_key=${S3_SECRET_KEY} --acl-public --no-mime-magic --guess-mime-type --recursive --delete-removed  sync  public/ ${s3_location}"
    }
  }
}
