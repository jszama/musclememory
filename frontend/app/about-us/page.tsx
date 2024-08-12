'use client';

import { useRouter } from 'next/navigation';

export default function About() {
    const router = useRouter();

    return (
        <main className="about-page">
            <div className='about-content'>
            <h1>
                About MuscleMemory
            </h1>
            <article>
                MuscleMemory is a fitness app that helps you track your workouts and stay on top of your fitness goals.
            </article>
            <div className="about-info">
                <section>
                    <h2>
                        Our Mission
                    </h2>
                    <article>
                        Our mission is to help people achieve their fitness goals by providing them with the tools they need to succeed. We believe that everyone should have access to the resources they need to live a healthy lifestyle.
                    </article>
                </section>

                <section>
                    <h2>
                        Our Features
                    </h2>
                    <article>
                        Our app has a variety of features to help you stay on top of your fitness goals. You can create custom workout plans, track your progress, and connect with other users to stay motivated. We also provide a library of exercises and workouts to help you get started.
                    </article>
                </section>
            </div>
            <section>  
                <h2>
                    Get Started
                </h2>
                <article>
                    Ready to get started? Create an account and start tracking your workouts today!
                </article>
            
                <button className="about-sign-up-btn" onClick={() => router.push('/account')}>
                    SIGN UP
                </button>
            </section>
            </div>
        </main>
    );
}
