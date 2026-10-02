type Point = [number, number];
function clip(points:Point[],edge:number,keepGreater:boolean):Point[]{
  const result:Point[]=[];
  for(let i=0;i<points.length;i++){
    const a=points[(i+points.length-1)%points.length]!;const b=points[i]!;
    const insideA=keepGreater?a[0]>=edge:a[0]<=edge;
    const insideB=keepGreater?b[0]>=edge:b[0]<=edge;
    if(insideA!==insideB){const fraction=(edge-a[0])/(b[0]-a[0]);result.push([edge,a[1]+fraction*(b[1]-a[1])]);}
    if(insideB)result.push(b);
  }
  return result;
}
// Unwrap longitude before clipping translated copies at the antimeridian.
// Direct +/-180 SVG joins otherwise draw a false line across the whole world.
export function splitWorldRing(ring:number[][]):Point[][]{
  const unwrapped:Point[]=[];
  for(const coordinates of ring){
    if(coordinates.length<2)continue;
    let longitude=coordinates[0]!;const previous=unwrapped.at(-1)?.[0];
    if(previous!==undefined){while(longitude-previous>180)longitude-=360;while(longitude-previous< -180)longitude+=360;}
    unwrapped.push([longitude,coordinates[1]!]);
  }
  if(unwrapped.length<3)return [];
  const result:Point[][]=[];
  if(Math.abs(unwrapped.at(-1)![0]-unwrapped[0]![0])>359){
    const pole=unwrapped.reduce((sum,p)=>sum+p[1],0)<0?-90:90;
    unwrapped.push([unwrapped.at(-1)![0],pole],[unwrapped[0]![0],pole]);
  }
  for(const shift of [-360,0,360]){
    const polygon=clip(clip(unwrapped.map(([x,y])=>[x+shift,y]),-180,true),180,false);
    if(polygon.length>=3)result.push(polygon);
  }
  return result;
}
export function worldPolygonPath(polygons:number[][][][]):string{
  return polygons.flatMap(polygon=>polygon.flatMap(splitWorldRing)).map(ring=>ring.map(([longitude,latitude],i)=>`${i?'L':'M'}${((longitude+180)/360*1000).toFixed(1)},${((90-latitude)/180*500).toFixed(1)}`).join(' ')+'Z').join(' ');
}
