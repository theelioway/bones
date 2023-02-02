![](https://elioway.gitlab.io/eliobones/elio-bones-logo.png)

> "Can you get this done by Wednesday?" **Rosalind Codrington**

# bones ![beta](https://elioway.gitlab.io/eliosin/icon/devops/beta/favicon.ico "beta")

1. "Bare" bones, reusable, NodeJS (with lodash dependencies) **elioWay** _endpoints_ to use in your API, desktop or web client.
2. A CLI to try the _endpoints_ directly in your filesystem.

[bones Documentation](https://elioway.gitlab.io/eliobones/bones)

## Seeing is Believing

```bash
git clone https://gitlab.com/eliobones/bones.git
cd bones
npm i
npm run bones -- pingT
npm run bones -- readT shoppinglist
npm run bones -- listT shoppinglist

npm run bones -- takeupT myshopping --mainEntityOfPage=ItemList --name="Today's Shopping List" --alternateName="Don't forget the milk!"

# check the `myshopping.json` file!
cat  myshopping.json

# fish
set POTENTIALACTION --mainEntityOfPage=Action  --potentialAction="bones updateT <this> --Action.actionStatus=CompletedActionStatus"  --Action.actionStatus=PotentialActionStatus
# bash
POTENTIALACTION=$POTENTIALACTION
# ha!

npm run bones -- takeupT milk $POTENTIALACTION --name="Milk" --alternateName="If you forget the milk children WILL die"

cat milk.json

npm run bones -- takeonT myshopping bread $POTENTIALACTION
npm run bones -- takeonT myshopping eggs $POTENTIALACTION
npm run bones -- takeonT myshopping cheese $POTENTIALACTION
npm run bones -- enlistT myshopping milk

npm run bones -- readT myshopping
npm run bones -- listT myshopping --mainEntityOfPage=Action

set COMPLETEDACTION --Action.actionStatus=CompletedActionStatus
# bash
COMPLETEDACTION=$COMPLETEDACTION
# ha!

npm run bones -- updateT bread $COMPLETEDACTION

npm run bones -- listT myshopping --Action.actionStatus=CompletedActionStatus

npm run bones -- updateT eggs $COMPLETEDACTION
npm run bones -- updateT cheese $COMPLETEDACTION

npm run bones -- optimizeT myshopping
```

- [bones Quickstart](https://elioway.gitlab.io/eliobones/bones/quickstart.html)
- [Play around more using godly examples](https://elioway.gitlab.io/eliobones
  /bones/playing-god.html)

## TLDR

### `npm i`

### `npm test`

### `npm run bones -- takeupT bones`

### `npm run bones -- readT bones`

### `npm run bones -- updateT bones --name="This is cool"`

### `npm run bones -- takeonT bones hipbone`

### `npm run bones -- updateT hipbone --name="Connected to legbone"`

### `npm run bones -- unlistT bones hipbone`

### `npm run bones -- enlistT bones hipbone`

### `npm run bones -- listT bones`

### `npm run bones -- destroyT bones`

### `npm run bones -- schemaT thing`

### `npm run bones -- schemaT Thing`

- [bones Quickstart](https://elioway.gitlab.io/eliobones/bones/quickstart.html)
- [bones Credits](https://elioway.gitlab.io/eliobones/bones/credits.html)

![](https://elioway.gitlab.io/eliobones/apple-touch-icon.png)

## License

MIT [Tim Bushell](mailto:theElioWay@gmail.com)
