terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "us-west-2"
}

resource "aws_instance" "app_server" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"
  vpc_security_group_ids = ["sg-a5f24bf1"] 
  subnet_id =  "subnet-e23ce5bf"
  tags = {
    Name = "ExampleAppServerInstance"
  }
}

