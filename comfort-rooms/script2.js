document.addEventListener('DOMContentLoaded', (event) => {
    // Hide all content sections
    function hideAllSections() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.style.display = 'none');
    }

    // Show a specific section
    function showSection(sectionId) {
        if (sectionId !== 'login-content' && sectionId !== 'register-content' && !isUserLoggedIn()) {
            alert('You must be logged in to view this page.');
            showSection('login-content');
            return;
        }
        hideAllSections();
        document.getElementById(sectionId).style.display = '';
    }

    // Check if user is logged in
    function isUserLoggedIn() {
        return localStorage.getItem('loggedIn') === 'true';
    }

    // Log out the user
    function logout() {
        localStorage.removeItem('loggedIn');
        alert('Logged out successfully');
        showSection('login-content');
        // Show login and register links
        loginLink.style.display = 'inline';
        registerLink.style.display = 'inline';
        // Hide logout link
        logoutLink.style.display = 'none';
    }

    // Add event listeners to menu items
    const menuItems = document.querySelectorAll('#mymenu a');
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = item.id + '-content';
            showSection(sectionId);
        });
    });

    // Handle register and login link clicks
    const registerLink = document.getElementById('register');
    const loginLink = document.getElementById('login');
    registerLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('register-content');
    });

    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('login-content');
    });

    // Add event listener to logout link
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.id = 'logout';
    logoutLink.textContent = 'Logout';
    logoutLink.style.display = 'none';
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
    document.querySelector('.top-navbar').appendChild(logoutLink);

    // Prevent form submission from refreshing the page and handle registration
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validation to ensure fields are not blank
        if (!username || !email || !password) {
            alert('All fields are required for registration.');
            return;
        }

        const newUser = { username, email, password };
        
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            
            if (response.ok) {
                alert('Registration successful');
                // Show the login section after successful registration
                showSection('login-content');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed');
        }
    });

    // Prevent form submission from refreshing the page and handle login
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.getElementById('emaill').value;
        const password = document.getElementById('passwordl').value;

        // Validation to ensure fields are not blank
        if (!email || !password) {
            alert('All fields are required for login.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                alert('Login successful');
                // Mark the user as logged in
                localStorage.setItem('loggedIn', 'true');
                // Show the vacant rooms section after successful login
                showSection('vacant-rooms-content');
                // Show the logout link and hide login and register links
                logoutLink.style.display = 'inline';
                loginLink.style.display = 'none';
                registerLink.style.display = 'none';
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed');
        }
    });

    // Initially show the home section if logged in, otherwise show login section
    if (isUserLoggedIn()) {
        showSection('home-content');
        logoutLink.style.display = 'inline';
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
    } else {
        showSection('login-content');
    }
    ////
    fetch("http://localhost:3000/rooms")
       .then(response =>response.json())
    //data will be passed as argurment in the function (objects)
       .then(rooms =>renderRooms(rooms))

function renderRooms(roomsData){
	const roomContainer = document.getElementById('vacant-rooms-content')
	

	roomsData.forEach(room => {
		let Div = document.createElement('div')
        Div.id ='room-details'
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
});