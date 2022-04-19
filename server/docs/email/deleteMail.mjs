export default {
    post: {
        tags: ["Supprimer"],
        description: "Delete draft",
        operationId: "deleteMail",
        parameters: [],
        responses: {
            200: {
                description: "Delete draft",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/draft",
                        },
                    },
                },
            },
        },
    },
};