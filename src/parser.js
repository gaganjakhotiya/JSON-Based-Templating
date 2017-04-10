import datatypes from './datatypes'
import {isArrayOf, isObject, isNumber, isString} from './utils'

let schema

export function getDOMElementFromJSON(json){
    console.log('JSON', json)
}

export function setSchema(newSchema) {
    console.log('SET', (schema = {...newSchema}))
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