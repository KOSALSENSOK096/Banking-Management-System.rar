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

// Load account balance
const loadBalance = async () => {
    try {
        const response = await fetch('/api/balance', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('balance').textContent = formatCurrency(data.balance);
        } else {
            alert(data.detail || 'Failed to load balance');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load account balance');
    }
};

// Load recent transactions
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
            transactionsContainer.innerHTML = data.transactions.map(transaction => `
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                        <p class="font-medium">${transaction.type}</p>
                        <p class="text-sm text-gray-600">${new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <p class="font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}">
                        ${formatCurrency(transaction.amount)}
                    </p>
                </div>
            `).join('') || '<p class="text-gray-500">No recent transactions</p>';
        } else {
            alert(data.detail || 'Failed to load transactions');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load transactions');
    }
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
            alert('Transfer successful!');
            hideTransferModal();
            loadBalance();
            loadTransactions();
        } else {
            alert(data.detail || 'Transfer failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Transfer failed');
    }
};

// Modal functions
const showTransferModal = () => {
    document.getElementById('transferModal').style.display = 'flex';
};

const hideTransferModal = () => {
    document.getElementById('transferModal').style.display = 'none';
    document.getElementById('transferForm').reset();
};

// Logout function
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
};

// Event listeners
document.getElementById('transferForm').addEventListener('submit', transferMoney);

// Initial load
loadBalance();
loadTransactions();