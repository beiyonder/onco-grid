import { readFile, writeFile } from "node:fs/promises";
import { feature } from "topojson-client";

const atlas = JSON.parse(await readFile(new URL("../node_modules/world-atlas/countries-50m.json", import.meta.url), "utf8"));
const countries = feature(atlas, atlas.objects.countries);
const india = countries.features.find((candidate) => String(candidate.id) === "356");
if (!india) throw new Error("India boundary (ISO numeric 356) was not found in world-atlas.");

const output = {
  type: "Feature",
  properties: {
    name: "India",
    source: "Natural Earth via world-atlas countries-50m",
    precision: "Small-scale national outline; not an administrative or routing boundary",
  },
  geometry: india.geometry,
};

await writeFile(new URL("../src/data/india-boundary.json", import.meta.url), `${JSON.stringify(output)}\n`);
