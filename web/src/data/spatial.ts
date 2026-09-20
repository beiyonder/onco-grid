import type { TrialRecord } from "../types";

export type GeoCoordinate = readonly [latitude: number, longitude: number];

const cityCentroids: Record<string, GeoCoordinate> = {
  "new delhi": [28.61, 77.21], delhi: [28.61, 77.21], mumbai: [19.08, 72.88], "navi mumbai": [19.03, 73.03], thane: [19.22, 72.98],
  kolkata: [22.57, 88.36], howrah: [22.6, 88.31], pune: [18.52, 73.86], bangalore: [12.97, 77.59], bengaluru: [12.97, 77.59],
  hyderabad: [17.39, 78.49], nashik: [20, 73.79], ahmedabad: [23.02, 72.57], nagpur: [21.15, 79.09], varanasi: [25.32, 82.97],
  surat: [21.17, 72.83], gurgaon: [28.46, 77.03], gurugram: [28.46, 77.03], bhubaneswar: [20.3, 85.82], jaipur: [26.91, 75.79],
  chennai: [13.08, 80.27], thiruvananthapuram: [8.52, 76.94], vadodara: [22.3, 73.18], visakhapatnam: [17.69, 83.22],
  belagavi: [15.85, 74.5], madurai: [9.93, 78.12], chandigarh: [30.73, 76.78], kochi: [9.93, 76.27], mysuru: [12.3, 76.64],
  puducherry: [11.94, 79.81], kolhapur: [16.7, 74.24], mohali: [30.7, 76.72], vijayawada: [16.51, 80.65], lucknow: [26.85, 80.95],
  calicut: [11.25, 75.78], kozhikode: [11.25, 75.78], kanpur: [26.45, 80.33], patna: [25.61, 85.14], vellore: [12.92, 79.13],
  aurangabad: [19.88, 75.34], jhajjar: [28.61, 76.66], faridabad: [28.41, 77.31], indore: [22.72, 75.86],
  coimbatore: [11.02, 76.96], guwahati: [26.14, 91.74], ranchi: [23.34, 85.31], raipur: [21.25, 81.63], jodhpur: [26.24, 73.02],
  mangalore: [12.91, 74.86], srinagar: [34.08, 74.8], dehradun: [30.32, 78.03], noida: [28.57, 77.32], ghaziabad: [28.67, 77.45],
};

const stateCentroids: Record<string, GeoCoordinate> = {
  "andhra pradesh": [15.9, 79.7], "arunachal pradesh": [28.2, 94.7], assam: [26.2, 92.9], bihar: [25.9, 85.6],
  chhattisgarh: [21.3, 82], goa: [15.3, 74], gujarat: [22.3, 71.2], haryana: [29, 76], "himachal pradesh": [31.8, 77.2],
  jharkhand: [23.6, 85.3], karnataka: [15.3, 75.7], kerala: [10.4, 76.4], "madhya pradesh": [23.5, 78.6],
  maharashtra: [19.7, 75.7], manipur: [24.8, 93.9], meghalaya: [25.5, 91.3], mizoram: [23.2, 92.9], nagaland: [26.1, 94.5],
  odisha: [20.5, 84.4], orissa: [20.5, 84.4], punjab: [31, 75.4], rajasthan: [26.8, 73.8], sikkim: [27.5, 88.5],
  "tamil nadu": [11.1, 78.7], telangana: [18.1, 79], tripura: [23.8, 91.6], "uttar pradesh": [26.8, 80.9],
  uttarakhand: [30.1, 79.3], "west bengal": [23.1, 87.9], delhi: [28.61, 77.21], "national capital territory of delhi": [28.61, 77.21],
  "jammu and kashmir": [33.5, 75], "jammu & kashmir": [33.5, 75], ladakh: [34.2, 77.6], puducherry: [11.94, 79.81], chandigarh: [30.73, 76.78],
};

function geoKey(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase();
}

export interface GeoCluster {
  id: string;
  label: string;
  precision: "city centroid" | "state centroid";
  latitude: number;
  longitude: number;
  siteCount: number;
  recruitingSiteCount: number;
  trialIds: string[];
}

export interface GeoCoverage {
  clusters: GeoCluster[];
  totalSites: number;
  placedSites: number;
  unplacedSites: number;
  unplacedTrialCount: number;
}

export function buildGeoCoverage(trials: TrialRecord[]): GeoCoverage {
  const clusters = new Map<string, {
    label: string;
    precision: GeoCluster["precision"];
    coordinate: GeoCoordinate;
    siteCount: number;
    recruitingSiteCount: number;
    trialIds: Set<string>;
  }>();
  const unplacedTrials = new Set<string>();
  let totalSites = 0;
  let placedSites = 0;

  trials.forEach((trial) => {
    trial.indiaLocations.forEach((site) => {
      totalSites += 1;
      const cityKey = geoKey(site.city);
      const stateKey = geoKey(site.state);
      const cityCoordinate = cityCentroids[cityKey];
      const stateCoordinate = stateCentroids[stateKey];
      const coordinate = cityCoordinate ?? stateCoordinate;
      if (!coordinate) {
        unplacedTrials.add(trial.id);
        return;
      }
      placedSites += 1;
      const precision: GeoCluster["precision"] = cityCoordinate ? "city centroid" : "state centroid";
      const label = cityCoordinate ? site.city : site.state;
      const clusterKey = `${precision}:${geoKey(label)}`;
      const cluster = clusters.get(clusterKey) ?? {
        label,
        precision,
        coordinate,
        siteCount: 0,
        recruitingSiteCount: 0,
        trialIds: new Set<string>(),
      };
      cluster.siteCount += 1;
      if (site.status === "RECRUITING") cluster.recruitingSiteCount += 1;
      cluster.trialIds.add(trial.id);
      clusters.set(clusterKey, cluster);
    });
  });

  return {
    clusters: Array.from(clusters.entries()).map(([id, cluster]) => ({
      id,
      label: cluster.label,
      precision: cluster.precision,
      latitude: cluster.coordinate[0],
      longitude: cluster.coordinate[1],
      siteCount: cluster.siteCount,
      recruitingSiteCount: cluster.recruitingSiteCount,
      trialIds: Array.from(cluster.trialIds),
    })).sort((left, right) => right.siteCount - left.siteCount || left.label.localeCompare(right.label)),
    totalSites,
    placedSites,
    unplacedSites: totalSites - placedSites,
    unplacedTrialCount: unplacedTrials.size,
  };
}
