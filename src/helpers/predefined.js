import { nanoid } from 'nanoid';

export const coffee = {
  meal: 'Coffee',
  kcal: '57',
  protein: '3',
  carbs: '4.5',
  fat: '3'
};

export const coffee2Percent = {
  meal: 'Coffee 1.5%',
  kcal: '45',
  protein: '3',
  carbs: '4.5',
  fat: '1.5'
};

export const huelBlack = {
  meal: 'Huel 100g',
  kcal: '400',
  protein: '40',
  carbs: '16',
  fat: '18'
};

export const huel = {
  meal: 'Huel Black 100g',
  kcal: '400',
  protein: '30',
  carbs: '37',
  fat: '13'
};

export const mate = {
  meal: 'Mate',
  kcal: '105',
  protein: '0',
  carbs: '25',
  fat: '0'
};

export const lipton200Ml = {
  meal: 'Lipton 200 Ml',
  kcal: '18',
  protein: '0',
  carbs: '4.5',
  fat: '0'
};

export const egg = {
  meal: 'Egg',
  kcal: '75',
  protein: '7',
  carbs: '0.25',
  fat: '5'
};

export const cottageCheese = {
  meal: 'Serek wiejski 28g',
  kcal: '185',
  protein: '28',
  carbs: '5',
  fat: '4'
};

export const cottageCheeseLight = {
  meal: 'Serek wiejski Light',
  kcal: '166',
  protein: '22',
  carbs: '6',
  fat: '6'
};

export const chipsZPieca30g = {
  meal: 'Chipsy Z Pieca 30g',
  kcal: '133',
  protein: '1.5',
  carbs: '21',
  fat: '4.3'
};

export const curryPolPorcji = {
  meal: 'Curry pół porcji',
  kcal: '365',
  protein: '25',
  carbs: '40',
  fat: '15'
};

export const princePolo = {
  meal: 'Price Polo',
  kcal: '266',
  protein: '1',
  carbs: '30',
  fat: '15'
};

export const truskawki100g = {
  meal: 'Truskawki 100g',
  kcal: '33',
  protein: '0.7',
  carbs: '8',
  fat: '0.4'
};

export const predefinedMeals = [
  coffee,
  coffee2Percent,
  huel,
  huelBlack,
  mate,
  lipton200Ml,
  egg,
  cottageCheese,
  cottageCheeseLight,
  chipsZPieca30g,
  curryPolPorcji,
  princePolo,
  truskawki100g
];

export const makePredefined = ({ meal, kcal, protein, carbs, fat }) => ({
  key: nanoid(),
  meal,
  kcal,
  protein,
  carbs,
  fat
});
