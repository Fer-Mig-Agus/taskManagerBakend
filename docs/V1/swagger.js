const swaggerJDDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const { URL_BACKEND = "http://localhost" } = process.env;


// Metadata info about our API

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.1",
            description:"Documentation for Task Manager API",
            // contact:{
            //     name:"MF Dev Web Oficial",
            //     url:"www.mfdev.tech",
            // },
        },
        servers:[
            // {
            //     url:"https://backend-produccion",
            //     description:"Production Server"
            // },
            {
                url:URL_BACKEND,
                description:"Develoment Server"
            }
        ],
        tags:[
            {
                name:"Task",
                description:"Endpoints for tasks in the system"
            },
            
         ]
    },
    apis: [
        '../../routes/index.js', 
        '../schemas/tasks.schemas.js'
    ]
    
};

// Docs in JSON format
const swaggerSpec=swaggerJDDoc(options);

// Function to setup our docs
const swaggerDocs=(app,port)=>{

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/api-docs.json",(req,res)=>{
        res.setHeader("Content-Type","application/json");
        res.send(swaggerSpec);
    });

    console.log(
        `Version 1 Docs are available on ${URL_BACKEND}:${port}/api-docs`
    )
};



module.exports = swaggerDocs;

