import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import boundaryJson from "../data/india-boundary.json";
import { buildGeoCoverage, type GeoCluster } from "../data/spatial";
import type { TrialRecord } from "../types";
import { Icon } from "./Icon";
import { StatusChip } from "./Primitives";

interface BoundaryFeature {
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
  properties: {
    source: string;
    precision: string;
  };
}

const boundary = boundaryJson as unknown as BoundaryFeature;
const centerLongitude = 82.75;
const centerLatitude = 22;
const projectionScale = 0.245;

function project(longitude: number, latitude: number): [number, number] {
  return [
    (longitude - centerLongitude) * projectionScale,
    (latitude - centerLatitude) * projectionScale,
  ];
}

function ringToPath(ring: number[][]): THREE.Vector2[] {
  return ring.map(([longitude = centerLongitude, latitude = centerLatitude]) => {
    const [x, y] = project(longitude, latitude);
    return new THREE.Vector2(x, y);
  });
}

function boundaryShapes(): THREE.Shape[] {
  const polygons = boundary.geometry.type === "Polygon"
    ? [boundary.geometry.coordinates as number[][][]]
    : boundary.geometry.coordinates as number[][][][];
  return polygons.map((polygon) => {
    const [outer = [], ...holes] = polygon;
    const shape = new THREE.Shape(ringToPath(outer));
    shape.holes = holes.map((ring) => new THREE.Path(ringToPath(ring)));
    return shape;
  });
}

function labelSprite(label: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 320;
  canvas.height = 72;
  if (context) {
    context.fillStyle = "rgba(31,34,38,0.92)";
    context.roundRect(2, 2, 316, 68, 18);
    context.fill();
    context.strokeStyle = "rgba(218,222,222,0.48)";
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = "#f3f1eb";
    context.font = "700 25px Avenir Next, Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(label.slice(0, 24), 160, 36);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.55, 0.35, 1);
  return sprite;
}

function disposeObject(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => material.dispose());
    }
    if (child instanceof THREE.Sprite) {
      child.material.map?.dispose();
      child.material.dispose();
    }
  });
}

export function IndiaSpatialLens({ trials, onOpenTrial }: { trials: TrialRecord[]; onOpenTrial: (trial: TrialRecord) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const coverage = useMemo(() => buildGeoCoverage(trials), [trials]);
  const trialById = useMemo(() => new Map(trials.map((trial) => [trial.id, trial])), [trials]);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(coverage.clusters[0]?.id ?? null);
  const [renderError, setRenderError] = useState<string | null>(null);
  const selectedCluster = coverage.clusters.find((cluster) => cluster.id === selectedClusterId) ?? coverage.clusters[0];

  useEffect(() => {
    if (!coverage.clusters.some((cluster) => cluster.id === selectedClusterId)) {
      setSelectedClusterId(coverage.clusters[0]?.id ?? null);
    }
  }, [coverage.clusters, selectedClusterId]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    setRenderError(null);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setRenderError("WebGL is unavailable. Use the accessible cluster list beside the map.");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.replaceChildren(renderer.domElement);
    renderer.domElement.setAttribute("aria-label", "Approximate 2.5D India registry-site map");
    renderer.domElement.setAttribute("role", "img");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1f2226");
    scene.fog = new THREE.Fog("#1f2226", 12, 22);
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, -0.7, 15.5);
    camera.lookAt(0, 0.35, 0);

    const ambient = new THREE.HemisphereLight("#f5f3ed", "#566069", 2.45);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight("#fff8e8", 3.45);
    sun.position.set(-4, 7, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    scene.add(sun);

    const group = new THREE.Group();
    group.rotation.x = -0.08;
    group.rotation.z = -0.035;
    scene.add(group);

    const shapeGeometry = new THREE.ExtrudeGeometry(boundaryShapes(), {
      depth: 0.24,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.045,
      bevelThickness: 0.045,
      curveSegments: 2,
    });
    const land = new THREE.Mesh(shapeGeometry, new THREE.MeshStandardMaterial({ color: "#aeb8bb", roughness: 0.5, metalness: 0.16 }));
    land.receiveShadow = true;
    land.castShadow = true;
    group.add(land);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(4.6, 4.9, 0.28, 64),
      new THREE.MeshStandardMaterial({ color: "#30343a", roughness: 0.64, metalness: 0.12 }),
    );
    base.rotation.x = Math.PI / 2;
    base.position.set(0, 0, -0.32);
    base.receiveShadow = true;
    scene.add(base);

    const markerMeshes: THREE.Mesh[] = [];
    coverage.clusters.forEach((cluster, index) => {
      const [x, y] = project(cluster.longitude, cluster.latitude);
      const height = 0.2 + Math.min(0.68, Math.sqrt(cluster.siteCount) * 0.095);
      const marker = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07 + Math.min(0.08, cluster.siteCount * 0.004), 0.11, height, 12),
        new THREE.MeshStandardMaterial({ color: cluster.precision === "city centroid" ? "#c9ad7b" : "#91a6b5", roughness: 0.28, metalness: 0.18, emissive: cluster.precision === "city centroid" ? "#3f3422" : "#293841", emissiveIntensity: 0.24 }),
      );
      marker.rotation.x = Math.PI / 2;
      marker.position.set(x, y, 0.26 + height / 2);
      marker.castShadow = true;
      marker.userData.clusterId = cluster.id;
      markerMeshes.push(marker);
      group.add(marker);
      if (index < 14) {
        const label = labelSprite(`${cluster.label} · ${cluster.siteCount}`);
        label.position.set(x, y + 0.22, 0.75 + height);
        group.add(label);
      }
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 10.5;
    controls.maxDistance = 20;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.58;
    controls.target.set(0, 0.3, 0);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const selectMarker = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(markerMeshes, false)[0];
      if (hit?.object.userData.clusterId) setSelectedClusterId(String(hit.object.userData.clusterId));
    };
    renderer.domElement.addEventListener("pointerup", selectMarker);

    const resize = () => {
      const width = Math.max(280, mount.clientWidth);
      const height = Math.max(420, Math.min(650, width * 0.72));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerup", selectMarker);
      controls.dispose();
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [coverage.clusters]);

  return <section className="spatial-lens" aria-labelledby="spatial-lens-heading">
    <header><div><p className="eyebrow">Approximate registry geography</p><h2 id="spatial-lens-heading">India spatial lens</h2><p>A soft 2.5D diorama over the same filtered public trial set. Drag to tilt, scroll to zoom, or use the accessible cluster list.</p></div><StatusChip tone="attention">Not route or access planning</StatusChip></header>
    <div className="spatial-boundary" role="note"><Icon name="warning" /><p><strong>Approximate placement only.</strong>Markers use curated city centroids or labelled state centroids. They do not represent patients, routes, travel time, service capacity, current site availability, or enrolment access.</p></div>
    <div className="spatial-layout">
      <div className="spatial-canvas-shell"><div className="spatial-canvas" ref={mountRef} />{renderError ? <p className="form-error"><Icon name="warning" />{renderError}</p> : null}<div className="spatial-legend"><span><i className="city" />City centroid</span><span><i className="state" />State centroid</span><span><i className="unplaced" />Unplaced disclosed separately</span></div></div>
      <aside className="spatial-context" aria-live="polite">
        <div className="spatial-coverage"><div><strong>{coverage.clusters.length}</strong><span>placed clusters</span></div><div><strong>{coverage.placedSites}</strong><span>placed sites</span></div><div><strong>{coverage.unplacedSites}</strong><span>unplaced sites</span></div><div><strong>{coverage.unplacedTrialCount}</strong><span>trials with an unplaced site</span></div></div>
        {selectedCluster ? <div className="selected-cluster"><p className="eyebrow">Selected cluster</p><h3>{selectedCluster.label}</h3><span>{selectedCluster.precision} · {selectedCluster.siteCount} listed sites · {selectedCluster.trialIds.length} trials</span><p>{selectedCluster.recruitingSiteCount} site records are registry-labelled recruiting. This is not independent availability confirmation.</p><div>{selectedCluster.trialIds.slice(0, 8).map((id) => { const trial = trialById.get(id); return trial ? <button type="button" key={id} onClick={() => onOpenTrial(trial)}><code>{id}</code><span>{trial.briefTitle}</span><Icon name="arrow" /></button> : null; })}</div></div> : null}
        <details className="cluster-list"><summary>Accessible cluster list</summary><div>{coverage.clusters.map((cluster) => <button className={cluster.id === selectedCluster?.id ? "active" : ""} type="button" key={cluster.id} onClick={() => setSelectedClusterId(cluster.id)}><span><strong>{cluster.label}</strong><small>{cluster.precision}</small></span><span>{cluster.siteCount} sites</span></button>)}</div></details>
      </aside>
    </div>
    <footer><span>Boundary: {boundary.properties.source}</span><span>{boundary.properties.precision}</span><span>{coverage.totalSites} filtered India site records total</span></footer>
  </section>;
}
