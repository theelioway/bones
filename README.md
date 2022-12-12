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

rm -rf .data/
# In the beginning
npm run bones -- takeupT creation --subjectOf=creation --mainEntityOfPage=EntryPoint
npm run bones -- readT creation
npm run bones -- updateT creation --name="Yahwah"
npm run bones -- updateT creation --Intangible.name="The Mysterious One"
npm run bones -- readT creation --sameAs=Intangible
npm run bones -- readT creation --sameAs=EntryPoint
npm run bones -- readT creation --sameAs=ItemList
npm run bones -- readT creation
# todo npm run bones -- readT creation --sameAs=-ItemList,-EntryPoint
# todo npm run bones -- creation takeonT god
# Let there be god
npm run bones -- takeonT creation god
npm run bones -- updateT god  --mainEntityOfPage=Person --disambiguatingDescription="there is a god"
npm run bones -- listT creation
npm run bones -- readT god
npm run bones -- listT god
# Let there be god
npm run bones -- enlistT god creation
npm run bones -- takeonT god lucifer --mainEntityOfPage=Person --disambiguatingDescription="god created d'evil"
npm run bones -- takeonT god eve --mainEntityOfPage=Person --disambiguatingDescription="god created eve"
npm run bones -- takeonT god adam --mainEntityOfPage=Person --disambiguatingDescription="god created adam"
npm run bones -- readT god
npm run bones -- listT god
npm run bones -- unlistT god lucifer
npm run bones -- listT god
# A fall from grace
npm run bones -- takeonT lucifer snake --mainEntityOfPage=Thing --disambiguatingDescription="lucifer used a snake"
npm run bones -- updateT snake --alternateName=Sneaky --description="first talking snake"
npm run bones -- enlistT snake eve
npm run bones -- readT snake
npm run bones -- listT snake
npm run bones -- updateT eve --alternateName=Tempted --description="the snake tempted eve"
npm run bones -- enlistT eve adam
npm run bones -- updateT adam --alternateName=Seduced --description="eve seduced adam"
npm run bones -- deleteT snake
npm run bones -- takeonT adam sin --mainEntityOfPage=Person --disambiguatingDescription="adam and eve sinned"
npm run bones -- enlistT eve sin
```

### Config

Create a `.env` file in the root directory. It should have the following settings:

```
HASHINGSECRET=123
```

Initialize engaged thing settings

```
identifier=ID123
subjectOf=elioWay
```

Permit settings

```
deleteT=ANON
enlistT=ANON
listT=ANON
pingT=ANON
readT=ANON
schemaT=ANON
takeonT=ANON
takeupT=ANON
updateT=ANON
unlistT=ANON
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
