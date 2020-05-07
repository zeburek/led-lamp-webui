export const title = (string) => {
	const titles = {
		'n': "Name",
		'b': "Brightness",
		's': "Speed",
		'l': "Scale",
	}
	let title = (string in titles) ? titles[string] : string
    return title.charAt(0).toUpperCase() + title.slice(1);
}