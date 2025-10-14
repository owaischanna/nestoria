// components/TestimonialsSection.jsx
import React from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

// Subcomponent for the Testimonial Card
const TestimonialCard = ({ quote, author, age, location, rating, imageUrl }) => {
  const stars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
    />
  ));

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl max-w-lg mx-auto lg:mx-0 transform translate-y-0 lg:translate-y-16 relative z-20">
      {/* Quote Icon */}
      <div className="text-6xl text-yellow-500 mb-4 font-serif font-extrabold leading-none">
        &rdquo;
      </div>
      
      {/* Quote Text */}
      <p className="text-xl md:text-2xl italic text-gray-800 leading-snug">
        "{quote}"
      </p>

      <div className="border-t border-gray-200 mt-6 pt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Author Image */}
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            {/* Using the online image link passed via props */}
            <img 
              src={imageUrl} 
              alt={author} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Author Details */}
          <div>
            <p className="font-bold text-gray-900">{author}</p>
            <p className="text-sm text-gray-500">{`Age: ${age}, ${location}`}</p>
          </div>
        </div>
        
        {/* Rating Stars */}
        <div className="flex space-x-0.5">
          {stars}
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  // Static data for the initial display
  const currentTestimonial = {
    quote: "Hosting a student brought life back into my home. I feel safer and less alone.",
    author: "Barbara D. Smith",
    age: 72,
    location: "Malaga",
    rating: 4.5, 
    // Online Image Link for the Author
    imageUrl: "https://i.imgur.com/vH1N9xO.jpeg", 
    // Online Image Link for the Background Silhouette
    backgroundUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", 
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] bg-green-700 overflow-hidden">
      {/* Background Layer with House Overlay */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{ 
          // Replaced placeholder with an online image of a house silhouette/pattern
          backgroundImage: `url('${currentTestimonial.backgroundUrl}')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply' // Helps blend the image with the green background
        }}
      >
        {/* Solid Color Mask to control final hue */}
        <div className="absolute inset-0 bg-green-800 opacity-20"></div>
      </div>
      
      {/* Decorative Circles */}
      <div className="absolute w-24 h-24 bg-white opacity-20 rounded-full top-1/4 left-[30%] translate-x-1/2" />
      <div className="absolute w-16 h-16 bg-white opacity-20 rounded-full bottom-1/4 right-[20%] translate-x-1/2" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center lg:items-start p-8">
        
        {/* Section Title */}
        <h2 className="text-lg tracking-widest font-bold text-white text-center mb-16 lg:mb-12">
          TESTIMONIALS
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full">
          
          {/* Left Content: Headline and Slider Controls */}
          <div className="flex flex-col space-y-8 text-center lg:text-left max-w-md mb-12 lg:mb-0 relative z-10">
            <h3 className="text-5xl font-extrabold text-white leading-tight">
              Look What Our Customers Say!
            </h3>
            <p className="text-white text-lg opacity-80">
              Fusce venenatis tellis a felis scelerisque, non pulvinar est pellentesque.
            </p>
            
            {/* Slider Controls */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              <button 
                className="p-4 rounded-full border border-white text-white hover:bg-white hover:text-green-700 transition duration-300"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                className="p-4 rounded-full border border-white text-white hover:bg-white hover:text-green-700 transition duration-300"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Right Content: Testimonial Card */}
          <TestimonialCard 
            quote={currentTestimonial.quote}
            author={currentTestimonial.author}
            age={currentTestimonial.age}
            location={currentTestimonial.location}
            rating={currentTestimonial.rating}
            imageUrl={currentTestimonial.imageUrl} // Passed the online image link
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;