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
npm run bones -- readT Person tim
npm run bones -- takeupT Person tim --name="Tim Bushell"
npm run bones -- enlistT Person tim Person trev --name="Trev Bushell"
npm run bones -- updateT Person trev --name="Trevor Bushell"
```

### Config

Create a `.env` file in the root directory. It should have the following settings:

```
ENDOSKELETON='ThingOnAShoeString'
EXOSKELETON='boney'
DATABASENAME='elioWay'
MONGODB='mongodb://localhost:27017/'
ALLOWED_HOST='http://localhost:4200'
PORT=3030
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
