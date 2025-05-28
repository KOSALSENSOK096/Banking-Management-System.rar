# Banking Management System 🏦

![Python Version](https://img.shields.io/badge/python-3.x-blue.svg)
![CustomTkinter](https://img.shields.io/badge/UI-CustomTkinter-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern, feature-rich banking management system built with Python and CustomTkinter, featuring an elegant dark theme UI. This application provides a comprehensive solution for managing banking operations with a user-friendly interface.

<div align="center">
  <img src="screenshots/main.png" alt="Banking Management System" width="600"/>
</div>

## ✨ Key Features

- 🔐 **Secure Account Management**
  - Customer registration with detailed information
  - Account creation and management
  - Secure password handling

- 💰 **Transaction Operations**
  - Deposit funds
  - Withdraw money
  - Transfer between accounts
  - Transaction history tracking

- 🎨 **Modern User Interface**
  - Beautiful dark theme
  - Responsive design
  - Intuitive navigation
  - User-friendly forms

- 📊 **Data Management**
  - JSON-based data persistence
  - Efficient data retrieval
  - Backup functionality

- ⚡ **Advanced Features**
  - Real-time input validation
  - Comprehensive error handling
  - Session management
  - Detailed logging

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- Git (for cloning the repository)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KOSALSENSOK096/Banking-Management-System.rar.git
   cd Banking-Management-System
   ```

2. **Set up a virtual environment (recommended):**
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python bank_management_system.py
   ```

## 📦 Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| customtkinter | >=5.2.0 | Modern UI components |
| tkcalendar | >=1.6.1 | Date selection widget |
| Pillow | >=10.0.0 | Image processing |

## 📁 Project Structure

```
Banking-Management-System/
├── bank_management_system.py   # Main application entry point
├── modules/                    # Application modules
│   ├── account.py             # Account management
│   ├── transaction.py         # Transaction operations
│   └── database.py           # Data persistence
├── assets/                    # UI assets and images
├── bank_data.json            # Data storage
├── requirements.txt          # Project dependencies
└── README.md                # Documentation
```

## 💻 Development

### Code Style

This project follows PEP 8 guidelines for Python code. We use:
- Type hints for better code completion
- Docstrings for function documentation
- Consistent naming conventions

### IDE Setup

For the best development experience:

1. **VS Code Setup:**
   - Install Python extension
   - Enable Python Language Server
   - Configure settings.json for the project

2. **PyCharm Setup:**
   - Open project as Python project
   - Set Python interpreter
   - Enable type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please:
- Open an issue on GitHub
- Contact: [Your Contact Information]
- Documentation: [Link to Documentation]

## 🙏 Acknowledgments

- CustomTkinter for the modern UI components
- All contributors who have helped this project grow
- The open source community for their invaluable tools

---

<div align="center">
  Made with ❤️ by [Your Name/Organization]
</div>