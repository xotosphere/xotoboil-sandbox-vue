/* eslint-disable */

/*
 :'######::'########::::'###::::'########::'########:'########:'########::
 '##... ##:... ##..::::'## ##::: ##.... ##:... ##..:: ##.....:: ##.... ##:
  ##:::..::::: ##:::::'##:. ##:: ##:::: ##:::: ##:::: ##::::::: ##:::: ##:
 . ######::::: ##::::'##:::. ##: ########::::: ##:::: ######::: ########::
 :..... ##:::: ##:::: #########: ##.. ##:::::: ##:::: ##...:::: ##.. ##:::
 '##::: ##:::: ##:::: ##.... ##: ##::. ##::::: ##:::: ##::::::: ##::. ##::
 . ######::::: ##:::: ##:::: ##: ##:::. ##:::: ##:::: ########: ##:::. ##:
 :......::::::..:::::..:::::..::..:::::..:::::..:::::........::..:::::..::
*/

window.addEventListener("load", () => {

	loadJsonTables().then((data) => {
		document.title = "results";
		EventBus = new Vue();
		Vue.use(Vuetable);

		DATA = new Vue({
			el: '#root',
			components: {
				'vuetable-pagination': Vuetable.VuetablePagination
			},
			data: {
				...loadPageData(),
				tables : loadJsonTables(),
				count: 3,
				tables: ["add","this","here"],
				mydata: data,
			},

			methods: {
				formatGender(value) { return value == 'M' ? 'Male' : 'Female' },
				editRow(rowData) { alert("You clicked edit on" + JSON.stringify(rowData)) },

			},

		});

	})
})

// GATHER DATA FROM OUTSIDE SOURCE
async function loadJsonTables() {
	return new Promise((resolve) => {
		return getJSON(`https://fakestoreapi.com/products`, function (err, data) { return resolve(data) })
	})
}

// GATHER DATA FROM OUTSIDE SOURCE
async function loadJsonTables() {
	return new Promise((resolve) => {
		return getJSON(`https://fakestoreapi.com/products`, function (err, data) { return resolve(data) })
	})
}

// GATHER APP DATA
function loadPageData() {
	return {
		fields: [

			'id',
			// '__sequence',
			// { name: 'name', title: '<span class="orange glyphicon glyphicon-user"></span> Full Name', sortField: 'name' },
			{ name: 'title', sortField: 'title' },
			{ name: 'price', sortField: 'price' /* , callback: 'formatGender' */ },
			'__slot:actions'
		],
		css: {
			table: {
				tableClass: 'table table-striped table-bordered table-hovered', loadingClass: 'loading',
				ascendingIcon: 'glyphicon glyphicon-chevron-up',
				descendingIcon: 'glyphicon glyphicon-chevron-down',
				handleIcon: 'glyphicon glyphicon-menu-hamburger',
			}
		
		},

	}
}

// JSON 
function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () { (xhr.status == 200) ? callback(null, xhr.response) : callback(xhr.status) };
	xhr.send();
};

