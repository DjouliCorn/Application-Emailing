export default {
    post: {
        tags: ["Créer un mail"],
        description: "Create mail",
        operationId: "home",
        parameters: [],
        responses: {
            200: {
                description: "Create mail",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/newMail",
                        },
                    },
                },
            },
        },
    },
};