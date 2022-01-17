const getTypeFromImg = (pathToImg) => {
  return pathToImg.replace(/\/public\/img\/dough-([\D]+)\.svg/, "$1");
};

const getFillingFromImg = (pathToImg) => {
  return pathToImg.replace(/\/public\/img\/filling\/([\D]+)\.svg/, "$1");
};

const getSize = (sizeName) => {
  switch (sizeName) {
    case "23 см":
      return "small";

    case "32 см":
      return "normal";

    case "45 см":
      return "big";

    default:
      return "small";
  }
};

const getSauce = (sauceName) => {
  if (sauceName === "Томатный") {
    return "tomato";
  } else {
    return "creamy";
  }
};

export const getDough = (doughArray) => {
  return doughArray.reduce((newArr, dough) => {
    newArr.push({
      id: dough.id,
      name: dough.name,
      description: dough.description,
      type: getTypeFromImg(dough.image),
      price: dough.price,
    });

    return newArr;
  }, []);
};

export const getFilling = (ingredientsArray) => {
  return ingredientsArray.reduce((newArr, ingredient) => {
    newArr.push({
      id: ingredient.id,
      name: ingredient.name,
      filling: getFillingFromImg(ingredient.image),
      price: ingredient.price,
    });

    return newArr;
  }, []);
};

export const getSizes = (sizesArray) => {
  return sizesArray.reduce((newArr, size) => {
    newArr.push({
      id: size.id,
      name: size.name,
      size: getSize(size.name),
      multiplier: size.multiplier,
    });

    return newArr;
  }, []);
};

export const getSauces = (saucesArray) => {
  return saucesArray.reduce((newArr, sauce) => {
    newArr.push({
      id: sauce.id,
      name: sauce.name,
      sauce: getSauce(sauce.name),
      price: sauce.price,
    });

    return newArr;
  }, []);
};
