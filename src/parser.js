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

function parseJSON(json, schema, template){
    let output = ''
    if (Array.isArray(json)) {
        output = json.reduce((updatedTemplate, item) => {
            let value = typeof item === 'object' ? parseJSON(item, schema) : item

            return updatedTemplate + fillTemplate(template, {value: value})
        }, '')
    } else if (typeof json === 'object') {
        output = Object.keys(json).map(item => {

        })
    }
}

function getKeys(str){
	return str.match(/(?:^|\$){(.*?)(?:}|$)/g)
}

function fillTemplate(template, valueMap){
    return template ? getKeys(template).reduce((updatedTemplate, templateLiteral) => {
	    let templateKey = templateLiteral.substring(2, templateLiteral.length - 1)

        return updatedTemplate.replace(templateLiteral, valueMap[templateKey])
    }, template) : ''
}