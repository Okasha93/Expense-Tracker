# Income and Expense Tracker App

A basic React Native app to track income and expenses, focusing on functionality and UI/UX.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

## Running the App

```bash
   npx expo start
   ```

  
## Architecture

The app uses React Native with functional components and hooks. State management is handled using the Context API.

- **Components**: Located in the `components` directory, including `Header`, `TransactionItem`, etc.
- **Screens**: Located in the `screens` directory, including `DashboardScreen`, `ListScreen`, and `DiagramScreen`.
- **Navigation**: Implemented using `react-navigation`, with a bottom tab navigator.
- **TransactionsContext**: Provides global state for transactions, using `TransactionsProvider` and `useTransactions` hook.
- **Local Data Persistence**: Transaction data is persisted locally using `AsyncStorage`.

## Time Taken

This project was completed in approximately 6 hours.

