export const DISEASE_SPECIES = [
  {value: 'Monstera', label: '몬스테라', aliases: ['Monstera deliciosa']},
  {value: 'Pothos', label: '스킨답서스', aliases: ['Epipremnum aureum']},
  {value: 'SnakePlant', label: '산세베리아', aliases: ['Dracaena trifasciata', 'Sansevieria trifasciata']},
  {value: 'SpiderPlant', label: '접란', aliases: ['Chlorophytum comosum']},
  {value: 'AloeVera', label: '알로에', aliases: ['알로에 베라', 'Aloe vera']},
  {value: 'Opuntia', label: '백년초', aliases: []},
  {value: 'Tomato', label: '토마토', aliases: ['Solanum lycopersicum']},
  {value: 'Pepper,_bell', label: '피망', aliases: ['파프리카']},
  {value: 'Strawberry', label: '딸기', aliases: ['Fragaria']},
];

export function canonicalDiseaseSpecies(value) {
  if (typeof value !== 'string') return '';
  const normalized = value.trim().toLowerCase();
  const found = DISEASE_SPECIES.find(row => [row.value, row.label, ...row.aliases]
    .some(alias => alias.toLowerCase() === normalized));
  return found?.value || '';
}
