import "../styles/main.css";

var sliderItems = document.querySelectorAll(".hero-slider-item")
	;

const sliderItemsAmount = sliderItems.length - 1;
let currentSlide = 0;

let bodyClasses = document.querySelector("body").classList;


if (bodyClasses[0] == "homepage") {
	setInterval(fadeSlider, 1000);

	loginButton.addEventListener("mousedown", showModal)
	closeModalButton.addEventListener("mousedown", hideModal)
}

function fadeSlider() {
	sliderItems[currentSlide].classList.toggle("active")

	if (currentSlide == sliderItemsAmount) {
		currentSlide = 0;
	} else {
		currentSlide++;
	}

	sliderItems[currentSlide].classList.toggle("active")
}

const modal = document.querySelector(".modal");
const loginButton = document.querySelector(".login-button")
const closeModalButton = document.querySelector(".close")



function showModal() {
	document.querySelector("body").classList.add("modal-visible")
}

function hideModal() {
	document.querySelector("body").classList.remove("modal-visible")
}

let postURL = "http://localhost:3000/posts";

// Dashboard
class Dashboard {

	// The constructor contains al the properties the dashboard object will have
	constructor (profileNumber, profileName, profileImage, posts = [], projects, settings, postInput, postOutput, postImageInput, formElement) {
		// The account number of the user
		this.profileNumber = profileNumber;
		// The account name of the user
		this.profileName = profileName;
		// The profile image of the user
		this.profileImage = profileImage;
		
		
		// The whole form element
		this.formElement = formElement;
		// The input element for the text of the new post
		this.postInput = postInput;
		// The input element for the image of the new post
		this.postImageInput = postImageInput;
		// The output element for all posts
		this.postOutput = postOutput;
		// The data of the posts
		this.posts = posts;


		// The data of the projects
		this.projects = projects;
		// The  settings of the user
		this.settings = settings;
	}

	// Get the posts from the server
	getPost() {
		// fetch all posts from the server
		fetch(postURL)
			.then(response => response.json())
			// put them into this.posts and store them there
			.then(data => {
				this.posts = data;
				return data;
			})
			// Use .showPost() to display posts
			.then(data => this.showPost(data));
	}

	// Display all posts in the .postOutput
	showPost(data) {
		// Put the data we get from the server into this.postOutput
			data.forEach(element => {
				
				this.postOutput.innerHTML += `
					<div>
						${
							(element.img) ? `<img src="${element.img}">` : ""
						}
						<p>${element.text}</p>
					</div>
				`
			});
	}

	// Submit a post and send it to the server
	sendPost(e) {
		// Prevent the page from reloading
		e.preventDefault();

		// Create the object we send to the server
		let data = {
			"text": document.querySelector("#postText").value,
			"img": 
			(document.querySelector(".preview img").src != "") ? document.querySelector(".preview img").src : ""
		};
		// Use fetch() and send the data from this.postInput
		fetch(postURL, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
		})});
	}

	// Show the selected file in the preview
	previewFile() {

		const preview = document.querySelector('.preview img');

		// Get the first file out of the input
		const file    = document.querySelector('#postImage').files[0];

		// Create a new FileReader()
		const reader  = new FileReader();
		
		// If there is a file, load it as a DataURL
		if (file) {
			reader.readAsDataURL(file);
		}

		reader.addEventListener("load", function () {
			preview.src = reader.result;
		}, false);
	}

	init() {
		this.formElement.addEventListener("submit", this.sendPost);

		this.postImageInput.addEventListener("change", this.previewFile);
	}
}


// Set up our Dashboard with all variables and HTML elements
let myDashboard = new Dashboard(
	123,
	"Simon",
	"Cats",
	[],
	[],
	[],
	document.querySelector("#postText"),
	document.querySelector(".postOutput"),
	document.querySelector("#postImage"),
	document.querySelector("#sendPostForm")
)

// Initialize / add event listener to the form
myDashboard.init();

// Get all posts and display them
myDashboard.getPost();

