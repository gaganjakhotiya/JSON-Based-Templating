import Schema from './schema'
import Resume from './resume'
import {setSchema, getDOMElementFromJSON} from './parser'

window['_'] = getDOMElementFromJSON

setSchema(Schema)
getDOMElementFromJSON(Resume)