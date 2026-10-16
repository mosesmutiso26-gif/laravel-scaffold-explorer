import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, User, Clock } from 'lucide-react';
import { Reveal, SectionHeading, CTASection, PageHero, Badge } from '@/components/ui/Primitives';
import { newsArticles, schoolEvents } from '@/data/schoolData';

export function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(newsArticles.map((a) => a.category)))];
  const filteredArticles = activeCategory === 'All'
    ? newsArticles
    : newsArticles.filter((a) => a.category === activeCategory);

  const featured = newsArticles[0];

  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Stay connected with the latest stories, achievements, and happenings from the Riverside Academy community."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'News' }]}
        image="https://images.pexels.com/photos/34162719/pexels-photo-34162719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Featured article */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-page">
          <Reveal>
            <Link to="/news" className="group block">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg h-72 lg:h-96">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <Badge color="accent">Featured</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge>{featured.category}</Badge>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featured.date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 leading-tight group-hover:text-primary-600 transition-colors text-balance">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-neutral-600 leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {featured.author}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                    Read full story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* News grid with filter */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <h2 className="section-title">All News</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    activeCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, i) => (
              <Reveal key={article.id} delay={i * 80}>
                <Link to="/news" className="group block card card-hover overflow-hidden h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-primary-700">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="font-display font-bold text-neutral-900 text-lg leading-snug group-hover:text-primary-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{article.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1 text-primary-600 font-semibold group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Upcoming Events"
            title="Mark your calendar"
            subtitle="Join us at these upcoming school events. We'd love to see you there."
          />
          <div className="mt-14 max-w-4xl mx-auto space-y-4">
            {schoolEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 80}>
                <div className="card card-hover p-5 lg:p-6 flex items-center gap-4 lg:gap-8">
                  <div className="flex flex-col items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-primary-50 text-primary-600 flex-shrink-0">
                    <span className="text-lg lg:text-2xl font-display font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString('en-KE', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge color="neutral">{event.category}</Badge>
                    </div>
                    <h3 className="font-display font-bold text-neutral-900 truncate">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Never miss an update"
        description="Subscribe to our newsletter for the latest news, events, and school announcements delivered straight to your inbox."
        buttonText="Subscribe now"
        buttonLink="/contact"
      />
    </>
  );
}
