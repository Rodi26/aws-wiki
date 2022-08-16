# Outputs file
output "url" {
  value = "http://${aws_eip.wiki.public_dns}"
}

output "ip" {
  value = "http://${aws_eip.wiki.public_ip}"
}
