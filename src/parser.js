import datatypes from './datatypes'
import {isArrayOf, isObject, isNumber, isString} from './utils'

let schema

export function getDOMElementFromJSON(json){
    console.log('JSON', json)
}

export function setSchema(newSchema) {
    console.log('SET', (schema = {...newSchema}))
}

function getDataType(field, schema){
    let schemaDataType = schema[field]

    if (isString(schemaDataType)) {
        return datatypes.string
    } else if (isNumber(schemaDataType)) {
        return datatypes.number
    } else if (isObject(schemaDataType)) {
        return datatypes.object
    } else {
        return isArrayOf(schemaDataType)
    }
}