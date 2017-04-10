import Datatypes from './datatypes'
import {isArrayOf, isObject, isNumber, isString} from './utils'

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
        throw `Error in ${key} -> Schema not defined`
    if (key === '___root' && typeof json !== 'object')
        throw "JSON root must be an object"
    if (key === '___root' && Array.isArray(json))
        throw "JSON root must not be an array"

    let { mandatoryChildren, ...config } = getFieldConfig(key, schema)
      , lastChecked = null
      , isValid = true

    if (config.datatype === Datatypes.string && typeof json !== 'string') {
        throw `Error in ${key}. Value must be of type string`
    }

    if (config.datatype === Datatypes.number && typeof json !== 'number') {
        throw `Error in ${key}. Value must be of type number`
    }

    try {
        if (config.datatype === Datatypes.array) {
            let lastIndex = 0
            if (config.isSimpleArray) {
                isValid = json.every((child, index) => {
                    lastIndex = index
                    return typeof child === config.isArrayOf
                })

                if (!isValid)
                    throw `Error at index ${lastIndex}. Array must contain data of type \'${config.isArrayOf}\'`
            } else {
                json.every((child, index) => {
                    lastIndex = index
                    try {
                        validateJSON('__array', child, config.isArrayOf)
                    } catch (exception) {
                        throw `Error at index ${lastIndex} -> ${exception.message}`
                    }
                })
            }
        } else {
            isValid = mandatoryChildren.every(child => {
                lastChecked = child = child.substr(0, child.length - 1)
                return typeof json[child] !== 'undefined'
            })

            if (!isValid)
                throw `Mandatory field \'${lastChecked}\' not found`

            Object.keys(json).every((child, index) => {
                validateJSON(child, json[child], schema[child])
            })
        }
    } catch (exception) {
        throw `Error in ${key} -> ${exception.message || exception}`
    }

    return true
}

function getFieldConfig(key, dataTypeSchema) {
    let datatype = getDataType(dataTypeSchema)
      , isMandatory = key.substr(-1) === '!'
      , isArrayOfValue = isArrayOf(dataTypeSchema)
      , { array, object, ...primitivaDataTypes } = Datatypes
      , config = {
          key: isMandatory ? key.substr(0, key.length - 1) : key,
          mandatory: isMandatory,
          datatype: datatype,
          isArrayOfValue: isArrayOfValue,
          isSimpleArray: isArrayOfValue !== null && typeof primitivaDataTypes[isArrayOfValue] !== 'undefined'
      }
      , children;

      if (typeof primitivaDataTypes[datatype] === 'undefined') {
        if (datatype === object) {
            children = Object.keys(dataTypeSchema)
        } else if (!config.isSimpleArray) {
            children = Object.keys(arrayOf)
        }
      }

      config = {
          ...config,
          children,
          mandatoryChildren: children.filter(child => child.substr(-1) === '!')
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