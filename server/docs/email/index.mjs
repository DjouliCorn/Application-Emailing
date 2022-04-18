import getAll from "./getAll.mjs";
import schema from "./_model.mjs";

export default {
    paths: {
        "/mail": {
            ...getAll,
        },
    },
    schema: {
        ...schema,
    },
};    