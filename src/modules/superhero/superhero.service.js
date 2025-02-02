// Array to hold the superheroes data
let superheroes = [];

export const create = (data) => {
  // Add the new superhero data to the superheroes array
  superheroes.push(data);
  return superheroes;
};

export const all = () => {
  // Sort superheroes array in descending order based on humility_score
  return superheroes.sort((a, b) => b.humility_score - a.humility_score);
};
