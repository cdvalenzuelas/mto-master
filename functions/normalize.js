const normalize = (data) => {	
	data = data.map(item => {

		const jointTypes = ['BUTTWELD', 'SOCKETWELD', 'THREAD']

		// Description
		let shortDescription = item['Short Description']
		let longDescription = item['Long Description (Family)']
		if(!shortDescription && !longDescription){
			shortDescription = 'undefined'
			longDescription = 'undefined'
		} else if (!shortDescription) {
			shortDescription = longDescription
		} else if (!longDescription) {
			longDescription = shortDescription
		}
		shortDescription = shortDescription.toUpperCase()
		longDescription = longDescription.toUpperCase()   
		
		// Status
		let status = item.Status || 'undefined'
		status = status.toUpperCase()

		// Nominal Diameter
		const nominalDiameter = Number(item['Nominal Diameter'])

		// Weight
		let [weight, weightUnit] = [0, 0]

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
			description: `${longDescription} ${nominalDiameter} ${item.Size}`,
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
			length: item.Length ? Number(item.Length || 0).toFixed(2) : '-',
			cutLength: item["Cut Length"] ? Number(item["Cut Length"] || 0).toFixed(2) : '-',
			pressureClass: String(item['Pressure Class']),
			lineTag: item['Line Number Tag'] || 'undefined',
			longDescriptionSize: String(item['Long Description (Size)']),
			x: item['Position X'] || 0,
			y: item['Position Y'] || 0,
			z: item['Position Z'] || 0,
		}      

	})

 return data

}

export default normalize
