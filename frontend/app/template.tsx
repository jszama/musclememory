import Header from './components/Header'
import BackButton from "./components/BackButton";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div> 
            <Header />
            {children}
            <BackButton />
        </div>
    )
  }