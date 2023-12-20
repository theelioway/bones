export const ItemList = (thing) => {
  thing = thing || {};
  thing.ItemList = thing.ItemList || {};
  thing.ItemList.itemListElement = thing.ItemList.itemListElement || [];
  return thing;
};

export default ItemList;
