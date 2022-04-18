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

    draft: {
        type: "object",
        properties: {
            id: {
                type: "number",
                description: "id of draft",
                example: "3",
            },
            destinataire: {
                type: "number",
                description: "destinataire of draft",
                example: "2",
            },
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
        },
    },

    newMail: {
        type: "object",
        properties: {
            destinataire: {
                type: "number",
                description: "destinataire of mail",
                example: "2",
            },
            object: {
                type: "string",
                description: "object of mail",
                example: "Temps du jour",
            },
            content: {
                type: "string",
                description: "content of mail",
                example: "Aujourd'hui il fait beau",
            },
        },
    },
};




