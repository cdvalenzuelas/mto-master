const clean = (garbageContainer, data) => {

	const specs = ['A1', 'A2', 'B', 'C', 'D', 'E', 'F', 'K', 'A1A2'];

	const mto = []

	data.forEach(item => {     
		const { status, spec, weightUnit, shortDescription, } = item    
		const condition1 = status !== 'NEW'
		const condition2 = !specs.includes(spec)
		const condition3 = weightUnit === undefined;
		const condition4 = shortDescription === 'TAPWELD'     
		if(condition1 || condition2 || condition3 || condition4){                
			garbageContainer.push(item)
		} else {        
			mto.push(item)
		}   
	})

	return mto
}

export default clean
