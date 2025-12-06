import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Vision } from '../components/Vision';
import { Product } from '../components/Product';
import { BlogPreview } from '../components/BlogPreview';
import { Waitlist } from '../components/Waitlist';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <Hero />
            <Vision />
            <Product />
            <About />
            <BlogPreview />
            <Waitlist />
            <Footer />
        </div>
    );
}
