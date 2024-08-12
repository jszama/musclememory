import Link from "next/link";

export default function Contact() {
    return (
        <main className="contact-page">
            <h1 className="contact-page-title">
                Contact Us
            </h1>
            <div className="contact-info">
                <section>  
                    <h2 className="contact-faq-title">
                        FAQ
                    </h2>
                    <ol className="contact-faq-box">
                        <li>
                            <h2>How do I create an account?</h2>
                            <article>
                                To create an account, click <a className="contact-redirect" href='/register/'>HERE</a>. You will be prompted to enter your name, email address, and password. Once you have entered this information, click the Sign Up button to create your account.
                            </article>
                        </li>
                        <li>
                            <h2>How do I track my workouts?</h2>
                            <article>
                                To track your workouts, you will need to create an account, then navigate to the &quot;Workouts&quot; section of the app. From there, you can add new workouts, view your workout history, and track your progress.
                            </article>
                        </li>
                        <li>
                            <h2>How do I connect with other users?</h2>
                            <article>
                                To connect with other users, go to the &quot;Friends&quot; section of the app. There, you can send friend requests to other users and view their profiles.
                            </article>
                        </li>
                        <li>
                            <h2>How do I create a custom workout plan?</h2>
                            <article>
                                To create a custom workout plan, go to the &quot;Workouts&quot; section of the app. From there, you can create a new workout plan for yourself.
                            </article>
                        </li>
                        <li>
                            <h2>How do I update my profile?</h2>
                            <article>
                                To update your profile, click on your profile  in the top right corner of the app. From there, you can edit your profile information, change your profile picture, and update your bio.
                            </article>
                        </li>
                    </ol>
                </section>

                <section className="contact-extra">
                    <h2>
                        Still unsure?
                    </h2>
                    <article>
                        Send us an email at support@musclememory.com and we&apos;ll get back to you as soon as possible.
                    </article>
                </section> 
            </div>           
        </main>
    );
}
