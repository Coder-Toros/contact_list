import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

function App() {
  
  return (
    <div className='container'>
      <h1>Contact list</h1>
      <div className='wrapper'>
        <div className='contacts-wrapper'>
          <ContactList />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

export default App;