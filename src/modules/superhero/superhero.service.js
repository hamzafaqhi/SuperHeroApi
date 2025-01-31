let superheroes = [];

export const create = (data) => {
  superheroes.push(data);
  return superheroes;
};

export const all = () => {
  return superheroes.sort((a, b) => b.humility_score - a.humility_score);
};
