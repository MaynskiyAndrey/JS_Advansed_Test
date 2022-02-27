const listData = [
	'Item 1',
	'Item 2',
	'Item 3',
	'Item 4',
	'Item 5',
	[
		'Item 5.1',
		'Item 5.2',
		'Item 5.3',
	],
	'Item 6',
	'Item 7',
];


const body = document.querySelector("body");

let defaultChildCount = body.childNodes.length;

const sectionElement = document.querySelector('section')

const ul = document.createElement("ul");

body.appendChild(ul);
listData.forEach((item) => {
	if (typeof item == "string") {
		let itemLi = document.createElement("li");
		itemLi.innerHTML = item;
		ul.appendChild(itemLi);
	}
	else {

		let innerUl = document.createElement("ul");
		ul.appendChild(innerUl);
		item.forEach((innerItem) => {
			let itemLi = document.createElement("li");
			itemLi.innerHTML = innerItem;
			innerUl.appendChild(itemLi);
		});
	}
});

const tableData = [
	['Item 1.1', 'Item 1.2', 'Item 1.3'],
	['Item 2.1', 'Item 2.2', 'Item 2.3'],
	['Item 3.1', 'Item 3.2', 'Item 3.3'],
	['Item 4.1', 'Item 4.3'],
	['Item 5.1', 'Item 5.2', 'Item 5.3'],
];

const table = document.createElement('table');
tableData.forEach((rowItem) => {
	let row = document.createElement('tr');
	table.appendChild(row);

	rowItem.forEach((cellItem) => {
		let cell = document.createElement('td');
		cell.innerHTML = cellItem;
		row.appendChild(cell);
	})
});

body.appendChild(table);

const formData = {
	name: 'myForm',
	fieldset: [{
		tagName: 'select',
		name: 'cars',
		id: 'cars',
		label: 'Choose a car:',
		options: ['Volvo', 'Saab', 'Honda', 'Toyota', 'Audi'],
	}, {
		tagName: 'input',
		type: 'text',
		label: 'First name',
		id: 'fname',
		name: 'fname',
	}, {
		tagName: 'input',
		type: 'radio',
		label: 'Male',
		id: 'male',
		name: 'gender',
		value: 'male',
	}, {
		tagName: 'input',
		type: 'radio',
		label: 'Female',
		id: 'female',
		name: 'gender',
		value: 'female',
	}, {
		tagName: 'button',
		type: 'submit',
	}],
}

const form = document.createElement('form');
form.setAttribute('name', formData['name']);

formData.fieldset.forEach((fieldData) => {
	let field = document.createElement(fieldData.tagName);
	let label = document.createElement('label');
	let tagData = true;

	for (let key in fieldData) {
		if (key == 'tagName') {
			continue;
		}
		else {
			let item = fieldData[key];
			if (key == 'label') {
				label.innerHTML = item;
			}
			else
				if (typeof item == "string") {
					field.setAttribute(key, item);
				}
				else if (key == 'options') {
					item.forEach((innerItem) => {
						let newOption = document.createElement('option');
						newOption.value = innerItem;
						newOption.innerHTML = innerItem;
						field.appendChild(newOption);
					});
				}
		}
	}

	form.appendChild(label);
	form.appendChild(field);
});

body.appendChild(form);

let counter = 0;
//Для каждого добавленного массива элементов:
body.childNodes.forEach((child) => {
	if (counter >= defaultChildCount) {

		//определите длину дочерних элементов;
		console.log(`Длина дочерних элементов ${child.childNodes.length}`);
		if (child.childNodes.length != 0) {
			//получите первый и последний элемент;
			console.log(child.firstElementChild);

			console.log(child.lastElementChild);

			//переберите все элементы коллекции, выведите значения атрибутов и индекс элемента в коллекции;
			let innerCounter = 0;
			child.childNodes.forEach((innerChild) => {

				var attrs = innerChild.attributes;
				for (var i = 0; i < attrs.length; i++) {
					console.log(attrs[i].name + " = " + attrs[i].value);
				}
				console.log(`Индекс элемента коллекции ${innerCounter}`);
				innerCounter++;
			});
		}
	}
	counter++;
})

//измените стили чётных элементов таблицы, списка, полей форм;
counter = 0;
table.childNodes.forEach((row) => {
	row.childNodes.forEach((child) => {
		if (counter % 2 == 0) {
			child.style.backgroundColor = 'red';
		}
		counter++;
	});
});

counter = 0;
form.childNodes.forEach((child) => {
	if (counter % 2 == 0) {
		child.style.backgroundColor = 'red';
	}
	counter++;
});


//сформируйте исходный массив данных на основе DOM - элементов.
let newListData = [];
counter = 0;
ul.childNodes.forEach((child) => {
	if (child.childNodes.length > 1) {
		newListData[counter] = [];
		let innerCounter = 0;
		child.childNodes.forEach((innerChild) => {
			newListData[counter][innerCounter] = innerChild.textContent;
			innerCounter++;
		});
	}
	else {
		newListData[counter] = child.textContent;
	}
	counter++;
});

console.log("собранный listData");
console.log(newListData);


let newTableData = [];
counter = 0;
table.childNodes.forEach((row) => {
	newTableData[counter] = [];
	let innerCounter = 0;
	row.childNodes.forEach((cell) => {
		newTableData[counter][innerCounter] = cell.innerHTML;
		innerCounter++;
	});
	counter++;
});

console.log("собранный tableData");
console.log(newTableData);


let newFormData = {};
{
	var attrs = form.attributes;
	for (var i = 0; i < attrs.length; i++) {
		if (typeof attrs[i].value == "string") {
			newFormData[attrs[i].name] = attrs[i].value;
		}
	};
}


counter = 0;
newFormData['fieldset'] = [];
let label = null;
let usingAttrs = null;
form.childNodes.forEach((child) => {

	var attrs = child.attributes;
	let isLabel = true;
	let tagName = child.tagName;
	if (tagName == 'LABEL') {
		label = child.innerHTML;

	}
	else {
		for (var i = 0; i < attrs.length; i++) {
			if (attrs[i].name == "style") {
				continue;
			}
			if (usingAttrs == null) {
				usingAttrs = {};
			}
			usingAttrs[attrs[i].name] = attrs[i].value;
		}

		let options = null;
		let counterOpt = 0;
		child.childNodes.forEach((innerChild) => {
			if (options == null) {
				options = [];
			}
			options[counterOpt++] = innerChild.innerHTML;
		});

		usingAttrs['label'] = label;
		usingAttrs['tagName'] = tagName;
		if (options != null) {
			usingAttrs['options'] = options;
		}

		label = null;
		newFormData['fieldset'][counter] = usingAttrs;
		usingAttrs = null;

		counter++;
	}
});

console.log("собранный formData");
console.log(newFormData);

