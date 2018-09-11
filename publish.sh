rm getLicense.zip 
cd getLicense
echo "zipping..."
zip -q -X -r ../getLicense.zip *
cd .. 
echo "uploading..."
aws lambda update-function-code --function-name getLicense --zip-file fileb://getLicense.zip --profile OR

echo
echo "----------------"


