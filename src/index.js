import Schema from './schema'
import Resume from './resume'
import {setSchema, getDOMElementFromJSON} from './parser'

setSchema(Schema)
getDOMElementFromJSON(Resume)