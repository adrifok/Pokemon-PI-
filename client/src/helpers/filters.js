export const types = (type, array) => {
  if (array.length) return array.filter((ele) => ele.type.includes(type));
  return [];
};

export const ordered = (order, array) => {
  let names = array.map((o) => o.name);
  let force = array.map((o) => o.force);
  let orderedArray = [];

  switch (order) {
    case "a-z":
      names = names.sort();
      names.forEach((ele) => {
        array.forEach((pokename) => {
          if (ele === pokename.name) orderedArray.push(pokename);
        });
      });
      return orderedArray;

    case "z-a":
      names = names.sort().reverse();
      names.forEach((ele) => {
        array.forEach((pokename) => {
          if (ele === pokename.name) orderedArray.push(pokename);
        });
      });
      return orderedArray;

    case "force+":
      force = force.sort((a, b) => b - a);
      force.forEach((f) => {
        array.forEach((ele) => {
          if (ele.force === f) orderedArray.push(ele);
        });
      });
      orderedArray = orderedArray.filter(
        (e, i) => orderedArray.indexOf(e) === i
      );
      return orderedArray;

    case "force-":
      force = force.sort((a, b) => a - b);
      force.forEach((f) => {
        array.forEach((ele) => {
          if (ele.force === f) orderedArray.push(ele);
        });
      });
      orderedArray = orderedArray.filter(
        (e, i) => orderedArray.indexOf(e) === i
      );
      return orderedArray;
    default:
      return array;
  }
};
