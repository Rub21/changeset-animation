# OSM changeset animation


## Install

```
git clone https://github.com/Rub21/changeset-animation.git
cd changeset-animation/
npm link

```

## Get the changeset files

Get an URL of the OSMCHA API, example:

`https://osmcha.mapbox.com/api/v1/changesets/?page=1&page_size=5000&date__gte=2018-02-05&date__lte=2018-02-20&users=calfarome%2Cridixcr%2Cdannykath%2CRub21%2CRichRico%2Cediyes%2Cpiligab%2Ckaritotp`


```
getchangeset  --url="https://osmcha.mapbox.com/api/v1/changesets/?page=1&page_size=5000&date__gte=2018-02-05&date__lte=2018-02-20&users=calfarome%2Cridixcr%2Cdannykath%2CRub21%2CRichRico%2Cediyes%2Cpiligab%2Ckaritotp"

```
### Display the animation

Open the url: https://rub21.github.io/changeset-animation, select all your files and press start.

![ddd](https://user-images.githubusercontent.com/1152236/36818363-c0680636-1cb2-11e8-9321-a6da954925f8.gif)
