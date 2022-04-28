module "s3_bucket" {
  source  = "app.terraform.io/rodolphefontaine-aws/s3-bucket/aws"
  version = "3.1.1"
  prefix_bucket = "${var.prefix}"
  bucket = "my-s3-bucket"
  acl    = "private"

  versioning = {
    enabled = true
  }

}