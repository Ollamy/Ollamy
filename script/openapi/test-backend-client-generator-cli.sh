
BACKEND_URL=$1
MAKER_PATH=$2
OPENAPI_PATH=$3

tmpPath=$(mktemp -d -p /tmp)

pushd $OPENAPI_PATH > /dev/null
    ./backend-client-generator.sh $BACKEND_URL $tmpPath ollamy-openapi-generator-cli.jar > /dev/null
popd > /dev/null

diff -qr --exclude=.openapi-generator ./$MAKER_PATH/src/services/api/out $tmpPath

if [ $? -ne 0 ]; then
    echo "There is some diff in the openapi-client generation."
    exit 1
else
    echo "No diff, everything's ok"
fi
