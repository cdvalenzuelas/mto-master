// Dependencies
import xlsx, { readFile } from 'xlsx'
import normalize from './functions/normalize'
import clean from './functions/clean'

const garbage = []
let data = readFile('./data.xlsx')

const readSheet = sheetName => xlsx.utils.sheet_to_json(data.Sheets[sheetName])

let fasteners = clean(garbage, normalize(readSheet('fasteners')))
let pipeComponents = clean(garbage, normalize(readSheet('pipeComponents')))
let structures = normalize(readSheet('structureMembers'))
let pipes = clean(garbage, normalize(readSheet('pipes')))

pipeComponents = pipeComponents.filter(item => {
	const item2 = { ...item }
	const { shortDescription } = item2	
	if(!shortDescription.startsWith('PIPE')){        
		return item2
	}
})

export { garbage, fasteners, pipeComponents, pipes, structures }
