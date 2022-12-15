![](https://elioway.gitlab.io/eliobones/elio-bones-logo.png)

# bones

![experimental](https://elioway.gitlab.io/eliosin/icon/devops/experimental/favicon.ico "experimental")

Bare bones, NodeJS only, reusable elioWay _endpoints_ for your API, desktop or web client.

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
identifier=dembones npm run bones -- pingT
```

You can play some more with the following commands... get a feel for how an **elioWay** app operates. You'll need a .env file at some point:

```
# Everything is permitted for everyone.
"HASHINGSECRET=123
identifier=GOD
destroyT=ANON
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
npm run bones -- pingT

npm run bones -- takeupT shopping --name="Today's Shopping List" --alternateName="Don't forget the milk!"

npm run bones -- takeonT shopping milk  --mainEntityOfPage=Action  --Action.actionStatus=PotentialActionStatus

npm run bones -- takeonT shopping honey  --mainEntityOfPage=Action
npm run bones -- updateT honey --Action.actionStatus=PotentialActionStatus

npm run bones -- readT shopping
npm run bones -- listT shopping

npm run bones -- updateT honey --Action.actionStatus=CompletedActionStatus
npm run bones -- listT shopping

npm run bones -- unlistT shopping milk
npm run bones -- listT shopping

npm run bones -- enlistT shopping milk
npm run bones -- listT shopping

npm run bones -- destroyT milk
npm run bones -- listT shopping

npm run bones -- unlistT shopping milk
npm run bones -- listT shopping

npm run bones -- unlistT shopping milk
npm run bones -- listT shopping

npm run bones -- enlistT shopping milk

npm run bones -- optimizeT shopping

npm run bones -- takeonT shopping milk  --mainEntityOfPage=Action  --Action.actionStatus=CompletedActionStatus

npm run bones -- optimizeT shopping
```

- [Play around more using godly examples](https://elioway.gitlab.io/eliobones/bones/playing-god.html)

## TLDR

### `npm i`

### `npm test`

### `node demBones.js`

- [bones Quickstart](https://elioway.gitlab.io/eliobones/bones/quickstart.html)
- [bones Credits](https://elioway.gitlab.io/eliobones/bones/credits.html)

![](https://elioway.gitlab.io/eliobones/apple-touch-icon.png)

## License

MIT [Tim Bushell](mailto:tcbushell@gmail.com)
