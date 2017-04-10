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