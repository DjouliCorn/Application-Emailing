import mails from "./email/index.mjs";

export default {
    openapi: "3.0.1",
    info: {
        version: "2.0.0",
        title: "Emailing Julie-Elsa",
        description: "Projet Best Duo",
        contact: {
            name: "Julie & Elsa",
            email: "julelsa@esgi.fr",
            url: "https://esgi.fr",
        },
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local server",
        },
    ],
    paths: {
        ...mails.paths,
    },
    components: {
        schemas: {
            ...mails.schema,
        },
    },
};