document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Mencegah form melakukan submit secara default

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);
    try {
        const response = await fetch('https://130.162.195.228/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login successful!');
            // Simpan token atau arahkan ke halaman lain
            window.location.href = 'dasbor.html';
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});