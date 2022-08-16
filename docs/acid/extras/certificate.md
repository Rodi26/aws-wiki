# Build certificate

The certificate is defined in the [**ingress**](https://sgithub.fr.world.socgen/dds-itf-acid/acid-base/blob/main/acid/dev/K8S/ingress.yaml) as secretName .
We will show you how to create SSL/TLS certificates using the [Cloud Platform Certificate service](https://doitnow.cloud.socgen/catalog/certificate).

## Why use SSL/TLS

> SSL/TLS Puts the “S” in HTTPS

In `HTTPS`, the “S” stands for “secure.” As an organisation, we need to secure our online transactions, browsers and applications on behalf of our users to tell them when it’s safe to transact on a website. SSL/TLS certificates (__they are both the same__) serve two purposes – they encrypt information that is sent over the internet and they provide identity assurance using a third party, both of which help our users to positively identify and trust websites that are safe to transact with.

> So, why do I need an SSL/TLS Certificate?

**SSL/TLS certificates** provide important advantages that can mean the difference between creating a seamless and secure website experience versus an alarming one for website visitors. Here are a few benefits that SSL/TLS provide for you: 
- Creates a safer experience for your customers
- Builds customer trust and improves conversions
- Encrypts the sensitive data that gets transmitted (to some extands)

For more information about certificates, please refer to this [doc](https://documentation.cloud.socgen/private/products/security/certificate/faq.html#what-is-a-certificate-and-signing-certificate-request-csr).

 
## Steps

1. Edit the [csr.conf](https://sgithub.fr.world.socgen/dds-itf-acid/acid-base/blob/main/acid/dev/Resources/service-csr.conf) file:

    Change the **commonName** and the **subjectAltName** with your own service:

    ```
    ...
    [dn]
    # You find here the different elements which constitute your distinguished name
    ...

    commonName             = your_k8s_service_name.your_k8S_namespace.svc    #Modify this line
    organizationalUnitName = DDS                                             #Modify this line
    organizationName       = GROUPE SOCIETE GENERALE                         #Do not touch this line
    countryName            = FR                                              #Modify this line
    stateOrProvinceName    = Ile de France                                   #Modify this line
    localityName           = Paris                                           #Modify this line   
    
    ...
    [req_ext]
    # You can specify here some extended attributes to your certification request
    # note that those extensions can (and some of them will be) be overrided.
    # A useful extension given in example is the subjectAltName which
    # allow you to specify DNS aliases/vhosts for a web-application for example.
    # You should also put the CommonName if you neet id for a web application

    subjectAltName = DNS:your_k8s_service_name.your_k8s_namespace.svc, DNS:your_virtualhost_name.your_wildcard_dns_subdomain, DNS:your_cname_fqdn
    ...
    ```

    !!! note
        **your_wildcard_dns_subdomain** is composed as follow:
        
        virtual_host.workspace_name.cluster_name.cluster_domain

        > **workspace_name** is an internal definition, it's basically the k8S namespace without the ns prefix.

    !!! example
        **front-dev.byo-ad016-dev-acid.kube9-dev.caas.eu-fr-paris.cloud.socgen**

2. Generate the key and the CSR files using openssl tool  

    ```bash
    openssl req -config <CSR_CONF_FILE> -new -keyout <MY_APP>_key.pem -out <MY_APP>_csr.pem
    ```
   
    ```
    Generating a RSA private key
    ..............+++++
    .....................+++++  
    writing new private key to '<MY_APP>_key.pem'
    -----
    ```

    !!! danger
        **DO NOT COMMIT THE GENERATED PRIVATE KEY WITH YOUR PROJECT SOURCES.**

        It's a secret that must be kept in a safe place like a vault.


3. Request a UNIPASS signed certificate

    Using DoItNow console

      - [x] Connect to DoItNow and go to the Certificate Service and click on the `CREATE CERTIFICATE` button  

      - [x] Get the CSR from the `<MY_APP>_csr.pem` file as follows

          ```bash
          cat <MY_APP>_csr.pem
          ```

          ```
          ---BEGIN CERTIFICATE REQUEST-----
          IDnTCCAoUCAQAwgYoxIzAhBgNVBAMMGnBwc3dlYmFwcC5teS1uYW1lc3BhY2Uu
          ZjMQwwCgYDVQQLDANHVFMxIDAeBgNVBAoMF0dST1VQRSBTT0NJRVRFIEdFTkVS
          ....
          SlZIJd0FFSvfqnJfendhg=
          ---END CERTIFICATE REQUEST-----
          ```

      - [x] Copy/Paste the certificate request in the CSR input text of DIN console.
      - [x] Choose `unipass-server`, it will generates a 6 months UNIPASS certificate.    
      - [x] Add your team Mailing list for the notifications` (personal email addresses are not allowed).
      - [x] Click on the submit button.
      - [x] Download your certificate from `DIN --> Choose action --> Download` and save it.

4. Deploy your TLS certificates as a Kubernetes secret

    !!! attention
        Don't forget to source your Kubernetes environment

    ```bash
    cd to/your/certificate/directory
    
    source /PATH_to_your_bundle_cluster_target/env.sh
    
    kubectl --namespace <MY_NAMESPACE> create secret tls <MY_APP>-tls --key <MY_APP>_key.pem --cert <MY_APP>_cert.pem
    ```
    ```
    secret/<MY_APP>-tls created
    ```
      
5. Configure your Ingress to use your TLS certificates

    ```yaml
    ...
     spec:
        tls:
          - hosts:
             - your_fqdn or your_cname_fqdn
            secretName: <MY_APP>-tls
    ...
    ```
