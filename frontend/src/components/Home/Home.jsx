import { Container, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className=' py-5'>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='secondary' href='/register'>
              Register
            </Button>
          </div>
    </div>
  );
};

export default Home;