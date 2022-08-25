import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce",
            description: "Documentación de las APIS realizadas para el proyecto Ecommerce",
        },
        servers:[
            {
                url: "http://localhost:8080"
            }
        ],
        components: {
             securitySchemes:{
                bearerAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
               }
           },    
        security: {
             bearerAuth: []
        } 
    },
    apis: [ './src/docs/**/*.yaml' ],
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs