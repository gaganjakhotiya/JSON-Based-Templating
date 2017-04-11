import Datatypes from './datatypes'
import {isArrayOf, isObject, isNumber, isString, isMandatory, getJSONKey} from './utils'

let schema

export function getDOMElementFromJSON(json){
    console.log('JSON', json)

    validateJSON('__root', json, schema)
}

export function setSchema(newSchema) {
    schema = newSchema
}

export function validateJSON(key, json, schema) {
    if (!schema)
        throw `Error in \'${key}\' -> Schema not defined`
    if (key === '___root' && typeof json !== 'object')
        throw "JSON root must be an object"
    if (key === '___root' && Array.isArray(json))
        throw "JSON root must not be an array"

    let { mandatoryChildren, ...config } = getFieldConfig(key, schema)
      , lastChecked = null
      , isValid = true

    if (config.datatype === Datatypes.string) {
        if (typeof json !== 'string')
            throw `Error in \'${key}\'. Value must be of type string`
        else
            return true
    }

    if (config.datatype === Datatypes.number) {
        if (typeof json !== 'number')
            throw `Error in \'${key}\'. Value must be of type number`
        else
            return true
    }

    try {
        if (config.datatype === Datatypes.array) {
            if (!Array.isArray(json))
                throw `Expected an array against \'${key}\'`

            let lastIndex = 0
            if (config.isSimpleArray) {
                isValid = json.every((child, index) => {
                    lastIndex = index
                    return typeof child === config.isArrayOf
                })

                if (!isValid)
                    throw `Error at index \'${lastIndex}\'. Array must contain data of type \'${config.isArrayOf}\'`
            } else {
                json.every((child, index) => {
                    lastIndex = index
                    try {
                        validateJSON('__array', child, config.isArrayOf)
                    } catch (exception) {
                        throw `Error at index \'${lastIndex}\' -> ${exception.message}`
                    }
                })
            }
        } else {
            if (typeof json !== 'object')
                throw `Expected an object against \'${key}\'`

            isValid = !mandatoryChildren || mandatoryChildren.every(child => {
                lastChecked = child = child.substr(0, child.length - 1)
                return typeof json[child] !== 'undefined'
            })

            if (!isValid)
                throw `Mandatory field \'${lastChecked}\' not found`

            Object.keys(json).every(child => validateJSON(child, json[child], schema[child] || schema[child + '!']))
        }
    } catch (exception) {
        throw `Error in \'${key}\' -> ${exception.message || exception}`
    }

    return true
}

function getFieldConfig(key, dataTypeSchema) {
    let datatype = getDataType(dataTypeSchema)
      , isArrayOfSchema = isArrayOf(dataTypeSchema)
      , { array, object, ...primitivaDataTypes } = Datatypes
      , isPrimitiveDataType = typeof primitivaDataTypes[datatype] !== 'undefined'
      , config = {
          key: getJSONKey(key),
          mandatory: isMandatory(key),
          datatype: datatype,
          isArrayOfSchema: isArrayOfSchema,
          isSimpleArray: isArrayOfSchema !== null && typeof primitivaDataTypes[isArrayOfSchema] !== 'undefined'
      }
      , children = null;

      if (!isPrimitiveDataType) {
        if (datatype === object) {
            children = Object.keys(dataTypeSchema)
        } else if (!config.isSimpleArray) {
            children = Object.keys(isArrayOfSchema)
        }
      }

      config = {
          ...config,
          children,
          mandatoryChildren: isPrimitiveDataType ? null : children.filter(child => child.substr(-1) === '!')
      }

      return config
}

function getDataType(dataTypeSchema){
    if (isString(dataTypeSchema)) {
        return Datatypes.string
    } else if (isNumber(dataTypeSchema)) {
        return Datatypes.number
    } else if (isObject(dataTypeSchema)) {
        return Datatypes.object
    } else {
        return Datatypes.array
    }
}