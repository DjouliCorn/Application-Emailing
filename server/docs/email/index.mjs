import getAll from "./getAll.mjs";
import schema from "./_model.mjs";
import deleteMail from "./deleteMail.mjs"
import draft from "./draft.mjs"
import create from "./create.mjs"

export default {
    paths: {
        "/mail": {
            ...getAll,
        },
        "/home": {
            ...create,
        },
        "/homeDraft": { 
            ...draft,
        },
        "/deleteMail": {
            ...deleteMail,
        },
    },
    schema: {
        ...schema,
    },
};    