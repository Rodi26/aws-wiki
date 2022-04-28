module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  prefix_bucket = "${var.prefix}"
  bucket = "my-s3-bucket"
  acl    = "private"

  versioning = {
    enabled = true
  }

}