import { readFile, writeFile } from "node:fs/promises";
import { feature } from "topojson-client";
const atlas = JSON.parse(
  await readFile(
    new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url),
    "utf8",
  ),
);
const countries = feature(atlas, atlas.objects.countries);
const output = {
  source:
    "Natural Earth via world-atlas countries-110m; approximate country geography, not site coordinates",
  countries: countries.features.map((country) => ({
    name: country.properties.name,
    geometry: country.geometry,
  })),
};
await writeFile(
  new URL("../src/data/world-boundary.json", import.meta.url),
  `${JSON.stringify(output)}\n`,
);
