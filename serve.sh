setup_environment() {
  source venv/bin/activate
  cd ./wiki
  pip install -r ../requirements.txt
  mkdocs serve
  deactivate

}
if [ -d "venv/" ]; then
  setup_environment
else
  python -m pip install virtualenv
  python -m virtualenv venv
  setup_environment

fi
