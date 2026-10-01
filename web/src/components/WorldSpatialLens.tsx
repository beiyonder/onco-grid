import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import world from "../data/world-boundary.json";
import type { GlobalTrialEvidence } from "../data/evidence";
import { worldPolygonPath } from "../domain/worldProjection";
const countryPaths=world.countries.map(country=>({
  name:country.name,
  path:worldPolygonPath((country.geometry.type==="Polygon"?[country.geometry.coordinates]:country.geometry.coordinates) as number[][][][]),
}));
const countryAliases: Record<string, string> = {
  "United States": "United States of America",
  "Russian Federation": "Russia",
  "Korea, Republic of": "South Korea",
  "Republic of Korea": "South Korea",
  "Turkey (Türkiye)": "Turkey",
  Czechia: "Czech Republic",
  "Viet Nam": "Vietnam",
};
export function WorldSpatialLens({
  trials,
  total,
}: {
  trials: GlobalTrialEvidence[];
  total: number | null;
}) {
  const [selected, setSelected] = useState("");
  const coverage = useMemo(() => {
    const counts = new Map<string, Set<string>>();
    let unplaced = 0;
    const unplacedIds=new Set<string>();
    const names = new Set(world.countries.map((c) => c.name));
    for (const trial of trials) {
      let placed = false;
      for (const raw of trial.countries) {
        const country = countryAliases[raw] ?? raw;
        if (!names.has(country)) continue;
        placed = true;
        const ids = counts.get(country) ?? new Set<string>();
        ids.add(trial.id);
        counts.set(country, ids);
      }
      if (!placed) {unplaced++;unplacedIds.add(trial.id);}
    }
    return { counts, unplaced, unplacedIds };
  }, [trials]);
  const visible = selected==="__unplaced" ? trials.filter(t=>coverage.unplacedIds.has(t.id)) : selected
    ? trials.filter((t) =>
        t.countries.some((c) => (countryAliases[c] ?? c) === selected),
      )
    : trials;
  return (
    <section className="world-lens">
      <h3>Global spatial lens</h3>
      <Link className="button secondary" to="/trials?view=map">Switch to India snapshot spatial lens</Link>
      <p><a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a> via world-atlas countries-110m. Approximate boundaries; no site geocoding.</p>
      <p>
        {trials.length} loaded / {total ?? "unknown"} upstream matches ·{" "}
        {trials.length - coverage.unplaced} studies placed in at least one
        country · {coverage.unplaced} unplaced. Counts refer only to loaded
        results; countries overlap.
      </p>
      <p>
        Country-level registry geography, not sites, travel distances, access or
        live recruitment. SVG remains available without WebGL.
      </p>
      <svg
        viewBox="0 0 1000 520"
        role="img"
        aria-label="Country-level distribution of loaded global registry studies"
      >
        <title>Loaded global study coverage</title>
        {countryPaths.map((country) => {
          const count = coverage.counts.get(country.name)?.size ?? 0;
          return (
            <path
              key={country.name}
              d={country.path}
              fillRule="evenodd"
              onClick={()=>{if(count)setSelected(country.name);}}
              style={{cursor:count?"pointer":"default"}}
              fill={
                selected === country.name
                  ? "#69528a"
                  : count
                    ? "#477d79"
                    : "#dce4df"
              }
              stroke="#fbfcfb"
              strokeWidth=".6"
            >
              <title>
                {country.name}: {count} loaded studies
              </title>
            </path>
          );
        })}
      </svg>
      <label>
        Country / keyboard map control
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="">All loaded countries</option>
          <option value="__unplaced">Unplaced studies · {coverage.unplaced}</option>
          {[...coverage.counts]
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([name, ids]) => (
              <option key={name} value={name}>
                {name} · {ids.size} studies
              </option>
            ))}
        </select>
      </label>
      <p>{visible.length} studies in the selected loaded-result scope.</p>
      <div className="world-result-list">
        {visible.map((t) => (
          <p key={t.id}>
            <Link to={`/trials/global/${t.id}`}>
              {t.id} · {t.briefTitle}
            </Link>
          </p>
        ))}
      </div>
    </section>
  );
}
