import { normalize, Schema, arrayOf } from 'normalizr';
const rockSchema = new Schema('rocks');
const climbSchema = new Schema('climbs');

rockSchema.define({
});

climbSchema.define({
})

export {rockSchema};
export {climbSchema};
