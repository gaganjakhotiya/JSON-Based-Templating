let schema

export function getDOMElementFromJSON(json){
    console.log('JSON', json)
}

export function setSchema(newSchema) {
    console.log("SET", (schema = {...newSchema}))
}