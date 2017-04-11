import {validateJSON} from './validator'

export function setSchema(newSchema) {
    _schema = newSchema
}

export function getDOMElementFromJSON(json){
    try {
        validateJSON('__root', json, _schema)
    } catch (e) {
        return createDOMNode(e)
    }

    return createDOMNode('success')
}

let _schema
function createDOMNode(content){
    let node = document.createElement('div')
    node.innerHTML = content
    return node
}

function parseJSON(json, schema){

}