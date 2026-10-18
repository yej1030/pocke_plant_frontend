import {DISEASE_SPECIES, canonicalDiseaseSpecies} from '../src/utils/diseaseSpecies';

test('scientific and Korean names resolve to the same supported host', () => {
  expect(canonicalDiseaseSpecies('  MONSTERA DELICIOSA ')).toBe('Monstera');
  expect(canonicalDiseaseSpecies('스킨답서스')).toBe('Pothos');
  expect(canonicalDiseaseSpecies('Dracaena trifasciata')).toBe('SnakePlant');
});

test('unsupported stuki and plant nicknames are never silently assigned a host', () => {
  expect(canonicalDiseaseSpecies('스투키')).toBe('');
  expect(canonicalDiseaseSpecies('Au')).toBe('');
  expect(canonicalDiseaseSpecies(undefined)).toBe('');
});

test('every selectable host has a unique supported canonical value', () => {
  expect(new Set(DISEASE_SPECIES.map(row => row.value)).size).toBe(9);
  for (const row of DISEASE_SPECIES) expect(canonicalDiseaseSpecies(row.value)).toBe(row.value);
});
