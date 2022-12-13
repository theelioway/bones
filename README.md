![](https://elioway.gitlab.io/eliobones/elio-bones-logo.png)

# bones

![experimental](https://elioway.gitlab.io/eliosin/icon/devops/experimental/favicon.ico "experimental")

Bare bones, NodeJS only, reusable elioWay _endpoints_ for your API, desktop or web client.

## The TURDs

Four **elioEngage** operations:

- `takeupT` As in "take up carpentry". The "record create" endpoint.
- `updateT` The "record create" endpoint.
- `readT` The "record create" endpoint.
- `deleteT` The "record create" endpoint.

## The LUTEs

Four **elioList** endpoints:

- `listT` The "list all relateds record" endpoint.
- `unlistT` The "record remove from list" endpoint.
- `takeonT` The "record create and add to list" endpoint.
- `enlistT` The "record add to list" endpoint.

## PS

Two **elioSchema** endpoints:

- `pingT` An endpoint for checking the availability of endpoints.
- `schemaT` An endpoint for getting metadata, or for getting a new blank record.

## IOU

Three **elioOptimize** endpoints, the very least we could do, but we expect you'll need more. You'll have to write those and share them. We'll share any we write here as well. For now there are just three.

These three endpoints _are_ endpoints and they are rightly grouped as **elioBones**. The difference is that all the other endpoints above provide features you'd normally have to write for a new project, but not when you do it **the elioWay**. It's the 90% grunt work done for you - also the most boring stuff.

Custom writing `optimizeT` endpoints are the heart of the elioWay. They are its plugins. Have fun coding functions which perform curious and interesting and useful manipulations of **elio** data.

But for now... It's the least I owe.

- `inflateT` An default endpoint which searches subdirectores for any which contain a `thing.json` file and lists them in the same tree structure.

  - Each `thing.json` could also come with a corresponding "bones.js" that would drive a different kind of `inflateT` (like prep some thumbnails of the images mentioned in the `thing.json` list).
  - You could swap `inflateT` or add a similar feature with a differently name endpoint which initialises the app from some starting data... for instance, spidering a Wiki entry to takeonT a list of Colombian birds from the page there.

- `optimizeT` An default endpoint which checks the `Action.actionStatus` of every listed thing and reports on the overall completion status. You could swap it for an endpoint which summarises sales figures of bar staff and awards the top seller a QRCODE for a free round of drinks (which of course they are encouraged to spend immediately on a round for the staff and boss). Or which birds you see less often.

- `undoT` An default endpoint which allows you to reverse data changes by going back a certain number of steps.

We'll share any more we write. Share yours!

## BTW

Fun contest. The Best Three endpoints Win a listing here.

- `bestT`
- `threeT`
- `winT`

- [bones Documentation](https://elioway.gitlab.io/eliobones/bones)

## Seeing is believing

```bash
git clone https://gitlab.com/eliobones/bones.git
cd bones
npm i
node demBones.js
NODEENV identifier=dembones tew bones pingT
```

You can play some more with the following commands... get a feel for how an **elioWay** app operates.

```
# Everything is permitted for everyone.
"HASHINGSECRET=123
identifier=GOD
deleteT=ANON
enlistT=ANON
listT=ANON
pingT=ANON
readT=ANON
schemaT=ANON
takeonT=ANON
takeupT=ANON
updateT=ANON
unlistT=ANON" > .env
```

Between sessions:

```
# Preserve test data
mv $DATADIR $DATADIRbu
# or just clear any test data
rm -rf $DATADIR
```

Run 1 at a time, or in suggested groupings.

```
tew bones pingT

tew bones takeupT shopping --name="Today's Shopping List" --alternateName="Don't forget the milk!"

tew bones takeonT shopping milk  --mainEntityOfPage=Action  --Action.actionStatus=PotentialActionStatus

tew bones takeonT shopping honey  --mainEntityOfPage=Action
tew bones updateT honey --Action.actionStatus=PotentialActionStatus

tew bones readT shopping
tew bones listT shopping

tew bones updateT honey --Action.actionStatus=CompletedActionStatus
tew bones listT shopping

tew bones unlistT shopping milk
tew bones listT shopping

tew bones enlistT shopping milk
tew bones listT shopping

tew bones deleteT milk
tew bones listT shopping

tew bones unlistT shopping milk
tew bones listT shopping

tew bones unlistT shopping milk
tew bones listT shopping

tew bones enlistT shopping milk

tew bones optimizeT shopping

tew bones takeonT shopping milk  --mainEntityOfPage=Action  --Action.actionStatus=CompletedActionStatus

tew bones optimizeT shopping
```

- [Play around with some more using godly examples](playing-god.html)

## TLDR

### `npm i`

### `npm test`

### `node demBones.js`

- [bones Quickstart](https://elioway.gitlab.io/eliobones/bones/quickstart.html)
- [bones Credits](https://elioway.gitlab.io/eliobones/bones/credits.html)

![](https://elioway.gitlab.io/eliobones/apple-touch-icon.png)

## License

MIT [Tim Bushell](mailto:tcbushell@gmail.com)
