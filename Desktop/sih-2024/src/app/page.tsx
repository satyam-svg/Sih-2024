import Navbar from '../../Components/Navbar/page';
import Main from '../../Components/Main/page';

export default function Home() {
  return (
    <div>
      <main style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <Main />
      </main>
    </div>
  );
}
