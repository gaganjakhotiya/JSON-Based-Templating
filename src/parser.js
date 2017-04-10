import datatypes from './datatypes'
import {isArrayOf, isObject, isNumber, isString} from './utils'

let schema

export function getDOMElementFromJSON(json){
    console.log('JSON', json)
}

export function setSchema(newSchema) {
    schema = newSchema
}

export function validateJSON(key, json, schema) {
    if (!schema)
        throw `Error in ${key}. Schema not defined`
    if (key === '___root' && typeof json !== 'object')
        throw "JSON root must be an object"
    if (key === '___root' && Array.isArray(json))
        throw "JSON root must not be an array"

    let { mandatoryChildren, ...config } = getFieldConfig(key, schema)
      , fields = Object.keys(json)
      , lastChecked = null
      , isValid = true

    if (config.datatype === datatypes.string && typeof json !== 'string') {
        throw `Error in ${key}. Value must be of type string`
    }

    if (config.datatype === datatypes.number && typeof json !== 'number') {
        throw `Error in ${key}. Value must be of type number`
    }

    try {
        if (config.datatype = datatypes.array) {
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
                lastChecked = child
                return typeof fields[child] !== 'undefined'
            })

            if (!isValid)
                throw `Mandatory field \'${lastChecked}\' not found`

            Object.keys(json).every((child, index) => {
                validateJSON(child, json[child], schema[child])
            })
        }
    } catch (exception) {
        throw `Error in ${key} -> ${exception.message}`
    }

    return true
}

function getFieldConfig(key, dataTypeSchema) {
    let datatype = getDataType(dataTypeSchema)
      , isMandatory = key.substr(-1) === '!'
      , isArrayOf = isArrayOf(dataTypeSchema)
      , { array, object, ...primitivaDataTypes } = datatypes
      , config = {
          key: isMandatory ? key.substr(0, key.length - 1) : key,
          mandatory: isMandatory,
          datatype: datatype,
          isArrayOf: isArrayOf,
          isSimpleArray: isArrayOf !== null && typeof primitivaDataTypes[isArrayOf] !== 'undefined'
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
        return datatypes.string
    } else if (isNumber(dataTypeSchema)) {
        return datatypes.number
    } else if (isObject(dataTypeSchema)) {
        return datatypes.object
    } else {
        return datatypes.array
    }
}