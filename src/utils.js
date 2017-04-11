import {Datatypes} from './datatypes'

export function isArrayOf(schemaDataType) {
    return Array.isArray(schemaDataType)
        ? schemaDataType[0]
        : typeof schemaDataType === 'string' && schemaDataType.substr(-2) === '[]'
            ? Datatypes[schemaDataType.substr(0,6)]
            : null
}

export function isObject(schemaDataType) {
    return typeof schemaDataType === 'object' && !Array.isArray(schemaDataType)
}

export function isString(schemaDataType) {
    return schemaDataType === Datatypes.string
}

export function isNumber(schemaDataType) {
    return schemaDataType === Datatypes.number
}

export function isMandatory(key) {
    return key.substr(-1) === '!'
}

export function getJSONKey(key) {
    return isMandatory(key) ? key.substr(0, key.length - 1) : key
}

export function getDataTypeFromSchema(schema){
    if (Array.isArray(schema)) {
        return schema[0]
    } else if (typeof schema === 'string' && schema.substr(-2) === '[]') {
        return schema.substr(0, schema.length - 2)
    } else {
        return schema
    }
}