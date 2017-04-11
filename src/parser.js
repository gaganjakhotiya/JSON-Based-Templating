import {validateJSON} from './validator'

let schema

export function getDOMElementFromJSON(json){
    console.log('JSON', json)

    validateJSON('__root', json, schema)
}

export function setSchema(newSchema) {
    schema = newSchema
}