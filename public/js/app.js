document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    try {
        const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token and username
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('username', username);

            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('remember_me', 'true');
            } else {
                localStorage.removeItem('remember_me');
            }

            // Show success notification
            showNotification('Login successful! Redirecting...', 'success');

            // Redirect with animation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 500);
        } else {
            showNotification(data.detail || 'Login failed', 'error');

            // Shake animation for the form
            const form = document.getElementById('loginForm');
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('An error occurred during login', 'error');
    }
});

// Show notification
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 opacity-0 translate-y-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.remove('opacity-0', 'translate-y-4');
    }, 50);

    // Remove notification
    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Add shake animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
`;
document.head.appendChild(style);

// Check remember me preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const rememberMe = localStorage.getItem('remember_me');
    if (rememberMe) {
        document.getElementById('remember-me').checked = true;
    }
});