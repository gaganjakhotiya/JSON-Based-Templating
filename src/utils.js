import datatypes from './datatypes'

export function isArrayOf(schemaDataType) {
    return Array.isArray(schemaDataType)
        ? schemaDataType[0]
        : typeof schemaDataType === 'string' && schemaDataType.substr(-2) === '[]'
            ? datatypes[schemaDataType.substr(0,6)]
            : null
}

export function isObject(schemaDataType) {
    return typeof schemaDataType === 'object' && !Array.isArray(schemaDataType)
}

export function isString(schemaDataType) {
    return schemaDataType === datatypes.string
}

export function isNumber(schemaDataType) {
    return schemaDataType === datatypes.number
}

export function isMandatory(key) {
    return key.substr(-1) === '!'
}

export function getJSONKey(key) {
    return isMandatory(key) ? key.substr(0, key.length - 1) : key
}