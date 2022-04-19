export default {
    post: {
        tags: ["Modifier"],
        description: "Modify draft",
        operationId: "homeDraft",
        parameters: [],
        responses: {
            200: {
                description: "Modify draft",
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