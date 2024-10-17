
BACKEND_URL=$1
FILE_OUTPUT=$2
OPENAPI_PATH=$3

java -jar $OPENAPI_PATH generate \
    -g typescript-fetch \
    --additional-properties=useSingleRequestParameter=true,withoutRuntimeChecks=true,typescriptThreePlus=true,modelPropertyNaming=original \
    --remove-operation-id-prefix \
    --enable-post-process-file \
    -i "$BACKEND_URL/api-json" \
    -o $FILE_OUTPUT
