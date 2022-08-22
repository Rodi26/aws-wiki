terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "=3.42.0"
    }
  }
}

provider "aws" {
  region  = var.region
}

resource "aws_vpc" "wiki" {
  cidr_block           = var.address_space
  enable_dns_hostnames = true

  tags = {
    name = "${var.prefix}-vpc-${var.region}"
    environment = "Production"
  }
}

resource "aws_subnet" "wiki" {
  vpc_id     = aws_vpc.wiki.id
  cidr_block = var.subnet_prefix

  tags = {
    name = "${var.prefix}-subnet"
  }
}

resource "aws_security_group" "wiki" {
  name = "${var.prefix}-security-group"

  vpc_id = aws_vpc.wiki.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
    prefix_list_ids = []
  }

  tags = {
    Name = "${var.prefix}-security-group"
  }
}

resource "aws_internet_gateway" "wiki" {
  vpc_id = aws_vpc.wiki.id

  tags = {
    Name = "${var.prefix}-internet-gateway"
  }
}

resource "aws_route_table" "wiki" {
  vpc_id = aws_vpc.wiki.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.wiki.id
  }
}

resource "aws_route_table_association" "wiki" {
  subnet_id      = aws_subnet.wiki.id
  route_table_id = aws_route_table.wiki.id
}

data "aws_ami" "centos" {
  most_recent = true

  filter {
    name = "name"
    #values = ["ubuntu/images/hvm-ssd/ubuntu-disco-19.04-amd64-server-*"]
    #values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
    values = ["CentOS Linux 7 x86_64 HVM EBS *"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["aws-marketplace"] # Canonical
}

resource "aws_eip" "wiki" {
  instance = aws_instance.wiki.id
  vpc      = true
}

resource "aws_eip_association" "wiki" {
  instance_id   = aws_instance.wiki.id
  allocation_id = aws_eip.wiki.id
}

resource "aws_instance" "wiki" {
  ami                         = data.aws_ami.centos.id
  instance_type               = var.instance_type
  key_name                    = aws_key_pair.wiki.key_name
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.wiki.id
  vpc_security_group_ids      = [aws_security_group.wiki.id]

  tags = {
    Name = "${var.prefix}-wiki-instance"
  }
}

# We're using a little trick here so we can run the provisioner without
# destroying the VM. Do not do this in production.

# If you need ongoing management (Day N) of your virtual machines a tool such
# as Chef or Puppet is a better choice. These tools track the state of
# individual files and can keep them in the correct configuration.

# Here we do the following steps:
# Sync everything in files/ to the remote VM.
# Set up some environment variables for our script.
# Add execute permissions to our scripts.
# Run the deploy_app.sh script.
resource "null_resource" "configure-app-wiki3" {
  depends_on = [aws_eip_association.wiki]

  triggers = {
    build_number = timestamp()
  }

  provisioner "file" {
    source      = "files/"
    destination = "/home/ec2-user/"

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = "${file("/Users/rodolphe/.ssh/aws_key")}"
      host        = aws_eip.wiki.public_ip
    }
  }



  provisioner "remote-exec" {
    inline = [
      "sudo rm /var/lib/apt/lists/partial/*",
      "sudo apt-get update && sudo apt-get upgrade ",
      "sudo apt-get -y install coreutils",
      "sudo apt-get -y install git-all",
      "sudo apt-get -y install python3-setuptools",
      "sudo apt-get -y install python3.10",
      "sudo easy_install3 pip",
      "sudo apt-get -y install python3-pip",
      "sudo pip3 install virtualenv",
      "sleep 15",
      "cd /tmp",
      "sudo git clone https://github.com/Rodi26/aws-wiki",
      "cd /tmp/aws-wiki",
      "sudo pip3 install mkdocs-material", 
      "sudo pip3 install -r requirements.txt",
      "sudo  mkdocs serve"
 
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = tls_private_key.wiki.private_key_pem
      host        = aws_eip.wiki.public_ip
    }
  }
}

resource "tls_private_key" "wiki" {
  algorithm = "RSA"
}

locals {
  private_key_filename = "${var.prefix}-ssh-key.pem"
}

resource "aws_key_pair" "wiki" {
  key_name   = local.private_key_filename
  public_key = tls_private_key.wiki.public_key_openssh
}
