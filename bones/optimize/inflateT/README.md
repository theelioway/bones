- `inflateT` An default endpoint which searches subdirectores for any which contain a `thing.json` file and lists them in the same tree structure.

  - Each `thing.json` could also come with a corresponding "bones.js" that would drive a different kind of `inflateT` (like prep some thumbnails of the images mentioned in the `thing.json` list).
  - You could swap `inflateT` or add a similar feature with a differently name endpoint which initialises the app from some starting data... for instance, spidering a Wiki entry to takeonT a list of Colombian birds from the page there.

- `optimizeT` An default endpoint which checks the `Action.actionStatus` of every listed thing and reports on the overall completion status. You could swap it for an endpoint which summarises sales figures of bar staff and awards the top seller a QRCODE for a free round of drinks (which of course they are encouraged to spend immediately on a round for the staff and boss). Or which birds you see less often.
