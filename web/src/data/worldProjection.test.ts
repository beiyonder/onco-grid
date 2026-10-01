/// <reference types="node" />
import assert from 'node:assert/strict';
import test from 'node:test';
import { splitWorldRing } from '../domain/worldProjection';
test('antimeridian country edges stay at the map boundary instead of crossing the interior',()=>{
 const pieces=splitWorldRing([[170,10],[-170,10],[-170,-10],[170,-10],[170,10]]);
 assert.equal(pieces.length,2);
 assert.ok(pieces.every(ring=>ring.every(([x,y])=>Math.abs(x)>=170&&Math.abs(x)<=180&&Math.abs(y)<=10)));
 assert.ok(pieces.some(ring=>ring.every(([x])=>x<0)));
 assert.ok(pieces.some(ring=>ring.every(([x])=>x>0)));
});
