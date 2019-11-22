// Dependencies
import { structures } from '../initial'

const structureMembers = structures.map(item => {
	const item2 = { ...item }				
	item2.longDescription = item2.longDescriptionSize.toUpperCase()
	const description2 = item2.longDescription.split(' ')	    
	item2.size = description2[0] === 'MEMBER' ? description2[1] : description2[0]	
	item2.unit = description2[0] === 'MEMBER' ? 'M.L' : 'U.N'
	item2.quantity = description2[0] === 'MEMBER' ? Number(description2[3])/1000 : 1        
	item2.quantity = Number(item2.quantity.toFixed(2))	    
	item2.longDescription = description2[0] === 'MEMBER' ? `PERFIL ${description2[1]}` : `PLATE ${description2[0]}`
	item2.description = item2.longDescription     
	item2.shortDescription = 'STRUCTUREMEMBER'	   
	return item2	
})

structureMembers.sort((actual, next) => actual.description <= next.description ? -1 : 1)

export default structureMembers;
