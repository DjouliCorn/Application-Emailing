export default {
    get: {
        tags: ["Tous les mails"],
        description: "Get all mails",
        operationId: "getAllMails",
        parameters: [],
        responses: {
            200: {
                description: "Get all mails",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/mails",
                        },
                    },
                },
            },
        },
    },
};