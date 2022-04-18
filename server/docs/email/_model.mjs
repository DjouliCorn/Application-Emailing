export default {
    mails: {
        type: "object",
        properties: {
            object: {
                type: "string",
                description: "object of mail",
                example: "Questionnement section",
            },
            content: {
                type: "string",
                description: "content of mail",
                example: "Je me poste des questions sur le projet de C",
            },
            idstate: {
                type: "number",
                description: "state of mail",
                example: "1",
            },
            idlist: {
                type: "number",
                description: "list of mail",
                example: "2",
            },
        },
    },
};




