// Check authentication
if (!localStorage.getItem('token')) {
    window.location.href = '/';
}

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Update current time
const updateCurrentTime = () => {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('currentTime').textContent = now.toLocaleDateString('en-US', options);
};

// Update welcome message based on time of day
const updateWelcomeMessage = () => {
    const hour = new Date().getHours();
    const username = localStorage.getItem('username') || 'User';
    let greeting;

    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    document.getElementById('welcomeMessage').textContent = `${greeting}, ${username}!`;
};

// Load account balance with animation
const loadBalance = async () => {
    try {
        const response = await fetch('/api/balance', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            const balanceElement = document.getElementById('balance');
            const currentBalance = parseFloat(balanceElement.textContent.replace(/[^0-9.-]+/g, ''));
            const newBalance = data.balance;

            // Animate balance change
            animateValue(balanceElement, currentBalance, newBalance, 1000);
        } else {
            showNotification(data.detail || 'Failed to load balance', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to load account balance', 'error');
    }
};

// Animate number change
const animateValue = (element, start, end, duration) => {
    const startTime = performance.now();

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (end - start) * progress;
        element.textContent = formatCurrency(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };

    requestAnimationFrame(update);
};

// Load recent transactions with animation
const loadTransactions = async () => {
    try {
        const response = await fetch('/api/transactions', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            const transactionsContainer = document.getElementById('recentTransactions');
            transactionsContainer.innerHTML = '';

            if (data.transactions.length === 0) {
                transactionsContainer.innerHTML = '<p class="text-gray-500">No recent transactions</p>';
                return;
            }

            // Add transactions with stagger effect
            data.transactions.forEach((transaction, index) => {
                setTimeout(() => {
                    const transactionElement = document.createElement('div');
                    transactionElement.className = 'flex justify-between items-center p-4 bg-gray-50 rounded-lg transform opacity-0 translate-y-4 transition-all duration-300';
                    transactionElement.innerHTML = `
                        <div>
                            <p class="font-medium">${transaction.type}</p>
                            <p class="text-sm text-gray-600">${new Date(transaction.date).toLocaleDateString()}</p>
                            <p class="text-xs text-gray-500">${transaction.description}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${formatCurrency(transaction.amount)}
                            </p>
                            <p class="text-xs text-gray-500">${new Date(transaction.date).toLocaleTimeString()}</p>
                        </div>
                    `;
                    transactionsContainer.appendChild(transactionElement);

                    // Trigger animation
                    setTimeout(() => {
                        transactionElement.classList.remove('opacity-0', 'translate-y-4');
                    }, 50);
                }, index * 100);
            });
        } else {
            showNotification(data.detail || 'Failed to load transactions', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to load transactions', 'error');
    }
};

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

// Transfer money
const transferMoney = async (event) => {
    event.preventDefault();
    const recipient = document.getElementById('recipientUsername').value;
    const amount = parseFloat(document.getElementById('amount').value);

    try {
        const response = await fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recipient, amount })
        });
        const data = await response.json();
        if (response.ok) {
            showNotification('Transfer successful!');
            hideTransferModal();
            loadBalance();
            loadTransactions();
        } else {
            showNotification(data.detail || 'Transfer failed', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Transfer failed', 'error');
    }
};

// Modal functions
const showTransferModal = () => {
    const modal = document.getElementById('transferModal');
    modal.style.display = 'flex';
    modal.classList.add('fade-in');
    document.body.style.overflow = 'hidden';
};

const hideTransferModal = () => {
    const modal = document.getElementById('transferModal');
    modal.classList.remove('fade-in');
    document.body.style.overflow = '';
    document.getElementById('transferForm').reset();
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
};

// Logout function with confirmation
const logout = () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    }
};

// Event listeners
document.getElementById('transferForm').addEventListener('submit', transferMoney);

// Initialize
updateCurrentTime();
setInterval(updateCurrentTime, 60000); // Update time every minute
updateWelcomeMessage();
loadBalance();
loadTransactions();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('transferModal').style.display === 'flex') {
        hideTransferModal();
    }
});