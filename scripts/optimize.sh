#!/bin/bash

photosPath="./static/produits"
thumbsPath="thumbs"
carouselsPath="carousels"

if ! type "convert" > /dev/null; then
    echo "Convert could not be found"
    exit
fi

# Change directory to photos
if ! [ -d "$photosPath" ]
then
    echo "$photosPath could not be found"
    exit
else
    cd $photosPath
fi

# Create carousels directory
if ! [ -d "./$thumbsPath" ]
then
    echo "create $photosPath/$thumbsPath"
    mkdir ./$thumbsPath
fi
if ! [ -d "./$carouselsPath" ]
then
    echo "create $photosPath/$carouselsPath"
    mkdir ./$carouselsPath
fi

# Create carousels photos
for f in *.jpg
do
    if ! test -f "./$carouselsPath/$f"; then
        echo "\033[32m Create ./$carouselsPath/$f \033[0m"
        convert -resize 1374x916\> "$f" "./$carouselsPath/$f"
    fi
done

# Create thumbs
for f in *a.jpg
do
    if ! test -f "./$thumbsPath/$f"; then
        echo "\033[32m Create ./$thumbsPath/$f \033[0m"
        convert -resize 446x297\> "$f" "./$thumbsPath/$f"
    fi
done