import { nanoid } from 'nanoid';

export const coffee = {
  meal: 'Coffee',
  kcal: '50',
  protein: '3',
  carbs: '4.5',
  fat: '3'
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

export const egg = {
  meal: 'Egg',
  kcal: '75',
  protein: '7',
  carbs: '0.25',
  fat: '5'
};

export const predefinedMeals = [coffee, huel, huelBlack, mate, egg];

export const makePredefined = ({ meal, kcal, protein, carbs, fat }) => ({
  key: nanoid(),
  meal,
  kcal,
  protein,
  carbs,
  fat
});
