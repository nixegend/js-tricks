const entities = [
  {
    id: 1,
    parentId: 2,
    label: 'parent 2 item 2',
    orderIndex: 2,
  },
  {
    id: 4,
    parentId: 0,
    label: 'parent 0 item 1',
    orderIndex: 0,
  },
  {
    id: 3,
    parentId: 2,
    label: 'parent 2 item 0',
    orderIndex: 0,
  },
  {
    id: 0,
    parentId: null,
    label: 'root item 1',
    orderIndex: 0,
  },
  {
    id: 8,
    parentId: 0,
    label: 'parent 0 item 2',
    orderIndex: 1,
  },
  {
    id: 6,
    parentId: 2,
    label: 'parent 2 item 1',
    orderIndex: 1,
  },
  {
    id: 9,
    parentId: 4,
    label: 'parent 4 item 1',
    orderIndex: 0,
  },
  {
    id: 2,
    parentId: null,
    label: 'root item 2',
    orderIndex: 1,
  },
  {
    id: 10,
    parentId: 4,
    label: 'parent 4 item 2',
    orderIndex: 1,
  },
];

// type MenuEntity = {
//   id: number;
//   parentId: number | null;
//   label: string;
//   orderIndex: number;
// };

// type MenuItem = {
//   id: number;
//   label: string;
//   children: Array<MenuItem>;
// };

// type TreeMenu = {
//   id: number;
//   label: string;
//   children: Array<TreeMenu>;
// };

// interface LookupChildMap {
//   [id: number]: Array<MenuItem>;
// }

function getMenuItem(item) {
  return {
    id: item.id,
    label: item.label,
    children: [],
  };
}

// NOT implemented
// function getMenuTree(rootItems, lookupChildMap) {
//   const stack = rootItems;
//   const tree = [];

//   while (stack.length > 0) {
//     const item = stack.pop();

//     if (item) {
//       const childItems = lookupChildMap[item.id];
//       if (childItems && childItems.length) {
//         item.children = childItems;
//         childItems.concat(stack);
//         console.log(stack);
//       }
//       tree.unshift(item);
//     }
//   }

//   return tree;
// }

function getMenuTree(items, lookupChildMap) {
  for (const item of items) {
    const childItems = lookupChildMap[item.id];
    if (childItems && childItems.length) {
      item.children = getMenuTree(childItems, lookupChildMap);
    }
  }

  return items;
}

function rebuildToTree(data) {
  const lookupChildMap = {};
  const root = [];

  for (const item of data) {
    if (item.parentId === null) {
      root[item.orderIndex] = getMenuItem(item);
    } else {
      if (!(item.parentId in lookupChildMap)) {
        lookupChildMap[item.parentId] = [];
      }
      lookupChildMap[item.parentId][item.orderIndex] = getMenuItem(item);
    }
  }

  return getMenuTree(root, lookupChildMap);
}

const result = rebuildToTree(entities);
// console.log(result);
window.preLog(result);
