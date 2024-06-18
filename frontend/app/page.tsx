import Image from 'next/image'; 
import Link from 'next/link';

export default function Home() {
  return (
    <main className="home-page">
      <div className="btn-container">

        <section className='start-btn'>
          <Link href='/start'>
            START
          </Link>
        </section>
        
        <Link className='app-btn' href='/exercise-menu'>
            <Image src="/workouts.png" alt="Workouts" width={72} height={72} />
        </Link>

        <section className='app-btn'>
          <Image src="/statistics.png" alt="Statistics" width={72} height={72}/>
        </section>
        <section className='app-btn'>
          <Image src="/history.png" alt="History" width={72} height={72}/>
        </section>
        <section className='app-btn'>
          <Image src="/friends.png" alt="Friends" width={96} height={96}/>
        </section>
      </div>
    </main>
  );
}
