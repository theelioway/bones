![](https://elioway.gitlab.io/eliobones/elio-bones-logo.png)

# bones

![experimental](https://elioway.gitlab.io/eliosin/icon/devops/experimental/favicon.ico "experimental")

Bare bones NodeJS API. Reusable Code for **elioBones** projects.

- [bones Documentation](https://elioway.gitlab.io/eliobones/bones)

## Seeing is believing

```bash
git clone https://gitlab.com/eliobones/bones.git
cd bones
npm i
# Everything is permitted for everyone.
"HASHINGSECRET=123
identifier=bones
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

```
npm run bones -- pingT
```

```
npm run bones -- takeupT shopping --name="Don't forget the milk"
```

```
npm run bones -- takeonT shopping milk
  --mainEntityOfPage=Action
  --Action.actionStatus=PotentialActionStatus

npm run bones -- takeonT shopping honey
  --mainEntityOfPage=Action
  --Action.actionStatus=PotentialActionStatus
```

```
npm run bones -- readT shopping
npm run bones -- listT shopping
```

```
npm run bones -- updateT honey
  --Action.actionStatus=CompletedActionStatus
```

```
npm run bones -- unlistT shopping milk
npm run bones -- listT shopping
npm run bones -- enlistT shopping milk
```

```
npm run bones -- deleteT milk
npm run bones -- listT shopping
```

```
# Preserve test data
mv .data .databu
# or just clear any test data
rm -rf .data
```

## TLDR

### `yarn devstart`

### `yarn test`

### `yarn format`

- [bones Quickstart](https://elioway.gitlab.io/eliobones/bones/quickstart.html)
- [bones Credits](https://elioway.gitlab.io/eliobones/bones/credits.html)

![](https://elioway.gitlab.io/eliobones/apple-touch-icon.png)

## License

MIT [Tim Bushell](mailto:tcbushell@gmail.com)
