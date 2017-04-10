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
      , { string, number, ...nonPrimitivaDataTypes } = datatypes
      , config = {
          key: isMandatory ? key.substr(0, key.length - 1) : key,
          mandatory: isMandatory,
          datatype: datatype,
      }
      , children;

      if (typeof nonPrimitivaDataTypes[datatype] !== 'undefined') {
        if (datatype === datatypes.object) {
            children = Object.keys(dataTypeSchema)
        } else {
            let arrayOf = isArrayOf(dataTypeSchema)
              , arrayDataType = getDataType(arrayOf);
            if (typeof nonPrimitivaDataTypes[arrayDataType] !== 'undefined') {
                children = Object.keys(arrayOf)
            }
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