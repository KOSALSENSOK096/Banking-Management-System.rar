# Banking Management System

A modern banking management system built with Python and CustomTkinter, featuring a beautiful dark theme UI.

## Features

- Account Registration with detailed customer information
- Account Management (View, Update, Delete)
- Transaction Operations (Deposit, Withdraw, Transfer)
- Beautiful dark theme UI
- Data persistence using JSON storage
- Input validation and error handling

## Requirements

- Python 3.x
- Required packages (install using `pip install -r requirements.txt`):
  - customtkinter>=5.2.0
  - tkcalendar>=1.6.1
  - Pillow>=10.0.0

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/KOSALSENSOK096/Banking-Management-System.rar.git
cd Banking-Management-System
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python bank_management_system.py
```

## Project Structure

```
Banking-Management-System/
├── bank_management_system.py  # Main application file
├── requirements.txt          # Project dependencies
├── bank_data.json           # Data storage file
└── README.md               # Project documentation
```

## Code Completion Support

This project supports code completion in most modern IDEs. To ensure the best development experience:

1. Make sure your IDE recognizes the project root directory
2. Install all dependencies from requirements.txt
3. If using VS Code:
   - Install the Python extension
   - Select the correct Python interpreter
   - Enable Python Language Server

## Development

The project uses:
- CustomTkinter for modern UI components
- TkCalendar for date selection
- JSON for data persistence
- Type hints for better code completion