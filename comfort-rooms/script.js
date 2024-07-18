document.addEventListener('DOMContentLoaded',()=>{
	
// Get all the links and content sections
		// const links = document.querySelectorAll('.top-navbar a,#registerForm a,#loginForm a');
		// const contentSections = document.querySelectorAll('.content-section');
		
		// // Add event listeners to the links
		// links.forEach(link => {
		// 	link.addEventListener('click', event => {
		// 		event.preventDefault();
				
		// 		// Get the ID of the link
		// 		const linkId = link.id;
				
		// 		// Hide all content sections
		// 		contentSections.forEach(section => {
		// 			section.classList.remove('active');
		// 		});
				
		// 		// Show the corresponding content section
		// 		const contentSection = document.getElementById(`${linkId}-content`);
		// 		contentSection.classList.add('active');
		// 	});
		// });
////

		fetch("http://localhost:3000/rooms")
       .then(response =>response.json())
    //data will be passed as argurment in the function (objects)
       .then(rooms =>renderRooms(rooms))

function renderRooms(roomsData){
	const roomContainer = document.getElementById('vacant-rooms-content')
	

	roomsData.forEach(room => {
		let Div = document.createElement('div')
		let img = document.createElement('img')
		img.src = room.image
		let number = document.createElement('p')
		number.textContent =`Room Number:${room.room_number}`
		let typeR = document.createElement('p')
		typeR.textContent = `Room Type:${room.room_type}`
		let price = document.createElement('p')
		price.textContent = `Price:${room.price}`
		let btn = document.createElement("button")
	    btn.textContent = 'Book a room'
		//add event listener to the button
		btn.addEventListener('click', () => {
			if (!room.availability) {
			  console.log('Room has already been booked!')
			} else {
			 
			//   room.availability = true
			  // update availability in db.json

			   console.log(  JSON.stringify({
				
				}))
			  fetch(`http://localhost:3000/rooms/${room.id}`, {
				method: 'PATCH', 
				headers: { 'Content-Type': 'application/json' },
				body:JSON.stringify({
					availability:false
				})

			  })
			//   alert('You have booked a room!')
			 
			}
		  })
		
		Div.append(img,number,typeR,price,btn)
		roomContainer.append(Div)
	})
}
//post user input to json
const formInput = document.getElementById("registerForm")
formInput.addEventListener('submit', (e) => {
	e.preventDefault()
	const userNameInput = document.getElementById('username').value
	const emailInput = document.getElementById('email').value
	const passwordInput = document.getElementById('password').value;

	fetch(`http://localhost:3000/users`, {

		method: 'POST',
		body: JSON.stringify({
		  username:userNameInput,
		  email: emailInput,
		  password: passwordInput
		}),
		headers: {
		  'Content-Type': 'application/json'
		}
	  }) 
})
//login form
	const db = fetch("http://localhost:3000/users") .then(response => response.json())
    .then(data => (data))
	const loginInput = document.getElementById('loginForm')
	loginInput.addEventListener('submit',(e)=>{
		e.preventDefault();
		const emailI = document.getElementById('emaill').value
		const  passwordI = document.getElementById('passwordl').value
		//check if user register
		const userExist = db.find((data)=>users.email === emailI && users.password ===passwordI)
		if(userExist == true){
			alert('logged in succefully')
		}
		else{
			alert('please register')

		}

	})
    
   



})