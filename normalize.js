data = data.map(item => {

	let shortDescription = item['Short Description']
	let longDescription = item['Long Description (Family)']

	if (shortDescription === undefined && longDescription !== undefined) {
			shortDescription = longDescription;
	} else if (shortDescription !== undefined && longDescription === undefined) {
			longDescription = shortDescription;
	} else if (shortDescription === undefined && longDescription === undefined) {
			shortDescription = 'undefined'
			longDescription = 'undefined'
	}    

	shortDescription = shortDescription.toUpperCase()
	longDescription = longDescription.toUpperCase()   
	
	let status = item.Status || 'undefined'
	status = status.toUpperCase()
	const nominalDiameter = Number(item['Nominal Diameter'])
	let [weight, weightUnit] = [0, 0];

	if(jointTypes.includes(shortDescription)){
			weightUnit = 'KG'
			weight = 0
	} else {
			if(item['Weight Unit']==='LB'){
					weightUnit = 'KG'
					weight = item.Weight/2.20462
			} else {
					weightUnit = 'KG'
					weight = Number(item.Weight || 0)
			}
	}   

	return {        
			description: `${longDescription} ${nominalDiameter}`,
			quantity: 1,
			unit: 'U.N',
			longDescription,
			shortDescription,
			nominalDiameter,
			size: item.Size,
			spec: item.Spec,
			drawing: item['DWG Number'] ? item['DWG Number'] : 'undefined',        
			status,
			weight: Number(weight.toFixed(2)),
			weightUnit,
			length: item.length ? '-' : Number(item.Length || 0).toFixed(2),
			pressureClass: String(item['Pressure Class']),
			lineTag: item['Line Number Tag'] || 'undefined',
			longDescriptionSize: item['Long Description (Size)'],
			x: item['Position X'] || 0,
			y: item['Position Y'] || 0,
			z: item['Position Z'] || 0,
	}      
})
